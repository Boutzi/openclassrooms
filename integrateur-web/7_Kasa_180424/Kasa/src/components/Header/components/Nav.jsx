import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <ul className="menu">
        <li className="menu__item">
          <NavLink
            to="/"
            className="menu__item__link"
          >
            Accueil
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink
            to="/about"
            className="menu__item__link"
          >
            À Propos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
