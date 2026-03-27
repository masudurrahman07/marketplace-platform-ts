'use client';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSearch(); }}
      className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
      className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 text-sm"/>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"> Search </button>
    </form>
  );
}
