import Button from '@/components/atoms/Button'

import clsx from 'clsx'

interface AlertDeleteButtonProp {
  onClick: () => void
}
const AlertDeleteButton = ({ onClick }: AlertDeleteButtonProp) => {
  return (
    <Button
      onClick={onClick}
      className={clsx(
        'accessible flex items-center justify-center h-10 md:h-12',
        'px-4 md:px-8 rounded',
        'border border-transparent focus-visible:ring-red-500 focus-visible:dark:ring-rose-500',
        'bg-red-100 text-red-700 font-medium',
        'hover:bg-red-500 hover:text-white dark:hover:bg-rose-900/50 dark:hover:text-rose-100',
        'dark:border-rose-500 dark:text-rose-500 dark:bg-neutral-800'
      )}
    >
      Delete
    </Button>
  )
}

export default AlertDeleteButton
