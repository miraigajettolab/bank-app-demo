import './App.css';
import React from 'react';

import Login from './Login'



class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      token : null,
      login: "",
      password: "",
      accType: "admin",
      serverURL: "http://localhost:5000"
    };
    this.changeHandler = this.changeHandler.bind(this)
    this.storeToken = this.storeToken.bind(this)
  }

  changeHandler(event) {

    const name = event.target.name
    const value = event.target.value
    const type = event.target.type
    const checked = event.target.checked
    type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
  }

  storeToken(token) { //used by Login.js
    this.setState({"token":token})
  }


  componentDidMount() {
  }

  render() {
  return (this.state.token == null)? <Login changeHandler={this.changeHandler} login={this.state.login} password={this.state.password} accType={this.state.accType} serverURL={this.state.serverURL} storeToken={this.storeToken}/>:<h1>{this.state.token}</h1>
  }
}

export default App;
