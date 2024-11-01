import css from './Search.module.css';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { TfiSearch } from 'react-icons/tfi';

import toast, { Toaster } from 'react-hot-toast';

const initialValues = { userSearch: '' };

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values, actions) => {
    if (!values.userSearch.trim()) {
      toast.error('Enter a search word');
      return;
    }
    onSearch(values.userSearch);

    actions.resetForm();
  };

  return (
    <header className={css.header}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div>
            <button type="submit" name="userSearch" className={css.Btn}>
              <TfiSearch />
            </button>
            <Field
              type="text"
              className={css.text}
              name="userSearch"
              placeholder="Search movies..."
              autoFocus
            />
            <ErrorMessage
              className={css.errorMessage}
              name="userSearch"
              component="span"
            />
          </div>
          <Toaster />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
