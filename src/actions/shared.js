import * as API from '../utils/_DATA';
import { logOut, logIn } from './authedUser';
import { receiveUsers, addAnswerToUser } from './users';
import { receiveQuestions, addAnswerToQuestion } from './questions';

export function handleInitialData() {
  return (dispatch) => {
    // dispatch(logOut());
    
    return Promise.all([
      API._getUsers(),
      API._getQuestions()
    ]).then(([users, questions]) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      
      dispatch(logIn('tylermcginnis'));
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