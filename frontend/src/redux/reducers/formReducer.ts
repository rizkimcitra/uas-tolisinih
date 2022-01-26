import { FormActionType } from '../constant/action'

export interface PayloadFormReducer {
  priority: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low'
  todo: string
  isOpen: boolean
}

export interface ActionFormReducer {
  type: FormActionType
  payload: PayloadFormReducer
}

const initialState: PayloadFormReducer = {
  priority: 'Very High',
  todo: '',
  isOpen: false
}

const formReducer = (state = initialState, action: ActionFormReducer) => {
  switch (action.type) {
    case 'SET_FORM':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_FORM_TODO':
      return {
        ...state,
        todo: action.payload.todo
      }

    default:
      return state
  }
}

export default formReducer
