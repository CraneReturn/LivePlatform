import { createRouter, createWebHashHistory } from "vue-router";

const projectName = "家乐直播";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("@/views/client/index.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
      children: [
        {
          path: "/home",
          component: () => import("@/views/client/homePage.vue"),
        },
        {
          path: "/video-preview",
          component: () => import("@/components/huh-player/index.vue"),
        },
        {
          path: "/video-detail",
          component: () => import("@/components/huh-player/index.vue"),
        },
      ],
    },
    {
      path: "/client",
      component: () => import("@/views/client/index.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
    {
      path: "/admin",
      component: () => import("@/views/admin/index.vue"),
      meta: {
        title: `${projectName} - 管理员`,
        requiresAuth: true,
      },
    },
    {
      path: "/streamer",
      component: () => import("@/views/admin/index.vue"),
      meta: {
        title: `${projectName} - 主播`,
        requiresAuth: true,
      },
    },
    {
      path: "/category",
      component: () => import("@/views/client/layouts/category/index.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      component: () => import("@/views/client/login.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
    {
      path: "/forget",
      component: () => import("@/views/client/layouts/login/forget.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
    {
      path: "/page",
      component: () => import("@/views/admin/layouts/giftManage/uploadGift.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next: () => void) => {
  const { title, requiresAuth } = to.meta as {
    title: string;
    requiresAuth: boolean;
  };
  document.title = title;
  next();
  // if (!requiresAuth) {
  //   next();
  // }
});

export default router;
