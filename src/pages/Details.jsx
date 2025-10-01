import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { lookupCocktailById } from '../lib/api'
import { useFavorites } from '../context/FavoritesContext'

export default function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [drink, setDrink] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const favorited = drink ? isFavorite(drink.idDrink) : false

  useEffect(() => {
    const fetchDrink = async () => {
      setLoading(true)
      const data = await lookupCocktailById(id)
      setDrink(data)
      setLoading(false)
    }
    fetchDrink()
  }, [id])

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL', err)
    }
  }

  const handleFavorite = () => {
    if (drink) {
      toggleFavorite(drink)
    }
  }

  // Parse ingredients into clean array
  const getIngredients = () => {
    if (!drink) return []
    const ingredients = []
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`]
      const measure = drink[`strMeasure${i}`]
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : null,
        })
      }
    }
    return ingredients
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        <p className="text-xl text-gray-600">Loading cocktail details...</p>
      </div>
    )
  }

  if (!drink) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        <p className="text-xl text-red-600">Cocktail not found 😢</p>
        <Link to="/" className="text-purple-600 hover:underline mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    )
  }

  const ingredients = getIngredients()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span className="font-medium">Back</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-2/5 relative">
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              className="w-full h-full object-cover min-h-[400px]"
            />
          </div>

          {/* Details */}
          <div className="p-8 md:w-3/5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">{drink.strDrink}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {drink.strCategory && (
                    <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full">
                      {drink.strCategory}
                    </span>
                  )}
                  {drink.strAlcoholic && (
                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                      {drink.strAlcoholic}
                    </span>
                  )}
                  {drink.strGlass && (
                    <span className="px-3 py-1 text-sm font-medium bg-pink-100 text-pink-700 rounded-full">
                      {drink.strGlass}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleFavorite}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  favorited
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
                {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
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
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
                {copied ? 'Copied!' : 'Share Link'}
              </button>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Ingredients</h2>
              <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">{item.name}</span>
                    {item.measure && <span className="text-gray-500 text-sm">{item.measure}</span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Instructions</h2>
              <p className="text-gray-700 leading-relaxed bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                {drink.strInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
