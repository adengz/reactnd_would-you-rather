import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/authedUser';

class Login extends React.Component {
  state = { userId: '' };

  handleSelectUser = (e) => {
    this.setState({ userId: e.target.value });
  }

  handleSignIn = (e) => {
    this.props.dispatch(logIn(this.state.userId));
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
        <h1 className="card-title">Would you rather...</h1>
        {avatar}
        <div className="card-detail">
          <h3 className="center">Choose your profile to sign in</h3>
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
            className="btn"
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

export default connect(mapStateToProps)(Login);