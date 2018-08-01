
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
            console.log(json)
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
    console.log("testing")
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
        console.log(json)
        if(json.email === "Email field is required" || json.name === "Client name field is required" || json.contact === "Contact field is required") {
          dispatch(actionCreators.displayClientErrors(json))
        } else {
        dispatch({type : actionTypes.ADD_CLIENT, client : json});

        dispatch({type : actionTypes.POPULATE_CLIENT_LIST, clients : json});
      }
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
