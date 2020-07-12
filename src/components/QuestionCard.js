import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class QuestionCard extends React.Component {
  toQuestion = (e) => {
    const { id, history } = this.props;
    history.push(`/questions/${id}`);
  }

  render() {
    const { avatarURL, name, option } = this.props;

    return (
      <div className="card">
        <h3 className="title">{`${name} asks`}</h3>
        <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
        <div className="detail">
          <h4>Would you rather</h4>
          <p className="option">{option}</p>
          <p className="option">or ...</p>
          <button onClick={this.toQuestion}>View Question</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const { avatarURL, name } = users[question.author];
  const option = question.optionOne.text;

  return { avatarURL, name, option };
}

export default withRouter(connect(mapStateToProps)(QuestionCard));