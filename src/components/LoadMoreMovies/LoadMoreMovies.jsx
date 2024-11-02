import css from './LoadMoreMovies.module.css';

const LoadMoreMovies = ({ onClick }) => {
  return (
    <div className={css.loadBtn}>
      <button onClick={onClick} type="button">
        Load More
      </button>
    </div>
  );
};

export default LoadMoreMovies;
