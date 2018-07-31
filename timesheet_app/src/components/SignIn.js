
import React, {Component} from 'react'
import '../index.css'
import {connect} from 'react-redux'
import SignInError from './SignInError'

import * as actionCreators from '../store/actionCreators'

class SignIn extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user : {}
    }
  }

  handleTextChange = (e) => {
    this.setState({
      user : {
        ...this.state.user,
        [e.target.name] : e.target.value
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }
  }

  render() {
    return(

      <div>
      <h1 className="siTitle">Sign In</h1>
      <div className = "signInForm">
      <div>
        <label>Email: </label>
        <input type="text" id="email"  onChange={this.handleTextChange} name="email" placeholder="your@email.com" autoComplete="new-password" required />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" id="password"  onChange={this.handleTextChange} name="password" placeholder="password" autoComplete="new-password" required />
      </div>
        <button onClick={() => this.props.onSignIn(this.state.user)}>Sign In</button>
      </div>
      <div>
        <SignInError />
      </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    users : state.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn : (user) => dispatch(actionCreators.onSignInUsingThunk(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
