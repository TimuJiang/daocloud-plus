import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorageglobal.localStorage;
// const JSONglobal.JSON;

export default {
  state: {
    buildFlows: {
      lists: [],
    },
    apps: {
      lists: [],
    },
  },
  mutations: {
    GET_BUILD_FLOW_LISTS_SUCCESS: (state, { build_flows }) => {
      Vue.set(state.buildFlows, 'lists', build_flows);
    },
    GET_APP_LISTS_SUCCESS: (state, { app }) => {
      Vue.set(state.apps, 'lists', app);
    },
  },
  actions: {
    getBuildFlowLists({ commit }) {
      api.get_build_flows().then((response) => {
        commit(types.GET_BUILD_FLOW_LISTS_SUCCESS, response.data);
      });
    },
    getAppLists({ commit }) {
      api.get_apps().then((response) => {
        commit(types.GET_APP_LISTS_SUCCESS, response.data);
      });
    },
  },
};
