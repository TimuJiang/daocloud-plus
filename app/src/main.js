import Vue from 'vue';
import VueElectron from 'vue-electron';
import VueI18n from 'vue-i18n';

import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';

import App from './App';

// ready translated locales
const locales = {
  en: {
    buildStatus: {
      Pending: 'Pending',
      Started: 'Started',
      Success: 'Success',
      Failure: 'Failure',
      Error: 'Error',
      Cancelled: 'Cancelled',
      Timeout: 'Timeout',
    },
    appStatus: {
      running: 'Running',
      stopped: 'Stopped',
    },
  },
  zh_CN: {
    buildStatus: {
      Pending: '等待执行',
      Started: '正在执行',
      Success: '执行成功',
      Failure: '执行失败',
      Error: '执行错误',
      Cancelled: '取消执行',
      Timeout: 'Timeout',
    },
    appStatus: {
      running: '运行中',
      stopped: '已停止',
    },
  },
};

Vue.use(VueElectron);
Vue.use(VueI18n);

require('./filters');

Vue.config.debug = true;

// set lang
Vue.config.lang = 'zh_CN';

// set locales
Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang]);
});

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
// Now the app has started!
