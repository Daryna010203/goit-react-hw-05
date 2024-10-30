import css from './MovieDetailsPage.module.css';

import { useState, useEffect } from 'react';
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  Outlet,
} from 'react-router-dom';
import { getMovieDetails } from '../../api/movies';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  const backUrl = location.state?.from || '/movies';
  const goBack = () => navigate(backUrl);

  return (
    <div>
      <button onClick={goBack}>Go back</button>

      <h1>{movie.title}</h1>
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
          <h4>
            Vote average:{' '}
            <span className={css.average}>{movie.vote_average}</span>
          </h4>
          <h4>Overview</h4>
          <p>{movie.overview}</p>

          <h4>Genres</h4>
          <p className={css.geners}>
            {movie.genres.map(genre => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </p>
        </div>
      </div>

      <h4>Additional Information</h4>
      <div className={css.inform}>
        <Link state={{ from: backUrl }} to={`/movies/${movieId}/credits`}>
          Credits
        </Link>
        <Link state={{ from: backUrl }} to={`/movies/${movieId}/reviews`}>
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
