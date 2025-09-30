export default function Favorites() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">❤️ Your Favorites</h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Coming soon!</span> Save your favorite cocktails here for
          quick access.
        </p>
        <p className="text-gray-600 mt-2">
          This feature will use localStorage to persist your favorites across sessions.
        </p>
      </div>
    </div>
  )
}
