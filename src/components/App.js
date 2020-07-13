import React, { Fragment }  from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import QuestionList from './QuestionList';
import Question from './Question';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import NotFound from './NotFound';

function PrivateRoute({ component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => (
        authed
          ? <Component {...props} />
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
      )}
    />
  );
}

class App extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.props.dispatch(handleInitialData()).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    const { authed } = this.props;

    return (
      <Fragment>
        <LoadingBar />
        {authed && <Nav />}
        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" exact component={QuestionList} authed={authed} />
            <PrivateRoute path="/questions/:id" component={Question} authed={authed} />
            <PrivateRoute path="/add" component={NewQuestion} authed={authed} />
            <PrivateRoute path="/leaderboard" component={Leaderboard} authed={authed} />
            <PrivateRoute path="*" component={NotFound} authed={authed} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authed: authedUser !== null };
}

export default connect(mapStateToProps)(App);