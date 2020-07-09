import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import Login from './Login';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, users } = this.props;

    return (
      <div className="App">
        {
          authedUser === null
            ? <Login />
        : <div>Welcome, {users[authedUser].name}!</div>
        }
      </div>
    );
  };
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(App);