export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export function logIn(userId) {
  return {
    type: LOG_IN,
    userId
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}