import React from 'react';
import { connect } from 'react-redux';
import { handleVote } from '../actions/shared';
import VoteBar from './VoteBar';
import NotFound from './NotFound';

class Vote extends React.Component {
  state = { selectedOption: null };

  handleSelect = (e) => {
    this.setState({ selectedOption: e.target.value });
  }

  handleSubmit = (e) => {
    const { match, dispatch } = this.props;
    const { id } = match.params;

    dispatch(handleVote(id, this.state.selectedOption));
  }

  render() {
    const { name, avatarURL, options } = this.props;

    return (
      <div className="card">
        <h2 className="title">{`${name} asks`}</h2>
        <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
        <div className="detail">
          <h3>Would you rather</h3>
          {Object.entries(options).map(([k, v]) => (
            <p key={k} className="option">
              <label>
                <input
                  type="radio"
                  name="option"
                  value={k}
                  checked={this.state.selectedOption === k}
                  onChange={this.handleSelect}
                />
                {v.text}
              </label>
            </p>
          ))}
          <button
            onClick={this.handleSubmit}
            disabled={this.state.selectedOption === null}
          >
            Submit Answer and View Results
          </button>
        </div>
      </div>
    );
  }
}

function Result(props) {
  const { name, avatarURL, answer } = props;
  // create a deep copy of options
  const options = JSON.parse(JSON.stringify(props.options));

  let totalVotes = 0;
  for (let o in options) {
    totalVotes += options[o].votes.length;
    options[o].className = 'option';
    (o === answer) && (options[o].className += ' mine');
  }
  for (let o in options) {
    options[o].ratio = Math.round(options[o].votes.length / totalVotes * 100);
  }

  return (
    <div className="card">
      <h2 className="title">{`Asked by ${name}`}</h2>
      <img className="avatar" src={avatarURL} alt={`${name}'s avatar`} />
      <div className="detail">
        <h3>Results:</h3>
        <VoteBar options={options} totalVotes={totalVotes} />
        {Object.entries(options).map(([k, v]) => (
          <p key={k} className={v.className}>
            {(v.className.endsWith('mine')) && (
              <span style={{ textDecoration: 'underline' }}>
                Your choice<br/>
              </span>
            )}
            {v.votes.length} of {totalVotes} ({v.ratio}%) would rather
            <br/>{v.text}
          </p>
        ))}
      </div>
    </div>
  );
}

function Question(props) {
  const { notFound, answer } = props;
  if (notFound) return <NotFound />;
  return answer === undefined ? <Vote {...props} /> : <Result {...props} />;
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  if (question === undefined) {
    return { notFound: true };
  }

  const { avatarURL, name } = users[question.author];
  const { optionOne, optionTwo } = question;
  const answer = users[authedUser].answers[id];

  return {
    avatarURL,
    name,
    options: { optionOne, optionTwo },
    answer
  };
}

export default connect(mapStateToProps)(Question);