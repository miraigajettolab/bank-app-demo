import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import DataGridPlaceholder from "../util/DataGridPlaceholder"

//TAKES ClientId and IsWorker AS PROPS

class ViewServices  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
        canSend: true,
        queryLimit: 1,
        maxCount: 100
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
            this.GetIt(`${this.props.serverURL}/view-services?count=${this.state.maxCount}`, "c1" , 1 , true)
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
      let tables = {}
      if (this.state.c1 !== undefined && this.state.c1.count > 0) {
        tables.c1 = <div style={{ height: 800, width: '100%'}}>
            <FormLabel component="legend" style={{marginBottom: "10px"}}>Услуги:</FormLabel>
            <DataGrid rows={
            this.state.c1.data.map( row => {
                return {
                  'id':row.ServiceId, 
                  'Months': row.Months, 
                  'Interest': row.Interest,
                  'IsDebit': (row.IsDebit === "false") ? "кредит" : "вклад",
                  'LoanOverdueTerms': (row.LoanOverdueTerms.toUpperCase() === "NULL") ? "N/A" : row.LoanOverdueTerms,
                  'EarlyWithdrawalTerms': (row.EarlyWithdrawalTerms.toUpperCase() === "NULL") ? "N/A" : row.EarlyWithdrawalTerms,
                  'Currency': row.Currency,
                  'RequiredIncome': row.RequiredIncome,
                  'Description': row.Description
                }
            })
        } columns={
            [
                { field: 'id', headerName: 'ID',  flex: 0.5},
                { field: 'Months', headerName: 'Срок в мес.',  flex: 1},
                { field: 'Interest', headerName: 'Ставка', flex: 0.7},
                { field: 'IsDebit', headerName: 'Тип', flex: 0.7},
                { field: 'LoanOverdueTerms', headerName: 'Условия Просрочки', flex: 1.4},
                { field: 'EarlyWithdrawalTerms', headerName: 'Условия Снятия', flex: 1.4},
                { field: 'Currency', headerName: 'Валюта', flex: 0.7},
                { field: 'RequiredIncome', headerName: 'Необх. Доход', flex: 1.4},
                { field: 'Description', headerName: 'Описание', flex: 2},
                { flex: 0.1}
            ]
        } pageSize={12}/></div>
      } else {
        tables.c1 = <DataGridPlaceholder height={600} msg={`Нет данных 🤕`}/>
      }
    return (
      <div className="ViewServices" style={{margin: "40px"}}>
        <div style = {{display: "flex"}}>
          <TextField 
                style = {{flex: 1.05, marginTop: "16px", marginBottom: "8px"}}
                label="Количество"
                error= {!Number.isInteger(+this.state.maxCount)}
                variant="standard"
                name = "maxCount"
                value = {this.state.maxCount}
                onChange = {this.changeHandler}
            />
            <Button 
                style = {{flex: 1, marginLeft: "40px" ,marginTop: "16px", marginBottom: "8px"}}
                variant="contained"
                color="primary"
                onClick={this.handleRefresh}>
                    Обновить
            </Button>
          </div>
        <div style = {{marginTop: "10px"}}>
          <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "40px"}}>
            {tables.c1}
          </div>
        </div>                   
      </div>
    );
  }
}
export default ViewServices;