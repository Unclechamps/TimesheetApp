
import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'

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
        if(!json.isValid || json.errors.email === "User not found" || json.errors.password === "Password incorrect") {
          console.log(json.errors)
          dispatch(actionCreators.displayErrors(json.errors))

        }
    })
  }
}

// DISPLAY SIGN IN ERRORS //

export const displayErrors = (errors) => {
  return {
    type : actionTypes.ERRORS,
    errors : errors
  }
}
