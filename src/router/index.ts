import { createRouter, createWebHashHistory} from "vue-router";

const projectName = "家乐直播";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: () => import("@/views/client/index.vue"),
            meta: {
                title: `${projectName}`,
                requiresAuth: false,
            },
            children: [
                {
                    path: "/home",
                    component: () => import("@/views/client/index.vue"),
                },
                {
                    path: '/video',
                    component: () => import("@/components/huh-player/index.vue"),
                },
            ]
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
    ],
});

router.beforeEach((to, from, next: () => void) => {
  const { title, requiresAuth } = to.meta as { title: string, requiresAuth: boolean };
  document.title = title;
  next();
  // if (!requiresAuth) {
  //   next();
  // }
})

export default router;
