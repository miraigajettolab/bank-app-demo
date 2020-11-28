//AdminManageServices
import React from 'react';
import AdminAddService from './AdminAddService'
import AdminFindService from './AdminFindService'

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//PROPS: serverURL, token

class AdminManageServices  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
        selectedServiceData: {
          ServiceId: ""
        }
    };

    this.changeHandler = this.changeHandler.bind(this)
    this.processDisable = this.processDisable.bind(this)
    this.processEnable = this.processEnable.bind(this)
    this.selectionHandler = this.selectionHandler.bind(this)
  }

  componentDidMount() {
  }

  processEnable(){
    let alertMsg = `Услуга: с Id:${this.state.selectedServiceData.ServiceId} разблокированна!`
    fetch(this.props.serverURL + `/enable-service?ServiceId=${this.state.selectedServiceData.ServiceId}`, 
    {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': this.props.token
    }
    })
    .then(response => response.json())
    .then(data => console.log("Enabling Service: " + data))
    alert(alertMsg)
  }

  processDisable(){
    let alertMsg = `Услуга: с Id:${this.state.selectedServiceData.ServiceId} заблокированна!`
    fetch(this.props.serverURL + `/disable-service?ServiceId=${this.state.selectedServiceData.ServiceId}`, 
      {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': this.props.token
      }
    })
    .then(response => response.json())
    .then(data => console.log("Disabling Service: " + data))
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
    this.setState({"selectedServiceData":id[0]})
  }

  render() { 
      console.log(this.state)
      
    return (
      <div className="AdminManageServices" >
        <div style = {{display: "flex", justifyContent: "space-between", marginLeft: "40px", marginRight: "40px", marginTop: "40px"}}>
          <div style={{flex: 4, marginRight: "40px"}}>
            <AdminFindService
              serverURL = {this.props.serverURL} //passing the props from Admin.js
              token = {this.props.token} 
              selectionHandler = {this.selectionHandler}
            />
            <Typography 
                variant="h4" 
                style = {{marginTop: "26px", marginBottom: "10px"}}
            >  
              Управление услугами:
            </Typography>
            <FormControl fullWidth="true"  style={{marginBottom: "10px"}}>    
              <TextField 
                label="Выбранный ID Услуги"
                variant="outlined"
                name = "selectedServiceId"
                value = {this.state.selectedServiceData.ServiceId}
                disabled
              />
            </FormControl>  
            <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button 
                  style={{marginRight: "10px"}}
                  variant="contained"
                  color="secondary"
                  disabled = {(this.state.selectedServiceData.ServiceId === "") ? true: false} 
                  onClick={this.processEnable}>
                    Разблокировать
                </Button>         
              </FormControl>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled = {(this.state.selectedServiceData.ServiceId === "") ? true: false} 
                  onClick={this.processDisable}>
                    Заблокировать
                </Button>         
              </FormControl>
            </div>
          </div>
          <div style={{flex: 4}}>
            <AdminAddService
              serverURL = {this.props.serverURL} //passing the props from Admin.js
              token = {this.props.token} 
            /> 
          </div>
        </div>
      </div>
    );
  }
}
export default AdminManageServices;