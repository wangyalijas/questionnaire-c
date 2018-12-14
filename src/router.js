import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login/index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/system/home/index.vue'),
          children: [
            {
              path: 'detail',
              name: 'detail',
              component: () => import('./views/system/detail/index.vue'),
            },
          ],
        },
        {
          path: 'new',
          name: 'new',
          component: () => import('./views/system/new/index.vue'),
        },
      ],
    },
  ],
});
