export default function CocktailCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-300 dark:bg-gray-700"></div>

      {/* Content skeleton */}
      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
