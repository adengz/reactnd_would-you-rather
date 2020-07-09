import React from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';

class QuestionList extends React.Component {
  state = { activeTab: 'unanswered' };

  toggleTab = (e) => {
    this.setState({ activeTab: e.target.value });
  }

  render() {
    const { activeTab } = this.state;
    const questionIds = this.props[activeTab + 'Ids'];

    const tabs = {
      unanswered: 'question-list-tab',
      answered: 'question-list-tab'
    };
    tabs[activeTab] += '-active';

    return (
      <div>
        <ul className="question-list-tabs">
          {Object.entries(tabs).map(([k, v]) => (
            <li key={k}>
              <button className={v} value={k} onClick={this.toggleTab}>
                {`${k} questions`}
              </button>
            </li>
          ))}
        </ul>
        <ul className="card-list">
          {questionIds.map((id) => (
            <li key={id}>
              <QuestionCard id={id}/>
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