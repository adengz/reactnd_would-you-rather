import React from 'react';
import { connect } from 'react-redux';

class QuestionList extends React.Component {
  state = {
    answered: false
  };

  render() {
    const questionIds = this.props[this.state.answered? 'answeredIds':'unansweredIds'];

    return (
      <div>
        <div className="question-list-tab"></div>
        <ul className="question-list">
          {questionIds.map((id) => (
            <li key={id}>
              <p>Question ID: {id}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const questionIds = Object.keys(questions);
  const { answers } = users[authedUser];
  questionIds.sort((a, b) => questions[b].timestamp - questions[a].timesstamp);

  return {
    answeredIds: questionIds.filter((id) => answers.hasOwnProperty(id)),
    unansweredIds: questionIds.filter((id) => !answers.hasOwnProperty(id))
  };
}

export default connect(mapStateToProps)(QuestionList);