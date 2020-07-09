import React from 'react';
import { connect } from 'react-redux';

function QuestionCard(props) {
  const { avatarURL, name, option } = props;

  return (
    <div className="question">
      <h4>{`${name} asks`}</h4>
      <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
      <h4>Would you rather</h4>
      <p>{option}</p>
      <p>or</p>
      <p>...</p>
      <button>View Question</button>
    </div>
  );
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const { avatarURL, name } = users[question.author];
  const option = question.optionOne.text;

  return { avatarURL, name, option };
}

export default connect(mapStateToProps)(QuestionCard);