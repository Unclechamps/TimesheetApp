
import React, {Component} from 'react'
import '../index.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import * as actionCreators from '../store/actionCreators'

class Menu2 extends Component {

render() {

  return (
    <div className="menu">
      <p className="logo">Timekeeper</p>
      <div className="links">
        <div><Link to = "/">Home</Link></div>
        <div><Link to ="/dashboard">Dashboard</Link></div>
        <div><Link to = "/clients">Clients</Link></div>
        <div><Link to = "/projects">Projects</Link></div>
        <div><Link to ="/sign-in" onClick={() => this.props.onLogOut()}>Log Out</Link></div>
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
