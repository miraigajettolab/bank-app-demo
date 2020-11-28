import './App.css';
import React from 'react';

import Login from './Login'
import Snack from './util/Snack'
import Admin from './admin/Admin'
import Worker from './worker/Worker'
import Client from './client/Client'

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
    this.logout = this.logout.bind(this)
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

  logout(){
    this.setState({"token":null})
  }


  componentDidMount() {
  }

  render() {
  return  <div>
    {(this.state.token == null) 
    ? <Login 
        changeHandler={this.changeHandler} 
        login={this.state.login} 
        password={this.state.password} 
        accType={this.state.accType} 
        serverURL={this.state.serverURL} 
        storeToken={this.storeToken}/> 
    :
      <div>
        <Snack msg = {`Добро пожаловать, ${this.state.login}`}/> 
        {(this.state.accType === "admin") 
        ? <Admin
            serverURL = {this.state.serverURL}
            token = {this.state.token}
            logout = {this.logout}
          /> 
        : (this.state.accType === "worker") 
          ? <Worker
              serverURL = {this.state.serverURL}
              token = {this.state.token}
              logout = {this.logout}
            /> 
          : <Client
              serverURL = {this.state.serverURL}
              token = {this.state.token}
              logout = {this.logout}
            />
        }
      </div>
    }
  </div>
  }
}

export default App;
