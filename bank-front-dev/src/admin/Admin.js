import React from 'react';
import AdminComplex from './AdminComplex'
import AdminAppBar from './AdminAppBar'
import AdminManageWorkers from './AdminManageWorkers'
import AdminManageServices from './AdminManageServices'
import ViewServices from '../util/ViewServices'
import AdminViewTransactions from './AdminViewTransactions'

class Admin  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
            activeSubPanel : "AdminManageWorkers"
        };

    this.changeHandler = this.changeHandler.bind(this)
    this.go = this.go.bind(this)
  }

  go(event) {
      console.log(event)
      const id = event.target.id
      this.setState({activeSubPanel:id})
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
      //console.log(this.state)
    let subPanel
    switch(this.state.activeSubPanel) {
        case "AdminComplex":
            subPanel = 
            <AdminComplex 
                serverURL = {this.props.serverURL} //passing the props from app.js
                token = {this.props.token}
            />
        break
        case "AdminManageWorkers":
            subPanel = 
            <AdminManageWorkers 
                serverURL = {this.props.serverURL} //passing the props from app.js
                token = {this.props.token}
            />
        break
        case "AdminManageServices":
          subPanel = 
          <AdminManageServices 
              serverURL = {this.props.serverURL} //passing the props from app.js
              token = {this.props.token}
          />
        break
        case "ViewServices":
          subPanel = 
          <ViewServices 
              serverURL = {this.props.serverURL} //passing the props from app.js
              token = {this.props.token}
          />
        break
        case "AdminViewTransactions":
          subPanel = 
          <AdminViewTransactions 
              serverURL = {this.props.serverURL} //passing the props from app.js
              token = {this.props.token}
          />
        break
        default:
        break
    }
      
    return (
      <div className="Admin">
        <AdminAppBar logout = {this.props.logout} go={this.go}/>
        {subPanel}
      </div>
    );
  }
}
export default Admin;