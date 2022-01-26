import ModalBody from '@/components/mollecules/modalForm/ModalBody'
import ModalHeader from '@/components/mollecules/modalForm/ModalHeader'

import variants from '@/libs/variants'

import clsx from 'clsx'
import { motion } from 'framer-motion'

const Form = () => {
  return (
    <motion.div
      id='modal-form'
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        'flex flex-col justify-center absolute top-[10%]',
        'w-11/12 max-w-xl aspect-square sm:aspect-video',
        'py-4 md:py-8 px-4 md:px-14 space-y-6 md:space-y-12',
        'rounded border dark:shadow-none dark:border-none',
        'bg-white dark:bg-neutral-800'
      )}
    >
      <ModalHeader />

      <ModalBody />
    </motion.div>
  )
}

export default Form
