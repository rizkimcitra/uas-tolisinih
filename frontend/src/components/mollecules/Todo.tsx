import { doPatch } from '@/libs/doFetch'
import formatDate from '@/libs/formatDate'
import { indicator } from '@/libs/indicator'
import syncTodo from '@/libs/syncTodo'
import createAction from '@/redux/actions/createAction'
import { ModalActionType } from '@/redux/constant/action'
import { PayloadModalReducer } from '@/redux/reducers/modalReducers'
import { TodoProp } from '@/redux/reducers/todoReducer'

import Button from '../atoms/Button'
import Trash from '../atoms/icons/Trash'
import Checkbox from './Todo/Checkbox'
import EditButton from './Todo/EditButton'

import clsx from 'clsx'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const Todo = ({ id, title, created_at, is_active, priority }: TodoProp) => {
  const [checked, setChecked] = useState<boolean>(is_active ? true : false)
  const date = formatDate(created_at as string)
  const dispatch = useDispatch()
  const priorityColor = indicator(priority)

  const showAlert = () => {
    const action = createAction<ModalActionType, PayloadModalReducer>('SET_SELECTED', {
      modalIsOpen: true,
      modalForm: false,
      modalIsGoingToDelete: true,
      selectedTodosTitle: title,
      selectedTodosId: id
    })
    dispatch(action)
  }

  const handleChange = async () => {
    setChecked(!checked)
    await doPatch('/api/patch.php', { id, title, is_active: checked ? 0 : 1 })
    await syncTodo(dispatch)
  }

  return (
    <section
      className={clsx(
        'flex items-center justify-between',
        'w-full min-h-[4rem] px-4 md:px-4 rounded',
        'shadow dark:shadow-none',
        'bg-white dark:bg-neutral-800',
        checked
          ? 'opacity-40 line-through decoration-neutral-800 dark:decoration-emerald-400 dark:text-emerald-600'
          : 'opacity-100'
      )}
    >
      <header className='flex items-center space-x-2 md:space-x-3'>
        <Checkbox checked={checked} onChange={handleChange} />
        <div className={clsx('w-2 md:w-3 aspect-square rounded-full', priorityColor)}></div>
        <div>
          <h3 className={clsx(checked ? 'dark:text-emerald-600' : '')}>{title}</h3>
          <p>{date}</p>
        </div>
        <EditButton id={id} title={title} priority={priority} />
      </header>
      <Button
        onClick={showAlert}
        className={clsx('text-neutral-700 dark:text-neutral-500', 'hover:text-red-600 dark:hover:text-rose-500')}
      >
        <Trash />
        <span className='sr-only'>Delete Todos</span>
      </Button>
    </section>
  )
}

export default Todo
