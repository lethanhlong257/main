import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import jwt from 'jsonwebtoken';

import { actions } from './login.constant';

const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } = actions;
function login(dispatch) {
  return async (username, password) => {
    dispatch({ type: LOGIN_START });
    const tokenLocal = localStorage.getItem('token');
    if (tokenLocal) {
      jwt.verify(tokenLocal, 'assigment', (err, decoded) => {
        if (err) return err;
        dispatch({ type: 'LOGIN_SUCCESS', payload: decoded });
        dispatch(push('/dashboard'));
      });
    }
    const response = await fetch('http://localhost:8080/api/accounts/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (result.error) {
      dispatch({ type: LOGIN_FAIL });
    } else {
      const token = jwt.sign({
        username: username || '',
      }, 'assigment', { expiresIn: 3600 * 24 });
      localStorage.setItem('token', token);
      dispatch({ type: LOGIN_SUCCESS, payload: result.account });
      dispatch(push('/dashboard'));
    }
  };
}

export { login };
