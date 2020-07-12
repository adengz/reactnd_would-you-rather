import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn } from '../actions/authedUser';

class Login extends React.Component {
  state = { userId: '' };

  handleSelectUser = (e) => {
    this.setState({ userId: e.target.value });
  }

  handleSignIn = (e) => {
    this.props.dispatch(logIn(this.state.userId));
    this.props.history.push('/');
  }

  render() {
    const { users } = this.props;

    const { userId } = this.state;
    let avatar = <div className="avatar"></div>
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

function mapStateToProps({ users }) {
  return { users };
}

export default withRouter(connect(mapStateToProps)(Login));