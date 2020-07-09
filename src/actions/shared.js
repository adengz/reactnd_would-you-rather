import { _getUsers, _getQuestions } from '../utils/_DATA'
import { logOut, logIn } from './authedUser';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';

export function handleInitialData() {
  return (dispatch) => {
    // dispatch(logOut());
    
    return Promise.all([
      _getUsers(),
      _getQuestions()
    ]).then(([users, questions]) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      
      dispatch(logIn('tylermcginnis'));
    });
  };
}