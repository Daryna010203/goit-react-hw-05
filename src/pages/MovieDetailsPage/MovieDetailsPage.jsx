import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../api/movies';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetailsPage() {
  const { movieId } = useParams(); // Ensure it matches the path param
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
      {movie.poster_path ? (
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={`${movie.title} poster`}
          style={{ width: '300px', borderRadius: '8px' }}
        />
      ) : (
        <p>No poster available</p>
      )}
      <h2>Vote average: {movie.vote_average}</h2>
      <h2>Overview</h2>
      <p>{movie.overview}</p>

      <h2>Genres</h2>
      <p>
        {movie.genres.map(genre => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </p>

      <h2>Additional Information</h2>
      <Link state={{ from: backUrl }} to={`/movies/${movieId}/credits`}>
        Credits
      </Link>
      <Link state={{ from: backUrl }} to={`/movies/${movieId}/reviews`}>
        Reviews
      </Link>
    </div>
  );
}

export default MovieDetailsPage;
