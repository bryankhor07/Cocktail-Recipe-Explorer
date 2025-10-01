import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import CocktailCard from '../components/CocktailCard'
import { useDebounce } from '../hooks/useDebounce'
import { searchCocktailsByName } from '../lib/api'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const debouncedQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    const fetchDrinks = async () => {
      if (!debouncedQuery.trim()) {
        setDrinks([])
        setHasSearched(false)
        return
      }

      setLoading(true)
      setHasSearched(true)
      const results = await searchCocktailsByName(debouncedQuery)
      setDrinks(results)
      setLoading(false)
    }

    fetchDrinks()
  }, [debouncedQuery])

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Welcome to Cocktail Explorer 🍸
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Discover amazing cocktails, search by name or ingredient, and save your favorites!
      </p>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search cocktails by name..."
      />

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Searching...</p>
        </div>
      )}

      {/* Results grid */}
      {!loading && drinks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {drinks.map((drink) => (
            <CocktailCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && hasSearched && drinks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No cocktails found for "{searchQuery}" 😢</p>
          <p className="text-gray-500 mt-2">Try a different search term</p>
        </div>
      )}

      {/* Getting started (show when no search) */}
      {!loading && !hasSearched && (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">🔍</span>
              <span>Search cocktails by name using the search bar above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">🎲</span>
              <span>Click Random in the navbar to discover a new cocktail</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">❤️</span>
              <span>Save your favorite drinks for quick access</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
