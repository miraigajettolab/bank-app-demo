import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      GetResponse : {},
      token: "baeb8c102e7004b1fd8e44d7659bb0bc991e9db9235ca10a77405f2bdfcec78d"
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
    console.log(headerBuilder)
    fetch(handle, {
      method: 'GET',
      headers: headerBuilder
    }).then(response => response.json()).then(data => this.setState({"GetResponse":data}))
  }

  componentDidMount() {
    //this.GetIt("https://bank-api.azurewebsites.net/query?table=Exchange&count=20", true)
    this.GetIt("http://localhost:5000/exchange", true)
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
