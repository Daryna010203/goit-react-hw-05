import css from './MovieCast.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { BsPersonCircle } from 'react-icons/bs';

import { getMovieCredits } from '../../api/movies';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setError(null);
        setLoading(true);

        const data = await getMovieCredits(movieId);
        setCasts(data.cast);

        if (data && data.cast) {
          setCasts(data.cast.slice(0, 12));
        } else {
          setCasts([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieCast();
    }
  }, [movieId]);

  return (
    <div className={css.cast}>
      <h3>Cast</h3>
      {loading && <Loader />}
      {casts.length > 0 && (
        <ul className={css.castList}>
          {casts.map(cast => (
            <li key={cast.id} className={css.card}>
              {cast.profile_path ? (
                <img
                  className={css.images}
                  src={`${IMAGE_BASE_URL}${cast.profile_path}`}
                  alt={`${cast.name} poster`}
                />
              ) : (
                <div className={css.avatar}>
                  <BsPersonCircle />
                  <p>No poster available</p>
                </div>
              )}
              <p className={css.title}>{cast.original_name}</p>
              <p>Character:</p>
              <p>{cast.character}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default MovieCast;
