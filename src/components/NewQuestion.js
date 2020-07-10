import React from 'react';
import { connect } from 'react-redux';

class NewQuestion extends React.Component {
  state = { optionOne: '', optionTwo: '' };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    // TODO: Implement new question submission
  }

  render() {
    return (
      <div className="question">
        <h3>Create New Question</h3>
        <h3>Would you rather</h3>
        <input
          type="text"
          name="optionOne"
          value={this.state.optionOne}
          onChange={this.handleInput}
        />
        <p>or</p>
        <input
          type="text"
          name="optionTwo"
          value={this.state.optionTwo}
          onChange={this.handleInput}
        />
        <button
          className="btn"
          onClick={this.handleSubmit}
          disabled={(this.state.optionOne === '') || (this.state.optionTwo === '')}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default connect()(NewQuestion);