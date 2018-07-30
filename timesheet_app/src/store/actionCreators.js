
import * as actionTypes from './actionTypes'

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
