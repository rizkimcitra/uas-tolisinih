import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

import useTheme from '@/hooks/useTheme'
import { doPost } from '@/libs/doFetch'
import createAction from '@/redux/actions/createAction'
import { AuthActionType } from '@/redux/constant/action'
import { PayloadAuthReducer } from '@/redux/reducers/authReducer'

import clsx from 'clsx'
import { setDefaultResultOrder } from 'dns'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

interface FormState {
  name: string
  username: string
  password: string
}

interface FormStateProp extends FormState {
  [x: string]: string
}

interface PayloadResult {
  status: 'OK' | false
  message: string
  data: {
    id: number
    name: string
    username: string
  }
}

const SignupPage = () => {
  useTheme()
  const [formState, setFormState] = useState<FormStateProp>({} as FormStateProp)
  const [error, setError] = useState<boolean>(false)
  const [, setCookie] = useCookies(['token'])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormState({ ...formState, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formState.name && formState.username && formState.password) {
      const res = await doPost<FormState, PayloadResult>('/api/user/register.php', formState)
      if (res.result.status === 'OK') {
        setCookie('token', res.result.data.id, { path: '/' })
        const action = createAction<AuthActionType, PayloadAuthReducer>('SET_USER', {
          isLoggedIn: true,
          user_id: res.result.data.id,
          isLoading: false
        })
        dispatch(action)
        navigate('/', { replace: true })
      }
      if (!res.result.status) {
        setError(true)
      }
    }
  }
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
        <h1 className='text-center mb-6 md:mb-10'>
          Register to{' '}
          <span className={clsx('text-transparent bg-clip-text bg-gradient-to-r', 'from-green-500 to-emerald-500')}>
            Tolisinih
          </span>
        </h1>
        <form className={clsx('flex flex-col space-y-4 md:space-y-8')} onSubmit={handleSubmit}>
          <div className='w-full flex flex-col space-y-1 md:space-y-2'>
            <label htmlFor='full-name'>Full Name</label>
            <Input type='text' id='full-name' name='name' onChange={handleChange} autoComplete='off' />
          </div>
          <div className='w-full flex flex-col space-y-1 md:space-y-2'>
            <label htmlFor='username'>Username</label>
            <Input type='text' id='username' name='username' onChange={handleChange} autoComplete='off' />
          </div>
          <div className='w-full flex flex-col space-y-1 md:space-y-2'>
            <label htmlFor='password'>Password</label>
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
              Sign up
            </Button>
            <span>or</span>
            <Link
              to='/signin'
              className={clsx(
                'accessible inline-flex items-center justify-center h-10 md:h-12',
                'border border-transparent hover:bg-current dark:hover:bg-neutral-800',
                'bg-transparent text-emerald-600 font-medium',
                'dark:border-transparent dark:bg-neutral-800 dark:text-emerald-500'
              )}
            >
              Login
            </Link>
          </div>
          {error && (
            <p className={clsx('text-red-500 dark:text-rose-500')}>
              User has already registerer, please login to your account
            </p>
          )}
        </form>
      </section>
    </div>
  )
}

export default SignupPage
