
import React, {Component} from 'react'
import '../index.css'
import {connect} from 'react-redux'

import * as actionCreators from '../store/actionCreators'

class AddHours extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hours : {}
    }

    this.props.authUser()
  }

  handleTextChange = (e) => {
    this.setState({
      hour : {
        ...this.state.hour ,
        [e.target.name] : e.target.value,

      }
    })
  }


  render() {

    return(

      <div>
      <h3 className="addHours">Modify Project: {this.props.dataToModify.projectName}</h3>
      <div className = "addHoursForm">
      <div className='hoursToAdd'>
        <label>Hours to add: </label>
        <input type="integer" id="hours"  onChange={this.handleTextChange} name="hours" placeholder="Hours" required />
      </div>
      <div className='buttonsModify'>
        <button name="action" value="add" className="btnAdd" onClick={() => this.props.onAddHours(this.state.hour.hours, this.state.hour.status, this.props.dataToModify)}>Add</button>
        <button name="action" value="remove" className="btnRemove" onClick={() => this.props.onRemoveHours(this.state.hour.hours, this.state.hour.status, this.props.dataToModify)}>Remove</button>
      </div>
      <hr/>
      <div>
        <label>Update status: </label>
          <select onChange={this.handleTextChange} name='status' className="status">
            <option value='Not started'>Not Started</option>
            <option value='In Progress'>In Progress</option>
            <option value='Completed'>Completed</option>
          </select>
        </div>
      </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    project : state.project,
    hour : state.hours,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authUser : () => dispatch(actionCreators.authenticateUser()),
    onAddHours : (hours, status, data) => dispatch(actionCreators.onAddHoursUsingThunk(hours,status, data)),
    onRemoveHours : (hours, status, data) => dispatch(actionCreators.onRemoveHoursUsingThunk(hours, status, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHours)
