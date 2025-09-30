import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { lookupCocktailById } from '../lib/api'

export default function Details() {
  const { id } = useParams()
  const [drink, setDrink] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDrink = async () => {
      setLoading(true)
      const data = await lookupCocktailById(id)
      setDrink(data)
      setLoading(false)
    }
    fetchDrink()
  }, [id])

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
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/3">
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-8 md:w-2/3">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{drink.strDrink}</h1>
            <p className="text-gray-600 mb-4">
              {drink.strCategory} • {drink.strAlcoholic}
            </p>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Ingredients</h2>
              <ul className="space-y-2">
                {Array.from({ length: 15 }, (_, i) => i + 1)
                  .filter((i) => drink[`strIngredient${i}`])
                  .map((i) => (
                    <li key={i} className="text-gray-700">
                      <span className="font-medium">{drink[`strIngredient${i}`]}</span>
                      {drink[`strMeasure${i}`] && (
                        <span className="text-gray-500"> - {drink[`strMeasure${i}`]}</span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Instructions</h2>
              <p className="text-gray-700 leading-relaxed">{drink.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
