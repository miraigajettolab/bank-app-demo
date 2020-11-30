import React from 'react';
import ClientAppBar from './ClientAppBar'
import ClientManageTransactions from './ClientManageTransactions'

class Client extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      activeSubPanel: "ClientManageTransactions",
      SourceAccountId: "",
      TransferAccountId: "",
      Currency: "RUB",
    };
    this.GetIt = this.GetIt.bind(this)
    this.go = this.go.bind(this)
  }

  GetIt(handle, addToken = false) {
    console.log(`Making a GET request to ${handle}`)
    
    let headerBuilder = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (addToken) {
      headerBuilder['Auth-Token'] = this.state.token
    }
    fetch(handle, {
      method: 'GET',
      headers: headerBuilder
    }).then(response => response.json()).then(data => this.setState({"GetResponse":data}))
  }

  go(event) {
    console.log(event)
    const id = event.target.id
    this.setState({activeSubPanel:id})
  }

  componentDidMount() {
    //this.GetIt("https://bank-api.azurewebsites.net/query?table=Exchange&count=20", true)
    //this.GetIt(`http://localhost:5000/complex/1?timestampStart=${this.state.timestampStart}&timestampEnd=${this.state.timestampEnd}`, true)
    //this.GetIt(`http://localhost:5000/complex/2?day=${this.state.bd.day}&month=${this.state.bd.month}`, true)
    //this.GetIt(`http://localhost:5000/complex/3`, true)
  }

  render() {
    let subPanel
    switch(this.state.activeSubPanel) {
        case "ClientManageTransactions":
          subPanel = 
          <ClientManageTransactions 
              serverURL = {this.props.serverURL} //passing the props from app.js
              token = {this.props.token}
              SourceAccountId = {this.state.SourceAccountId}
              TransferAccountId = {this.state.TransferAccountId}
              Currency = {this.state.Currency}
          />
        break
        default:
        break
    }

    return (
      <div className="Client">
        <ClientAppBar logout = {this.props.logout} go={this.go}/>
        {subPanel}
      </div>
    );
  }
}

export default Client;
