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
        {
          path: "/history",
          component: () => import("@/views/client/watchHistory.vue"),
        },
        {
          path: "/video-createBefore",
          component: () => import("@/views/client/viedoCreater.vue"),
          redirect: "/video-createBefore/analysis",
          children: [
            {
              path: "analysis",
              component: () =>
                import(
                  "@/views/client/layouts/viedoUpload/viedoUploadhome.vue"
                ),
            },
            {
              path: "uploadedWaiting",
              component: () =>
                import("@/views/client/layouts/viedoUpload/viedoManger.vue"),
            },
          ],
        },
        {
          path: "/video-upload",
          component: () => import("@/views/client/viedoUpload.vue"),
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
      children: [
        {
          path: "/personmessage",
          redirect: "/personmessage/changemessage",
          component: () =>
            import(
              "@/views/client/personMessage.vue"
            ),
            children: [
              {
                path: "changemessage",
                component: () =>
                  import(
                    "@/views/client/layouts/person/changeMessage/changeMessage.vue"
                  ),
              },
              {
                path: "passwordset",
                component: () =>
                  import(
                    "@/views/client/layouts/person/changeMessage/passwordSet.vue"
                  ),
              },
            ],
        },
        
      ],
    },
    {
      path: "/admin",
      redirect: "/admin/home",
      component: () => import("@/views/admin/index.vue"),
      meta: {
        title: `${projectName} - 管理员`,
        requiresAuth: true,
      },
      children: [
        {
          path: "home",
          component: () =>
            import("@/views/admin/layouts/adminHome/adminHome.vue"),
          meta: {
            title: "首页",
            requiresAuth: true,
          },
        },
        {
          path: "userManage",
          component: () => import("@/views/admin/layouts/userManage/index.vue"),
        },
      ],
    },
    {
      path: "/streamer",
      component: () => import("@/views/streamer/index.vue"),
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
      path: "/kefu",
      component: () =>
        import("@/views/client/layouts/customeService/index.vue"),
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
      path: "/user",
      component: () => import("@/views/client/person.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
    {
      path: "/page",
      component: () => import("@/views/admin/layouts/giftManage/index.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
    {
      path: "/send",
      component: () => import("@/views/streamer/components/videoPlayer.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
    {
      path: "/classDetails",
      component: () =>
        import("@/views/client/layouts/classifyDetails/index.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
    {
      path: "/rank",
      component: () => import("@/views/client/layouts/rank/index.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
    },
    {
      path: "/groupChat",
      component: () => import("@/views/client/groupChat.vue"),
      meta: {
        title: `${projectName}`,
        requiresAuth: false,
      },
      redirect: "/mainMation",
      children:[
        {
          path: "/mainMation",
          component: () => import("@/views/client/layouts/groupChat/mainMation.vue"),
        },
        {
          path: "/membersList",
          component: () => import("@/views/client/layouts/groupChat/membersList.vue"),
        },
      ]
    },
    {
      path: "/haha",
      component: () => import("@/views/client/haha.vue"),
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
