import { AuthActionType } from '../constant/action'

export interface PayloadAuthReducer {
  user_id: number | null
  isLoggedIn: boolean
  isLoading?: boolean
}

interface ActionAuthReducer {
  type: AuthActionType
  payload: PayloadAuthReducer
}

const initialState: PayloadAuthReducer = {
  user_id: null,
  isLoggedIn: false,
  isLoading: true
}

const authReducer = (state = initialState, action: ActionAuthReducer) => {
  switch (action.type) {
    case 'REDIRECT':
      return {
        ...state,
        ...action.payload,
        isLoading: action.payload.isLoading
      }
    case 'SET_USER':
      return {
        ...state,
        user_id: action.payload.user_id,
        isLoggedIn: action.payload.isLoggedIn
      }

    case 'REMOVE_USER': {
      return {
        ...state,
        user_id: null,
        isLoggedIn: false,
        isLoading: false
      }
    }

    default:
      return state
  }
}

export default authReducer
