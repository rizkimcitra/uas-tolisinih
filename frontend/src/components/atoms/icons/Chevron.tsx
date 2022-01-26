import clsx from 'clsx'

interface ChevronProp {
  className?: string
}
const Chevron = ({ className }: ChevronProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={clsx('h-3 md:h-5 w-3 md:w-5 transition-all duration-300', className)}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
    </svg>
  )
}

export default Chevron
