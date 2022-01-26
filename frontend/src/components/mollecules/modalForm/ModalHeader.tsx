import Button from '@/components/atoms/Button'

import createAction from '@/redux/actions/createAction'
import { FormActionType, ModalActionType } from '@/redux/constant/action'
import { PayloadFormReducer } from '@/redux/reducers/formReducer'
import { PayloadModalReducer } from '@/redux/reducers/modalReducers'
import { RootState } from '@/redux/store'

import clsx from 'clsx'
import { batch, useDispatch, useSelector } from 'react-redux'

const ModalHeader = () => {
  const modal = useSelector<RootState>((state) => state.modal) as RootState['modal']
  const dispatch = useDispatch()

  const closeModal = () => {
    const modalAction = createAction<ModalActionType, PayloadModalReducer>('SET_MODAL', {
      modalIsOpen: false,
      modalForm: false,
      modalIsEdit: false
    })
    const formAction = createAction<FormActionType, PayloadFormReducer>('SET_FORM', {
      priority: 'Very High',
      isOpen: false,
      todo: ''
    })
    batch(() => {
      dispatch(modalAction)
      dispatch(formAction)
    })
  }

  return (
    <header className='flex items-center justify-between'>
      <h2
        className={clsx(
          'text-transparent max-w-max',
          'bg-gradient-to-r bg-clip-text from-green-500 to-emerald-500',
          'dark:text-transparent md:text-4xl'
        )}
      >
        {modal.modalIsEdit ? 'Edit existing' : 'Create a'} TO DO
      </h2>

      <Button
        onClick={closeModal}
        title='close modal'
        className={clsx(
          'accessible inline-flex items-center justify-center',
          'h-8 md:h-10 aspect-square border rounded opacity-90 dark:opacity-40',
          'border-transparent bg-emerald-100 text-emerald-900 hover:opacity-80 dark:hover:opacity-100',
          'dark:bg-neutral-800 dark:text-emerald-500 dark:border-emerald-500'
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3 md:h-5 w-3 md:w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
        </svg>
        <span className='sr-only'>Close modal</span>
      </Button>
    </header>
  )
}

export default ModalHeader
