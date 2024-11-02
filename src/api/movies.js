import axios from 'axios';

const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjcxNDAyNmNiZmYwOTgxYWI0ZjBjYzQwMmNlM2IwMiIsIm5iZiI6MTczMDIzMjMwOC43MDEzNDE2LCJzdWIiOiI2NzE3ZmY1ODZkNmI3MDVkYzg3MGYwMjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sXIqD2iLM-iNmKKFYrUWb3iNKFT2LkrhSEXw3ZUyu9A`,
  },
  params: {
    api_key: '1f714026cbff0981ab4f0cc402ce3b02',
    include_adult: false,
    language: 'en-US',
  },
});

export const getTrendingmovies = async (params, page = 1) => {
  const { data } = await movieInstance.get('/trending/movie/day', {
    params,
    page,
  });
  return data;
};

export const searchMovies = async (query, page) => {
  const { data } = await movieInstance.get('/search/movie', {
    params: {
      query,
      page,
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
