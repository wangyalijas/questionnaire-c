import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home/index.vue'),
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('./views/new/index.vue'),
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./views/detail/index.vue'),
    },
  ],
});
