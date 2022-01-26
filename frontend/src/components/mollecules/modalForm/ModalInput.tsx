import Input from '@/components/atoms/Input'

import { doPatch } from '@/libs/doFetch'
import syncTodo from '@/libs/syncTodo'
import createAction from '@/redux/actions/createAction'
import { FormActionType, ModalActionType } from '@/redux/constant/action'
import { PayloadFormReducer } from '@/redux/reducers/formReducer'
import { PayloadModalReducer } from '@/redux/reducers/modalReducers'
import { RootState } from '@/redux/store'

import clsx from 'clsx'
import { batch, useDispatch, useSelector } from 'react-redux'

interface ModalInputProp {
  onSubmit: () => Promise<void>
}
const ModalInput = ({ onSubmit }: ModalInputProp) => {
  const form = useSelector<RootState>((state) => state.form) as RootState['form']
  const modal = useSelector<RootState>((state) => state.modal) as RootState['modal']
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = createAction<FormActionType, PayloadFormReducer>('SET_FORM_TODO', {
      isOpen: form.isOpen,
      priority: form.priority,
      todo: e.target.value
    })
    dispatch(action)
  }

  const resetState = () => {
    const modalAction = createAction<ModalActionType, PayloadModalReducer>('SET_MODAL', {
      modalForm: false,
      modalIsOpen: false,
      modalIsEdit: false
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

  const handlePatch = async () => {
    await doPatch('/api/patch.php', {
      id: modal.selectedTodosId as number,
      title: form.todo,
      priority: form.priority
    })

    resetState()
  }

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (modal.modalIsEdit) {
        await handlePatch()
      } else {
        await onSubmit()
      }
      await syncTodo(dispatch)
    }
  }

  return (
    <div className='w-full'>
      <label className={clsx('block max-w-max')} htmlFor='title'>
        Title
      </label>

      <Input
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={form.todo}
        type='text'
        id='title'
        placeholder="what's the plan?"
        autoFocus
      />
    </div>
  )
}

export default ModalInput
