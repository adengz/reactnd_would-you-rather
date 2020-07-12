import React from 'react';
import { connect } from 'react-redux';

function QuestionCard(props) {
  const { avatarURL, name, option } = props;

  return (
    <div className="card">
      <h3 className="card-title">{`${name} asks`}</h3>
      <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
      <div className="card-detail">
        <h4>Would you rather</h4>
        <p className="option">{option}</p>
        <p className="option">or ...</p>
        <button>View Question</button>
      </div>      
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