import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    props: (route) => route.params,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/Error.vue'),
    props: { title: '404' },
  },
  {
    path: '*',
    redirect: { name: '404' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
