
import React, {Component} from 'react'
import '../index.css'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import * as actionCreators from '../store/actionCreators'

class Menu extends Component {

  constructor(props) {
    super(props)

  }

render() {

  console.log(this.props)

  return (
    <div className="menu">
      <p className="logo">Timekeeper</p>
      <div className="links">
        <div><NavLink exact to = "/">Home</NavLink></div>
        <div><NavLink exact to ="/sign-up">Sign Up</NavLink></div>
        <div><NavLink exact to ="/sign-in">Sign In</NavLink></div>
        <div><NavLink exact to ="/dashboard">Dashboard</NavLink></div>
        <div><NavLink exact to = "/contact-us">Contact Us</NavLink></div>
        <div><NavLink exact to ="/sign-in" onClick={() => this.props.onLogOut()}>Log Out</NavLink></div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users : state.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut : (user) => dispatch(actionCreators.onLogOutUsingThunk(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
