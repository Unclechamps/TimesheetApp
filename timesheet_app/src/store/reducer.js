import * as actionTypes from './actionTypes'

const initialState = {
  users : []
}

const reducer = (state = initialState,action) => {

  switch (action.type) {
    case actionTypes.ADD_USER:
    return {
      ...state
    }
  }

  return state
}

export default reducer
