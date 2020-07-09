import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/authedUser';

class Login extends React.Component {
  handleSignIn = (e) => {
    e.preventDefault();

    // TODO: implement sign in action
  }

  render() {
    const { users } = this.props;

    return (
      <div className="login">
        <h1>Would you rather...</h1>
        <p>Sign in to continue</p>
        <select value={''}>
          <option value={''} disabled>Select User</option>
          {Object.keys(users).map((id) => (
            <option key={id} value={id}>{users[id].name}</option>
          ))}
        </select>
        <button className="btn" onClick={this.handleSignIn}>Sign In</button>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Login);