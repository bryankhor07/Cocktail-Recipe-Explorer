import { Link } from 'react-router-dom'

export default function CocktailCard({ drink }) {
  return (
    <Link
      to={`/drink/${drink.idDrink}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
          {drink.strDrink}
        </h3>
        {drink.strCategory && (
          <p className="text-sm text-gray-500 mt-1">{drink.strCategory}</p>
        )}
      </div>
    </Link>
  )
}
