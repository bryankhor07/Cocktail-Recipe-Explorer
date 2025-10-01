import { Link, useNavigate } from 'react-router-dom'
import { getRandomCocktail } from '../lib/api'
import { useState } from 'react'
import { useDarkMode } from '../context/DarkModeContext'

export default function NavBar() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { darkMode, toggleDarkMode } = useDarkMode()

  const handleRandom = async () => {
    setLoading(true)
    try {
      const drink = await getRandomCocktail()
      if (drink?.idDrink) {
        navigate(`/drink/${drink.idDrink}`)
      }
    } catch {
      console.error('Failed to fetch random cocktail')
    } finally {
      setLoading(false)
    }
  }

  return (
    <nav
      className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 text-white shadow-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        {/* App name */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity"
          aria-label="Mixology Home"
        >
          <img src="/mixology.svg" alt="Mixology logo" className="w-8 h-8" />
          <span>Mixology</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search icon */}
          <Link
            to="/"
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            aria-label="Go to search"
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>

          {/* Favorites link */}
          <Link
            to="/favorites"
            className="hover:bg-white/20 px-3 py-2 sm:px-4 rounded-lg transition-colors font-medium text-sm sm:text-base"
            aria-label="View favorites"
          >
            <span className="hidden sm:inline">❤️ Favorites</span>
            <span className="sm:hidden">❤️</span>
          </Link>

          {/* Random button */}
          <button
            onClick={handleRandom}
            disabled={loading}
            className="bg-white text-purple-600 dark:bg-gray-800 dark:text-purple-300 px-3 py-2 sm:px-4 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            aria-label="Get random cocktail"
          >
            {loading ? '...' : '🎲 Random'}
          </button>
        </div>
      </div>
    </nav>
  )
}
