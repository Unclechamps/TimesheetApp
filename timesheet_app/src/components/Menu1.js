
import React, {Component} from 'react'
import '../index.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import * as actionCreators from '../store/actionCreators'

class Menu1 extends Component {

render() {

  return (
    <div className="menu">
      <p className="logo">Timekeeper</p>
      <div className="links">
        <div><Link to = "/">Home</Link></div>
        <div><Link to ="/sign-up">Sign Up</Link></div>
        <div><Link to ="/sign-in">Sign In</Link></div>
        <div><Link to ="/dashboard">Dashboard</Link></div>
        <div><Link to = "/contact-us">Contact Us</Link></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu1)
