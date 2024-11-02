import css from './Navigation.module.css';

import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const buildCssClasses = ({ isActive }) =>
    clsx(css.link, { [css.active]: isActive });
  return (
    <div className={css.navigate}>
      <NavLink className={buildCssClasses} to="/">
        <span className={css.text}>Home</span>
      </NavLink>
      <NavLink className={buildCssClasses} to="/movies">
        <span className={css.text}>Movies</span>
      </NavLink>
    </div>
  );
};

export default Navigation;
