import css from './App.module.css';

import clsx from 'clsx';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import Navigation from '../Navigation/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <div style={{ display: 'flex', gap: '20' }}>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
