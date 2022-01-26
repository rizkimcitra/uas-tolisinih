import { PureComponent } from '@/types/custom'

const Main = ({ children }: PureComponent) => {
  return <main className='layout'>{children}</main>
}

export default Main
