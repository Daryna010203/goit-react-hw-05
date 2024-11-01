import css from './MovieCast.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../api/movies';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { BsPersonCircle } from 'react-icons/bs';

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
        console.log(data.cast);
        setCasts(data.cast);

        console.log('Fetched Casts Data:', data);

        if (data && data.cast) {
          setCasts(data.cast.slice(0, 12));
        } else {
          setCasts([]);

          console.warn('No casts found in the response');
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

  console.log(casts);

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
                  src={`${IMAGE_BASE_URL}${cast.profile_path}`}
                  alt={`${cast.name} poster`}
                  style={{ maxWidth: '120px', borderRadius: '8px' }}
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
