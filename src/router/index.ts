import { createRouter, createWebHashHistory } from "vue-router";

const projectName = "家乐直播";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "",
            component: () => import("@/views/client/homePage.vue"),
            meta: {
                title: `${projectName}`,
                requiresAuth: false,
            },
        },
        {
            path: "/client",
            component: () => import("@/views/client/homePage.vue"),
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

export default router;
