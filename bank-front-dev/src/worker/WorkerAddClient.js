import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';

//PROPS: serverURL, token

class WorkerAddClient  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      PassportNumber: "",
      FullName: "",
      BirthDate: new Date().toLocaleDateString(),
      TaxId: "",
      TelephoneNumber: "",
      IncomePerMonth: "",
      showAlert: true,
      alertMsg: "Добавление клиента",
      alertSeverity: "info",
    };

    this.changeHandler = this.changeHandler.bind(this)
    this.handleTime = this.handleTime.bind(this)
    this.processAddClient = this.processAddClient.bind(this)
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
  
  processAddClient(){
    this.setState({ // reseting alerts
      showAlert:false, 
      alertMsg: "-", 
      alertSeverity: ""
    })
    fetch(this.props.serverURL + `/add-client?PassportNumber=${this.state.PassportNumber}&FullName=${this.state.FullName}&BirthDate=${this.state.BirthDate}&TaxId=${this.state.TaxId}&TelephoneNumber=${this.state.TelephoneNumber}&IncomePerMonth=${this.state.IncomePerMonth}`, 
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
      : this.setState({
        showAlert:true,  // well if we got this error then the check failed, so we set the alert and do nothing
        alertMsg: "Успех 🎉", 
        alertSeverity: "success",
        PassportNumber: "",
        FullName: "",
        BirthDate: new Date().toLocaleDateString(),
        TaxId: "",
        TelephoneNumber: "",
        IncomePerMonth: ""
      })
    )
  }

  render() { 
      //console.log(this.state)
      
    return (
      <div className="WorkerAddClient" >
      <Alert 
        style={{marginBottom: "10px", visibility: this.state.showAlert ? "visible": "hidden"}} 
        elevation={6} 
        variant="filled" 
        severity={this.state.alertSeverity}>{this.state.alertMsg}
      </Alert>
      <FormControl fullWidth="true">    
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
          <Button 
            style = {{width: "100%", marginBottom: "10px"}}
            variant="contained"
            color="primary"
            onClick={this.processAddClient}>
              Добавить
          </Button>         
        </FormControl>
      </div>
    );
  }
}
export default WorkerAddClient;