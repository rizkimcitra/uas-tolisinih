import clsx from 'clsx'

interface CheckboxProp {
  checked: boolean
  onChange: () => Promise<void>
}
const Checkbox = ({ checked, onChange }: CheckboxProp) => (
  <input type='checkbox' title='Mark done' checked={checked} onChange={onChange} className={clsx('cursor-pointer')} />
)

export default Checkbox
