import { loginStatus, actions } from './login.constant';

const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } = actions;

const INITIAL_STATE = {
  account: {},
  loginStatus: loginStatus.notStart,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loginStatus: loginStatus.inProgress,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: loginStatus.success,
        account: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginStatus: loginStatus.fail,
      };
    default:
      return state;
  }
}
