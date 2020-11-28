import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import { DataGrid } from '@material-ui/data-grid';
import DataGridPlaceholder from "../util/DataGridPlaceholder"
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//PROPS: serverURL, token

class AdminFindWorker  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            WorkerId: "",
            FullName: "",
            res: {}
    };
    this.changeHandler = this.changeHandler.bind(this)
    this.processFindWorker = this.processFindWorker.bind(this)
  }

  processFindWorker(){
    fetch(`${this.props.serverURL}/find-worker?WorkerId=${this.state.WorkerId}&FullName=${this.state.FullName}`, 
      {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': this.props.token
      }
    })
    .then(response => response.json())
    .then(data => this.setState({"res":data}))
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

  render() { 
    let table = {}
    if (this.state.res !== undefined && this.state.res.count > 0) {
    table = <div style={{ height: 220, width: '100%', paddingBottom: "28px"}}>
        <FormLabel component="legend" style={{marginBottom: "10px"}}>Найденные работники:</FormLabel>
        <DataGrid rows={
        this.state.res.data.map( row => {
            return {'id':row.WorkerId, 'PassportNumber': row.PassportNumber, 'FullName': row.FullName }
        })
    } columns={
        [
            { field: 'id', headerName: 'ID',  flex: 0.5},
            { field: 'FullName', headerName: 'ФИО', flex: 1},
            { field: 'PassportNumber', headerName: 'Телефон', flex: 1},
            { flex: 0.1}
        ]
    } pageSize={2}/></div>
    } else {
    table = <DataGridPlaceholder height={220} msg={`Нет данных 😿`}/>
    }
    return (
      <div className="AdminFindWorker" >
        <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
        <FormControl fullWidth="true"  style={{flex: 4, marginRight: "10px"}}>    
          <TextField 
            label="ID Работника"
            variant="outlined"
            name = "WorkerId"
            value = {this.state.WorkerId}
            onChange = {this.changeHandler}
          />
        </FormControl>  
        <FormControl fullWidth="true"  style={{flex: 4, marginRight: "10px"}}>
          <TextField 
            label="ФИО"
            variant="outlined"
            name = "FullName"
            value = {this.state.FullName}
            onChange = {this.changeHandler}
          />
        </FormControl>
        <FormControl fullWidth="true"  style={{flex: 4}}>
          <Button 
            style={{ height: "56px"}}
            variant="contained"
            color="primary"
            onClick={this.processFindWorker}>
              Найти
          </Button>         
      </FormControl>
      </div>
      {table}
      </div>
    );
  }
}
export default AdminFindWorker;