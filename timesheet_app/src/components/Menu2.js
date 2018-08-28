
import React, {Component} from 'react'
import '../index.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import '../queries.css'

import * as actionCreators from '../store/actionCreators'

class Menu2 extends Component {

render() {

  return (
    <div className="menuOverall">
      <div className="logo">
        <p>Timekeeper</p>
      </div>
      <div className="nav">
        <label htmlFor="toggle">&#9776;</label>
        <input type='checkbox' id="toggle" />
        <div className="links" id="menuIcon">
          <div><Link to = "/">Home</Link></div>
          <div><Link to ="/dashboard">Dashboard</Link></div>
          <div><Link to = "/clients">Clients</Link></div>
          <div><Link to = "/projects">Projects</Link></div>
          <div><Link to ="/sign-in" onClick={() => this.props.onLogOut()}>Log Out</Link></div>
      </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users : state.users,
    user : state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut : (user) => dispatch(actionCreators.onLogOutUsingThunk(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu2)
