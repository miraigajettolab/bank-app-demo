import React from 'react';
import AdminComple from './AdminComplex'

class Admin  extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
    };

    this.changeHandler = this.changeHandler.bind(this)
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
      
    return (
      <div className="Admin ">
        <AdminComple 
          serverURL = {this.props.serverURL} //passing the props from app.js
          token = {this.props.token}
        />
      </div>
    );
  }
}
export default Admin;