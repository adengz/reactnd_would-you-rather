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
      unanswered: 'tab',
      answered: 'tab'
    };
    tabs[activeTab] += '-active';

    return (
      <div>
        <div className="tabs">
          {Object.entries(tabs).map(([k, v]) => (
            <button key={k} className={v} value={k} onClick={this.toggleTab}>
              {`${k} questions`}
            </button>
          ))}
        </div>
        <ul className="question-list">
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