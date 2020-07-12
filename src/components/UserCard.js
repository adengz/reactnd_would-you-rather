import React from 'react';
import { connect } from 'react-redux';

function UserCard(props) {
  const { avatarURL, name, questionsCreated, questionsAnswered} = props;

  return (
    <div className="card">
      <h3 className="title">{name}</h3>
      <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
      <div className="detail">
        <h4>Total score: {questionsCreated + questionsAnswered}</h4>
        <p className="option">Questions created: {questionsCreated}</p>
        <p className="option">Questions answered: {questionsAnswered}</p>
      </div>
    </div>
  );
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  const { avatarURL, name } = user;
  const questionsCreated = user.questions.length;
  const questionsAnswered = Object.keys(user.answers).length;

  return {
    avatarURL,
    name,
    questionsCreated,
    questionsAnswered
  };
}

export default connect(mapStateToProps)(UserCard);