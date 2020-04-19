const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const USER_REQUEST = "USER_REQUEST";
const USER_SUCCESS = "USER_SUCCESS";

import axios from 'axios'
import { BACKEND_URL } from '../../config/entrypoint'

import router from '../../router'

export default {
  namespaced: false,
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    current_user: {}
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    currentUser: state => state.current_user
  },
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading';
    },
    [AUTH_SUCCESS]: (state, data) => {
      state.status = 'success';
      state.token = data.data.token;
      //state.current_user = data.data.user;
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error'
    },
    [AUTH_LOGOUT]: (state) => {
      state.token = ''
      localStorage.removeItem('user-token');
      router.push('/login')
    },
    [USER_SUCCESS]: (state, userApiResp) => {
      state.current_user = userApiResp.data
    }
  },
  actions: {
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST);
        axios
          .post(BACKEND_URL+'login', {
            email: user.email,
            password: user.password
          })
          .then(resp => {
            if (resp.data.token !== undefined) localStorage.setItem('user-token', resp.data.token)
            // Here set the header of your ajax library to the token value.
            commit(AUTH_SUCCESS, resp)
            dispatch(USER_REQUEST, resp.data);
            resolve(resp)
          })
          .catch(err => {
            commit(AUTH_ERROR, err);
            localStorage.removeItem("user-token");
            reject(err);
          });
      });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      return new Promise(resolve => {
        commit(AUTH_LOGOUT);
        localStorage.removeItem("user-token");
        resolve();
      });
    },
    [USER_REQUEST]: ({ commit }, authResponse) => {
      return new Promise(resolve => {
        axios
          .get(BACKEND_URL + 'api/users/' + authResponse.user.id,
            {headers: {'Authorization': 'Bearer ' + authResponse.token}})
          .then(resp => {
            commit(USER_SUCCESS, resp)
            resolve(resp)
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
