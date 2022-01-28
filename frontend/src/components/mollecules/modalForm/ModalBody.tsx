import Button from '@/components/atoms/Button'
import Chevron from '@/components/atoms/icons/Chevron'

import { doPatch, doPost } from '@/libs/doFetch'
import syncTodo from '@/libs/syncTodo'
import createAction from '@/redux/actions/createAction'
import { FormActionType, ModalActionType } from '@/redux/constant/action'
import { PayloadFormReducer } from '@/redux/reducers/formReducer'
import { PayloadModalReducer } from '@/redux/reducers/modalReducers'
import { RootState } from '@/redux/store'

import DropdownList from './Dropdown/DropdownList'
import ModalFooter from './ModalFooter'
import ModalInput from './ModalInput'

import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { batch, useDispatch, useSelector } from 'react-redux'

const ModalBody = () => {
  const form = useSelector<RootState>((state) => state.form) as RootState['form']
  const modal = useSelector<RootState>((state) => state.modal) as RootState['modal']
  const auth = useSelector<RootState>((state) => state.auth) as RootState['auth']
  const dispatch = useDispatch()

  const handleDropdown = () => {
    const action = createAction<FormActionType, PayloadFormReducer>('SET_FORM', {
      priority: form.priority,
      isOpen: !form.isOpen,
      todo: form.todo
    })
    dispatch(action)
  }

  const resetState = () => {
    const modalAction = createAction<ModalActionType, PayloadModalReducer>('SET_MODAL', {
      modalIsOpen: false,
      modalIsEdit: false,
      modalForm: false,
      modalIsGoingToDelete: false
    })
    const formAction = createAction<FormActionType, PayloadFormReducer>('SET_FORM', {
      isOpen: false,
      priority: 'Very High',
      todo: ''
    })

    batch(() => {
      dispatch(modalAction)
      dispatch(formAction)
    })
  }

  const handleSubmit = async () => {
    if (form.todo.length > 0) {
      if (modal.modalIsEdit) {
        await doPatch('/api/patch.php', {
          id: modal.selectedTodosId as number,
          title: form.todo,
          priority: form.priority
        })
      } else {
        await doPost('/api/post.php', {
          user_id: auth.user_id,
          title: form.todo,
          priority: form.priority
        })
      }
      await syncTodo(dispatch, '?userId=' + auth.user_id)
      resetState()
    }
  }

  return (
    <div className='flex flex-col justify-center'>
      <section className='w-full space-y-4 md:space-y-8'>
        <ModalInput onSubmit={handleSubmit} />
        <div className='w-full'>
          <label className={clsx('block max-w-max')} htmlFor='priority'>
            Select Priority
          </label>
          <Button
            onClick={handleDropdown}
            id='priority'
            className={clsx(
              'inline-flex items-center space-x-2 md:space-x-3',
              'h-10 md:h-14 mt-2 md:mt-4 max-w-max',
              'px-4 md:px-5 border rounded select-none',
              'text-neutral-700 dark:text-neutral-300',
              'outline-none bg-neutral-100 dark:bg-transparent transition-all duration-150',
              'hover:border-emerald-600 dark:hover:border-emerald-500',
              form.isOpen ? 'border-emerald-600 dark:border-emerald-500' : 'border-neutral-300 dark:border-neutral-700 '
            )}
          >
            <span className='text-sm md:text-base'>{form.priority}</span>
            <Chevron className={form.isOpen ? 'rotate-180' : 'rotate-0'} />
          </Button>
        </div>
        <div className='relative'>
          <AnimatePresence exitBeforeEnter initial>
            {form.isOpen && <DropdownList />}
          </AnimatePresence>
        </div>
      </section>
      <ModalFooter onSubmit={handleSubmit} formState={form} />
    </div>
  )
}

export default ModalBody
