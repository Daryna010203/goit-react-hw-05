import css from './MovieReviews.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews } from '../../api/movies';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data.results);

        if (data && data.results) {
          setReviews(data.results);
        } else {
          setReviews([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieReviews();
    }
  }, [movieId]);

  return (
    <div className={css.reviews}>
      <h3>Reviews</h3>
      {loading && <Loader />}
      {reviews.length === 0 && <p> We don`t have any reviews</p>}
      {reviews.length > 0 && (
        <ul className={css.iteam}>
          {reviews.map(review => (
            <li className={css.list} key={review.id}>
              <p className={css.reviewAuthorDescr}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default MovieReviews;
