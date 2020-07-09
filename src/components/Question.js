import React from 'react';
import { connect } from 'react-redux';

class Vote extends React.Component {
  state = { selectedOption: null };

  handleSelect = (e) => {
    this.setState({ selectedOption: e.target.value });
  }

  handleSubmit = (e) => {
    // TODO: Implement answer submission
  }

  render() {
    const { name, avatarURL, options } = this.props;

    return (
      <div className="question">
        <h4>{`${name} asks`}</h4>
        <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
        <h4>Would you rather</h4>
        {Object.entries(options).map(([k, v]) => (
          <p key={k}>
            <label className="option">
              <input
                type="radio"
                name="option"
                value={k}
                checked={this.state.selectedOption === k}
                onChange={this.handleSelect}
              />
              {v.text}
            </label>
          </p>
        ))}
        <button className="btn" onClick={this.handleSubmit}>
          Submit Answer
        </button>
      </div>
    );
  }
}

const ConnectedVote = connect(mapStateToProps)(Vote);

function Question(props) {
  const { id } = props;

  return (
    <ConnectedVote match={{params: { id }}} />
  );
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const { avatarURL, name } = users[question.author];
  const { optionOne, optionTwo } = question;
  const answer = users[authedUser].answers[id];

  return {
    id,
    avatarURL,
    name,
    options: { optionOne, optionTwo },
    answer
  };
}

export default connect(mapStateToProps)(Question);