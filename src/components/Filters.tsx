'use client';

const CATEGORIES = ['all', 'electronics', 'fashion', 'home', 'fitness', 'sports', 'accessories', 'furniture'];

interface Props {
  category: string;
  priceMin: string;
  priceMax: string;
  onCategoryChange: (val: string) => void;
  onPriceMinChange: (val: string) => void;
  onPriceMaxChange: (val: string) => void;
  onReset: () => void;
}

export default function Filters({ category, priceMin, priceMax, onCategoryChange, onPriceMinChange, onPriceMaxChange, onReset }: Props) {
  const hasActive = category !== 'all' || priceMin !== '' || priceMax !== '';

  return (
    <aside className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6 h-fit sticky top-20">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Filters</h2>
        {hasActive && (
          <button onClick={onReset}
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Category</label>
        <div className="space-y-1.5">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => onCategoryChange(c)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all font-medium ${
                category === c
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}>
              {c === 'all' ? 'All Categories' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700" />

    
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Price Range</label>
        <div className="space-y-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm font-medium">$</span>
            <input type="number" min={0} placeholder="Min price" value={priceMin}
              onChange={(e) => onPriceMinChange(e.target.value)}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 text-sm bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500" />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm font-medium">$</span>
            <input type="number" min={0} placeholder="Max price" value={priceMax}
              onChange={(e) => onPriceMaxChange(e.target.value)}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 text-sm bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500" />
          </div>
        </div>
      </div>
    </aside>
  );
}
