import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DataGridPlaceholder from "../util/DataGridPlaceholder"

class AdminViewTransactions  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
        canSend: true,
      timestampStart: new Date().getFullYear()+"/01/01",
      timestampEnd: new Date().toLocaleDateString(),
      queryLimit: 1,
      maxCount: 100
    };

    this.GetIt = this.GetIt.bind(this)
    this.makeRequests = this.makeRequests.bind(this)
    this.handleTime = this.handleTime.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  GetIt(handle, stateName, queue, addToken = false) {
    let headerBuilder = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (addToken) {
      headerBuilder['Auth-Token'] = this.props.token
    }
    fetch(handle, {
      method: 'GET',
      headers: headerBuilder
    }).then(
        response => response.json()
    ).then(
        data => this.setState({[stateName]:data})
    ).then(
      data => (this.state.queryLimit !== queue) ? this.makeRequests(++queue) : null
    )
  }

  componentDidMount() {
    this.makeRequests(1)
  }

  makeRequests(x) {
    //this.GetIt("https://bank-api.azurewebsites.net/query?table=Exchange&count=20", true)
    switch(x) {
        case 1:
            this.GetIt(`${this.props.serverURL}/view-transactions-data?timestampStart=${this.state.timestampStart}&timestampEnd=${this.state.timestampEnd}&count=${this.state.maxCount}`, "c1" , 1 , true)
        break
        default:
        break
    }
}
  handleRefresh() {
      this.makeRequests(1);
  } 
  handleTime(value, name) {
    this.setState({[name]:value.toLocaleDateString()})
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
      let tables = {}
      if (this.state.c1 !== undefined && this.state.c1.count > 0) {
        tables.c1 = <div style={{ height: 400, width: '100%'}}>
            <FormLabel component="legend" style={{marginBottom: "10px"}}>Транзакции за указанный период:</FormLabel>
            <DataGrid rows={
            this.state.c1.data.map( row => {
                return {
                    'id':row.TransactionId,
                    'SourceAccountId': (row.SourceAccountId.toUpperCase() === "NULL") ? "Наличные" : row.SourceAccountId,
                    'TransferAccountId': (row.TransferAccountId.toUpperCase() === "NULL") ? "На Руки" : row.TransferAccountId, 
                    'Total': row.Total,
                    'Currency': row.Currency, 
                    'Status': (row.Status === "1" ? "исполнено":(row.Status === "-1") ? "отклонено" : "в обработке"), 
                    'AuthorisedWorkerId': (row.AuthorisedWorkerId.toUpperCase() === "NULL") ? "Онлайн Банк" : row.AuthorisedWorkerId,
                    'Timestamp': new Date(row.Timestamp).toLocaleString('ru-RU', { timeZone: 'UTC' }) 
                }
            })
        } columns={
            [
                { field: 'id', headerName: 'ID Транзакции',  flex: 1},
                { field: 'SourceAccountId', headerName: 'Счет Списания',  flex: 1},
                { field: 'TransferAccountId', headerName: 'Счет Зачисления',  flex: 1},
                { field: 'Total', headerName: 'Сумма', flex: 1},
                { field: 'Currency', headerName: 'Валюта', flex: 0.6},
                { field: 'Status', headerName: 'Статус', flex: 0.8},
                { field: 'AuthorisedWorkerId', headerName: 'ID Оператора', flex: 1},
                { field: 'Timestamp', headerName: 'Метка Времени', flex: 1.6},
                { flex: 0.1}
            ]
        } pageSize={5}/></div>
      } else {
        tables.c1 = <DataGridPlaceholder height={400} msg={`Нет данных 😥`}/>
    }
    return (
      <div className="AdminViewTransactions ">
        <div style = {{display: "flex", marginLeft: "10%", marginRight: "10%", marginTop: "10px"}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} style = {{width: "100%"}}>
            <KeyboardDatePicker
            style = {{flex: 2}}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Начало пероида"
            value={this.state.timestampStart}
            onChange={(v) => this.handleTime(v, "timestampStart")}
            KeyboardButtonProps={{'aria-label': 'change date'}}
            />
            <KeyboardDatePicker
            style = {{flex: 2}}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Конец пероида"
            value={this.state.timestampEnd}
            onChange={(v) => this.handleTime(v, "timestampEnd")}
            KeyboardButtonProps={{'aria-label': 'change date'}}
            />
            <TextField 
                style = {{flex: 1, marginTop: "16px", marginBottom: "8px"}}
                label="Количество"
                error= {!Number.isInteger(+this.state.maxCount)}
                variant="standard"
                name = "maxCount"
                value = {this.state.maxCount}
                onChange = {this.changeHandler}
            />
            <Button 
                style = {{flex: 1, marginLeft: "10px" ,marginTop: "16px", marginBottom: "8px"}}
                variant="contained"
                color="primary"
                onClick={this.handleRefresh}>
                    Обновить
            </Button>
            </MuiPickersUtilsProvider>
          </div>
        <div style = {{marginLeft: "10%", marginRight: "10%", marginTop: "10px"}}>
            {tables.c1}
        </div>                   
      </div>
    );
  }
}
export default AdminViewTransactions;