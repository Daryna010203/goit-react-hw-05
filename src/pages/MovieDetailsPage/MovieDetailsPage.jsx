import css from './MovieDetailsPage.module.css';

import { useState, useEffect, Suspense } from 'react';
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  Outlet,
} from 'react-router-dom';

import { getMovieDetails } from '../../api/movies';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  const backUrl = location.state?.from || '/movies';
  const goBack = () => navigate(backUrl);

  const movieAverage = movie.vote_average.toFixed(1);

  return (
    <div>
      <button onClick={goBack}>Go back</button>

      <h1>{movie.title}</h1>
      {loading && <Loader />}
      <div className={css.position}>
        <div>
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={`${movie.title} poster`}
              style={{ width: '300px', borderRadius: '8px' }}
            />
          ) : (
            <p>No poster available</p>
          )}
        </div>
        <div>
          <h3>
            Vote average: <span className={css.average}>{movieAverage}</span>
          </h3>
          <h3>Overview</h3>
          <p>{movie.overview}</p>

          <h3>Genres</h3>

          <li className={css.geners}>
            {movie.genres.map(genre => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </li>
        </div>
        {error && <ErrorMessage error={error} />}
      </div>

      <h3>Additional Information</h3>
      <div className={css.inform}>
        <Link state={{ from: backUrl }} to={`/movies/${movieId}/credits`}>
          Cast
        </Link>

        <Link state={{ from: backUrl }} to={`/movies/${movieId}/reviews`}>
          Reviews
        </Link>
      </div>
      <Suspense fallback={<div className={css.text}>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;
