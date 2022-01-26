import Alert from '@/components/mollecules/modals/Alert'
import Header from '@/components/organism/Header'
import Form from '@/components/organism/modals/Form'

import Main from '@/layouts/Main'
import createAction from '@/redux/actions/createAction'
import { FormActionType, ModalActionType } from '@/redux/constant/action'
import { PayloadFormReducer } from '@/redux/reducers/formReducer'
import { PayloadModalReducer } from '@/redux/reducers/modalReducers'
import { RootState } from '@/redux/store'
import MyRoutes from '@/routes'

import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modal = useSelector<RootState>((state) => state.modal) as RootState['modal']
  const auth = useSelector<RootState>((state) => state.auth) as RootState['auth']

  const handleClick = () => {
    const modalAction = createAction<ModalActionType, PayloadModalReducer>('SET_MODAL', {
      modalIsOpen: false,
      modalForm: false,
      modalIsGoingToDelete: false,
      modalIsEdit: false,
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

  useEffect(() => {
    if (!auth.isLoggedIn && auth.user_id === null) {
      navigate('/signin', {
        replace: true
      })
    }
  }, [])
  return (
    <>
      <Header />
      <Main>
        <MyRoutes />
      </Main>
      <AnimatePresence initial exitBeforeEnter>
        {modal.modalIsOpen && (
          <div
            onClick={handleClick}
            className={clsx('flex items-center justify-center', 'fixed inset-0 transition-all', 'bg-neutral-900/90')}
          >
            {modal.modalForm && <Form />}
            {modal.modalIsGoingToDelete && <Alert />}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
