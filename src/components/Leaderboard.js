import React from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard';

function Leaderboard(props) {
  return (
    <div>
      <ul>
        {props.userIds.map((id) => (
          <li key={id}>
            <UserCard id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const getUserScore = (user) => (
  Object.keys(user.answers).length + user.questions.length
)

function mapStateToProps({ users }) {
  const userIds = Object.keys(users);
  userIds.sort((a, b) => getUserScore(users[b]) - getUserScore(users[a]));

  return { userIds };
}

export default connect(mapStateToProps)(Leaderboard);