import Button from '@/components/atoms/Button'

import { getProfile } from '@/libs/doFetch'
import createAction from '@/redux/actions/createAction'
import { AuthActionType } from '@/redux/constant/action'
import { PayloadAuthReducer } from '@/redux/reducers/authReducer'
import { RootState } from '@/redux/store'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export interface ProfileProp {
  id: number
  username: string
  name: string
}

const ProfilePage = () => {
  const auth = useSelector<RootState>((state) => state.auth) as RootState['auth'],
    [, , removeCookie] = useCookies(['token']),
    [profile, setProfile] = useState<ProfileProp>({} as ProfileProp),
    authCheck = !auth.isLoggedIn && auth.user_id === null,
    navigate = useNavigate(),
    dispatch = useDispatch()

  const syncUser = async () => {
      const res = await getProfile<ProfileProp>('id=' + auth.user_id)
      setProfile({
        id: res.id,
        name: res.name,
        username: res.username
      })
    },
    removeUser = () => {
      removeCookie('token')
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

  useEffect(() => {
    syncUser()
  }, [])

  if (!profile.name && !profile.username) {
    return null
  }

  return (
    <section
      className={clsx(
        'flex flex-col md:flex-row-reverse md:justify-evenly items-center',
        'w-full space-y-4 md:space-y-0 md:space-x-4'
      )}
    >
      <figure className='w-28 md:w-40 aspect-square relative'>
        <img
          className='w-full h-full object-contain rounded-full'
          src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
          alt='avatar'
        />
      </figure>
      <div>
        <h1 className='mb-4 md:mb-8'>Profile</h1>
        <div className={clsx('flex items-center', 'space-x-2 md:space-x-3')}>
          <span>Name: </span>
          <span>{profile.name}</span>
        </div>
        <div className={clsx('flex items-center', 'space-x-2 md:space-x-3')}>
          <span>Username: </span>
          <span>{profile.username}</span>
        </div>

        <Button
          onClick={removeUser}
          className={clsx(
            'inline-flex items-center justify-center h-8 md:h-10',
            'px-2 md:px-6 rounded mt-4 md:mt-8',
            'border border-transparent focus-visible:ring-red-500 focus-visible:dark:ring-rose-500',
            'bg-red-100 text-red-700 font-medium',
            'dark:bg-neutral-800 dark:text-rose-400'
          )}
        >
          Logout
        </Button>
      </div>
    </section>
  )
}

export default ProfilePage
