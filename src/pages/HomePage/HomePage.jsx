import css from './HomePage.module.css';

import { useEffect, useState } from 'react';

import { getTrendingmovies } from '../../api/movies';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError(null);
        setLoading(true);

        const data = await getTrendingmovies();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className={css.homePage}>
      <h2>Trending Movies</h2>
      {error && <ErrorMessage error={error} />}
      <MovieList movies={movies} />
      {loading && <Loader />}
    </div>
  );
};

export default HomePage;
