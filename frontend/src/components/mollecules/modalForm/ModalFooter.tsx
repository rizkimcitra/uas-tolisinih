import Button from '@/components/atoms/Button'

import { RootState } from '@/redux/store'

import clsx from 'clsx'

interface ModalFooterProp {
  onSubmit: () => Promise<void>
  formState: RootState['form']
}
const ModalFooter = ({ onSubmit, formState }: ModalFooterProp) => {
  return (
    <section className='flex items-center justify-end w-full'>
      <Button
        disabled={formState.todo.length > 0 ? false : true}
        onClick={onSubmit}
        className={clsx(
          'accessible flex items-center justify-center h-10 md:h-12',
          'px-4 md:px-8 mt-2 md:mt-4 rounded space-x-2 md:space-x-3',
          'border border-transparent',
          'bg-emerald-600 text-white font-medium',
          'dark:border-emerald-500',
          formState.todo.length > 0
            ? 'opacity-100'
            : 'opacity-50 dark:bg-neutral-700 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-white'
        )}
      >
        Submit
      </Button>
    </section>
  )
}

export default ModalFooter
