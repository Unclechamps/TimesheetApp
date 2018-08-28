
import React, {Component} from 'react'
import '../queries.css'
import '../index.css'
import {connect} from 'react-redux'

import * as actionCreators from '../store/actionCreators'

class SignInError extends Component {


  componentDidMount() {

    this.props.onPopulateErrors()

  }

  render() {

    let errors = this.props.errors

    if(errors === undefined) {
      return (
        <div></div>
      )
    } else {
      return(

        <div>
          <h3 className="errorSection">Errors</h3>
          <div className="errors">
            <p>{errors.email}</p>
            <p>{errors.password}</p>
          </div>
        </div>

      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    errors : state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPopulateErrors: () => dispatch(actionCreators.displayErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInError)
