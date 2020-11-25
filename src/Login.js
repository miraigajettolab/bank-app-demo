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
    if (this.props.accType == "admin"){
        fetch(this.props.serverURL + "/get-salt", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => crypto.createHash('sha256').update(this.props.login+data.salt+this.props.password).digest('hex'))
        .then(h => fetch(this.props.serverURL + "/complex/1", { //just trying some random method
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Auth-Token': h
            }
        })
        .then(response => response.json())
        .then(data => (data.error == "Authentication failed")
            ? this.setState({
                showAlert:true, 
                alertMsg: "Ошибка авторизации", 
                alertSeverity: "error"
            })
            : this.props.storeToken(h)
        ))
    }
    else {
        fetch(this.props.serverURL + "/check-login", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => crypto.createHash('sha256').update(this.props.login+data.salt+this.props.password).digest('hex'))

    }
  }

  processSingUp(){
    console.log("Не лезь")
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
            variant="outlined"
            name = "password"
            value = {this.props.password}
            onChange = {this.props.changeHandler}
          />
          <div style = {{display: "flex", justifyContent: "space-between"}}>
          <Button 
            style = {{width: "50%", marginRight: "5px"}}
            variant="contained"
            color="primary"
            onClick={this.processSingIn}>
              Войти
          </Button>
          <Button
            style = {{width: "50%", marginLeft: "5px"}} 
            variant="contained" 
            color="secondary" 
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
