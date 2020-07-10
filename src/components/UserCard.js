import React from 'react';
import { connect } from 'react-redux';

function UserCard(props) {
  const { avatarURL, name, questionsContributed, questionsAnswered} = props;

  return (
    <div>
      <h3>{name}</h3>
      <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
      <p>Questions contributed: {questionsContributed}</p>
      <p>Questions answered: {questionsAnswered}</p>
      <p>Total score: {questionsContributed + questionsAnswered}</p>
    </div>
  );
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  const { avatarURL, name } = user;
  const questionsContributed = user.questions.length;
  const questionsAnswered = Object.keys(user.answers).length;

  return {
    avatarURL,
    name,
    questionsContributed,
    questionsAnswered
  };
}

export default connect(mapStateToProps)(UserCard);