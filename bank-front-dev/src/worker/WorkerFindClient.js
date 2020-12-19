import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import { DataGrid } from '@material-ui/data-grid';
import DataGridPlaceholder from "../util/DataGridPlaceholder"
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//PROPS: serverURL, token

class WorkerFindClient  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            ClientId: "",
            FullName: "",
            PassportNumber: "",
            res: {}
    };
    this.changeHandler = this.changeHandler.bind(this)
    this.processFindClient = this.processFindClient.bind(this)
  }

  processFindClient(){
    this.props.selectionHandler([{
      PassportNumber: "",
      FullName: "",
      BirthDate: new Date().toLocaleDateString(),
      TaxId: "",
      TelephoneNumber: "",
      IncomePerMonth: "",
      ClientId: ""
    }])
    fetch(`${this.props.serverURL}/find-client?ClientId=${this.state.ClientId}&FullName=${this.state.FullName}&PassportNumber=${this.state.PassportNumber}`, 
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

  filterSelect(sel){
    let output = this.state.res.data.filter(row => {
      if (row.ClientId === sel){
        return row
      }
    })
    this.props.selectionHandler(output)
  }

  render() { 
    let table = {}
    if (this.state.res !== undefined && this.state.res.count > 0) {
    table = <div style={{ height: 220, width: '100%', paddingBottom: "28px"}}>
        <FormLabel component="legend" style={{marginBottom: "10px"}}>Найденные клиенты:</FormLabel>
        <DataGrid rows={
        this.state.res.data.map( row => {
            return {'id':row.ClientId, 'PassportNumber': row.PassportNumber, 'FullName': row.FullName }
        })
    } columns={
        [
            { field: 'id', headerName: 'ID',  flex: 0.5},
            { field: 'FullName', headerName: 'ФИО', flex: 1},
            { field: 'PassportNumber', headerName: 'Номер Паспорта', flex: 1},
            { flex: 0.1}
        ]
    } pageSize={2}
      onSelectionChange={(sel) => {this.filterSelect(sel.rowIds[0])}}
      /></div>
    } else {
    table = <DataGridPlaceholder height={220} msg={`Нет данных 😓`}/>
    }
    return (
      <div className="WorkerFindClient" >
        <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
        <FormControl fullWidth="true"  style={{flex: 3, marginRight: "10px"}}>    
          <TextField 
            label="ID Клиента"
            variant="outlined"
            name = "ClientId"
            value = {this.state.ClientId}
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
        <FormControl fullWidth="true"  style={{flex: 4, marginRight: "10px"}}>
          <TextField 
            label="Номер Паспорта"
            variant="outlined"
            name = "PassportNumber"
            value = {this.state.PassportNumber}
            onChange = {this.changeHandler}
          />
        </FormControl>
        <FormControl fullWidth="true"  style={{flex: 3}}>
          <Button 
            style={{ height: "56px"}}
            variant="contained"
            color="primary"
            onClick={this.processFindClient}>
              Найти
          </Button>         
      </FormControl>
      </div>
      {table}
      </div>
    );
  }
}
export default WorkerFindClient;