import { PayloadFormReducer } from '@/redux/reducers/formReducer'

import DropdownItem from './DropdownItem'

import clsx from 'clsx'
import { Variants, motion } from 'framer-motion'

const DropdownList = () => {
  const priorities = ['Very High', 'High', 'Medium', 'Low', 'Very Low'] as Array<PayloadFormReducer['priority']>

  const variants: Variants = {
    hidden: {
      y: -25,
      opacity: 0,
      scale: 0.9
    },
    enter: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'tween',
        duration: 0.25
      }
    },
    exit: {
      y: -25,
      opacity: 0,
      scale: 0.95
    }
  }

  return (
    <motion.div
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      className={clsx(
        'flex flex-col items-stretch',
        'absolute w-36 md:w-40 -top-2 md:-top-4 rounded',
        'divide-y divide-neutral-300 dark:divide-neutral-700',
        'border border-neutral-300 dark:border-neutral-700',
        'bg-white dark:bg-neutral-800'
      )}
    >
      {priorities.map((priority, index) => (
        <DropdownItem key={priority + index} priority={priority} />
      ))}
    </motion.div>
  )
}

export default DropdownList
