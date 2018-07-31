import React, {Component} from 'react'
import '../index.css'
import {connect} from 'react-redux'

import * as actionCreators from '../store/actionCreators'

export class Dashboard extends Component {
  render() {
    return(
      <h1>Welcome</h1>
    )
  }
}
