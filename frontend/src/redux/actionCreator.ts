import { todoProp } from '@/components/mollecules/Todo'

export type actionTypeParam = 'SET_TODOS' | 'SET_ID_TODOS'
export type actionTypePayload = {
  todos: Array<todoProp>
  idTodos: number | null
}
export type actionTypeReturn = {
  type: actionTypeParam
  payload: actionTypePayload
}
export type actionType = (type: actionTypeParam, payload: actionTypePayload) => actionTypeReturn

const actionCreator: actionType = (type, payload) => ({ type, payload })

export default actionCreator
