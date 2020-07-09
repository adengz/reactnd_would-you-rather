import React from 'react';
import { connect } from 'react-redux';

function Question(props) {
  return (
    <div>
      {props.answered? 'Result':'Vote'} Page
    </div>
  );
}

function mapStateToPropsQuestion({ authedUser, users }, props) {
  const { id } = props.match.params;

  return {
    id,
    answered: users[authedUser].answers.hasOwnProperty(id)
  };
}

export default connect(mapStateToPropsQuestion)(Question);