import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = ({ currentPage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink
          to="/"
          className={`navbar-brand ${currentPage === 'accueil' ? 'active' : ''}`}
          activeclassname="active"
          exact
        >
          Accueil
        </NavLink>
        <NavLink
          to="/produits"
          className={`navbar-brand ${currentPage === 'produits' ? 'active' : ''}`}
          activeclassname="active"
        >
          Produits
        </NavLink>
      </div>
    </nav>
  );
};

export default Menu;
