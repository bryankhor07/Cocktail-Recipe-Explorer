export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Cocktail Explorer 🍸
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Discover amazing cocktails, search by name or ingredient, and save your favorites!
      </p>

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">🔍</span>
            <span>Use the search icon to find cocktails by name</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">🎲</span>
            <span>Click Random to discover a new cocktail</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">❤️</span>
            <span>Save your favorite drinks for quick access</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
