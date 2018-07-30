
import React, {Component} from 'react'
import '../index.css'
import {connect} from 'react-redux'

import * as actionCreators from '../store/actionCreators'

class SignUp extends Component {

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

  render() {
    return(

      <div>
      <h1 className="suTitle">Sign Up</h1>
      <div className = "signUpForm">
      <div>
        <label>First Name: </label>
        <input type="text" id="firstName" onChange={this.handleTextChange} name="firstName" placeholder="e.g. John" required />
      </div>
      <div>
        <label>Last Name: </label>
        <input type="text" id="lastName"  onChange={this.handleTextChange} name="lastName" placeholder="e.g. Lennon" required />
      </div>
      <div>
        <label>Email: </label>
        <input type="text" id="email"  onChange={this.handleTextChange} name="email" placeholder="your@email.com" autocomplete="new-password" required />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" id="password"  onChange={this.handleTextChange} name="password" placeholder="password" autocomplete="new-password" required />
      </div>
        <button onClick={() => this.props.onAddUser(this.state.user)}>Sign Up</button>
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
    onAddUser : (user) => dispatch(actionCreators.onAddUserUsingThunk(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
