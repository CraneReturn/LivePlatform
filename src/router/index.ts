import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: () => import('@/views/client/homePage.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/index.vue'),
    },
  ]
});

export default router;
