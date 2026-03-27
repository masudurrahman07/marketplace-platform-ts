'use client';

import { useEffect, useState } from 'react';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { api } from '@/lib/api';
import Swal from 'sweetalert2';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyReviews = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
     if (!token) return;
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_TS || 'http://localhost:5000'}/api/reviews/my`, {
  headers: { Authorization: `Bearer ${token}` }
});
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyReviews(); }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {

      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_TS || 'http://localhost:5000'}/api/reviews/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        

        if (res.ok) {
          setReviews(prev => prev.filter(r => r._id !== id));
          Swal.fire('Deleted!', 'Your review has been removed.', 'success');
        }
      } catch (err) {
        Swal.fire('Error', 'Could not delete review', 'error');
      }
    }
  };

  if (loading) return <div className="p-10 text-center dark:text-white">Loading reviews...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
      {reviews.length === 0 ? (
        <div className="text-center py-10 dark:text-gray-400">No reviews found.</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                  <span className="text-xs text-gray-400 mt-2 block">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <button onClick={() => handleDelete(review._id)} className="text-red-500 hover:text-red-700 p-2">
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}