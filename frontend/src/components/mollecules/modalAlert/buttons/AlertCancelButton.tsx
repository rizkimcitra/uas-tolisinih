import Button from '@/components/atoms/Button'

import clsx from 'clsx'

interface AlertCancelButtonProp {
  onClick: () => void
}

const AlertCancelButton = ({ onClick }: AlertCancelButtonProp) => {
  return (
    <Button
      onClick={onClick}
      className={clsx(
        'accessible flex items-center justify-center h-10 md:h-12',
        'px-4 md:px-8 rounded',
        'border border-transparent',
        'bg-emerald-600 text-white font-medium',
        'dark:border-emerald-500 dark:text-emerald-100 dark:bg-emerald-800'
      )}
    >
      Cancel
    </Button>
  )
}

export default AlertCancelButton
