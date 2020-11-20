import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      GetResponse : {}
    };
    this.GetIt = this.GetIt.bind(this)
  }

  GetIt(handle) {
    console.log(`Making a GET request to ${handle}`)
    fetch(handle, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()).then(data => this.setState({"GetResponse":data}))
  }

  componentDidMount() {
    this.GetIt("https://bank-api.azurewebsites.net/")
	}

  render() {
    return (
      <div className="App">
        <p>{JSON.stringify(this.state.GetResponse)}</p>
      </div>
    );
  }
}

export default App;
