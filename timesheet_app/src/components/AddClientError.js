
import React, {Component} from 'react'
import '../index.css'
import {connect} from 'react-redux'
import '../queries.css'

import * as actionCreators from '../store/actionCreators'

class AddClientError extends Component {


  componentDidMount() {

    this.props.onPopulateClientErrors()

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
            <p>{errors.name}</p>
            <p>{errors.contact}</p>
            <p>{errors.email}</p>
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
    onPopulateClientErrors: () => dispatch(actionCreators.displayClientErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClientError)
