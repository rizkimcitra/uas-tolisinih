import { useCallback, useEffect, useState } from 'react'

/**
 * custom hooks that are used in the project to enable and disable dark mode.
 * `toggleTheme` is a function that will switch the theme.
 * `theme` are the current theme,
 * it's value are either `dark` or `light`
 * @example ```tsx
 * const { theme, toggleTheme } = useTheme()
 *
 * <button onClick={toggleTheme}>Current Theme is {theme}</button>
 * ````
 */
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const colorTheme = theme === 'light' ? 'dark' : 'light'

  const toggleTheme = useCallback(() => setTheme(colorTheme), [theme])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
  }, [toggleTheme, colorTheme])

  return {
    theme,
    toggleTheme
  }
}

export default useTheme
