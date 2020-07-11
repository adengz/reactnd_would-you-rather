import * as API from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';
import {
  receiveUsers,
  addAnswerToUser,
  addQuestionToUser
} from './users';
import {
  receiveQuestions,
  addAnswerToQuestion,
  addQuestionToQuestions
} from './questions';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());

    return Promise.all([
      API._getUsers(),
      API._getQuestions()
    ]).then(([users, questions]) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleVote(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const info = {
      authedUser,
      qid,
      answer
    };

    dispatch(addAnswerToUser(info));
    dispatch(addAnswerToQuestion(info));

    return API._saveQuestionAnswer(info);
  };
}

export function handleNewQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const info = {
      optionOneText,
      optionTwoText,
      author: authedUser
    };

    dispatch(showLoading());

    return API._saveQuestion(info)
      .then((question) => {
        const qid = question.id;
        dispatch(addQuestionToUser({ authedUser, qid }));
        dispatch(addQuestionToQuestions({ question }));
        dispatch(hideLoading());
      });
  };
}