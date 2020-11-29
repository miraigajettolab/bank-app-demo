import React from 'react';
import WorkerAddClient from './WorkerAddClient'
import WorkerFindClient from './WorkerFindClient'
import WorkerModifyClient from './WorkerModifyClient'
import WorkerModifyClientAuth from './WorkerModifyClientAuth'

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//PROPS: serverURL, token

class WorkerManageClients  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
        selectedClientData: {
          PassportNumber: "",
          FullName: "",
          BirthDate: "",
          TaxId: "",
          TelephoneNumber: "",
          IncomePerMonth: "",
          ClientId: ""
        },
        mode : "add"
    };

    this.changeHandler = this.changeHandler.bind(this)
    this.processUpdate = this.processUpdate.bind(this)
    this.processUpdateToAdd = this.processUpdateToAdd.bind(this)
    this.processAuth = this.processAuth.bind(this)
    this.processDelete = this.processDelete.bind(this)
    this.selectionHandler = this.selectionHandler.bind(this)
  }

  componentDidMount() {
  }
  
  processUpdate(){
    this.setState({"mode":"update"}) 
  }

  processUpdateToAdd(timeout = 0){
    setTimeout(() => {
      this.setState({
        selectedClientData: {
            PassportNumber: "",
            FullName: "",
            BirthDate: "",
            TaxId: "",
            TelephoneNumber: "",
            IncomePerMonth: "",
            ClientId: ""
          },  
        "mode":"add"
        });
    }, timeout)
  }

  processAuth(){
    this.setState({"mode":"auth"})
  }

  processDelete(){
    let alertMsg = `Клиент: ${this.state.selectedClientData.FullName} с Id:${this.state.selectedClientData.ClientId} удален!`
    this.setState({"mode":"add"});
    fetch(this.props.serverURL + `/delete-client?ClientId=${this.state.selectedClientData.ClientId}`, 
      {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': this.props.token
      }
    })
    .then(response => response.json())
    .then(data => console.log("Deletion: " + data))
    alert(alertMsg)
    this.setState({
        selectedClientData: {
            PassportNumber: "",
            FullName: "",
            BirthDate: "",
            TaxId: "",
            TelephoneNumber: "",
            IncomePerMonth: "",
            ClientId: ""
          },  
        "mode":"add"
        });
  }

  changeHandler(event) {
    const name = event.target.name
    const value = event.target.value
    const type = event.target.type
    const checked = event.target.checked
    type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
  }

  selectionHandler(id) {
    this.setState({"selectedClientData":id[0]})
  }

  render() { 
      console.log(this.state)
      
    return (
      <div className="WorkerManageClients" >
        <div style = {{display: "flex", justifyContent: "space-between", marginLeft: "40px", marginRight: "40px", marginTop: "40px"}}>
          <div style={{flex: 4, marginRight: "40px"}}>
            <WorkerFindClient
              serverURL = {this.props.serverURL} //passing the props from Worker.js
              token = {this.props.token} 
              selectionHandler = {this.selectionHandler}
            />
            <Typography 
                variant="h4" 
                style = {{marginTop: "26px", marginBottom: "10px"}}
            >  
              Управление клиентами:
            </Typography>
            <FormControl fullWidth="true"  style={{marginBottom: "10px"}}>    
              <TextField 
                label="Выбранный ID Клиента"
                variant="outlined"
                name = "selectedClientId"
                value = {this.state.selectedClientData.ClientId}
                disabled
              />
            </FormControl>  
            <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button 
                  style={{marginRight: "10px"}}
                  variant="contained"
                  color="primary"
                  disabled = {(this.state.selectedClientData.ClientId === "") ? true: false} 
                  onClick={this.processUpdate}>
                    Обновить Данные
                </Button>         
              </FormControl>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button
                  style={{marginRight: "10px"}} 
                  variant="contained"
                  color="secondary"
                  disabled = {(this.state.selectedClientData.ClientId === "") ? true: false} 
                  onClick={this.processAuth}>
                    Обновить Доступ
                </Button>         
              </FormControl>
              <FormControl fullWidth="true"  style={{flex: 2}}>
                <Button 
                  variant="contained"
                  color="secondary"
                  disabled = {(this.state.selectedClientData.ClientId === "") ? true: false} 
                  onClick={this.processDelete}>
                    Удалить
                </Button>         
              </FormControl>
            </div>
          </div>
          <div style={{flex: 4}}>
            {this.state.mode === "add" 
            ? <WorkerAddClient
              serverURL = {this.props.serverURL} //passing the props from Worker.js
              token = {this.props.token} 
            /> 
            : 
              <div>
              { this.state.mode === "update" 
                ?
                <WorkerModifyClient
                  serverURL = {this.props.serverURL} //passing the props from Worker.js
                  token = {this.props.token}
                  PassportNumber = {this.state.selectedClientData.PassportNumber}
                  FullName = {this.state.selectedClientData.FullName}
                  BirthDate = {new Date(this.state.selectedClientData.BirthDate).toLocaleString()}
                  TaxId = {this.state.selectedClientData.TaxId}
                  TelephoneNumber = {this.state.selectedClientData.TelephoneNumber}
                  IncomePerMonth = {this.state.selectedClientData.IncomePerMonth}
                  ClientId = {this.state.selectedClientData.ClientId}
                  processUpdateToAdd = {this.processUpdateToAdd} //it will swap update for add
                /> 
                : 
                <WorkerModifyClientAuth
                  serverURL = {this.props.serverURL} //passing the props from Worker.js
                  token = {this.props.token}
                  ClientId = {this.state.selectedClientData.ClientId}
                  AuthId = {this.state.selectedClientData.AuthId}
                  processUpdateToAdd = {this.processUpdateToAdd} //it will swap update for add
                /> 
              }
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default WorkerManageClients;