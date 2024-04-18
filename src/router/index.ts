import { createRouter, createWebHistory } from 'vue-router';
// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: () => import('@/views/homePage.vue'),
    },
  ]
});

// 导出路由实例
export default router;
