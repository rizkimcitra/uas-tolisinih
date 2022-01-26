import { PayloadFormReducer } from '@/redux/reducers/formReducer'
import { TodoProp } from '@/redux/reducers/todoReducer'

import Axios from 'axios'

export interface PatchPayload {
  id?: number | string
  title?: string
  is_active?: 0 | 1
  priority?: PayloadFormReducer['priority']
}

const axios = Axios.create({
  baseURL: 'http://localhost/api-tolisinih'
})

export const doGet = async (path: '/api/get.php') => {
  try {
    const res = await axios.get(path + '?userId=123456')
    return {
      result: res.data.result as Array<TodoProp>
    }
  } catch (error) {
    return {
      result: [] as Array<TodoProp>
    }
  }
}

export const doPost = async (
  path: '/api/post.php',
  data: { user_id: number; title: string; priority: PayloadFormReducer['priority'] }
) => {
  try {
    const res = await axios.post(path, data)
    return {
      result: res.data
    }
  } catch (error) {
    return {
      result: []
    }
  }
}

export const doPatch = async (path: '/api/patch.php', data: PatchPayload) => {
  try {
    const res = await axios.patch(path, data)
    return {
      result: res.data
    }
  } catch (error) {
    return {
      result: []
    }
  }
}

export const doDelete = async (path: '/api/delete.php', id: number) => {
  try {
    const res = await axios.delete(`${path}?id=${id}`)
    return {
      result: res.data
    }
  } catch (error) {
    return {
      result: []
    }
  }
}
