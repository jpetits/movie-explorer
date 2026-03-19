export function MovieListSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="flex items-center space-x-4 animate-pulse">
          <div className="w-24 h-36 bg-gray-300 rounded"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export function MovieSkeleton() {
  return (
    <div className="flex items-center space-x-4 animate-pulse p-6">
      <div className="w-48 h-72 bg-gray-300 rounded"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    </div>
  );
}
