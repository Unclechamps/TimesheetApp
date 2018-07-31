import * as actionTypes from './actionTypes'

const initialState = {
  users : [],
  errors : {},
  clients : [],
  currentUser : {}
}

const reducer = (state = initialState,action) => {

  switch (action.type) {
    case actionTypes.ADD_USER:
    return {
      ...state
    }

    case actionTypes.SIGN_IN:
    return {
      ...state
    }

    case actionTypes.AUTH_USER:
    return {
      ...state,
      user : action.user
    }

    case actionTypes.LOG_OUT:
    return {
      ...state,
      user : undefined
    }

    case actionTypes.ERRORS:
    return {
        ...state,
        errors : action.errors
      }

    case actionTypes.ADD_CLIENT:
    return {
      ...state
    }

    case actionTypes.ADD_CLIENT_ERROR:
    return {
      ...state,
      errors : action.errors
      }

    case actionTypes.POPULATE_CLIENT_LIST:
    return {
      ...state,
      clients : action.clients
      }

    }

      return state
}

export default reducer
