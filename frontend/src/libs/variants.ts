import { Variants } from 'framer-motion'

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.97
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.25
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0.98,
    transition: {
      type: 'tween',
      duration: 0.2
    }
  }
}

export default variants
