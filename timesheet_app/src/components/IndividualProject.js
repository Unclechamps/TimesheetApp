
import React, {Component} from 'react'
import '../index.css'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import AddHours from './AddHours'

import * as actionCreators from '../store/actionCreators'

const cookies = new Cookies()

class IndividualProject extends Component {
  constructor(props) {
    super(props)

    this.props.authUser()
    if(this.props.loggedInUser) {
      this.props.onPopulateIndividualProject(this.props.match.params.projectID)
  }
}

 componentDidMount() {
   console.log(this.props)
 }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
     // checks current props against incoming props. This method only runs when new props are coming in. (Sign-In)
    if(!this.props.loggedInUser && nextProps.loggedInUser) {
      this.props.onPopulateIndividualProject(this.props.match.params.projectID)
    }
  }

render() {
  const { project } = this.props
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
          <th>ETC</th>
          <th>Total to Bill</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr className= "eachProject">
          <td className='projectName'>{project.projectName}</td>
          <td className='projectDesc'>{project.projectDesc}</td>
          <td className='budgetedHours'>{project.budgetedHours}</td>
          <td className='rate'>${project.rate}</td>
          <td className='actualHours'>{project.actualHours}</td>
          <td className='etc'>{project.ETC}</td>
          <td className='totalToBeInvoiced'>{project.totalBill}</td>
          <td className='projectStatus'>{project.Status}</td>
        </tr>
        </tbody>
      </table>
      <div>
        <AddHours projectID = {project.id} actualHours = {project.actualHours}/>
      </div>
    </div>
    );
  }
}

  const mapStateToProps = (state) => {
    return {
      project : state.project,
      loggedInUser : state.user

    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      onPopulateIndividualProject : (project) => dispatch(actionCreators.onPopulateIndividualProjectUsingThunk(project)),
      authUser : () => dispatch(actionCreators.authenticateUser()),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(IndividualProject)
