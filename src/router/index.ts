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
        {
          path: "/video",
          component: () => import("@/views/client/video.vue"),
        },
        {
          path: "/search",
          component: () => import("@/views/client/search.vue"),
          redirect: "/search/integrated",
          children: [
            {
              path: "integrated",
              component: () =>
                import(
                  "@/views/client/layouts/search/search-integrated.vue"
                ),
            },
            {
              path: "user",
              component: () =>
                import(
                  "@/views/client/layouts/search/search-user.vue"
                ),
            },
            {
              path: "live",
              component: () =>
                import(
                  "@/views/client/layouts/search/search-live.vue"
                ),
            },
            {
              path: "video",
              component: () =>
                import(
                  "@/views/client/layouts/search/search-video.vue"
                ),
            },
          ],
        },
        {
          path: "/message",
          component: () => import("@/views/client/message.vue"),
          redirect: "/message/group",
          children: [
            {
              path: "group",
              component: () =>
                import(
                  "@/views/client/layouts/message/group.vue"
                ),
            },
            {
              path: "comments",
              component: () =>
                import("@/views/client/layouts/message/comments.vue"),
            },
            {
              path: "attention",
              component: () =>
                import("@/views/client/layouts/message/attention.vue"),
            },
          ],
        }
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
          component: () => import("@/views/client/personMessage.vue"),
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
        {
          path: "/put",
          component: () => import("@/views/client/putStream.vue"),
        },
        {
          //开播前预览
          path: "/preview",
          component: () => import("@/views/streamer/checkedMessage.vue"),
          meta: {
            title: `${projectName}`,
            requiresAuth: false,
          },
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
        {
          path: "/publish-setting",
          component: () =>
            import("@/views/streamer/components/broadcast/index.vue"),
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
          path: "/user",
          component: () => import("@/views/client/person.vue"),
          meta: {
            title: `${projectName}`,
            requiresAuth: false,
          },
          children: [
            {
              path: "concern",
              component: () =>
                import("@/views/client/layouts/person/concern.vue"),
              meta: {
                title: `${projectName}`,
                requiresAuth: false,
              },
            },
            {
              path: "fan",
              component: () => import("@/views/client/layouts/person/fan.vue"),
              meta: {
                title: `${projectName}`,
                requiresAuth: false,
              },
            },
          ],
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
      children: [
        {
          path: "/streamer",
          component: () => import("@/views/streamer/player.vue"),
          meta: {
            title: `${projectName}`,
            requiresAuth: false,
          },
        },
        {
          path: "/send",
          component: () => import("@/views/streamer/send.vue"),
          meta: {
            title: `${projectName}`,
            requiresAuth: false,
          },
        },
      ],
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
      path: "/page",
      component: () => import("@/views/admin/layouts/giftManage/index.vue"),
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
      children: [
        {
          path: "/mainMation",
          component: () =>
            import("@/views/client/layouts/groupChat/mainMation.vue"),
        },
        {
          path: "/membersList",
          component: () =>
            import("@/views/client/layouts/groupChat/membersList.vue"),
        },
      ],
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
