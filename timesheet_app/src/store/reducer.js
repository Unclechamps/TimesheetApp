import * as actionTypes from './actionTypes'

const initialState = {
  users : [],
  errors : {}
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

    case actionTypes.ERRORS:
    return {
        ...state,
        errors : action.errors
      }
    }

      return state
}

export default reducer
