import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';

class QuestionList extends React.Component {
  state = { activeTab: 'unanswered' };

  toggleTab = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab } = this.state;
    const questionIds = this.props[activeTab + 'Ids'];

    const lists = ['unanswered', 'answered'];

    return (
      <Fragment>
        <ul className="tabs">
          {lists.map((tab) => (
            <li
              key={tab}
              className={(tab === activeTab) ? 'active' : null}
              onClick={() => this.toggleTab(tab)}
            >
              {`${tab} questions`}
            </li>
          ))}
        </ul>
        <ul className="question-list">
          {questionIds.map((id) => (
            <li key={id}>
              <QuestionCard id={id}/>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const questionIds = Object.keys(questions);
  const { answers } = users[authedUser];
  questionIds.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    answeredIds: questionIds.filter((id) => answers.hasOwnProperty(id)),
    unansweredIds: questionIds.filter((id) => !answers.hasOwnProperty(id))
  };
}

export default connect(mapStateToProps)(QuestionList);