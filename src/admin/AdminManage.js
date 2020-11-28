import React from 'react';
import AdminAddWorker from './AdminAddWorker'
import AdminFindWorker from './AdminFindWorker'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//PROPS: serverURL, token

class AdminManage  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      selectedWorkerId: ""
    };

    this.changeHandler = this.changeHandler.bind(this)
    this.processUpdate = this.processUpdate.bind(this)
    this.processDelete = this.processDelete.bind(this)
  }

  componentDidMount() {
  }
  
  processUpdate(){
    //TODO:
  }

  processDelete(){
    //TODO:
  }

  changeHandler(event) {
    const name = event.target.name
    const value = event.target.value
    const type = event.target.type
    const checked = event.target.checked
    type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
  }

  render() { 
      //console.log(this.state)
      
    return (
      <div className="AdminManage" >
        <div style = {{display: "flex", justifyContent: "space-between", marginLeft: "40px", marginRight: "40px", marginTop: "40px"}}>
          <div style={{flex: 4, marginRight: "40px"}}>
            <AdminFindWorker
              serverURL = {this.props.serverURL} //passing the props from Admin.js
              token = {this.props.token} 
            />
            <Typography 
                variant="h4" 
                style = {{marginTop: "26px", marginBottom: "10px"}}
            >  
              Управление персоналом:
            </Typography>
            <FormControl fullWidth="true"  style={{marginBottom: "10px"}}>    
              <TextField 
                label="ID Работника"
                variant="outlined"
                name = "selectedWorkerId"
                value = {this.state.selectedWorkerId}
                onChange = {this.changeHandler}
              />
            </FormControl>  
            <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button 
                  style={{marginRight: "10px"}}
                  variant="contained"
                  color="primary"
                  onClick={this.processUpdate}>
                    Обновить
                </Button>         
              </FormControl>
              <FormControl fullWidth="true"  style={{flex: 4}}>
                <Button 
                  variant="contained"
                  color="secondary"
                  onClick={this.processDelete}>
                    Уволить
                </Button>         
              </FormControl>
            </div>
          </div>
          <div style={{flex: 4}}>
            <AdminAddWorker
              serverURL = {this.props.serverURL} //passing the props from Admin.js
              token = {this.props.token} 
            />
          </div>
        </div>
      </div>
    );
  }
}
export default AdminManage;