import { createContext, useContext, useState, useEffect } from 'react'

const DarkModeContext = createContext()

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider')
  }
  return context
}

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or system preference
    try {
      const stored = localStorage.getItem('darkMode')
      if (stored !== null) {
        return JSON.parse(stored)
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch (err) {
      return false
    }
  })

  useEffect(() => {
    // Persist to localStorage
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
    } catch (err) {
      console.error('Failed to save dark mode preference', err)
    }

    // Update document class
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
