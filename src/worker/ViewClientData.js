import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DataGridPlaceholder from "../util/DataGridPlaceholder"

//TAKES ClientId and IsWorker AS PROPS

class ViewClientData  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
        canSend: true,
        ClientId: this.props.ClientId ? this.props.ClientId : "",
        IsWorker: this.props.IsWorker,
        queryLimit: 3,
        maxCount: 10
    };

    this.GetIt = this.GetIt.bind(this)
    this.makeRequests = this.makeRequests.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  
  componentDidUpdate(prevProps) {
    if(prevProps.ClientId !== this.props.ClientId) {
      this.setState({
        ClientId: this.props.ClientId,
      });
      this.makeRequests(1)
    }
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
            this.GetIt(`${this.props.serverURL}/view-client-data?ClientId=${this.state.ClientId}&IsWorker=${this.state.IsWorker}&count=${this.state.maxCount}`, "c1" , 1 , true)
        break
        case 2:
            this.GetIt(`${this.props.serverURL}/view-accounts-data?ClientId=${this.state.ClientId}&IsWorker=${this.state.IsWorker}&count=${this.state.maxCount}`, "c2", 2 , true)
        break
        case 3:
            this.GetIt(`${this.props.serverURL}/view-client-transactions-data?ClientId=${this.state.ClientId}&IsWorker=${this.state.IsWorker}&count=${this.state.maxCount}`, "c3", 3 , true)
        break
        default:
        break
    }
}
  handleRefresh() {
      this.makeRequests(1);
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
            <FormLabel component="legend" style={{marginBottom: "10px"}}>Данные:</FormLabel>
            <DataGrid rows={
            this.state.c1.data.map( row => {
                return {
                  'id':row.ClientId, 
                  'PassportNumber': row.PassportNumber, 
                  'FullName': row.FullName,
                  'BirthDate': row.BirthDate,
                  'TaxId': row.TaxId,
                  'TelephoneNumber': row.TelephoneNumber,
                  'IncomePerMonth': row.IncomePerMonth
                }
            })
        } columns={
            [
                { field: 'id', headerName: 'ID',  flex: 0.5},
                { field: 'PassportNumber', headerName: 'Номер Паспорта',  flex: 0.5},
                { field: 'FullName', headerName: 'ФИО', flex: 1},
                { field: 'BirthDate', headerName: 'Дата Рождения', flex: 1},
                { field: 'TaxId', headerName: 'ИНН', flex: 1},
                { field: 'TelephoneNumber', headerName: 'Телефон', flex: 1},
                { field: 'IncomePerMonth', headerName: 'Доход', flex: 1},
                { flex: 0.1}
            ]
        } pageSize={5}/></div>
      } else {
        tables.c1 = <DataGridPlaceholder height={400} msg={`Нет данных 🤕`}/>
      }
      if (this.state.c2 !== undefined && this.state.c2.count > 0) {
        tables.c2 = <div style={{ height: 400, width: '100%'}}>
            <FormLabel component="legend" style={{marginBottom: "10px"}}>Счета:</FormLabel>
            <DataGrid rows={
            this.state.c2.data.map( row => {
              return {
                'id':row.BankAccountId, 
                'IsDebit': (row.IsDebit === "false") ? "кредит" : "вклад",
                'ServiceId': row.ServiceId,
                'Total': row.Total,
                'DateOfCreation': row.DateOfCreation,
                'Currency': row.Currency,
                'AccumulatedInterest': row.AccumulatedInterest,
                'IsClosed': (row.IsClosed === "false") ? "нет" : "да"
              }
            })
        } columns={
            [
              { field: 'id', headerName: 'ID',  flex: 0.5},
              { field: 'IsDebit', headerName: 'Тип',  flex: 0.5},
              { field: 'ServiceId', headerName: 'ID Услуги', flex: 1},
              { field: 'Total', headerName: 'Сумма', flex: 1},
              { field: 'DateOfCreation', headerName: 'Дата Открытия', flex: 1},
              { field: 'Currency', headerName: 'Валюта', flex: 1},
              { field: 'AccumulatedInterest', headerName: 'Проценты', flex: 1},
              { field: 'IsClosed', headerName: 'Закрыт?', flex: 1},
              { flex: 0.1}
            ]
        } pageSize={5}/></div>
      }  else {
        tables.c2 = <DataGridPlaceholder height={400} msg={`Нет данных 🙈`}/>
      }
      if (this.state.c3 !== undefined && this.state.c3.count > 0) {
        tables.c3 = <div style={{ height: 400, width: '100%'}}>
            <FormLabel component="legend" style={{marginBottom: "10px"}}>Транзакции:</FormLabel>
            <DataGrid rows={
            this.state.c3.data.map( row => {
                return {
                    'id':row.TransactionId,
                    'SourceAccountId': row.SourceAccountId,
                    'TransferAccountId': row.TransferAccountId, 
                    'Total': row.Total,
                    'Currency': row.Currency, 
                    'Status': (row.Status === "1" ? "исполнено":(row.Status === "-1") ? "отклонено" : "в обработке"), 
                    'Timestamp': new Date(row.Timestamp).toLocaleString('ru-RU', { timeZone: 'UTC' }) 
                }
            })
        } columns={
            [
                { field: 'id', headerName: 'ID Транзакции',  flex: 1},
                { field: 'SourceAccountId', headerName: 'Счет Списания',  flex: 1},
                { field: 'TransferAccountId', headerName: 'Счет Начисления',  flex: 1},
                { field: 'Total', headerName: 'Сумма', flex: 1},
                { field: 'Currency', headerName: 'Валюта', flex: 1},
                { field: 'Status', headerName: 'Статус', flex: 1},
                { field: 'Timestamp', headerName: 'Метка Времени', flex: 1},
                { flex: 0.1}
            ]
        } pageSize={5}/></div>
      } else {
        tables.c3 = <DataGridPlaceholder height={400} msg={`Нет данных 😥`}/>
    }
    return (
      <div className="ViewClientData ">
        <div style = {{display: "flex", marginLeft: "10%", marginRight: "10%", marginTop: "10px"}}>
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
          </div>
        <div style = {{marginLeft: "10%", marginRight: "10%", marginTop: "10px"}}>
          <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "40px"}}>
            {tables.c1}
          </div>
          <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "40px"}}>
            {tables.c2}
          </div>
          <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "40px"}}>
            {tables.c3}
          </div>
        </div>                   
      </div>
    );
  }
}
export default ViewClientData;