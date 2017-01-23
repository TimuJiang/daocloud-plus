import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorageglobal.localStorage;
// const JSONglobal.JSON;

export default {
  state: {
    buildFlows: {
      error: null,
      lists: [],
    },
    apps: {
      error: null,
      lists: [],
    },
  },
  mutations: {
    GET_BUILD_FLOW_LISTS_SUCCESS: (state, { build_flows }) => {
      Vue.set(state.buildFlows, 'error', null);
      Vue.set(state.buildFlows, 'lists', build_flows);
    },
    GET_BUILD_FLOW_LISTS_ERROR: (state, response) => {
      Vue.set(state.buildFlows, 'error', {
        code: response.status,
        message: response.statusText,
      });
    },
    GET_APP_LISTS_SUCCESS: (state, { app }) => {
      Vue.set(state.apps, 'error', null);
      Vue.set(state.apps, 'lists', app);
    },
    GET_APP_LISTS_ERROR: (state, response) => {
      Vue.set(state.apps, 'error', {
        code: response.status,
        message: response.statusText,
      });
    },
  },
  actions: {
    getBuildFlowLists({ commit }) {
      api.get_build_flows().then((response) => {
        commit(types.GET_BUILD_FLOW_LISTS_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.GET_BUILD_FLOW_LISTS_ERROR, response);
      });
    },
    getAppLists({ commit }) {
      api.get_apps().then((response) => {
        commit(types.GET_APP_LISTS_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.GET_APP_LISTS_ERROR, response);
      });
    },
  },
};
