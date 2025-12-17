import { useState, useEffect } from 'react';
import reviewService from '../services/reviewService';

const useReviews = (juegoId) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (juegoId) {
      loadReviews();
    }
  }, [juegoId]);
  
  const loadReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await reviewService.getReviewsByGame(juegoId);
      setReviews(data);
    } catch (err) {
      setError(err.message || 'Error al cargar reseñas');
      console.error('Error loading reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const addReview = async (reviewData) => {
    try {
      const newReview = await reviewService.createReview({
        ...reviewData,
        juego_id: juegoId
      });
      setReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (err) {
      throw err;
    }
  };
  
  const deleteReview = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      throw err;
    }
  };
  
  return {
    reviews,
    isLoading,
    error,
    loadReviews,
    addReview,
    deleteReview
  };
};

export default useReviews;