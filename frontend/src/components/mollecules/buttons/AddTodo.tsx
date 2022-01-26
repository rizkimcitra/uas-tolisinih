// import { doGet, doPost } from '@/libs/doFetch'
// import actionCreator from '@/redux/actionCreator'
import createAction from '@/redux/actions/createAction'
import { ModalActionType } from '@/redux/constant/action'
import { PayloadModalReducer } from '@/redux/reducers/modalReducers'

import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const AddTodo = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const handleClick = () => {
    const action = createAction<ModalActionType, PayloadModalReducer>('SET_MODAL', {
      modalIsOpen: true,
      modalForm: true,
      modalIsGoingToDelete: false,
      modalIsSuccess: false
    })
    dispatch(action)
  }

  if (pathname === '/profile') {
    return null
  }
  return (
    <button
      onClick={handleClick}
      title='Create a new TO DO'
      className={clsx(
        'accessible inline-flex items-center justify-center h-10 md:h-12',
        'px-2 md:px-4 rounded space-x-2 md:space-x-3',
        'border border-transparent',
        'bg-emerald-100 text-emerald-900 font-medium',
        'dark:border-emerald-500 dark:bg-neutral-900 dark:text-emerald-500'
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-3 md:h-5 w-3 md:w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
      </svg>
      <span>New</span>
      <span className='sr-only'>Add new Todo</span>
    </button>
  )
}

export default AddTodo
