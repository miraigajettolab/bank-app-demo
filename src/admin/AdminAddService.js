import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//PROPS: serverURL, token

class AdminAddService  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      Months: "",
      Interest: "",
      IsDebit: 1,
      LoanOverdueTerms: "",
      EarlyWithdrawalTerms: "",
      Currency: "RUB",
      RequiredIncome: "0.0",
      Description: "",
      showAlert: true,
      alertMsg: "Добавление услуги",
      alertSeverity: "info",
    };

    this.changeHandler = this.changeHandler.bind(this)
    this.processAddService = this.processAddService.bind(this)
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

  
  processAddService(){
    this.setState({ // reseting alerts
      showAlert:false, 
      alertMsg: "-", 
      alertSeverity: ""
    })
    fetch(this.props.serverURL + `/add-service?Months=${this.state.Months}&Interest=${this.state.Interest}&IsDebit=${this.state.IsDebit}&LoanOverdueTerms=${this.state.LoanOverdueTerms}&EarlyWithdrawalTerms=${this.state.EarlyWithdrawalTerms}&Currency=${this.state.Currency}&RequiredIncome=${this.state.RequiredIncome}&Description=${this.state.Description}`, 
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
        Months: "",
        Interest: "",
        IsDebit: 1,
        LoanOverdueTerms: "",
        EarlyWithdrawalTerms: "",
        Currency: "RUB",
        RequiredIncome: 0.0,
        Description: "",
      })
    )
  }

  render() { 
      //console.log(this.state)
      
    return (
      <div className="AdminAddService" >
      <Alert 
        style={{marginBottom: "10px", visibility: this.state.showAlert ? "visible": "hidden"}} 
        elevation={6} 
        variant="filled" 
        severity={this.state.alertSeverity}>{this.state.alertMsg}
      </Alert>
      <FormControl fullWidth="true">    
          <TextField 
            style={{marginBottom: "10px"}}
            label="Продолжительность в месяцах"
            variant="outlined"
            name = "Months"
            value = {this.state.Months}
            onChange = {this.changeHandler}
          />
          <TextField 
            label="Процентная Ставка"
            variant="outlined"
            name = "Interest"
            value = {this.state.Interest}
            onChange = {this.changeHandler}
          />
        <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "15px"}}>
            <FormControl variant="standard" style={{marginTop: "16px", marginRight: "20px", flex: 1}}>
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
            <FormControl variant="standard" style={{marginTop: "16px", marginLeft: "20px", flex: 1}}>
                <InputLabel htmlFor="outlined-age-native-simple">Тип:</InputLabel>
                <Select
                    native
                    value={this.state.IsDebit}
                    onChange={this.changeHandler}
                    label="Тип:"
                    name="IsDebit"
                >
                    <option value={"0"}>кредит</option>
                    <option value={"1"}>вклад</option>
                </Select>
            </FormControl>
        </div>
          {this.state.IsDebit === "0" ? 
          <TextField 
            style={{marginBottom: "10px"}}
            label="Условия просрочки"
            variant="outlined"
            name = "LoanOverdueTerms"
            value = {this.state.LoanOverdueTerms}
            onChange = {this.changeHandler}
          />
          : <TextField 
            style={{marginBottom: "10px"}}
            label="Условия досрочного снятия средств"
            variant="outlined"
            name = "EarlyWithdrawalTerms"
            value = {this.state.EarlyWithdrawalTerms}
            onChange = {this.changeHandler}
          />
          }
          {this.state.IsDebit === "0" ? 
            <TextField 
            style={{marginBottom: "10px"}}
            label="Необходимый доход в месяц"
            variant="outlined"
            name = "RequiredIncome"
            value = {this.state.RequiredIncome}
            onChange = {this.changeHandler}
            />
            : 
            <div>
            </div>
          }
          <TextField 
            style={{marginBottom: "10px"}}
            label="Описание"
            variant="outlined"
            name = "Description"
            value = {this.state.Description}
            onChange = {this.changeHandler}
          />
          <Button 
            style = {{width: "100%", marginBottom: "10px"}}
            variant="contained"
            color="primary"
            onClick={this.processAddService}>
              Добавить
          </Button>         
        </FormControl>
      </div>
    );
  }
}
export default AdminAddService;