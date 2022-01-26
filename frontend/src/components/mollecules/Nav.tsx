import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  const routes = [
    {
      children: 'Home',
      to: '/'
    },
    {
      children: 'My Profile',
      to: '/profile'
    }
  ]
  return (
    <nav className={clsx('flex items-center', 'space-x-2 md:space-x-3')}>
      {routes.map((route, idx) => (
        <NavLink
          className={(cProp) => {
            return clsx(
              'relative z-10 custom-ring before:z-[-1]',
              'before:absolute before:inset-x-0 before:bottom-0 ',
              'before:transition-all before:bg-emerald-200 dark:before:bg-emerald-500',
              'before:h-full dark:before:h-1',
              cProp.isActive
                ? 'before:scale-100 dark:before:w-full'
                : 'before:scale-0 hover:before:scale-100 dark:before:scale-100 dark:before:w-0 dark:hover:before:w-full'
            )
          }}
          to={route.to}
          key={idx + route.children}
        >
          {route.children}
        </NavLink>
      ))}
    </nav>
  )
}

export default Nav
