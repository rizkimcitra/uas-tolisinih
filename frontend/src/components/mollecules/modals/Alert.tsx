import Danger from '@/components/atoms/icons/Danger'

import { doDelete } from '@/libs/doFetch'
import syncTodo from '@/libs/syncTodo'
import variants from '@/libs/variants'
import createAction from '@/redux/actions/createAction'
import { FormActionType, ModalActionType } from '@/redux/constant/action'
import { PayloadFormReducer } from '@/redux/reducers/formReducer'
import { PayloadModalReducer } from '@/redux/reducers/modalReducers'
import { RootState } from '@/redux/store'

import Title from '../modalAlert/Title'
import AlertCancelButton from '../modalAlert/buttons/AlertCancelButton'
import AlertDeleteButton from '../modalAlert/buttons/AlertDeleteButton'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { batch, useDispatch, useSelector } from 'react-redux'

const Alert = () => {
  const modal = useSelector<RootState>((state) => state.modal) as RootState['modal']
  const auth = useSelector<RootState>((state) => state.auth) as RootState['auth']
  const dispatch = useDispatch()

  const closeModal = () => {
    const modalAction = createAction<ModalActionType, PayloadModalReducer>('SET_MODAL', {
      modalIsOpen: false,
      modalForm: false,
      modalIsGoingToDelete: false,
      modalIsSuccess: false
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

  const handleDelete = async () => {
    await doDelete('/api/delete.php', modal.selectedTodosId as number)
    await syncTodo(dispatch, `?userId=${auth.user_id}`)
    closeModal()
  }

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={variants}
      className={clsx(
        'flex flex-col justify-center absolute top-1/4',
        'w-11/12 max-w-md aspect-square',
        'space-y-4 md:space-y-8',
        'py-4 md:py-8 px-4 md:px-14 rounded',
        'bg-white dark:bg-neutral-800'
      )}
    >
      <Danger />
      <Title title={modal.selectedTodosTitle} />
      <div className={clsx('flex items-center justify-center', 'space-x-2 md:space-x-4')}>
        <AlertCancelButton onClick={closeModal} />
        <AlertDeleteButton onClick={handleDelete} />
      </div>
    </motion.div>
  )
}

export default Alert
