'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { api } from '@/lib/api'; 
import Swal from 'sweetalert2';
import { FaStar, FaRegStar, FaCommentDots, FaChevronLeft } from 'react-icons/fa';


interface Product { _id: string; title: string; description: string; price: number; image: string; rating: number; }
interface Review { _id: string; userName: string; rating: number; comment: string; }

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
      ))}
      <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm font-semibold">{rating}/5</span>
    </div>
  );
}

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const fetchData = useCallback(async () => {
    if (!params.id) return;
    try {
      setLoading(true);
      const [productRes, reviewRes] = await Promise.all([
        api.getItem(params.id as string),
        api.getReviews(params.id as string)
      ]);

     
      setProduct(productRes.success ? productRes.data : productRes);
      setReviews(reviewRes.success ? reviewRes.data : Array.isArray(reviewRes) ? reviewRes : []);
    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire('Error', 'Could not load product details', 'error');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBook = async () => {
    const token = getCookie('token');
    if (!token) return router.push('/login');

    setBookingLoading(true);
    try {
      await api.createBooking({ itemId: product?._id, totalPrice: product?.price }, token);
      Swal.fire({ icon: 'success', title: 'Order Placed!', showConfirmButton: false, timer: 1500 });
      setBooked(true);
    } catch (error: any) {
      Swal.fire('Order Failed', error.message, 'error');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCookie('token');
    if (!token) return router.push('/login');

    setReviewSubmitting(true);
    try {
      const res = await api.createReview({
        itemId: product?._id,
        rating: newRating,
        comment: newComment,
        userName: localStorage.getItem('userDisplayName') || 'Guest User'
      }, token);

      setReviews([res.data || res, ...reviews]);
      setIsReviewModalOpen(false);
      setNewComment('');
      Swal.fire('Posted!', 'Your review is live.', 'success');
    } catch (err: any) {
      Swal.fire('Error', err.message, 'error');
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!product) return <div className="p-20 text-center dark:text-white">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/explore" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 text-sm font-medium">
          <FaChevronLeft size={12} /> Back to Catalog
        </Link>
        
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 grid grid-cols-1 lg:grid-cols-2">
       
          <div className="relative h-100 lg:h-full bg-gray-100 dark:bg-gray-800">
            <Image src={product.image} alt={product.title} fill className="object-cover" priority />
          </div>
          
        
          <div className="p-10 lg:p-14 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{product.title}</h1>
              <StarRating rating={product.rating} />
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-8" />
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{product.description}</p>
            </div>
            
            <div className="mt-12">
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-blue-600">${product.price}</span>
                <span className="text-gray-400 text-sm">USD / per unit</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleBook} 
                  disabled={booked || bookingLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {booked ? '✓ Purchased' : bookingLoading ? 'Processing...' : 'Buy Now'}
                </button>
                <button 
                  onClick={() => setIsReviewModalOpen(true)} 
                  className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 dark:text-white rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                  Write Review
                </button>
              </div>
            </div>
          </div>
        </div>

      
        <div className="mt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold dark:text-white flex items-center gap-3">
              <FaCommentDots className="text-blue-500" /> Community Reviews
            </h2>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-4 py-1 rounded-full text-sm font-bold">
              {reviews.length} total
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-20 bg-gray-100 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-gray-500">No feedback yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {reviews.map((r) => (
                <div key={r._id} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-hover hover:shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-gray-900 dark:text-white">{r.userName}</h4>
                    <div className="flex text-yellow-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (i < r.rating ? <FaStar key={i} size={14}/> : <FaRegStar key={i} size={14}/>))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">"{r.comment}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

   
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsReviewModalOpen(false)} />
          <div className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl p-10 border border-gray-200 dark:border-gray-800 shadow-2xl">
            <h3 className="text-2xl font-black dark:text-white mb-6">How was your experience?</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="flex justify-center gap-3 mb-8">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} type="button" onClick={() => setNewRating(s)} 
                    className={`text-4xl transition-transform hover:scale-125 ${s <= newRating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700'}`}>
                    ★
                  </button>
                ))}
              </div>
              <textarea 
                required 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-5 rounded-2xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white mb-6 min-h-35 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your purchase..." />
              <div className="flex gap-4">
                <button type="submit" disabled={reviewSubmitting} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30">
                  {reviewSubmitting ? 'Posting...' : 'Post Review'}
                </button>
                <button type="button" onClick={() => setIsReviewModalOpen(false)} className="px-6 bg-gray-100 dark:bg-gray-800 dark:text-white py-4 rounded-2xl font-bold">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}