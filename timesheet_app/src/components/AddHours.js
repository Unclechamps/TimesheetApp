
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
      <h3 className="addHours">Add Hours for Project</h3>
      <div className = "addHoursForm">
      <div className='hoursToAdd'>
        <label>Hours to add: </label>
        <input type="integer" id="hours"  onChange={this.handleTextChange} name="hours" placeholder="Hours" required />
      </div>
      <button name="action" value="add" className="btnAdd" onClick={() => this.props.onAddHours(this.state.hour.hours, this.props.projectID,this.props.actualHours)}>Add</button>
      <button name="action" value="remove" className="btnRemove" onClick={() => this.props.onRemoveHours(this.state.hour.hours, this.props.projectID,this.props.actualHours)}>Remove</button>
      <div>
        <label>Update status</label>
          <select name='status'>
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
    onAddHours : (hour,project,actual) => dispatch(actionCreators.onAddHoursUsingThunk(hour,project,actual)),
    onRemoveHours : (hour,project,actual) => dispatch(actionCreators.onRemoveHoursUsingThunk(hour,project,actual))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHours)
