//add stuff from WorkerAddClient.js
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
var crypto = require('crypto');

//PROPS: serverURL, token

class WorkerModifyClientAuth  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      Password: "",
      Login: "",
      ClientId: this.props.ClientId,
      AuthId: this.props.AuthId,
      showAlert: true,
      alertMsg: "Изменение аутентификационных данных клиента",
      alertSeverity: "info",
    };

    this.changeHandler = this.changeHandler.bind(this)
    this.processUpdateClientAuth = this.processUpdateClientAuth.bind(this)
  }

  componentDidMount() {
  }

  changeHandler(event) {
    const name = event.target.name
    const value = event.target.value
    const type = event.target.type
    const checked = event.target.checked
    type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
  }
  
  processUpdateClientAuth(){
    this.setState({ // reseting alerts
      showAlert:false, 
      alertMsg: "-", 
      alertSeverity: ""
    })

    if(this.state.AuthId === "null"){
        this.setState({
            showAlert:true,  // well if we got this error then the check failed, so we set the alert and do nothing
            alertMsg: "Этот клиент удален!", 
            alertSeverity: "error" 
          })
        return;
    }

    if(this.state.Password.length < 10 || this.state.Password.length > 80){
        this.setState({
            showAlert:true,  // well if we got this error then the check failed, so we set the alert and do nothing
            alertMsg: "Введите корректный пароль (10-80 символов)", 
            alertSeverity: "error" 
          })
        return;
    }

    fetch(this.props.serverURL + `/alter-client-auth?Login=${this.state.Login}&PasswordHash=${crypto.createHash('sha256').update(this.state.Password+this.state.AuthId).digest('hex')}&ClientId=${this.state.ClientId}`, 
      {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': this.props.token
      }
    })
    .then(response => response.json())
    .then(data => (data.error !== undefined) 
      ? this.setState({
        showAlert:true,  // well if we got this error then the check failed, so we set the alert and do nothing
        alertMsg: data.error, 
        alertSeverity: "error" 
      })
      : 
        this.setState({
            showAlert:true,  // well if we got this error then the check failed, so we set the alert and do nothing
            alertMsg: "Обновление произошло успешно 💹", 
            alertSeverity: "success" 
        })
         //it will swap update for add
    )
  }

  componentDidUpdate(prevProps) {
    if(prevProps.ClientId !== this.props.ClientId) {
      this.setState({
        Password: "",
        Login: this.props.Login,
        ClientId: this.props.ClientId,
        AuthId: this.props.AuthId,
        showAlert: true,
        alertMsg: "Изменение аутентификационных данных клиента",
        alertSeverity: "info"
      });
    }
  }

  render() { 
    console.log(this.state.BirthDate)
    if(this.state.alertSeverity === "success"){
        this.props.processUpdateToAdd(1600)
    }
    return (
      <div className="WorkerModifyClientAuth" >
      <Alert 
        style={{marginBottom: "10px", visibility: this.state.showAlert ? "visible": "hidden"}} 
        elevation={6} 
        variant="filled" 
        severity={this.state.alertSeverity}>{this.state.alertMsg}
      </Alert>
      <FormControl fullWidth="true">    
          <TextField 
            style={{marginBottom: "10px"}}
            label="Логин"
            variant="outlined"
            name = "Login"
            value = {this.state.Login}
            onChange = {this.changeHandler}
          />
          <TextField 
            label="Пароль"
            variant="outlined"
            name = "Password"
            value = {this.state.Password}
            onChange = {this.changeHandler}
          />
          <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
            <Button 
                style = {{flex: 4, marginBottom: "10px", marginRight: "5px"}}
                variant="contained"
                color="secondary"
                onClick={this.props.processUpdateToAdd}>
                Отмена
            </Button>
            <Button 
                style = {{flex: 4, marginBottom: "10px", marginLeft: "5px"}}
                variant="contained"
                color="primary"
                onClick={this.processUpdateClientAuth}>
                Обновить
            </Button>
          </div>        
        </FormControl>
      </div>
    );
  }
}
export default WorkerModifyClientAuth;