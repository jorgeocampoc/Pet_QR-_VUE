import type { RouteRecordRaw } from "vue-router";

const notFoundRoutes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
    // component: () => import("@/views/NotFound.vue"),
    // meta: {
    //   layout: "NotFound",
    //   requiresGuest: true,
    // },
  },
];

export default notFoundRoutes;
