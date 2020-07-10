import React from 'react';
import { connect } from 'react-redux';
import { handleNewQuestion } from '../actions/shared';

class NewQuestion extends React.Component {
  state = { optionOneText: '', optionTwoText: '' };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    this.props.dispatch(handleNewQuestion(this.state));
    // TODO: redirect to home
  }

  render() {
    return (
      <div className="question">
        <h3>Create New Question</h3>
        <h3>Would you rather</h3>
        <input
          type="text"
          name="optionOneText"
          value={this.state.optionOneText}
          onChange={this.handleInput}
        />
        <p>or</p>
        <input
          type="text"
          name="optionTwoText"
          value={this.state.optionTwoText}
          onChange={this.handleInput}
        />
        <button
          className="btn"
          onClick={this.handleSubmit}
          disabled={Object.values(this.state).includes('')}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default connect()(NewQuestion);