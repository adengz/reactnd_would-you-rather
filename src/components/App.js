import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import Login from './Login';
import QuestionList from './QuestionList';
import Question from './Question';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;

    return (
      <div className="App">
        {
          authedUser === null
            ? <Login />
            : <Question match={{params: {id: 'vthrdm985a262al8qx3do'}}} />
        }
      </div>
    );
  };
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(App);