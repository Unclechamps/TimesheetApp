
import React, {Component} from 'react'
import '../index.css'
import {connect} from 'react-redux'
import AddProjectError from './AddProjectError'
import ProjectsList from './ProjectsList'
import CompletedProjects from './CompletedProjects'
import Cookies from 'universal-cookie'
import * as actionCreators from '../store/actionCreators'

const cookies = new Cookies()

class Project extends Component {

  constructor(props) {
    super(props)

    this.state= {
      project : {}
    }
    console.log(this.props.match.params.clientName)
    this.props.authUser()
  }

  handleTextChange = (e) => {
    this.setState({
      project : {
        ...this.state.project,
        [e.target.name] : e.target.value,
        clientName : this.props.match.params.clientName,
        clientID : this.props.match.params.clientID,

      }
    })
  }

  ComponentDidMount() {
    console.log(this.props.match.params.clientName)
  }


  render() {

    var user = cookies.get("user")
    var user_token = cookies.get("user_token")

    if(!user || !user_token){
      this.props.history.replace("/sign-in")
    }

    return(


      <div>
      <h1 className="projectTitle">Projects for {this.props.match.params.clientName}</h1>
      <h3 className="addProjectTitle">Add New Projects for </h3>
      <div className = "projectForm">
      <div>
        <label>Project Name: </label>
        <input type="text" id="projectName"  onChange={this.handleTextChange} name="projectName" placeholder="Project name" required />
      </div>
      <div>
        <label>Description: </label>
        <input type="text" id="projectDesc"  onChange={this.handleTextChange} name="projectDesc" placeholder="Description of project" required />
      </div>
      <div>
        <label>Budgeted Hours: </label>
        <input type="number" id="budget"  onChange={this.handleTextChange} name="budget" placeholder="Budgeted hours" required />
      </div>
      <div>
        <label>Rate Per Hour/Fixed Amount: </label>
        <input type="number" id="rate"  onChange={this.handleTextChange} name="rate" placeholder="e.g. $50" required />
      </div>
        <button onClick={() => this.props.onAddProject(this.state.project)}>Add Project</button>
      </div>
        <AddProjectError />
      <div>
        <ProjectsList clientID={this.props.match.params.clientID} clientName={this.props.match.params.clientName}/>
      </div>
      <div>
        <CompletedProjects clientID={this.props.match.params.clientID} clientName={this.props.match.params.clientName}/>
      </div>
      </div>


    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects : state.projects,
    loggedInUser: state.user,
    project : state.project,


  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddProject : (project) => dispatch(actionCreators.onAddProjectUsingThunk(project)),
    authUser : () => dispatch(actionCreators.authenticateUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
