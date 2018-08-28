
import React, {Component} from 'react'
import '../index.css'
import '../queries.css'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import Projects from './Projects'
import { Link } from 'react-router-dom'

import * as actionCreators from '../store/actionCreators'

class ProjectsList extends Component {
  constructor(props) {
    super(props)
    console.log(this.state)
    this.props.authUser()
    if(this.props.loggedInUser) {
      this.props.onPopulateFinishedList(this.props.loggedInUser, this.props.clientID)
  }
}

  componentWillReceiveProps(nextProps) {

     // checks current props against incoming props. This method only runs when new props are coming in. (Sign-In)
    if(!this.props.loggedInUser && nextProps.loggedInUser) {
      this.props.onPopulateFinishedList(nextProps.loggedInUser, this.props.clientID)
    }
  }

render() {

  let completed= this.props.completed.map((completed,index) => {

  let newParams = {
    pathname : `/projects/${completed.clientName}/${completed.clientID}/${completed.id}/invoice`
  }

    return (

      <tr className= "eachProject" key={index}>
        <td className='projectName'>{completed.projectName}</td>
        <td className='projectDesc'>{completed.projectDesc}</td>
        <td className='budgetedHours'>{completed.budgetedHours}</td>
        <td className='rate'>${completed.rate}</td>
        <td className='actualHours'>{completed.actualHours}</td>
        <td className='totalToBeInvoiced'>${completed.totalBill}</td>
        <td className='status'>{completed.Status}</td>
        <td><Link to={newParams}>Invoice</Link></td>
      </tr>
    )
  })

  return (
    <div className='projectsList'>
      <h1>Completed Projects</h1>
      <table className="projects">
      <thead>
        <tr className="tableHeader">
          <th>Project Name</th>
          <th>Project Description</th>
          <th>Budgeted Hours</th>
          <th>Rate Per Hour</th>
          <th>Actual Hours</th>
          <th>Total for project</th>
          <th>Status</th>
          <th>Update</th>
        </tr>
        </thead>
        <tbody>
            {completed}
        </tbody>
      </table>
    </div>
    );
  }
}

  const mapStateToProps = (state) => {
    return {
      projects : state.projects,
      project : state.project,
      loggedInUser : state.user,
      client : state.client,
      completed : state.completed
    }
}

  const mapDispatchToProps = (dispatch) => {

    return {
      onPopulateFinishedList : (user, client) => dispatch(actionCreators.onPopulateFinishedListUsingThunk(user, client)),
      authUser : () => dispatch(actionCreators.authenticateUser()),
      onDeleteProject : (project,client,user) => dispatch(actionCreators.onDeleteProjectUsingThunk(project,client,user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)
