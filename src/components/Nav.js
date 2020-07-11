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

class AuthedUserInfo extends React.Component {
  render() {
    const { avatarURL, name } = this.props;
    
    return (
      <div className="auth-user">
        <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
        <p className="name">
          {name}
          <button className="logout">Logout</button>
        </p>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const { avatarURL, name } = users[authedUser];
  return { avatarURL, name };
}

const ConnectedAuthedUserInfo = connect(mapStateToProps)(AuthedUserInfo);

function Nav() {
  return (
    <nav>
      <NavBarWithRouter />
      <ConnectedAuthedUserInfo />
    </nav>
  );
}

export default Nav;