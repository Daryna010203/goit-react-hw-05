import css from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Search from '../../components/Search/Search';
import LoadMoreMovies from '../../components/LoadMoreMovies/LoadMoreMovies.jsx';
import ErrorMessage from '../../components/Error/ErrorMessage.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx';

import { searchMovies } from '../../api/movies';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  const onSearch = userSearch => {
    setSearchParams({ query: userSearch, page: 1 });
    setMovies([]);
  };

  useEffect(() => {
    if (!query) return;

    const fetchSearchMovies = async () => {
      try {
        setError(null);
        setLoading(true);

        const data = await searchMovies(query, page);
        setMovies(prevMovies =>
          page === 1 ? data.results : [...prevMovies, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchMovies();
  }, [query, page]);

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setSearchParams({ query, page: page + 1 });
    }
  };

  return (
    <>
      <div className={css.search}>
        <Search onSearch={onSearch} />
      </div>

      {error && <ErrorMessage error={error} />}
      <MovieList movies={movies} />
      {movies.length > 0 && page < totalPages && !loading && (
        <LoadMoreMovies onClick={loadMoreMovies} />
      )}

      {loading && <Loader />}
    </>
  );
};

export default MoviesPage;
