import { createRouter, createWebHistory } from 'vue-router';

const projectName = '家乐直播'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: () => import('@/views/client/index.vue'),
      meta: {
        title: `${ projectName }`,
        requiresAuth: false,
      }
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/index.vue'),
      meta: {
        title: `${ projectName } - 管理员`,
        requiresAuth: true,
      }
    },
    {
      path: '/streamer',
      component: () => import('@/views/admin/index.vue'),
      meta: {
        title: `${ projectName } - 主播`,
        requiresAuth: true,
      }
    },
  ]
});

router.afterEach((to, from: object, next) => {
  const requireAuth = to.meta.requiresAuth;
  const title: string = to.meta?.title as string || '登录';
  document.title = title;
})


export default router;
