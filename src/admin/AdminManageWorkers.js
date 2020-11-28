import React from 'react';
import AdminAddWorker from './AdminAddWorker'
import AdminFindWorker from './AdminFindWorker'
import AdminModifyWorker from './AdminModifyWorker'
import AdminModifyWorkerAuth from './AdminModifyWorkerAuth'

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//PROPS: serverURL, token

class AdminManageWorkers  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
        selectedWorkerData: {
          PassportNumber: "",
          FullName: "",
          BirthDate: "",
          TaxId: "",
          CriminalRecords: "",
          WorkerId: ""
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
      this.setState({"mode":"add"});
    }, timeout)
  }

  processAuth(){
    this.setState({"mode":"auth"})
  }

  processDelete(){
    let alertMsg = `Работник: ${this.state.selectedWorkerData.FullName} с Id:${this.state.selectedWorkerData.WorkerId} уволен!`
    this.setState({"mode":"add"});
    fetch(this.props.serverURL + `/delete-worker?WorkerId=${this.state.selectedWorkerData.WorkerId}`, 
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
  }

  changeHandler(event) {
    const name = event.target.name
    const value = event.target.value
    const type = event.target.type
    const checked = event.target.checked
    type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
  }

  selectionHandler(id) {
    this.setState({"selectedWorkerData":id[0]})
  }

  render() { 
      console.log(this.state)
      
    return (
      <div className="AdminManageWorkers" >
        <div style = {{display: "flex", justifyContent: "space-between", marginLeft: "40px", marginRight: "40px", marginTop: "40px"}}>
          <div style={{flex: 4, marginRight: "40px"}}>
            <AdminFindWorker
              serverURL = {this.props.serverURL} //passing the props from Admin.js
              token = {this.props.token} 
              selectionHandler = {this.selectionHandler}
            />
            <Typography 
                variant="h4" 
                style = {{marginTop: "26px", marginBottom: "10px"}}
            >  
              Управление персоналом:
            </Typography>
            <FormControl fullWidth="true"  style={{marginBottom: "10px"}}>    
              <TextField 
                label="Выбранный ID Работника"
                variant="outlined"
                name = "selectedWorkerId"
                value = {this.state.selectedWorkerData.WorkerId}
                disabled
              />
            </FormControl>  
            <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button 
                  style={{marginRight: "10px"}}
                  variant="contained"
                  color="primary"
                  disabled = {(this.state.selectedWorkerData.WorkerId === "") ? true: false} 
                  onClick={this.processUpdate}>
                    Обновить Данные
                </Button>         
              </FormControl>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button
                  style={{marginRight: "10px"}} 
                  variant="contained"
                  color="secondary"
                  disabled = {(this.state.selectedWorkerData.WorkerId === "") ? true: false} 
                  onClick={this.processAuth}>
                    Обновить Доступ
                </Button>         
              </FormControl>
              <FormControl fullWidth="true"  style={{flex: 2}}>
                <Button 
                  variant="contained"
                  color="secondary"
                  disabled = {(this.state.selectedWorkerData.WorkerId === "") ? true: false} 
                  onClick={this.processDelete}>
                    Уволить
                </Button>         
              </FormControl>
            </div>
          </div>
          <div style={{flex: 4}}>
            {this.state.mode === "add" 
            ? <AdminAddWorker
              serverURL = {this.props.serverURL} //passing the props from Admin.js
              token = {this.props.token} 
            /> 
            : 
              <div>
              { this.state.mode === "update" 
                ?
                <AdminModifyWorker
                  serverURL = {this.props.serverURL} //passing the props from Admin.js
                  token = {this.props.token}
                  PassportNumber = {this.state.selectedWorkerData.PassportNumber}
                  FullName = {this.state.selectedWorkerData.FullName}
                  BirthDate = {new Date(this.state.selectedWorkerData.BirthDate).toLocaleString()}
                  TaxId = {this.state.selectedWorkerData.TaxId}
                  CriminalRecords = {this.state.selectedWorkerData.CriminalRecords}
                  WorkerId = {this.state.selectedWorkerData.WorkerId}
                  processUpdateToAdd = {this.processUpdateToAdd} //it will swap update for add
                /> 
                : 
                <AdminModifyWorkerAuth
                  serverURL = {this.props.serverURL} //passing the props from Admin.js
                  token = {this.props.token}
                  WorkerId = {this.state.selectedWorkerData.WorkerId}
                  AuthId = {this.state.selectedWorkerData.AuthId}
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
export default AdminManageWorkers;