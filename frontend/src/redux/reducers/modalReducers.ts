import { ModalActionType } from '../constant/action'

export interface PayloadModalReducer {
  modalIsOpen: boolean
  modalForm?: boolean
  modalIsGoingToDelete?: boolean
  modalIsEdit?: boolean
  modalIsSuccess?: boolean
  message?: string
  selectedTodosId?: number | null
  selectedTodosTitle?: string
}

interface ActionModalReducer {
  type: ModalActionType
  payload: PayloadModalReducer
}

const initialState: PayloadModalReducer = {
  modalIsOpen: false,
  modalForm: false,
  modalIsGoingToDelete: false,
  modalIsEdit: false,
  modalIsSuccess: false,
  selectedTodosId: null,
  selectedTodosTitle: '',
  message: ''
}

const modalReducer = (state = initialState, action: ActionModalReducer) => {
  switch (action.type) {
    case 'SET_MODAL':
      return {
        ...state,
        ...action.payload
      }

    case 'SET_SELECTED':
      return {
        ...state,
        ...action.payload
      }

    case 'SET_SUCCESS':
      return {
        ...state,
        message: action.payload.message
      }

    default:
      return state
  }
}

export default modalReducer
