import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function NavBar(props) {
  const routes = {
    '/home': 'Home',
    '/add': 'New Question',
    '/leaderboard': 'Leaderboard'
  };

  const currentPath = props.location.pathname;

  return (
    <ul className="nav-bar">
      {Object.entries(routes).map(([k, v]) => (
        <li
          key={k}
          className={(currentPath === k) ? 'active' : null}
        >
          <NavLink to={k}>{v}</NavLink>
        </li>
      ))}
    </ul>
  );
}

const NavBarWithRouter = withRouter(NavBar);

function Nav() {
  return (
    <nav>
      <NavBarWithRouter />
    </nav>
  );
}

export default Nav;