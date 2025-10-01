import { useEffect, useState } from 'react'
import { listIngredients } from '../lib/api'

export default function IngredientSidebar({ onSelectIngredient, activeIngredient, isMobile = false, onClose }) {
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true)
      const data = await listIngredients()
      // Show top 40 ingredients
      setIngredients(data.slice(0, 40))
      setLoading(false)
    }
    fetchIngredients()
  }, [])

  const handleSelect = (ingredient) => {
    onSelectIngredient(ingredient)
    if (isMobile && onClose) {
      onClose()
    }
  }

  const content = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Filter by Ingredient</h2>
          {isMobile && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600">Select an ingredient to filter cocktails</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
            <p className="text-gray-600 mt-2 text-sm">Loading ingredients...</p>
          </div>
        ) : (
          <div className="space-y-1">
            {ingredients.map((item) => {
              const ingredientName = item.strIngredient1
              const isActive = activeIngredient === ingredientName
              return (
                <button
                  key={ingredientName}
                  onClick={() => handleSelect(ingredientName)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {ingredientName}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
        <div className="bg-white w-full sm:max-w-md sm:rounded-t-xl rounded-t-xl max-h-[80vh] flex flex-col">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md h-[600px] sticky top-6 overflow-hidden">
      {content}
    </div>
  )
}
