import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

import useTheme from '@/hooks/useTheme'
import createAction from '@/redux/actions/createAction'
import { AuthActionType } from '@/redux/constant/action'
import { PayloadAuthReducer } from '@/redux/reducers/authReducer'
import { RootState } from '@/redux/store'

import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface FormState {
  username: string
  password: string
}

interface FormStateProp extends FormState {
  [x: string]: string
}

const SigninPage = () => {
  useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formState, setFormState] = useState<FormStateProp>({} as FormStateProp)
  const auth = useSelector<RootState>((state) => state.auth) as RootState['auth']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formState?.username === 'rizkimcitra' && formState?.password === 'KdhFamz-00') {
      const action = createAction<AuthActionType, PayloadAuthReducer>('SET_USER', {
        isLoggedIn: true,
        user_id: 123456,
        isLoading: false
      })
      dispatch(action)
      navigate('/', {
        replace: true
      })
      return
    }
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate('/', {
        replace: true
      })
    }
  }, [])

  return (
    <div className={clsx('fixed inset-0', 'flex items-center justify-center')}>
      <section
        className={clsx(
          'flex flex-col justify-center absolute top-[20%]',
          'w-11/12 max-w-xl aspect-square sm:aspect-video',
          'py-4 md:py-8 px-6 md:px-12',
          'rounded border dark:shadow-none dark:border-none',
          'bg-white dark:bg-neutral-800'
        )}
      >
        <h1 className='text-center mb-6 md:mb-10'>Signin to your account</h1>
        <form className={clsx('flex flex-col space-y-4 md:space-y-8')} onSubmit={handleSubmit}>
          <div className='w-full flex flex-col space-y-1 md:space-y-2'>
            <label htmlFor='username'>username</label>
            <Input type='text' id='username' name='username' onChange={handleChange} />
          </div>
          <div className='w-full flex flex-col space-y-1 md:space-y-2'>
            <label htmlFor='password'>password</label>
            <Input type='password' id='password' name='password' onChange={handleChange} />
          </div>
          <div className={clsx('flex items-center space-x-2 md:space-x-3')}>
            <Button
              className={clsx(
                'accessible inline-flex items-center justify-center h-10 md:h-12',
                'px-4 md:px-8 rounded',
                'border border-transparent',
                'bg-emerald-100 text-emerald-900 font-medium',
                'dark:border-emerald-500 dark:bg-neutral-800 dark:text-emerald-500'
              )}
            >
              Signin
            </Button>
            <span>or</span>
            <Button
              className={clsx(
                'accessible inline-flex items-center justify-center h-10 md:h-12',
                'border border-transparent hover:bg-current dark:hover:bg-neutral-800',
                'bg-transparent text-emerald-600 font-medium',
                'dark:border-transparent dark:bg-neutral-800 dark:text-emerald-500'
              )}
            >
              Create an account
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SigninPage
