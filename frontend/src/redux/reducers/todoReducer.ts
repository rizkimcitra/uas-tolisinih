import { TodoActionType } from '../constant/action'
import { PayloadFormReducer } from './formReducer'

export interface TodoProp {
  id: number
  title: string
  priority: PayloadFormReducer['priority']
  is_active?: number
  created_at?: string
}

export interface PayloadTodoReducer {
  todos: Array<TodoProp>
}

export interface ActionTodoReducer {
  type: TodoActionType
  payload: PayloadTodoReducer
}

const initialState: PayloadTodoReducer = {
  todos: []
}

const todoReducer = (state = initialState, action: ActionTodoReducer) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export default todoReducer
