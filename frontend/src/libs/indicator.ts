import { PayloadFormReducer } from '@/redux/reducers/formReducer'

export const indicator = (type: PayloadFormReducer['priority']) => {
  switch (type) {
    case 'Very High':
      return 'bg-red-500 dark:bg-rose-500'
    case 'High':
      return 'bg-orange-500 dark:bg-orange-400'
    case 'Medium':
      return 'bg-emerald-500 dark:bg-emerald-400'
    case 'Low':
      return 'bg-indigo-500 dark:bg-indigo-400'
    default:
      return 'bg-sky-500 dark:bg-sky-400'
  }
}
