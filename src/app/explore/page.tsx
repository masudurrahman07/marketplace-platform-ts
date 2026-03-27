'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SkeletonCard from '@/components/SkeletonCard';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';
import { Product } from '@/types';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL_TS || 'http://localhost:5000'}/api`;

const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest' },
  { value: 'price', label: 'Price: Low → High' },
  { value: '-rating', label: 'Highest Rating' },
];


const LIMIT = 10;

export default function ExplorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('-createdAt');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    
    const params = {
      page: String(page),
      limit: String(LIMIT),
      sort: sort,
      ...(search && { search }),
      ...(category !== 'all' && { category }),
      ...(priceMin && { priceMin }),
      ...(priceMax && { priceMax }),
    };

    try {
      const { data } = await axios.get(`${API_BASE}/items`, { params });
      
      if (data?.success) {
        const normalizedData = (data.data || []).map((item: any) => ({
          ...item,
          name: item.name || item.title,
        }));

        setProducts(normalizedData);
        
        const meta = data.meta || {};
        setTotal(meta.total ?? 0);
        
       
        setTotalPages(meta.totalPages || Math.ceil((meta.total || 0) / LIMIT));
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, category, sort, priceMin, priceMax]);

  useEffect(() => { 
    fetchProducts(); 
  }, [fetchProducts]);

  const handleCategoryChange = (val: string) => { setCategory(val); setPage(1); };
  const handlePriceMinChange = (val: string) => { setPriceMin(val); setPage(1); };
  const handlePriceMaxChange = (val: string) => { setPriceMax(val); setPage(1); };
  const handleSortChange = (val: string) => { setSort(val); setPage(1); };
  const handleSearch = () => { setSearch(searchInput); setPage(1); };
  
  const handleReset = () => {
    setSearchInput(''); setSearch(''); setCategory('all');
    setPriceMin(''); setPriceMax(''); setSort('-createdAt'); setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Explore Products</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{total} products found</p>
        </div>


        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1">
            <SearchBar value={searchInput} onChange={setSearchInput} onSearch={handleSearch} />
          </div>
          <select value={sort} onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 outline-none">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-56 shrink-0">
            <Filters 
              category={category} priceMin={priceMin} priceMax={priceMax}
              onCategoryChange={handleCategoryChange} onPriceMinChange={handlePriceMinChange}
              onPriceMaxChange={handlePriceMaxChange} onReset={handleReset} 
            />
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                : products.map((p) => <ProductCard key={p._id} product={p} />)
              }
            </div>
     
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}