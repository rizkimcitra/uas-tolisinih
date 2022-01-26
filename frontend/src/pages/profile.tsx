import Button from '@/components/atoms/Button'

import createAction from '@/redux/actions/createAction'
import { AuthActionType } from '@/redux/constant/action'
import { PayloadAuthReducer } from '@/redux/reducers/authReducer'
import { RootState } from '@/redux/store'

import clsx from 'clsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const auth = useSelector<RootState>((state) => state.auth) as RootState['auth']
  const authCheck = !auth.isLoggedIn && auth.user_id === null
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const removeUser = () => {
    const action = createAction<AuthActionType, PayloadAuthReducer>('REMOVE_USER', {
      isLoggedIn: false,
      user_id: null
    })
    dispatch(action)
  }

  useEffect(() => {
    if (authCheck) {
      navigate('/signin', {
        replace: true
      })
    }
  }, [auth])

  if (authCheck) return null
  return (
    <div className='flex flex-col items-center space-y-2 md:space-y-3'>
      <figure className='w-40 aspect-square relative'>
        <img
          className='w-full h-full object-contain'
          src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
          alt='avatar'
        />
      </figure>
      <h1>Name </h1>
      <h2>About Me</h2>

      <Button
        onClick={removeUser}
        className={clsx(
          'accessible flex items-center justify-center h-10 md:h-12',
          'px-4 md:px-8 rounded',
          'border border-transparent focus-visible:ring-red-500 focus-visible:dark:ring-rose-500',
          'bg-red-100 text-red-700 font-medium',
          'hover:bg-red-500 hover:text-white dark:hover:bg-rose-900/50 dark:hover:text-rose-100',
          'dark:border-rose-500 dark:text-rose-500 dark:bg-neutral-800'
        )}
      >
        Logout
      </Button>
    </div>
  )
}

export default ProfilePage
