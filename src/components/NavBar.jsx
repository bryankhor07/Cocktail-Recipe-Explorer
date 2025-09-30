import { Link, useNavigate } from 'react-router-dom'
import { getRandomCocktail } from '../lib/api'
import { useState } from 'react'

export default function NavBar() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleRandom = async () => {
    setLoading(true)
    try {
      const drink = await getRandomCocktail()
      if (drink?.idDrink) {
        navigate(`/drink/${drink.idDrink}`)
      }
    } catch (err) {
      console.error('Failed to fetch random cocktail', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        {/* App name */}
        <Link to="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
          🍹 Cocktail Explorer
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-4">
          {/* Search icon (placeholder for future search feature) */}
          <Link
            to="/"
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Link>

          {/* Favorites link */}
          <Link
            to="/favorites"
            className="hover:bg-white/20 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            ❤️ Favorites
          </Link>

          {/* Random button */}
          <button
            onClick={handleRandom}
            disabled={loading}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : '🎲 Random'}
          </button>
        </div>
      </div>
    </nav>
  )
}
