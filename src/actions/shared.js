import * as API from '../utils/_DATA';
import { logOut, logIn } from './authedUser';
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
    // dispatch(logOut());
    
    return Promise.all([
      API._getUsers(),
      API._getQuestions()
    ]).then(([users, questions]) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));

      dispatch(logIn('johndoe'));
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

    return API._saveQuestion(info)
      .then((question) => {
        const qid = question.id;
        dispatch(addQuestionToUser({ authedUser, qid }));
        dispatch(addQuestionToQuestions({ question }));
      });
  };
}