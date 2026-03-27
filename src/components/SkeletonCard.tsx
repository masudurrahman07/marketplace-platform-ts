export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse border border-transparent dark:border-gray-700">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    </div>
  );
}
