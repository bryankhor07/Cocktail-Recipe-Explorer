import { useFavorites } from '../context/FavoritesContext'
import CocktailCard from '../components/CocktailCard'

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">❤️ Your Favorites</h1>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            aria-label="Clear all favorites"
            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 dark:border-purple-600 p-6 rounded-lg">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">No favorites yet!</span> Start exploring cocktails and
            click the heart icon to save your favorites.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your favorites are saved in localStorage and will persist across sessions.
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-400 mb-6" role="status" aria-live="polite">
            You have {favorites.length} favorite cocktail{favorites.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((drink) => (
              <CocktailCard key={drink.idDrink} drink={drink} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
