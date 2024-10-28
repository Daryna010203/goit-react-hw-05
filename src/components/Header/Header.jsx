import { NavLink } from 'react-router-dom';
import css from './header.module.css';
import clsx from 'clsx';

const buildCssClasses = ({ isActive }) =>
  clsx(css.link, isActive && css.active);

const Header = () => {
  return (
    <header>
      <NavLink className={buildCssClasses} to="/">
        Home
      </NavLink>
      <NavLink className={buildCssClasses} to="/movies">
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
