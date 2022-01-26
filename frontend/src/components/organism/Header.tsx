import Nav from '../mollecules/Nav'
import AddTodo from '../mollecules/buttons/AddTodo'
import DarkMode from '../mollecules/buttons/DarkMode'

import { useLocation } from 'react-router-dom'

const Header = () => {
  const { pathname } = useLocation()

  if (pathname === '/login' || pathname === '/404' || pathname === '/signup' || pathname === '/signin') return null

  return (
    <div className='w-full fixed top-0 left-0 h-16 md:h-24 border-neutral-900 bg-neutral-100/40 dark:bg-neutral-900/40 backdrop-blur'>
      <header className='layout flex justify-between items-center h-full'>
        <Nav />

        <div className='flex items-center space-x-2 md:space-x-4'>
          <AddTodo />
          <DarkMode />
        </div>
      </header>
    </div>
  )
}
export default Header
