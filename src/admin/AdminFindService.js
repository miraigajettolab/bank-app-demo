import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import { DataGrid } from '@material-ui/data-grid';
import DataGridPlaceholder from "../util/DataGridPlaceholder"
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//PROPS: serverURL, token

class AdminFindService  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            ServiceId: "",
            Currency: "RUB",
            res: {}
    };
    this.changeHandler = this.changeHandler.bind(this)
    this.processFindService = this.processFindService.bind(this)
  }

  processFindService(){
    fetch(`${this.props.serverURL}/find-service?ServiceId=${this.state.ServiceId}&Currency=${this.state.Currency}`, 
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
      if (row.ServiceId === sel){
        return row
      }
    })
    this.props.selectionHandler(output)
  }

  render() { 
    let table = {}
    if (this.state.res !== undefined && this.state.res.count > 0) {
    table = <div style={{ height: 220, width: '100%', paddingBottom: "28px"}}>
        <FormLabel component="legend" style={{marginBottom: "10px"}}>Найденные услуги:</FormLabel>
        <DataGrid rows={
        this.state.res.data.map( row => {
            return {
                'id':row.ServiceId, 
                'IsDebit': row.IsDebit === "true" ? "вклад" : "кредит", 
                'Currency': row.Currency, 
                'Description': row.Description, 
                'IsDisabled': row.IsDisabled === "true" ? "да" : "нет" 
            }
        })
    } columns={
        [
            { field: 'id', headerName: 'ID',  flex: 0.5},
            { field: 'IsDebit', headerName: 'Тип', flex: 0.6},
            { field: 'Currency', headerName: 'Валюта', flex: 0.7},
            { field: 'Description', headerName: 'Описание', flex: 2},
            { field: 'IsDisabled', headerName: 'Блокировка', flex: 0.8},
            { flex: 0.1}
        ]
    } pageSize={2}
      onSelectionChange={(sel) => {this.filterSelect(sel.rowIds[0])}}
      /></div>
    } else {
    table = <DataGridPlaceholder height={220} msg={`Нет данных 😰`}/>
    }
    return (
      <div className="AdminFindService" >
        <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
        <FormControl fullWidth="true"  style={{flex: 4, marginRight: "10px"}}>    
          <TextField 
            label="ID Услуги"
            variant="outlined"
            name = "ServiceId"
            value = {this.state.ServiceId}
            onChange = {this.changeHandler}
          />
        </FormControl>  
        <FormControl variant="standard" style={{marginTop: "8px", marginRight: "10px", flex: 4}}>
                <InputLabel htmlFor="outlined-age-native-simple">Валюта:</InputLabel>
                <Select
                    native
                    value={this.state.Currency}
                    onChange={this.changeHandler}
                    label="Валюта:"
                    name="Currency"
                >
                    <option value={"RUB"}>RUB</option>
                    <option value={"JPY"}>JPY</option>
                    <option value={"USD"}>USD</option>
                    <option value={"EUR"}>EUR</option>
                    <option value={"CNY"}>CNY</option>
                </Select>
            </FormControl>
        <FormControl fullWidth="true"  style={{flex: 4}}>
          <Button 
            style={{ height: "56px"}}
            variant="contained"
            color="primary"
            onClick={this.processFindService}>
              Найти
          </Button>         
      </FormControl>
      </div>
      {table}
      </div>
    );
  }
}
export default AdminFindService;