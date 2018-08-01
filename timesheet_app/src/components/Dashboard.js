import React, {Component} from 'react'
import '../index.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'

import * as actionCreators from '../store/actionCreators'

const cookies = new Cookies()

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.props.authUser()
  }

  render(){

    var user = cookies.get("user")
    var user_token = cookies.get("user_token")

    if(!user || !user_token){
      this.props.history.replace("/sign-in")
    }

    return(
      <div className="dashboard">
        <h1>Welcome</h1>
        <p>This is your Timekeeper dashboard. In here you will be able to keep track of your clients, hours, billings, and many other things. The important thing is that this is your stress free stop for your freelancer needs.</p>
        <div className="dashOptions">
          <button><Link to='/clients'>Clients</Link></button>
          <button><Link to='/projects'>Projects</Link></button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    users : state.users,
    loggedInUser: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authUser : () => dispatch(actionCreators.authenticateUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
