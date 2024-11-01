import css from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Search from '../../components/Search/Search';
import LoadMoreMovies from '../../components/LoadMoreMovies/LoadMoreMovies.jsx';
import ErrorMessage from '../../components/Error/ErrorMessage.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { searchMovies } from '../../api/movies';

const MoviesPage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onSearch = userSearch => {
    setQuery(userSearch);
    setPage(1);
    setMovies([]);
  };

  useEffect(() => {
    if (query === null) return;
    async function fetchSearchMovies() {
      try {
        setError(null);
        setLoading(true);

        const data = await searchMovies(query);
        setMovies(data.results);
        console.log(data.results);

        const totalPages = data.total_pages;

        // setMovies(prevMovies => [...prevMovies, ...fetchSearchMovies]);
        setTotalPages(totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchMovies();
  }, [query, page]);

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };
  useEffect(() => {
    if (page >= 1) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 500);
    }
  }, [movies, page]);

  return (
    <>
      <div className={css.search}>
        <Search onSearch={onSearch} />
      </div>

      {error && <ErrorMessage error={error} />}
      <ul className={css.text}>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
      {movies.length > 0 && page < totalPages && !loading && (
        <LoadMoreMovies onClick={loadMoreMovies} />
      )}
      {loading && <Loader />}
    </>
  );
};

export default MoviesPage;
