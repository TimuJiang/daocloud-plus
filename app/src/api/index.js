import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const localStorage = global.localStorage;

Vue.http.options.root = 'https://openapi.daocloud.io';
Vue.http.interceptors.push((request, next) => {
  const accessToken = localStorage.getItem('auth.access_token');

  if (!request.url.startsWith('http://') &&
      !request.url.startsWith('https://') &&
      accessToken) {
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
