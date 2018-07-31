
import React, {Component} from 'react'
import '../index.css'
import {connect} from 'react-redux'
import AddClientError from './AddClientError'
import ClientList from './ClientList'


import * as actionCreators from '../store/actionCreators'

class Client extends Component {

  constructor(props) {
    super(props)

    this.state = {
      client : {}
    }
  }

  handleTextChange = (e) => {
    this.setState({
      client : {
        ...this.state.client,
        [e.target.name] : e.target.value
      }
    })
  }


  render() {
    return(

      <div>
      <h1 className="clientTitle">Clients</h1>
      <h3 className="addClientTitle">Add New Clients</h3>
      <div className = "clientForm">
      <div>
        <label>Client Name: </label>
        <input type="text" id="name"  onChange={this.handleTextChange} name="name" placeholder="Client name" required />
      </div>
      <div>
        <label>Contact: </label>
        <input type="text" id="contact"  onChange={this.handleTextChange} name="contact" placeholder="Name of contact" required />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" id="email"  onChange={this.handleTextChange} name="email" placeholder="Email of contact" autoComplete="new-password" required />
      </div>
      <div>
        <label>Phone Number: </label>
        <input type="text" id="phone"  onChange={this.handleTextChange} name="phone" placeholder="Phone #" required />
      </div>
        <button onClick={() => this.props.onAddClient(this.state.client)}>Add Client</button>
      </div>
        <AddClientError />
      <div>
        <ClientList />
      </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    clients : state.clients,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClient : (client) => dispatch(actionCreators.onAddClientUsingThunk(client))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)
