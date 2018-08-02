
import React, {Component} from 'react'
import '../index.css'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import Projects from './Projects'

import * as actionCreators from '../store/actionCreators'

const cookies = new Cookies()

class ProjectsList extends Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.props.authUser()
    this.props.onPopulateProjectList(this.props.loggedInUser)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
     // checks current props against incoming props. This method only runs when new props are coming in. (Sign-In)
    if(!this.props.loggedInUser && nextProps.loggedInUser) {
      this.props.onPopulateProjectList(nextProps.loggedInUser)
    }
  }

render() {

  let projects= this.props.projects.map((project,index) => {
    return (

      <tr className= "eachProject" key={index}>
        <td className='projectName'>{project.projectName}</td>
        <td className='projectDesc'>{project.projectDesc}</td>
        <td className='budgetedHours'>{project.budgetedHours}</td>
        <td className='rate'>${project.rate}</td>
        <td className='actualHours'>{project.actualHours}</td>
        <td className='totalToBeInvoiced'>TBD</td>
      </tr>
    )
  })

  return (
    <div className='projectsList'>
      <h1>Current Projects: </h1>
      <table className="projects">
      <thead>
        <tr className="tableHeader">
          <th>Project Name</th>
          <th>Project Description</th>
          <th>Budgeted Hours</th>
          <th>Rate Per Hour</th>
          <th>Actual Hours</th>
          <th>Total for project</th>
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
      loggedInUser : state.user,
      client : state.client
    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      onPopulateProjectList : (user) => dispatch(actionCreators.onPopulateProjectListUsingThunk(user)),
      authUser : () => dispatch(actionCreators.authenticateUser())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)
