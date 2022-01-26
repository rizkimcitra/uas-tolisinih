import Button from '@/components/atoms/Button'
import Pen from '@/components/atoms/icons/Pen'

import createAction from '@/redux/actions/createAction'
import { FormActionType, ModalActionType } from '@/redux/constant/action'
import { PayloadFormReducer } from '@/redux/reducers/formReducer'
import { PayloadModalReducer } from '@/redux/reducers/modalReducers'

import { batch, useDispatch } from 'react-redux'

interface EditButtonProp {
  id: number
  title: string
  priority: PayloadFormReducer['priority']
}

const EditButton = ({ id, title, priority }: EditButtonProp) => {
  const dispatch = useDispatch()

  const showEditForm = () => {
    const formAction = createAction<FormActionType, PayloadFormReducer>('SET_FORM', {
      isOpen: false,
      todo: title,
      priority
    })
    const modalAction = createAction<ModalActionType, PayloadModalReducer>('SET_MODAL', {
      modalIsOpen: true,
      modalForm: true,
      modalIsEdit: true,
      selectedTodosId: id
    })

    batch(() => {
      dispatch(formAction)
      dispatch(modalAction)
    })
  }

  return (
    <Button onClick={showEditForm} title='edit this TO DO'>
      <Pen />
      <span className='sr-only'>Edit Todos</span>
    </Button>
  )
}

export default EditButton
