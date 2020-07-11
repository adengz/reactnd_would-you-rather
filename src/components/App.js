import React, { Fragment }  from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import QuestionList from './QuestionList';
import Question from './Question';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Nav from './Nav';

class App extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.props.dispatch(handleInitialData());
    this.setState({ loading: false });
    this.props.history.push('/login');
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    const { authedUser } = this.props;

    return (
      <Fragment>
        <LoadingBar />
        {authedUser !== null && <Nav />}
        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/home" component={QuestionList} />
            <Route path="/questions/:id" component={Question} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/leaderboard" component={Leaderboard} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default withRouter(connect(mapStateToProps)(App));