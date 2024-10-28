import css from './Navigation.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const buildCssClasses = ({ isActive }) =>
    clsx(css.link, { [css.active]: isActive });
  return (
    <div>
      <NavLink className={buildCssClasses} to="/">
        Home
      </NavLink>
      <NavLink className={buildCssClasses} to="/movies">
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
