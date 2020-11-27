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

class AdminComplex  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
        canSend: true,
      timestampStart: new Date().getFullYear()+"/01/01",
      timestampEnd: new Date().toLocaleDateString(),
      bd : {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1 //January is 0
      },
      currency: "RUB",
      customQuery: "",
      queryLimit: 8,
      maxCount: 10
    };

    this.GetIt = this.GetIt.bind(this)
    this.makeRequests = this.makeRequests.bind(this)
    this.handleTime = this.handleTime.bind(this)
    this.handleBD = this.handleBD.bind(this)
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
            this.GetIt(`${this.props.serverURL}/complex/8?timestampStart=${this.state.timestampStart}&timestampEnd=${this.state.timestampEnd}&currency=${this.state.currency}`, "c8" , 1 , true)
        break
        case 2:
            this.GetIt(`${this.props.serverURL}/complex/3?timestampStart=${this.state.timestampStart}&timestampEnd=${this.state.timestampEnd}&currency=${this.state.currency}&count=${this.state.maxCount}`, "c3", 2 , true)
        break
        case 3:
            this.GetIt(`${this.props.serverURL}/complex/5`, "c5", 3 , true)
        break
        case 4:
            this.GetIt(`${this.props.serverURL}/complex/6`, "c6", 4 , true)
        break
        case 5:
            this.GetIt(`${this.props.serverURL}/complex/4?timestampStart=${this.state.timestampStart}&timestampEnd=${this.state.timestampEnd}&count=${this.state.maxCount}`, "c4", 5 , true)
        break
        case 6:
            this.GetIt(`${this.props.serverURL}/complex/7?count=${this.state.maxCount}`, "c7", 6 , true)
        break
        case 7:
            this.GetIt(`${this.props.serverURL}/complex/1?timestampStart=${this.state.timestampStart}&timestampEnd=${this.state.timestampEnd}&count=${this.state.maxCount}`, "c1" , 7 , true)
        break
        case 8:
            this.GetIt(`${this.props.serverURL}/complex/2?day=${this.state.bd.day}&month=${this.state.bd.month}&count=${this.state.maxCount}`, "c2", 8, true)
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

  handleBD(value){
    this.setState({bd:{day: value.getDate(), month: value.getMonth()+1}})
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
            <FormLabel component="legend" style={{marginBottom: "10px"}}>Не совершали транзакций в этот период:</FormLabel>
            <DataGrid rows={
            this.state.c1.data.map( row => {
                return {'id':row.ClientId, 'TelephoneNumber': row.TelephoneNumber, 'FullName': row.FullName }
            })
        } columns={
            [
                { field: 'id', headerName: 'ID',  flex: 0.5},
                { field: 'FullName', headerName: 'ФИО', flex: 1},
                { field: 'TelephoneNumber', headerName: 'Телефон', flex: 1},
                { flex: 0.1}
            ]
        } pageSize={5}/></div>
      } else {
        tables.c1 = <DataGridPlaceholder msg={`Нет данных 🤕`}/>
      }
      if (this.state.c2 !== undefined && this.state.c2.count > 0) {
        tables.c2 = <div style={{ height: 400, width: '100%'}}>
            <FormLabel component="legend" style={{marginBottom: "10px"}}>{`День рождения ${this.state.bd.month}/${this.state.bd.day}`}:</FormLabel>
            <DataGrid rows={
            this.state.c2.data.map( row => {
                return {'id':row.ClientId, 'TelephoneNumber': row.TelephoneNumber, 'FullName': row.FullName }
            })
        } columns={
            [
                { field: 'id', headerName: 'ID',  flex: 0.5},
                { field: 'FullName', headerName: 'ФИО', flex: 1},
                { field: 'TelephoneNumber', headerName: 'Телефон', flex: 1},
                { flex: 0.1}
            ]
        } pageSize={5}/></div>
      }  else {
        tables.c2 = <DataGridPlaceholder msg={`Нет данных 🙈`}/>
      }
      if (this.state.c3 !== undefined && this.state.c3.count > 0) {
        tables.c3 = <div style={{ height: 400, width: '100%'}}>
            <FormLabel component="legend" style={{marginBottom: "10px"}}>{`Транзакции больше 600тыс. рублей за этот период`}:</FormLabel>
            <DataGrid rows={
            this.state.c3.data.map( row => {
                return {
                    'id':row.TransactionId, 
                    'Total': row.Total, 
                    'Status': (row.Status === "1" ? "исполнено":(row.Status === "-1") ? "отклонено" : "в обработке"), 
                    'Timestamp': new Date(row.Timestamp).toLocaleString('ru-RU', { timeZone: 'UTC' }) 
                }
            })
        } columns={
            [
                { field: 'id', headerName: 'ID Транзакции',  flex: 1},
                { field: 'Total', headerName: 'Сумма', flex: 1},
                { field: 'Status', headerName: 'Статус', flex: 1},
                { field: 'Timestamp', headerName: 'Метка Времени', flex: 1},
                { flex: 0.1}
            ]
        } pageSize={5}/></div>
      } else {
        tables.c3 = <DataGridPlaceholder msg={`Нет данных 😥`}/>
    }
      if (this.state.c4 !== undefined && this.state.c4.count > 0) {
        tables.c4 = <div style={{ height: 400, width: '100%'}}>
            <FormLabel component="legend" style={{marginBottom: "10px"}}>{`Топ операторов по транзакциям`}:</FormLabel>
            <DataGrid rows={
            this.state.c4.data.map( row => {
                return {
                    'id':row.AuthorisedWorkerId, 
                    'FullName': row.FullName, 
                    'Count': row.Count, 
                }
            })
        } columns={
            [
                { field: 'id', headerName: 'ID Оператора',  flex: 1},
                { field: 'FullName', headerName: 'ФИО', flex: 1},
                { field: 'Count', headerName: 'Количество', flex: 1},
                { flex: 0.1}
            ]
        } pageSize={5}/></div>
      } else {
        tables.c4 = <DataGridPlaceholder msg={`Нет данных 💔`}/>
      }
      if ((this.state.c5 !== undefined) && (this.state.c6 !== undefined)) {
        tables.c56 = <div style={{ height: 400, width: '100%'}}>
            <FormLabel component="legend" style={{marginBottom: "10px"}}>{`Сумма начисленных процентов:`}</FormLabel>
            <DataGrid rows={[
            {'id': "RUB" ,'loanInterest': this.state.c5.data[0].Sum,'depositInterest': this.state.c6.data[0].Sum},
            {'id': "JPY" ,'loanInterest': this.state.c5.data[1].Sum,'depositInterest': this.state.c6.data[1].Sum},
            {'id': "USD" ,'loanInterest': this.state.c5.data[2].Sum,'depositInterest': this.state.c6.data[2].Sum},
            {'id': "EUR" ,'loanInterest': this.state.c5.data[3].Sum,'depositInterest': this.state.c6.data[3].Sum},
            {'id': "CNY" ,'loanInterest': this.state.c5.data[4].Sum,'depositInterest': this.state.c6.data[4].Sum}
            ]}
            columns={
            [
                { field: 'id', headerName: 'Валюта',  flex: 0.6},
                { field: 'loanInterest', headerName: 'По кредитам', flex: 1},
                { field: 'depositInterest', headerName: 'По вкладам', flex: 1},
                { flex: 0.1}
            ]
        } pageSize={5}/></div>
      }
      if (this.state.c7 !== undefined && this.state.c7.count > 0) {
        tables.c7 = <div style={{ height: 400, width: '100%'}}>
            <FormLabel component="legend" style={{marginBottom: "10px"}}>{`Популярные услуги:`}:</FormLabel>
            <DataGrid rows={
            this.state.c7.data.map( row => {
                return {
                    'id':row.ServiceId, 
                    'Count': row.Count, 
                    'IsDebit': (row.IsDebit === "false") ? "кредит" : "вклад",
                    'Currency': row.Currency,
                    'Interest': row.Interest,
                    'Months': row.Months + " мес.",
                    'RequiredIncome': (row.RequiredIncome > 0) ? row.RequiredIncome : "ー" 
                }
            })
        } columns={
            [
                { field: 'id', headerName: 'ID Услуги',  flex: 1},
                { field: 'Count', headerName: 'Количество', flex: 1.2},
                { field: 'IsDebit', headerName: 'Тип', flex: 1},
                { field: 'Currency', headerName: 'Валюта', flex: 1},
                { field: 'Interest', headerName: 'Ставка', flex: 1},
                { field: 'Months', headerName: 'Период', flex: 1},
                { field: 'RequiredIncome', headerName: 'Необх. доход', flex: 1.2},
                { flex: 0.1}
            ]
        } pageSize={5}/></div>
      } else {
        tables.c7 = <DataGridPlaceholder msg={`Нет данных 😣`}/>
      }
    return (
      <div className="AdminComplex ">
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
            <KeyboardDatePicker
            style = {{flex: 2}}
            disableToolbar
            variant="inline"
            format="MM/dd"
            margin="normal"
            id="date-picker-inline"
            label="День рождения"
            value={this.state.bd.month+"/"+this.state.bd.day+"/"+new Date().getFullYear()}
            onChange={(v) => this.handleBD(v)}
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
            <FormControl variant="standard" style={{marginTop: "16px", flex: 1}}>
                <InputLabel htmlFor="outlined-age-native-simple">Валюта:</InputLabel>
                <Select
                    native
                    value={this.state.currency}
                    onChange={this.changeHandler}
                    label="Валюта:"
                    name="currency"
                >
                    <option value={"RUB"}>RUB</option>
                    <option value={"JPY"}>JPY</option>
                    <option value={"USD"}>USD</option>
                    <option value={"EUR"}>EUR</option>
                    <option value={"CNY"}>CNY</option>
                </Select>
            </FormControl>
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
          {(this.state.c8 !== undefined && this.state.c8.count > 0) 
            ? <Typography 
                variant="h5" 
                style = {{marginBottom: "10px"}}
            >  
                {`Общий оборот транзакций с валютой ${this.state.c8.data[0].Currency} за указанный период времени : ${this.state.c8.data[0].Sum}`}
            </Typography> 
            : <div></div>
          }
          <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "40px"}}>
            <div
                style = {{width: "65%", marginRight: "5px"}} 
            >
                {tables.c3}
            </div>
            <div
                style = {{width: "35%", marginLeft: "5px"}}
            >
                {tables.c56}
            </div>
          </div>
          <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "40px"}}>
            <div
                style = {{width: "30%", marginRight: "5px"}} 
            >
                {tables.c4}
            </div>
            <div
                style = {{width: "70%", marginLeft: "5px"}}
            >
                {tables.c7}
            </div>
          </div>
          <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "40px"}}>
            <div
                style = {{width: "50%", marginRight: "5px"}} 
            >
                {tables.c1}
            </div>
            <div
                style = {{width: "50%", marginLeft: "5px"}}
            >
                {tables.c2}
            </div>
          </div>
        </div>                   
      </div>
    );
  }
}
export default AdminComplex;