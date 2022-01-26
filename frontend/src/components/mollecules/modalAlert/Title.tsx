import { RootState } from '@/redux/store'

import clsx from 'clsx'

const Title = ({ title }: { title: RootState['modal']['selectedTodosTitle'] }) => (
  <h2>
    Are you sure want to delete{' '}
    <span
      className={clsx(
        'text-transparent bg-clip-text',
        'bg-gradient-to-r from-rose-600 to-red-400 dark:from-rose-500 dark:to-red-400'
      )}
    >
      {title}
    </span>{' '}
    ?
  </h2>
)

export default Title
