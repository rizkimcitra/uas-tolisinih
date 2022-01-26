interface buttonProp {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  title?: string
  id?: string
  disabled?: boolean
}

/**
 *
 * @param props he props of the button, some of them are required
 * @returns
 */
const Button = ({ children, ...prop }: buttonProp) => {
  return <button {...prop}>{children}</button>
}

export default Button
