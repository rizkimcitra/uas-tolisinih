import createAction from '@/redux/actions/createAction'
import { TodoActionType } from '@/redux/constant/action'
import { PayloadTodoReducer } from '@/redux/reducers/todoReducer'

import { doGet } from './doFetch'

import { Dispatch } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const syncTodo = async (dispatch: Dispatch<any>, query: string) => {
  const res = await doGet('/api/get.php', query)
  const action = createAction<TodoActionType, PayloadTodoReducer>('SET_TODOS', {
    todos: res.result
  })
  dispatch(action)
}
export default syncTodo
