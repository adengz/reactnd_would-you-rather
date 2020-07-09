import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/authedUser';

class Login extends React.Component {
  state = {
    selectedUserId: ''
  };

  handleSelectUser = (e) => {
    const selectedUserId = e.target.value;
    this.setState({
      selectedUserId
    });
  }

  handleSignIn = (e) => {
    e.preventDefault();

    const userId = this.state.selectedUserId;

    userId === ''
      ? alert('Select your name to sign in')
      : this.props.dispatch(logIn(userId));
  }

  render() {
    const { users } = this.props;

    return (
      <div className="login">
        <h1>Would you rather...</h1>
        <p>Sign in to continue</p>
        <select className="user-select" value={''} onChange={this.handleSelectUser}>
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