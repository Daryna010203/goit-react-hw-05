import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={css.loadBtn}>
      <button onClick={onClick} type="button">
        LoadMoreBtn
      </button>
    </div>
  );
};

export default LoadMoreBtn;
