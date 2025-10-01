import { Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function CocktailCard({ drink }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const navigate = useNavigate()
  const favorited = isFavorite(drink.idDrink)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(drink)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(`/drink/${drink.idDrink}`)
    }
  }

  return (
    <div
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2"
      tabIndex={0}
      role="article"
      aria-label={`${drink.strDrink} cocktail card`}
      onKeyDown={handleKeyDown}
    >
      <Link to={`/drink/${drink.idDrink}`} className="block focus:outline-none">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 z-10"
          >
            {favorited ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
            {drink.strDrink}
          </h3>
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {drink.strCategory && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                {drink.strCategory}
              </span>
            )}
            {drink.strGlass && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-pink-100 text-pink-700 rounded-full">
                {drink.strGlass}
              </span>
            )}
            {drink.strAlcoholic && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                {drink.strAlcoholic}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
