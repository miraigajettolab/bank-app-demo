import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

//PROPS: serverURL, token

class WorkerAddBankAccount  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      ServiceId: this.props.ServiceId,
      Total: "",
      ClientId: this.props.ClientId,
      showAlert: true,
      alertMsg: "Открытие счета",
      alertSeverity: "info",
    };

    this.changeHandler = this.changeHandler.bind(this)
    this.handleTime = this.handleTime.bind(this)
    this.processAddBankAccount = this.processAddBankAccount.bind(this)
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if(prevProps.ClientId !== this.props.ClientId) {
      this.setState({
        ClientId: this.props.ClientId,
      });
    }
    if(prevProps.ServiceId !== this.props.ServiceId) {
        this.setState({
            ServiceId: this.props.ServiceId,
        });
      }
  }

  changeHandler(event) {
    const name = event.target.name
    const value = event.target.value
    const type = event.target.type
    const checked = event.target.checked
    type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
  }

  handleTime(value, name) {
    this.setState({[name]: (value != null) ? value.toLocaleDateString(): null})
  }
  
  processAddBankAccount(){
    this.setState({ // reseting alerts
      showAlert:true, 
      alertMsg: "Открытие счета", 
      alertSeverity: "info"
    })
    fetch(this.props.serverURL + `/add-bank-account?ServiceId=${this.state.ServiceId}&Total=${this.state.Total}&ClientId=${this.state.ClientId}`, 
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
      : this.props.drop()
    )
  }

  render() { 
      //console.log(this.state)
      
    return (
      <div className="WorkerAddBankAccount" >
      <Alert 
        style={{marginBottom: "10px", visibility: this.state.showAlert ? "visible": "hidden"}} 
        elevation={6} 
        variant="filled" 
        severity={this.state.alertSeverity}>{this.state.alertMsg}
      </Alert>
      <FormControl fullWidth="true">    
          <TextField 
            style={{marginBottom: "10px"}}
            label="Id Услуги"
            variant="outlined"
            name = "ServiceId"
            value = {this.state.ServiceId}
            onChange = {this.changeHandler}
            disabled = {true}
          />
          <TextField
            style={{marginBottom: "10px"}}
            label="Сумма"
            variant="outlined"
            name = "Total"
            value = {this.state.Total}
            onChange = {this.changeHandler}
          />
          <TextField 
            style={{marginBottom: "10px"}}
            label="Id Клиента"
            variant="outlined"
            name = "ClientId"
            value = {this.state.ClientId}
            onChange = {this.changeHandler}
            disabled = {true}
          />
          <Button 
            style = {{width: "100%", marginBottom: "10px"}}
            variant="contained"
            color="primary"
            onClick={this.processAddBankAccount}>
              Добавить
          </Button>         
        </FormControl>
      </div>
    );
  }
}
export default WorkerAddBankAccount;