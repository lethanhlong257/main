const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const loginStatus = {
  notStart: 1,
  inProgress: 2,
  success: 3,
  fail: 4,
};
const actions = { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL };

export {
  loginStatus,
  actions,
};
