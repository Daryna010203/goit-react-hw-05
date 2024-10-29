import css from './MovieReviews.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api/movies';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const data = await getMovieReviews();
        setReviews(data.results);

        console.log('Fetched Reviews Data:', data);

        if (data && data.results) {
          setReviews(data.results);
        } else {
          setReviews([]);
          console.warn('No reviews found in the response');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
        setError('Error fetching reviews: ' + error.message);
      }
    };

    if (movieId) {
      fetchMovieReviews();
    }
  }, [movieId]);

  console.log('Current reviews state:', reviews);

  if (reviews.length === 0) {
    return <p>There are no reviews yet...</p>;
  }

  return (
    <div className={css.reviews}>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id} className={css.reviewItem}>
            <h2> {review.id}</h2>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
