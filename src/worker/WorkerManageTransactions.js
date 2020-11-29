import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import { DataGrid } from '@material-ui/data-grid';
import DataGridPlaceholder from "../util/DataGridPlaceholder"
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//PROPS: serverURL, token

class WorkerManageTransactions  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            Total : "",

    };
    this.changeHandler = this.changeHandler.bind(this)
    this.processAddTransaction = this.processAddTransaction.bind(this)
  }

  processAddTransaction(){

  }

/*
  processFindWorker(){
    fetch(`${this.props.serverURL}/find-worker?WorkerId=${this.state.WorkerId}&FullName=${this.state.FullName}`, 
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
*/
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
        <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
        <FormControl fullWidth="true"  style={{flex: 4, marginRight: "10px"}}>
          <TextField 
            label="Сумма"
            variant="outlined"
            name = "Total"
            value = {this.state.Total}
            onChange = {this.changeHandler}
          />
        </FormControl>
        <FormControl fullWidth="true"  style={{flex: 4}}>
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