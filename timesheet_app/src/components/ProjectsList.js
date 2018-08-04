
import React, {Component} from 'react'
import '../index.css'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import Projects from './Projects'
import { Link } from 'react-router-dom'

import * as actionCreators from '../store/actionCreators'

class ProjectsList extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.props.authUser()
    if(this.props.loggedInUser) {
      this.props.onPopulateProjectList(this.props.loggedInUser, this.props.clientID)
  }
}

  componentWillReceiveProps(nextProps) {

     // checks current props against incoming props. This method only runs when new props are coming in. (Sign-In)
    if(!this.props.loggedInUser && nextProps.loggedInUser) {
      this.props.onPopulateProjectList(nextProps.loggedInUser, this.props.clientID)
    }
  }

render() {

  let projects= this.props.projects.map((project,index) => {

  let newParams = {
    pathname : `/projects/${project.clientName}/${project.clientID}/${project.id}`
  }

    return (

      <tr className= "eachProject" key={index}>
        <td className='projectName'>{project.projectName}</td>
        <td className='projectDesc'>{project.projectDesc}</td>
        <td className='budgetedHours'>{project.budgetedHours}</td>
        <td className='rate'>${project.rate}</td>
        <td className='actualHours'>{project.actualHours}</td>
        <td className='totalToBeInvoiced'>{project.totalBill}</td>
        <td className='status'>{project.Status}</td>
        <td><Link to={newParams}>Modify</Link></td>
        <td><button onClick={() => this.props.onDeleteProject(project.id, project.clientID,this.props.loggedInUser)}>Delete</button></td>
      </tr>
    )
  })

  return (
    <div className='projectsList'>
      <h1>Current Projects</h1>
      <table className="projects">
      <thead>
        <tr className="tableHeader">
          <th>Project Name</th>
          <th>Project Description</th>
          <th>Budgeted Hours</th>
          <th>Rate Per Hour</th>
          <th>Actual Hours</th>
          <th>Total $ for project</th>
          <th>Status</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
            {projects}
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
      client : state.client
    }
}

  const mapDispatchToProps = (dispatch) => {

    return {
      onPopulateProjectList : (user, client) => dispatch(actionCreators.onPopulateProjectListUsingThunk(user, client)),
      authUser : () => dispatch(actionCreators.authenticateUser()),
      onDeleteProject : (project,client,user) => dispatch(actionCreators.onDeleteProjectUsingThunk(project,client,user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)
