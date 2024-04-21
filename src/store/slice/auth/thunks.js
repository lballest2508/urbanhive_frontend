import { urbanHiveApi } from '../../../api/api';
import { login as loginUser } from './authSlice';

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await urbanHiveApi.post('/user/login', {
      username,
      password,
    });

    const { data } = response;

    if (!response.status === 200) {
      throw new Error(data.message || 'Login failed');
    }

    const { token, user } = data;

    dispatch(loginUser({ token, user }));
    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Login error:', error);
  }
};
