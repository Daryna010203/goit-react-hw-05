import axios from 'axios';

const token =
  eyJhbGciOiJIUzI1NiJ9
    .eyJhdWQiOiIxZjcxNDAyNmNiZmYwOTgxYWI0ZjBjYzQwMmNlM2IwMiIsIm5iZiI6MTczMDE1MDk1MC4yNjE1MzEsInN1YiI6IjY3MTdmZjU4NmQ2YjcwNWRjODcwZjAyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ
    .YoMAYmqoWrD356XQk1aJ2pmN6dRjZTwrnXaq_PXSkQk;

const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  params: {
    api_key: '1f714026cbff0981ab4f0cc402ce3b02',
    include_adult: false,
    language: 'en-US',
    page: '1',
  },
});

export const getTrendingmovies = async params => {
  const { data } = await movieInstance.get('/trending/movie/day', {
    params,
  });
  return data;
};

export const searchMovies = async q => {
  const { data } = await movieInstance.get('/search/movie', {
    params: {
      q,
    },
  });
  return data;
};

export const getMovieDetails = async id => {
  const { data } = await movieInstance.get(`/movie/${id}`);
  return data;
};

export const getMovieCredits = async id => {
  const { data } = await movieInstance.get(`/movie/${id}/credits`);
  return data;
};

export const getMovieReviews = async id => {
  const { data } = await movieInstance.get(`/movie/${id}/reviews`);
  return data;
};
