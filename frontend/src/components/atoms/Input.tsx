import clsx from 'clsx'
import React from 'react'

export interface InputProp {
  type: 'text' | 'password'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  value?: string | number | Array<string>
  placeholder?: string
  className?: string
  autoComplete?: 'on' | 'off'
  autoFocus?: boolean
  disabled?: boolean
  hidden?: boolean
  maxLength?: number
  id?: string
  name?: string
}

export type InputType = (props: InputProp) => JSX.Element

const Input: InputType = ({ ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        'h-10 md:h-14 mt-2 md:mt-4 w-full',
        'px-2 md:px-3 border rounded caret-emerald-600 dark:caret-emerald-500',
        'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300',
        'outline-none bg-neutral-100 dark:bg-transparent transition-all duration-150',
        'hover:border-emerald-600 dark:hover:border-emerald-500 focus:border-emerald-500 dark:focus:border-emerald-500',
        'placeholder:text-neutral-700 dark:placeholder:text-neutral-300',
        props.className
      )}
    />
  )
}

export default Input
