import css from './ErrorMessage.module.css';

const ErrorMessage = ({ error }) => {
  return (
    <div>
      <p className={css.error}>
        Oops, some error occured &quot;{error}&quot;. Please, try again later
        🤷‍♂️.
      </p>
    </div>
  );
};

export default ErrorMessage;
