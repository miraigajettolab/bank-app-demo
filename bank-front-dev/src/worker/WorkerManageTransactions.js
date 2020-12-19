import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import { DataGrid } from '@material-ui/data-grid';
import DataGridPlaceholder from "../util/DataGridPlaceholder"
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
//PROPS: serverURL, token

class WorkerManageTransactions  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      SourceAccountId: this.props.SourceAccountId,
      TransferAccountId: this.props.TransferAccountId,
      Total : "",
      Currency : this.props.Currency,
      showAlert: true,
      alertMsg: "Выполнение транзакции",
      alertSeverity: "info",
    };
    this.changeHandler = this.changeHandler.bind(this)
    this.processAddTransaction = this.processAddTransaction.bind(this)
  }

  processAddTransaction(){
    this.setState({ // reseting alerts
      showAlert:false, 
      alertMsg: "-", 
      alertSeverity: ""
    })
    fetch(this.props.serverURL + `/add-transaction?SourceAccountId=${this.state.SourceAccountId}&TransferAccountId=${this.state.TransferAccountId}&Total=${this.state.Total}&Currency=${this.state.Currency}`, 
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
        SourceAccountId: "",
        TransferAccountId: "",
        Total : "",
        Currency : "RUB",
      })
    )
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
    return (
      <div className="WorkerManageTransactions" >
        <div style = {{margin: "40px"}}>
        <Alert 
        style={{marginBottom: "10px", visibility: this.state.showAlert ? "visible": "hidden"}} 
        elevation={6} 
        variant="filled" 
        severity={this.state.alertSeverity}>{this.state.alertMsg}
        </Alert>
        <FormControl fullWidth="true"  style={{marginBottom: "10px"}}>
          <TextField 
            label="Со счета с номером:"
            variant="outlined"
            name = "SourceAccountId"
            value = {this.state.SourceAccountId}
            onChange = {this.changeHandler}
          />
        </FormControl>
        <FormControl fullWidth="true"  style={{marginBottom: "10px"}}>
          <TextField 
            label="На счет с номером:"
            variant="outlined"
            name = "TransferAccountId"
            value = {this.state.TransferAccountId}
            onChange = {this.changeHandler}
          />
        </FormControl>
        <FormControl fullWidth="true"  style={{marginBottom: "10px"}}>
          <TextField 
            label="Сумма:"
            variant="outlined"
            name = "Total"
            value = {this.state.Total}
            onChange = {this.changeHandler}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth="true" style={{marginBottom: "16px"}}>
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
        <FormControl fullWidth="true">
          <Button 
            style={{ height: "56px"}}
            variant="contained"
            color="primary"
            onClick={this.processAddTransaction}>
              Выполнить
          </Button>         
      </FormControl>
      </div>
      
      </div>
    );
  }
}
export default WorkerManageTransactions;