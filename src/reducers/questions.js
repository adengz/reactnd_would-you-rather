import {
  RECEIVE_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  ADD_QUESTION_TO_QUESTIONS
} from '../actions/questions';

export default function users(state={}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_ANSWER_TO_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      };
    case ADD_QUESTION_TO_QUESTIONS:
      return {
        ...state,
        [action.question.id]: action.question
      };
    default:
      return state;
  }
}