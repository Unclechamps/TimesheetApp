import * as actionTypes from './actionTypes'

const initialState = {
  users : [],
  errors : {},
  clients : [],
  client : {},
  currentUser : {},
  projects : [],
  project : {},
  hours : '',
  completed : [],
  invoice : {}
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
      ...state,
      client : action.client
    }

    case actionTypes.DELETE_PROJECT:
    return {
      ...state,
      projects : action.projects
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

    case actionTypes.POPULATE_COMPLETE_PROJECT_LIST:
    return {
      ...state,
      projects : action.projects
      }

    case actionTypes.ADD_PROJECT:
    return {
      ...state
    }

    case actionTypes.ADD_PROJECT_ERROR:
    return {
      ...state,
      errors : action.errors
      }

    case actionTypes.POPULATE_PROJECT_LIST:
    return {
      ...state,
      projects : action.projects
      }

    case actionTypes.POPULATE_INDIVIDUAL_PROJECT:
    return {
      ...state,
      project : action.project
    }


    case actionTypes.POPULATE_FINISHED_LIST:
    return {
      ...state,
      completed : action.completed
    }

    case actionTypes.POPULATE_INVOICE:
    return {
      ...state,
      invoice : action.invoice
    }


    }

      return state
}

export default reducer
