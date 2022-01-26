import authReducer from './authReducer'
import formReducer from './formReducer'
import modalReducer from './modalReducers'
import todoReducer from './todoReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  todo: todoReducer,
  modal: modalReducer,
  form: formReducer,
  auth: authReducer
})

export default rootReducer
