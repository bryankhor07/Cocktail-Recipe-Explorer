import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import CocktailCard from '../components/CocktailCard'
import CocktailCardSkeleton from '../components/CocktailCardSkeleton'
import IngredientSidebar from '../components/IngredientSidebar'
import { useDebounce } from '../hooks/useDebounce'
import { searchCocktailsByName, filterCocktailsByIngredient } from '../lib/api'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [activeIngredient, setActiveIngredient] = useState(null)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  const debouncedQuery = useDebounce(searchQuery, 300)

  // Handle search by name
  useEffect(() => {
    const fetchDrinks = async () => {
      if (!debouncedQuery.trim()) {
        setDrinks([])
        setHasSearched(false)
        return
      }

      setLoading(true)
      setHasSearched(true)
      setActiveIngredient(null) // Clear ingredient filter when searching
      const results = await searchCocktailsByName(debouncedQuery)
      setDrinks(results)
      setLoading(false)
    }

    fetchDrinks()
  }, [debouncedQuery])

  // Handle filter by ingredient
  const handleIngredientSelect = async (ingredient) => {
    setActiveIngredient(ingredient)
    setSearchQuery('') // Clear search when filtering by ingredient
    setLoading(true)
    setHasSearched(true)
    const results = await filterCocktailsByIngredient(ingredient)
    setDrinks(results)
    setLoading(false)
  }

  const handleClearFilter = () => {
    setActiveIngredient(null)
    setSearchQuery('')
    setDrinks([])
    setHasSearched(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center flex items-center justify-center gap-3">
        <span>Welcome to Mixology</span>
        <img src="/mixology.svg" alt="Mixology logo" className="w-12 h-12" />
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
        Discover amazing cocktails, search by name or ingredient, and save your favorites!
      </p>

      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileSidebar(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
          Filter by Ingredient
        </button>
      </div>

      {/* Mobile sidebar modal - outside grid to avoid layout issues */}
      {showMobileSidebar && (
        <IngredientSidebar
          onSelectIngredient={handleIngredientSelect}
          activeIngredient={activeIngredient}
          isMobile={true}
          onClose={() => setShowMobileSidebar(false)}
        />
      )}

      <div className="lg:flex lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-[280px] flex-shrink-0">
          <IngredientSidebar
            onSelectIngredient={handleIngredientSelect}
            activeIngredient={activeIngredient}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search cocktails by name..."
          />

          {/* Breadcrumb / Active filter */}
          {(activeIngredient || searchQuery) && (
            <div className="mb-6 flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 px-4 py-3 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {activeIngredient ? (
                  <>
                    Filtering by: <span className="font-semibold text-purple-700">{activeIngredient}</span>
                  </>
                ) : (
                  <>
                    Searching: <span className="font-semibold text-purple-700">{searchQuery}</span>
                  </>
                )}
              </span>
              <button
                onClick={handleClearFilter}
                className="ml-auto flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
              >
                Clear
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CocktailCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Results grid */}
          {!loading && drinks.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4" role="status" aria-live="polite">
                Found {drinks.length} cocktail{drinks.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {drinks.map((drink) => (
                  <CocktailCard key={drink.idDrink} drink={drink} />
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {!loading && hasSearched && drinks.length === 0 && (
            <div className="text-center py-12" role="status" aria-live="polite">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No cocktails found{' '}
                {activeIngredient ? `with "${activeIngredient}"` : `for "${searchQuery}"`} 😢
              </p>
              <p className="text-gray-500 dark:text-gray-500 mt-2">Try a different filter or search term</p>
            </div>
          )}

          {/* Getting started (show when no search) */}
          {!loading && !hasSearched && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Getting Started</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">🔍</span>
                  <span>Search cocktails by name using the search bar above</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">🍹</span>
                  <span>Filter by ingredient using the sidebar (or button on mobile)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">🎲</span>
                  <span>Click Random in the navbar to discover a new cocktail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">❤️</span>
                  <span>Save your favorite drinks for quick access</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
