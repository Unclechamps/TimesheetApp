
import React, {Component} from 'react'
import '../index.css'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'

import * as actionCreators from '../store/actionCreators'

const cookies = new Cookies()

class ClientList extends Component {
  constructor(props) {
    super(props)

    this.props.authUser()
    this.props.onPopulateClientList(this.props.loggedInUser)
  }

  componentWillReceiveProps(nextProps) {
     console.log(nextProps)
     // checks current props against incoming props. This method only runs when new props are coming in. (Sign-In)
    if(!this.props.loggedInUser && nextProps.loggedInUser) {
      this.props.onPopulateClientList(nextProps.loggedInUser)
    }
  }

render() {

  let clients = this.props.clients.map((client,index) => {

    let newParams = {
      pathname : `/projects/${client.clientName}/${client.id}`
    }
    return (

      <tr className= "eachClient" key={index}>
          <td className='clientName'>{client.clientName}</td>
          <td className='contact'>{client.contactName}</td>
          <td className='contactEmail'>{client.email}</td>
          <td className='contactPhone'>{client.phoneNumber}</td>
          <td><Link to={newParams}>Projects</Link></td>
      </tr>
    )
  })

  return (
    <div className='clientList'>
      <h1>Current Clients: </h1>
      <table className="clients">
      <thead>
        <tr className="tableHeader">
          <th>Client</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Add Project</th>
        </tr>
        </thead>
        <tbody>
            {clients}
        </tbody>
      </table>
    </div>
    );
  }
}

  const mapStateToProps = (state) => {
    return {
      clients : state.clients,
      loggedInUser : state.user
    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      onPopulateClientList : (user) => dispatch(actionCreators.onPopulateClientListUsingThunk(user)),
      authUser : () => dispatch(actionCreators.authenticateUser())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClientList)
