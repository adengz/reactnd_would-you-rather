import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends React.Component {
  state = { userId: '' };

  handleSelectUser = (e) => {
    this.setState({ userId: e.target.value });
  }

  handleSignIn = (e) => {
    const { dispatch, location, history } = this.props;
    dispatch(setAuthedUser(this.state.userId));
    const { from } = location.state || { from: { pathname: '/' } };
    history.replace(from);
  }

  render() {
    const { authedUser, users } = this.props;

    if (authedUser !== null) {
      return <Redirect to="/" />;
    }

    const { userId } = this.state;
    let avatar = <div className="avatar"></div>;
    if (userId !== '') {
      const { avatarURL, name } = users[userId];
      avatar = <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />;
    }

    return (
      <div className="card">
        <h1 className="title">Would you rather...</h1>
        {avatar}
        <div className="detail">
          <p className="center">Choose your profile to sign in</p>
          <select
            className="dropdown"
            value={this.state.userId}
            onChange={this.handleSelectUser}
          >
            <option value={''} disabled>Select User</option>
            {Object.keys(users).map((id) => (
              <option key={id} value={id}>
                {users[id].name}
              </option>
            ))}
          </select>
          <button
            onClick={this.handleSignIn}
            disabled={this.state.userId === ''}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return { authedUser, users };
}

export default withRouter(connect(mapStateToProps)(Login));