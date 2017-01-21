import Vue from 'vue';
import VueElectron from 'vue-electron';

import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';

import 'semantic-ui-css/semantic.min.css';

import App from './App';

Vue.use(VueElectron);

require('./filters');

Vue.config.debug = true;

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
// Now the app has started!
