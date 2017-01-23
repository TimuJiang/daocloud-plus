import Vue from 'vue';
// import api from '../../api';
import * as types from '../mutation-types';
import shortid from 'shortid';

const AUTH_ALIAS = 'auth.alias';
const AUTH_ACCESS_TOKEN = 'auth.access_token';

const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    auth: {
      check() {
        return this.access_token !== null && this.access_token.length > 0;
      },
      alias: localStorage.getItem(AUTH_ALIAS),
      access_token: localStorage.getItem(AUTH_ACCESS_TOKEN),
    },
  },
  mutations: {
    ACCOUNT_SETTINGS_INIT: (state) => {
      let alias = localStorage.getItem(AUTH_ALIAS);
      if (!alias) {
        alias = shortid.generate();
        Vue.set(state.auth, 'alias', alias);
        localStorage.setItem(AUTH_ALIAS, alias);
      }
    },
    ACCOUNT_SETTINGS_SUBMIT_SUCCESS: (state, data) => {
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
    accountSettingsInit({ commit }) {
      commit(types.ACCOUNT_SETTINGS_INIT);
    },
    accountSettingsSubmit({ commit }, params) {
      commit(types.ACCOUNT_SETTINGS_SUBMIT_SUCCESS, { access_token: params.accessToken });
    },
  },
};
