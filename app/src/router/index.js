import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: require('../views/_HomeWrapperView'),
      children: [
        {
          path: '/',
          component: require('../views/home/IndexView'),
        },
      ],
    },
    {
      path: '/tray',
      component: require('../views/_TrayWrapperView'),
      children: [
        {
          path: '/',
          component: require('../views/tray/IndexView'),
        },
        {
          path: 'build-flows',
          component: require('../views/tray/BuildFlowsView'),
        },
        {
          path: 'apps',
          component: require('../views/tray/AppsView'),
        },
      ],
    },
  ],
});

export default router;
