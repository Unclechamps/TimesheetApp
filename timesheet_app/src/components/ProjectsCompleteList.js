
import React, {Component} from 'react'
import '../index.css'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import '../queries.css'

import * as actionCreators from '../store/actionCreators'

class ProjectsCompleteList extends Component {
  constructor(props) {
    super(props)

    this.props.authUser()
    if(this.props.loggedInUser) {
      this.props.onPopulateCompleteProjectList(this.props.loggedInUser)
  }
      console.log(props)
}

  componentWillReceiveProps(nextProps) {

     // checks current props against incoming props. This method only runs when new props are coming in. (Sign-In)
    if(!this.props.loggedInUser && nextProps.loggedInUser) {
      this.props.onPopulateCompleteProjectList(nextProps.loggedInUser)
    }
  }

render() {

  let projects= this.props.projects.map((project,index) => {
    return (

      <tr className= "eachProjectProj" key={index}>
        <td className='clientNameProj'>{project.clientName}</td>
        <td className='projectNameProj'>{project.projectName}</td>
        <td className='projectDescProj'>{project.projectDesc}</td>
        <td className='budgetedHoursProj'>{project.budgetedHours}</td>
        <td className='rateProj'>${project.rate}</td>
        <td className='actualHoursProj'>{project.actualHours}</td>
        <td className='totalToBeInvoicedProj'>{project.totalBill}</td>
        <td className='actualHoursProj'>{project.Status}</td>
      </tr>
    )
  })

  return (
    <div className='projectsListProj'>
      <h1>All Projects</h1>
      <table className="projectsProj">
      <thead>
        <tr className="tableHeaderProj">
          <th>Client Name</th>
          <th>Project Name</th>
          <th>Project Description</th>
          <th>Budgeted Hours</th>
          <th>Rate Per Hour</th>
          <th>Actual Hours</th>
          <th>Total for project</th>
          <th>Status</th>
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
      loggedInUser : state.user
    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      onPopulateCompleteProjectList : (user) => dispatch(actionCreators.onPopulateCompleteProjectListUsingThunk(user)),
      authUser : () => dispatch(actionCreators.authenticateUser())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCompleteList)
