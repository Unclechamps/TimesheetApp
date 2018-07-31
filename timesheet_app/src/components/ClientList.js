
import React, {Component} from 'react'
import '../index.css'
import { connect } from 'react-redux'

import * as actionCreators from '../store/actionCreators'

class ClientList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

    this.props.onPopulateClientList()

  }

render() {
  console.log(this.props.user)
  let clients = this.props.clients.map((client,index) => {
    return (

      <div className='indClient' key={index}>
      <ul>
        <li className='eachClient'>
          <h3 className='clientName'>Client: {client.clientName}</h3>
          <p className='contact'>Contact: {client.contactName}</p>
          <p className='contactEmail'>Email: {client.email}</p>
          <p className='contactPhone'>Phone: {client.phoneNumber}</p>
          <input type='hidden' value={client.userID} name="userID" />
          <button>Add projects</button>
        </li>
      </ul>
      </div>
    )
  })

  return (
    <div className='clientList'>
      <h1>Current Clients: </h1>
      {clients}
    </div>
    );
  }
}

  const mapStateToProps = (state) => {
    return {
      clients : state.clients
    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      onPopulateClientList : () => dispatch(actionCreators.onPopulateClientListUsingThunk())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClientList)
