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
  baseURL: 'http://localhost/tolisinih/backend'
})

export const getProfile = async <R>(query: string) => {
  try {
    const response = await axios.get(`/api/user/getUser.php?${query}`)
    return response.data as R
  } catch (error) {
    return {} as R
  }
}

export const doGet = async (path: '/api/get.php', query?: string) => {
  try {
    const res = await axios.get(path + query)
    return {
      result: res.data.result as Array<TodoProp>
    }
  } catch (error) {
    return {
      result: [] as Array<TodoProp>
    }
  }
}

type DoPostPath = '/api/post.php' | '/api/user/register.php' | '/api/user/signin.php'

export const doPost = async <T, P>(path: DoPostPath, data: T) => {
  try {
    const res = await axios.post<P>(path, data)
    return {
      result: res.data
    }
  } catch (error) {
    return {
      result: [] as unknown as P
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
