import './App.css';
import React from 'react';

class Admin extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      timestampStart: new Date().getFullYear()+"/01/01",
      timestampEnd: new Date().toLocaleDateString(),
      bd : {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1 //January is 0
      },
      currency: "RUB",
      customQuery: "",
      token: "",
      GetResponse : {}
    };
    this.GetIt = this.GetIt.bind(this)
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

  componentDidMount() {
    //this.GetIt("https://bank-api.azurewebsites.net/query?table=Exchange&count=20", true)
    //this.GetIt(`http://localhost:5000/complex/1?timestampStart=${this.state.timestampStart}&timestampEnd=${this.state.timestampEnd}`, true)
    //this.GetIt(`http://localhost:5000/complex/2?day=${this.state.bd.day}&month=${this.state.bd.month}`, true)
    //this.GetIt(`http://localhost:5000/complex/3`, true)
    this.GetIt(`http://localhost:5000/complex/4?timestampStart=${this.state.timestampStart}&timestampEnd=${this.state.timestampEnd}`, true)
  }

  render() {
    return (
      <div className="Admin">
        <p>{JSON.stringify(this.state.GetResponse)}</p>
      </div>
    );
  }
}

export default Admin;
