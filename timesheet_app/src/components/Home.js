
import React, {Component} from 'react'
import '../index.css'
import { connect } from 'react-redux'

export class Home extends Component {

  render() {
    return (
      <div className='welcomePage'>
      <div className='billboard'>
        <h1>Welcome to <span id="timekeeper">Timekeeper</span></h1>
      </div>
      <div>
        <h2>Key Features</h2>
      </div>

      </div>
    )}
  }
