//add stuff from WorkerAddClient.js
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';

//PROPS: serverURL, token

class WorkerModifyClient  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      PassportNumber: this.props.PassportNumber,
      FullName: this.props.FullName,
      BirthDate: this.props.BirthDate,
      TaxId: this.props.TaxId,
      TelephoneNumber: this.props.TelephoneNumber,
      IncomePerMonth: this.props.IncomePerMonth,
      ClientId: this.props.ClientId,
      showAlert: true,
      alertMsg: "Изменение данных клиента",
      alertSeverity: "info",
    };

    this.changeHandler = this.changeHandler.bind(this)
    this.handleTime = this.handleTime.bind(this)
    this.processUpdateClient = this.processUpdateClient.bind(this)
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

  handleTime(value, name) {
    this.setState({[name]: (value != null) ? value.toLocaleDateString(): null})
  }
  
  processUpdateClient(){
    this.setState({ // reseting alerts
      showAlert:false, 
      alertMsg: "-", 
      alertSeverity: ""
    })
    fetch(this.props.serverURL + `/alter-client?PassportNumber=${this.state.PassportNumber}&FullName=${this.state.FullName}&BirthDate=${this.state.BirthDate}&TaxId=${this.state.TaxId}&TelephoneNumber=${this.state.TelephoneNumber}&IncomePerMonth=${this.state.IncomePerMonth}&ClientId=${this.state.ClientId}`, 
      {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': this.props.token
      }
    })
    .then(response => response.json())
    .then(data => (data.error !== undefined) 
      ? this.setState({
        showAlert:true,  // well if we got this error then the check failed, so we set the alert and do nothing
        alertMsg: data.error, 
        alertSeverity: "error" 
      })
      : 
        this.setState({
            showAlert:true,  // well if we got this error then the check failed, so we set the alert and do nothing
            alertMsg: "Обновление произошло успешно ✨", 
            alertSeverity: "success" 
        })
         //it will swap update for add
    )
  }

  componentDidUpdate(prevProps) {
    if(prevProps.ClientId !== this.props.ClientId) {
      this.setState({ PassportNumber: this.props.PassportNumber,
        FullName: this.props.FullName,
        BirthDate: this.props.BirthDate,
        TaxId: this.props.TaxId,
        TelephoneNumber: this.props.TelephoneNumber,
        IncomePerMonth: this.props.IncomePerMonth,
        ClientId: this.props.ClientId,
        showAlert: true,
        alertMsg: "Изменение данных клиента",
        alertSeverity: "info"});
    }
  }

  render() { 
    console.log(this.state.BirthDate)
    if(this.state.alertSeverity === "success"){
        this.props.processUpdateToAdd(1600)
    }
    return (
      <div className="WorkerModifyClient" >
      <Alert 
        style={{marginBottom: "10px", visibility: this.state.showAlert ? "visible": "hidden"}} 
        elevation={6} 
        variant="filled" 
        severity={this.state.alertSeverity}>{this.state.alertMsg}
      </Alert>
      <FormControl fullWidth="true">    
      <TextField 
            style={{marginBottom: "10px"}}
            label="Id клиента"
            variant="outlined"
            name = "ClientId"
            disabled
            value = {this.state.ClientId}
          />
          <TextField 
            style={{marginBottom: "10px"}}
            label="Номер паспорта"
            variant="outlined"
            name = "PassportNumber"
            value = {this.state.PassportNumber}
            onChange = {this.changeHandler}
          />
          <TextField 
            label="ФИО"
            variant="outlined"
            name = "FullName"
            value = {this.state.FullName}
            onChange = {this.changeHandler}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="День Рождения"
              value={this.state.BirthDate}
              onChange={(v) => this.handleTime(v, "BirthDate")}
              KeyboardButtonProps={{'aria-label': 'change date'}}
            />
          </MuiPickersUtilsProvider>
          <TextField 
            style={{marginBottom: "10px"}}
            label="ИНН"
            variant="outlined"
            name = "TaxId"
            value = {this.state.TaxId}
            onChange = {this.changeHandler}
          />
          <TextField 
            style={{marginBottom: "10px"}}
            label="Номер телефона"
            variant="outlined"
            name = "TelephoneNumber"
            value = {this.state.TelephoneNumber}
            onChange = {this.changeHandler}
          />
        <TextField 
            style={{marginBottom: "10px"}}
            label="Доход в месяц"
            variant="outlined"
            name = "IncomePerMonth"
            value = {this.state.IncomePerMonth}
            onChange = {this.changeHandler}
          />
          <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
            <Button 
                style = {{flex: 4, marginBottom: "10px", marginRight: "5px"}}
                variant="contained"
                color="secondary"
                onClick={this.props.processUpdateToAdd}>
                Отмена
            </Button>
            <Button 
                style = {{flex: 4, marginBottom: "10px", marginLeft: "5px"}}
                variant="contained"
                color="primary"
                onClick={this.processUpdateClient}>
                Обновить
            </Button>
          </div>        
        </FormControl>
      </div>
    );
  }
}
export default WorkerModifyClient;