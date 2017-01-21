import Vue from 'vue';
// import api from '../../api';
// import * as types from '../mutation-types';

const AUTH_ACCESS_TOKEN = 'auth.access_token';

const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    auth: {
      check() {
        return this.access_token !== null && this.access_token.length > 0;
      },
      access_token: localStorage.getItem(AUTH_ACCESS_TOKEN),
    },
  },
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED: (state, { data }) => {
      if (!data) {
        Vue.set(state.auth, 'access_token', null);
        localStorage.removeItem(AUTH_ACCESS_TOKEN);
        return;
      }
      Vue.set(state.auth, 'access_token', data.access_token);
      localStorage.setItem(AUTH_ACCESS_TOKEN, data.access_token);
    },
  },
  actions: {
  },
};
