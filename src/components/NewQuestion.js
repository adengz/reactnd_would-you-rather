import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleNewQuestion } from '../actions/shared';

class NewQuestion extends React.Component {
  state = { optionOneText: '', optionTwoText: '' };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    this.props.dispatch(handleNewQuestion(this.state)).then(() => {
      this.props.history.push('/home');
    });
  }

  render() {
    return (
      <div className="card">
        <h2 className="title center">Create New Question</h2>
        <h3 className="center">Would you rather</h3>
        <input
          className="text-input"
          type="text"
          name="optionOneText"
          value={this.state.optionOneText}
          onChange={this.handleInput}
        />
        <p className="center">or</p>
        <input
          className="text-input"
          type="text"
          name="optionTwoText"
          value={this.state.optionTwoText}
          onChange={this.handleInput}
        />
        <button
          onClick={this.handleSubmit}
          disabled={Object.values(this.state).includes('')}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default withRouter(connect()(NewQuestion));