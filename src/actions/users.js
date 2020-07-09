export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function addAnswerToUser({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer
  };
}