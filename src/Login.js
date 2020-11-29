import './App.css';
import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
var crypto = require('crypto');


class Login extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            showAlert: false,
            alertMsg: "",
            alertSeverity: "",
            salt: null,
            hash: null,

    };
    this.processSingIn = this.processSingIn.bind(this)
    this.processSingUp = this.processSingUp.bind(this)
    this.processForgot = this.processForgot.bind(this)
    this.checkPasswordHash = this.checkPasswordHash.bind(this)
  }

  GetIt(handle, addToken = false) {
    console.log(`Making a GET request to ${handle}`)
    
    let headerBuilder = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (addToken) {
      headerBuilder['Auth-Token'] = this.state.token
    }
    fetch(handle, {
      method: 'GET',
      headers: headerBuilder
    }).then(response => response.json()).then(data => this.setState({"GetResponse":data}))
  }

  componentDidMount() {
  }

  processSingIn(){
    this.setState({ // reseting alerts
        showAlert:false, 
        alertMsg: "", 
        alertSeverity: ""
    })

    if(this.props.login.length === 0) {
        this.setState({
            showAlert:true, 
            alertMsg: "Введите логин", 
            alertSeverity: "warning"
        })
        return;
    }

    if (this.props.accType === "admin"){ //we have to make a token for the admin in a little bit of a different way
        fetch(this.props.serverURL + "/get-salt", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => crypto.createHash('sha256').update(this.props.login+data.salt+this.props.password).digest('hex'))
        .then(h => fetch(this.props.serverURL + "/complex/1", { //just trying some random method to see if we're logged in
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Auth-Token': h
            }
        })
        .then(response => response.json())
        .then(data => (data.error === "Authentication failed")
            ? this.setState({
                showAlert:true,  // well if we got this error then the check failed, so we set the alert and do nothing
                alertMsg: "Ошибка авторизации", 
                alertSeverity: "error"
            })
            : this.props.storeToken(h) // but if it worked we're logged in
        ))
    }
    else { //if the accType is client or worker
        fetch(this.props.serverURL + `/check-login?login=${this.props.login}&isClient=${this.props.accType === "client" ? true : false}`, { //checking login for clients and workers
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => (data.count !== 1) 
            ? this.setState({ //if there are 0 (or god forbid more than 1) results then set error alert and do nothing
                showAlert:true, 
                alertMsg: "Неверный логин", 
                alertSeverity: "error"
            })
            : //if there is 1 than the login is approved and we could proceed to checking the password
             this.checkPasswordHash(crypto.createHash('sha256').update(this.props.password+ data.data[0].AuthId).digest('hex')) 
        )
    }
  }

  checkPasswordHash(h){ //checking password hash for clients and workers
    if(this.props.password.length === 0) {
        this.setState({
            showAlert:true, 
            alertMsg: "Введите пароль", 
            alertSeverity: "warning"
        })
        return;
    }
    fetch(this.props.serverURL + `/check-auth?login=${this.props.login}&token=${h}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => (data.count !== 1) //if there are 0 (or god forbid more than 1) results then set error alert and do nothing
        ? this.setState({
            showAlert:true, 
            alertMsg: "Неверный пароль", 
            alertSeverity: "error"
        })
        : this.props.storeToken(h) //if there is 1 than the token is approved and we are logged in
    )
  }

  processSingUp(){
    this.setState({ // reseting alerts
        showAlert:false, 
        alertMsg: "", 
        alertSeverity: ""
    })
    if ((this.props.accType === "client")){
        this.setState({
            showAlert:true, 
            alertMsg: "Обратитесь к оператору", // do something 
            alertSeverity: "info"
        })
    }
  }

  processForgot(){
        this.setState({ // reseting alerts
        showAlert:false, 
        alertMsg: "", 
        alertSeverity: ""
    })
    if (this.props.accType === "admin"){
        this.setState({
            showAlert:true, 
            alertMsg: "Обратитесь к системному администратору", 
            alertSeverity: "info"
        })
    }
    else if ((this.props.accType === "worker")){
        this.setState({
            showAlert:true, 
            alertMsg: "Обратитесь в администрацию", 
            alertSeverity: "info"
        })
    }
    else if ((this.props.accType === "client")){
        this.setState({
            showAlert:true, 
            alertMsg: "Обратитесь к оператору", // do something 
            alertSeverity: "info"
        })
    }
  }

  render() {
    return (
      <div className="App" style={{maxWidth: "80%", marginLeft: "10%", marginTop: "10%"}}>
          <Alert 
            style={{marginBottom: "20px", visibility: this.state.showAlert ? "visible": "hidden"}} 
            elevation={6} 
            variant="filled" 
            severity={this.state.alertSeverity}>{this.state.alertMsg}
          </Alert>
          <FormControl variant="outlined" fullWidth="true" style={{marginBottom: "10px"}}>
            <InputLabel htmlFor="outlined-age-native-simple">Войти как:</InputLabel>
            <Select
              native
              value={this.props.accType}
              onChange={this.props.changeHandler}
              label="Войти как:"
              name="accType"
            >
              <option value={"client"}>Клиент</option>
              <option value={"worker"}>Оператор</option>
              <option value={"admin"}>Администратор</option>
            </Select>
          </FormControl>
          <FormControl fullWidth="true">    
          <TextField 
            style={{marginBottom: "10px"}}
            label="Логин"
            variant="outlined"
            name = "login"
            value = {this.props.login}
            onChange = {this.props.changeHandler}
          />
          <TextField 
            style={{marginBottom: "10px"}}
            label="Пароль"
            //type="password"
            variant="outlined"
            name = "password"
            value = {this.props.password}
            onChange = {this.props.changeHandler}
          />
          <Button 
            style = {{width: "100%", marginBottom: "10px"}}
            variant="contained"
            color="primary"
            onClick={this.processSingIn}>
              Войти
          </Button>
          <div style = {{display: "flex", justifyContent: "space-between"}}>
          <Button
            style = {{width: "50%", marginRight: "5px"}} 
            variant="contained" 
            color="secondary" 
            onClick={this.processForgot}>
              Забыл пароль
          </Button>
          <Button
            style = {{width: "50%", marginLeft: "5px"}} 
            variant="contained" 
            color="secondary" 
            disabled = {(this.props.accType === "client") ? false: true} 
            onClick={this.processSingUp}>
              Зарегистрироваться
          </Button>
          </div>            
        </FormControl>
      </div>
    );
  }
}

export default Login;
