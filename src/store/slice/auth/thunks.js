import { urbanHiveApi } from '../../../api/api';
import { login as loginUser, logout as logoutUser } from './authSlice';

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await urbanHiveApi.post('/user/login', {
      username,
      password,
    });

    const { data } = response;

    if (response.status != 200) {
      throw new Error(data.message || 'Login failed');
    }

    const { access_token, user } = data;

    dispatch(loginUser({ access_token, user }));
    localStorage.setItem('access_token', access_token);
    window.location.reload();
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('access_token');
    dispatch(logoutUser());
    window.location.reload();
  } catch (error) {
    console.error('Logout error:', error);
  }
};
