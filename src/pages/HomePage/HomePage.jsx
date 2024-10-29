import css from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrendingmovies } from '../../api/movies';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingmovies();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={css.homePage}>
      <h2>Trending Movies</h2>
      {error && <p className={css.error}>Error: {error}</p>}
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
