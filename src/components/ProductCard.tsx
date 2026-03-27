import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface Props {
  product: Product;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({rating})</span>
    </div>
  );
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-transparent dark:border-gray-700">
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium capitalize">
          {product.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1 tracking-tight">
          {product.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>
        <StarRating rating={product.rating} />
        {product.createdAt && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            📅 {new Date(product.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <Link
            href={`/items/${product._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
