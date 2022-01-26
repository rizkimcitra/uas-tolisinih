import Button from '@/components/atoms/Button'

import createAction from '@/redux/actions/createAction'
import { FormActionType } from '@/redux/constant/action'
import { PayloadFormReducer } from '@/redux/reducers/formReducer'
import { RootState } from '@/redux/store'

import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

const DropdownItem = ({ priority }: { priority: PayloadFormReducer['priority'] }) => {
  const dispatch = useDispatch()
  const form = useSelector<RootState>((state) => state.form) as RootState['form']

  const handleClick = () => {
    const action = createAction<FormActionType, PayloadFormReducer>('SET_FORM', {
      priority,
      todo: form.todo,
      isOpen: false
    })
    dispatch(action)
  }
  return (
    <Button
      onClick={handleClick}
      className={clsx(
        'inline-flex items-center',
        'text-sm md:text-base',
        'p-2 md:p-4 select-none',
        'hover:bg-emerald-100 dark:hover:bg-emerald-900/70'
      )}
    >
      {priority}
    </Button>
  )
}

export default DropdownItem
