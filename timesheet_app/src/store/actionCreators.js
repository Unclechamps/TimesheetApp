
import Cookies from 'universal-cookie'
import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'

const cookies = new Cookies()

// ADD USER //
export const onAddUserUsingThunk = (user) => {
  return(dispatch) => {
    fetch('http://localhost:3001/add-user', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        dispatch({type : actionTypes.ADD_USER, user : json})
      })
  }
}

// SIGN IN //

export const onSignInUsingThunk = (user) => {
  return(dispatch) => {
    fetch('http://localhost:3001/login', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        if(json.token){
          cookies.set("user_token", json.token, { path: "/" })
					cookies.set("user", json.userID, { path: "/" })
          dispatch(actionCreators.authenticateUser())
        } else if (!json.isValid || json.errors.email === "User not found" || json.errors.password === "Password incorrect") {
          console.log(json.errors)
          dispatch(actionCreators.displayErrors(json.errors))
        }
    })
  }
}

// AUTH USER //

export const authenticateUser = () => {
  return(dispatch) => {
    var token = cookies.get("user_token")
    var user = cookies.get("user")


      if (token && user) {
        fetch('http://localhost:3001/dashboard', {
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : token
          },
        })
          .then(response => response.json())
          .then((json) => {
            dispatch({type : actionTypes.AUTH_USER, user : json})
            }
        )
      }
  }
}

// DISPLAY SIGN IN ERRORS //

export const displayErrors = (errors) => {
  return {
    type : actionTypes.ERRORS,
    errors : errors
  }
}

// LOG OUT //

export const onLogOutUsingThunk = () => {
  return(dispatch) => {

        cookies.remove("user_token", { path: "/" })
        cookies.remove("user", { path: "/" })
        dispatch({ type : actionTypes.LOG_OUT})
}
}

// ADD CLIENTS //

export const onAddClientUsingThunk = (client) => {
  return(dispatch) => {

    var loggedInID = cookies.get("user")

    client.userID = loggedInID

    cookies.get()
    fetch('http://localhost:3001/addClient', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(client)
    })
      .then(response => response.json())
      .then((json) => {
        if(json.email === "Email is invalid" || json.email === "Email field is required" || json.name === "Client name field is required" || json.contact === "Contact field is required") {
          dispatch(actionCreators.displayClientErrors(json))
        } else {
          console.log(json)
        dispatch({type : actionTypes.ADD_CLIENT, client : json});

        dispatch({ type : actionTypes.POPULATE_CLIENT_LIST, clients : json});
      }
      })
  }
}

// DELETE CLIENTS //

export const onDeleteClientUsingThunk = (client,user) => {

  const deleteData = {
    userID : user.id,
    id : client
  }

  console.log(deleteData)
  return (dispatch) => {
    fetch('http://localhost:3001/deleteclient',{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify(deleteData)
    })
    .then(response => response.json())
    .then((json) => {

      dispatch({type : actionTypes.POPULATE_CLIENT_LIST, clients : json});
    })
  }
}

// DISPLAY ADD CLIENT ERRORS //

export const displayClientErrors = (errors) => {
  return {
    type : actionTypes.ADD_CLIENT_ERROR,
    errors : errors
  }
}

// DISPLAY CLIENT LIST //

export const onPopulateClientListUsingThunk = (user) => {
  console.log(user)
  return (dispatch) => {
    fetch('http://localhost:3001/clientList', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify(user)
    })
    .then(response => response.json())
    .then((json) => {
      dispatch({type : actionTypes.POPULATE_CLIENT_LIST, clients : json});
    })
  }
}

// ADD PROJECTS //

export const onAddProjectUsingThunk = (project) => {
  return(dispatch) => {

    var loggedInID = cookies.get("user")
    project.userID = loggedInID

    cookies.get()

    fetch('http://localhost:3001/addProject', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(response => response.json())
      .then((json) => {

        if(json.projectName === "Project Name is required" || json.projectDesc === "Project Description is required" || json.rate === "Project rate is required" || json.rate === "Rate input is not a number") {
          dispatch(actionCreators.displayProjectErrors(json))
        } else {
        dispatch({type : actionTypes.ADD_PROJECT, project : json});

        dispatch({type : actionTypes.POPULATE_PROJECT_LIST, projects : json});
      }
      })
  }
}

// DELETE PROJECT //

export const onDeleteProjectUsingThunk = (project,client,user) => {

  const deleteData = {
      clientID : client,
      projectID : project
  }

  return (dispatch) => {
    fetch('http://localhost:3001/deleteproject',{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify(deleteData)
    })
    .then(response => response.json())
    .then((json) => {

      dispatch({type : actionTypes.POPULATE_PROJECT_LIST, projects : json});
    })
  }
}

// DISPLAY ADD PROJECTS ERRORS //

export const displayProjectErrors = (errors) => {
  return {
    type : actionTypes.ADD_PROJECT_ERROR,
    errors : errors
  }
}

// DISPLAY PROJECTS LIST //

export const onPopulateProjectListUsingThunk = (user, client) => {

  const queryData = {
    userID : user.id,
    clientID : client
  }
  return (dispatch) => {
    fetch('http://localhost:3001/projectList', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify(queryData)
    })
    .then(response => response.json())
    .then((json) => {
      dispatch({type : actionTypes.POPULATE_PROJECT_LIST, projects : json});
    })
  }
}

//DISPLAY COMPLETE LIST OF PROJECTS

export const onPopulateCompleteProjectListUsingThunk = (user) => {

  return (dispatch) => {
    fetch('http://localhost:3001/completeProjectList', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify(user)
    })
    .then(response => response.json())
    .then((json) => {
      dispatch({type : actionTypes.POPULATE_COMPLETE_PROJECT_LIST, projects : json});
    })
  }
}


// DISPLAY INDIVIDUAL PROJECT //

//DISPLAY COMPLETE LIST OF PROJECTS

export const onPopulateIndividualProjectUsingThunk = (project) => {
  return (dispatch) => {
    fetch('http://localhost:3001/indiProject', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify({projectID : project})
    })
    .then(response => response.json())
    .then((json) => {
      dispatch({type : actionTypes.POPULATE_INDIVIDUAL_PROJECT, project : json});
    })
  }
}

//MODIFY HOURS//

export const onAddHoursUsingThunk = (hours, status, data) => {

  console.log(hours,status, data)

  let hoursToNode = {
    hours : parseFloat(hours),
    status : status,
    data : data,
  }

  console.log(hoursToNode)

  return(dispatch) => {
    fetch('http://localhost:3001/addHours', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify(hoursToNode, data)
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        dispatch({type : actionTypes.POPULATE_INDIVIDUAL_PROJECT, project : json})
      })
  }
}

export const onRemoveHoursUsingThunk = (hours, status, data) => {

  console.log(hours,status, data)

  let hoursToNode = {
    hours : parseFloat(hours),
    status : status,
    data : data,
  }

  console.log(hoursToNode)

  return(dispatch) => {
    fetch('http://localhost:3001/removeHours', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify(hoursToNode, data)
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        dispatch({type : actionTypes.POPULATE_INDIVIDUAL_PROJECT, project : json})
      })
  }
}

// COMPLETED PROJECTS //

export const onPopulateFinishedListUsingThunk = (user, client) => {

  const queryData = {
    userID : user.id,
    clientID : client
    }
  return (dispatch) => {
    fetch('http://localhost:3001/finishedList', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify(queryData)
    })
    .then(response => response.json())
    .then((json) => {
      dispatch({type : actionTypes.POPULATE_FINISHED_LIST, completed : json});
    })
  }
}
