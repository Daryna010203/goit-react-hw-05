import css from './Search.module.css';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import { TfiSearch } from 'react-icons/tfi';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSearch, initialQuery }) => {
  const initialValues = { userSearch: initialQuery || '' };

  const handleSubmit = (values, actions) => {
    if (!values.userSearch.trim()) {
      toast.error('Enter a search word');
      return;
    }
    onSearch(values.userSearch);
    actions.resetForm({ values: { userSearch: values.userSearch } });
  };

  return (
    <div className={css.header}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className={css.form}>
          <div>
            <button type="submit" name="userSearch">
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
    </div>
  );
};

export default SearchBar;
