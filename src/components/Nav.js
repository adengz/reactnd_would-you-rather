import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

function NavBar(props) {
  const routes = {
    '/': 'Home',
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
  handleSignOut = (e) => {
    this.props.dispatch(setAuthedUser(null));
    this.props.history.push('/login');
  }

  render() {
    const { avatarURL, name } = this.props;
    
    return (
      <div className="auth-user">
        <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
        <p className="name">
          {name}
          <button
            className="signout"
            onClick={this.handleSignOut}
          >
            Sign Out
          </button>
        </p>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const { avatarURL, name } = users[authedUser];
  return { avatarURL, name };
}

const ConnectedAuthedUserInfo = withRouter(connect(mapStateToProps)(AuthedUserInfo));

function Nav() {
  return (
    <nav className="header">
      <NavBarWithRouter />
      <ConnectedAuthedUserInfo />
    </nav>
  );
}

export default Nav;