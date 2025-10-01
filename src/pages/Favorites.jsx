import { useFavorites } from '../context/FavoritesContext'
import CocktailCard from '../components/CocktailCard'

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800">❤️ Your Favorites</h1>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">No favorites yet!</span> Start exploring cocktails and
            click the heart icon to save your favorites.
          </p>
          <p className="text-gray-600 mt-2">
            Your favorites are saved in localStorage and will persist across sessions.
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
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
