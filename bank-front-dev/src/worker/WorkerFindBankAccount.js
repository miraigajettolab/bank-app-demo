import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import { DataGrid } from '@material-ui/data-grid';
import DataGridPlaceholder from "../util/DataGridPlaceholder"

//PROPS: serverURL, token, filterSelect, ClientId

class WorkerFindBankAccount  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            ClientId: this.props.ClientId,
            res: {}
    };
    this.processFindBankAccount = this.processFindBankAccount.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.ClientId !== this.props.ClientId) {
      this.setState({
        ClientId: this.props.ClientId,
        res: {}
      });
      this.processFindBankAccount()
    }
  }

  processFindBankAccount(){
    setTimeout(fetch(`${this.props.serverURL}/find-bank-account?ClientId=${this.state.ClientId}`, 
      {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': this.props.token
      }
    })
    .then(response => response.json())
    .then(data => this.setState({"res":data})),500)
  }

  componentDidMount() {
    this.processFindBankAccount()
  }

  filterSelect(sel){
    let output = this.state.res.data.filter(row => {
      if (row.BankAccountId === sel){
        return row
      }
    })
    this.props.selectionHandler(output)
  }

  render() { 
    let table = {}
    if (this.state.res !== undefined && this.state.res.count > 0 && this.state.ClientId.length > 0) {
    table = <div style={{ height: 220, width: '100%', paddingBottom: "28px"}}>
        <FormLabel component="legend" style={{marginBottom: "10px"}}>Найденные счета:</FormLabel>
        <DataGrid rows={
        this.state.res.data.map( row => {
            return {
                'id':row.BankAccountId, 
                'IsDebit': row.IsDebit === "true" ? "вклад" : "кредит", 
                'Currency': row.Currency, 
                'ServiceId': row.ServiceId,
                'Total': row.Total, 
                'IsClosed': row.IsClosed === "true" ? "да" : "нет" 
            }
        })
    } columns={
        [
            { field: 'id', headerName: 'ID',  flex: 0.5},
            { field: 'IsDebit', headerName: 'Тип', flex: 0.6},
            { field: 'Currency', headerName: 'Валюта', flex: 0.7},
            { field: 'ServiceId', headerName: 'Id услуги', flex: 0.7},
            { field: 'Total', headerName: 'Сумма', flex: 1.4},
            { field: 'IsClosed', headerName: 'Блокировка', flex: 0.8},
            { flex: 0.1}
        ]
    } pageSize={2}
      onSelectionChange={(sel) => {this.filterSelect(sel.rowIds[0])}}
      /></div>
    } else {
    table = <DataGridPlaceholder height={220} msg={`Нет данных 😒`}/>
        if(this.state.ClientId.length > 0){
            this.processFindBankAccount()
        }
    }
    return (
      <div className="WorkerFindBankAccount" >
      {table}
      </div>
    );
  }
}
export default WorkerFindBankAccount;