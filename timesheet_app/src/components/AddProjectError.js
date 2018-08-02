
import React, {Component} from 'react'
import '../index.css'
import {connect} from 'react-redux'

import * as actionCreators from '../store/actionCreators'

class AddProjectError extends Component {


  componentDidMount() {

    this.props.onPopulateProjectErrors()

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
            <p>{errors.projectName}</p>
            <p>{errors.projectDesc}</p>
            <p>{errors.rate}</p>
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
    onPopulateProjectErrors: () => dispatch(actionCreators.displayProjectErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectError)
