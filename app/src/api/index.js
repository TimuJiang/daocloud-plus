import Vue from 'vue';
import VueResource from 'vue-resource';
import store from '../store';

Vue.use(VueResource);

Vue.http.options.root = process.env.API_URL;
Vue.http.interceptors.push((request, next) => {
  const auth = store.state.account.auth;
  if (auth.check()) {
    const accessToken = auth.access_token;
    Vue.http.headers.common.Authorization = `token ${accessToken}`;
  } else {
    delete Vue.http.headers.common.Authorization;
  }
  // continue to next interceptor
  next();
});

export default {
  get_build_flows() {
    return Vue.http.get('v1/build-flows');
  },
  get_apps() {
    return Vue.http.get('v1/apps');
  },
};
