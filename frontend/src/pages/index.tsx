import Todo from '@/components/mollecules/Todo'

import illustration from '@/assets/img/task-illustration.svg'
import { doGet } from '@/libs/doFetch'
import createAction from '@/redux/actions/createAction'
import { TodoActionType } from '@/redux/constant/action'
import { PayloadTodoReducer, TodoProp } from '@/redux/reducers/todoReducer'
import { RootState } from '@/redux/store'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const IndexPage = () => {
  const todos = useSelector<RootState>((state) => state.todo.todos) as Array<TodoProp>
  const auth = useSelector<RootState>((state) => state.auth) as RootState['auth']
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getData = async (): Promise<void> => {
    const res = await doGet('/api/get.php')
    const action = createAction<TodoActionType, PayloadTodoReducer>('SET_TODOS', {
      todos: res.result
    })
    dispatch(action)
  }

  useEffect(() => {
    if (auth.isLoggedIn && auth.user_id !== null) {
      getData()
    } else {
      navigate('/signin', {
        replace: true
      })
    }
  }, [])

  if (!auth.isLoggedIn) return null

  if (todos.length > 0) {
    return (
      <div className='flex flex-col space-y-2 md:space-y-4 pb-4 md:pb-6'>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    )
  }

  return (
    <section className='flex flex-col items-center justify-center mt-2 md:mt-4'>
      <figure className='w-72 md:w-80 aspect-square'>
        <img src={illustration} alt='illustration' className='w-full h-full object-contain' />
      </figure>
      <h1 className='mt-4 md:mt-8 text-transparent dark:text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500'>
        Tolisinih
      </h1>
      <p>Woops.. there&apos;s no task for today, let&apos;s create one!</p>
    </section>
  )
}

export default IndexPage
