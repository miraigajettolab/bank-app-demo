//WorkerManageBankAccounts
import React from 'react';
import WorkerAddBankAccount from './WorkerAddBankAccount'
import WorkerFindClient from './WorkerFindClient'
import WorkerFindBankAccount from './WorkerFindBankAccount'
import FindService from '../util/FindService'

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//PROPS: serverURL, token

class WorkerManageBankAccounts  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
        selectedBankAccountData: {
          BankAccountId: ""
        },
        selectedClientData: {
            ClientId: ""
        },
        selectedServicesData: {
              ServiceId: ""
        }
    };


    this.changeHandler = this.changeHandler.bind(this)
    this.processDisable = this.processDisable.bind(this)
    this.processEnable = this.processEnable.bind(this)
    this.selectionHandlerBankAccount = this.selectionHandlerBankAccount.bind(this)
    this.selectionHandlerClient = this.selectionHandlerClient.bind(this)
    this.selectionHandlerServices = this.selectionHandlerServices.bind(this)
    this.drop = this.drop.bind(this)
  }

  componentDidMount() {
  }

  processEnable(){
    let alertMsg = `Счет: с Id:${this.state.selectedBankAccountData.BankAccountId} разблокирован!`
    setTimeout(fetch(this.props.serverURL + `/enable-bank-account?BankAccountId=${this.state.selectedBankAccountData.BankAccountId}`, 
    {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': this.props.token
    }
    })
    .then(response => response.json())
    .then(data =>  this.setState({
        selectedBankAccountData: {
        BankAccountId: ""
      },
      selectedClientData: {
          ClientId: ""
      },
      selectedServicesData: {
            ServiceId: ""
      }})),500)
      alert(alertMsg)
  }

  processDisable(){
    let alertMsg = `Счет: с Id:${this.state.selectedBankAccountData.BankAccountId} заблокирован!`
    setTimeout(fetch(this.props.serverURL + `/disable-bank-account?BankAccountId=${this.state.selectedBankAccountData.BankAccountId}`, 
      {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': this.props.token
      }
    })
    .then(response => response.json())
    .then(data =>  this.setState({
        selectedBankAccountData: {
        BankAccountId: ""
      },
      selectedClientData: {
          ClientId: ""
      },
      selectedServicesData: {
            ServiceId: ""
      }})),500)
    alert(alertMsg)
  }

  drop(){
    console.log("dropping")
    this.setState({
        selectedBankAccountData: {
        BankAccountId: ""
      },
      selectedClientData: {
          ClientId: ""
      },
      selectedServicesData: {
            ServiceId: ""
      }})
  }

  changeHandler(event) {
    const name = event.target.name
    const value = event.target.value
    const type = event.target.type
    const checked = event.target.checked
    type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
  }

  selectionHandlerBankAccount(id) {
    this.setState({"selectedBankAccountData":id[0]})
  }

  selectionHandlerClient(id) {
    this.setState({"selectedClientData":id[0]})
  }

  selectionHandlerServices(id) {
    this.setState({"selectedServicesData":id[0]})
  }

  render() {         
    return (
      <div className="WorkerManageBankAccounts" >
        <div style = {{display: "flex", justifyContent: "space-between", marginLeft: "40px", marginRight: "40px", marginTop: "40px"}}>
          <div style={{flex: 4, marginRight: "40px"}}>
            <WorkerFindClient
              serverURL = {this.props.serverURL} //passing the props from Worker.js
              token = {this.props.token} 
              selectionHandler = {this.selectionHandlerClient}
            />
            <div style = {{marginBottom: "10px"}}></div>
            <WorkerFindBankAccount
              serverURL = {this.props.serverURL} //passing the props from Worker.js
              token = {this.props.token} 
              ClientId = {this.state.selectedClientData.ClientId}
              selectionHandler = {this.selectionHandlerBankAccount}
            />
            <Typography 
                variant="h4" 
                style = {{marginTop: "26px", marginBottom: "10px"}}
            >  
              Управление счетами:
            </Typography>
            <FormControl fullWidth="true"  style={{marginBottom: "10px"}}>    
              <TextField 
                label="Выбранный ID Счета"
                variant="outlined"
                name = "selectedBankAccountId"
                value = {(this.state.selectedClientData.ClientId === this.state.selectedBankAccountData.ClientId) ? this.state.selectedBankAccountData.BankAccountId : ""}
                disabled
              />
            </FormControl>  
            <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button 
                  style={{marginRight: "10px"}}
                  variant="contained"
                  color="secondary"
                  disabled = {(this.state.selectedBankAccountData.BankAccountId === "") || (this.state.selectedClientData.ClientId !== this.state.selectedBankAccountData.ClientId) ? true: false} 
                  onClick={this.processEnable}>
                    Разблокировать
                </Button>         
              </FormControl>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled = {(this.state.selectedBankAccountData.BankAccountId === "") || (this.state.selectedClientData.ClientId !== this.state.selectedBankAccountData.ClientId)  ? true: false} 
                  onClick={this.processDisable}>
                    Заблокировать
                </Button>         
              </FormControl>
            </div>
          </div>
          <div style={{flex: 4}}>
            <FindService
              serverURL = {this.props.serverURL} //passing the props from Admin.js
              token = {this.props.token} 
              selectionHandler = {this.selectionHandlerServices}
            />
            <div style = {{marginBottom: "34px"}}></div>
            <WorkerAddBankAccount
                serverURL = {this.props.serverURL} //passing the props from Worker.js
                token = {this.props.token} 
                ClientId = {this.state.selectedClientData.ClientId}
                ServiceId = {this.state.selectedServicesData.ServiceId}
                drop = {this.drop}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default WorkerManageBankAccounts;
