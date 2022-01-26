export type ModalActionType = 'SET_MODAL' | 'SET_SELECTED' | 'SET_SUCCESS'

export const SET_MODAL: ModalActionType = 'SET_MODAL'
export const SET_SELECTED: ModalActionType = 'SET_SELECTED'
export const SET_SUCCESS: ModalActionType = 'SET_SUCCESS'

// Todo Action
export type TodoActionType = 'SET_TODOS'

export const SET_TODOS: TodoActionType = 'SET_TODOS'

// Form Action
export type FormActionType = 'SET_FORM' | 'SET_FORM_TODO'

export const SET_FORM: FormActionType = 'SET_FORM'
export const SET_FORM_TODO: FormActionType = 'SET_FORM_TODO'

// auth action
export type AuthActionType = 'SET_USER' | 'REMOVE_USER' | 'REDIRECT'

export const SET_USER: AuthActionType = 'SET_USER'
export const REMOVE_USER: AuthActionType = 'REMOVE_USER'
export const REDIRECT: AuthActionType = 'REDIRECT'
