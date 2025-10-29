import type { RouteRecordRaw } from "vue-router";

const ActiveEmailRouter: RouteRecordRaw[] = [
  {
    path: "/active-email/:token",
    name: "active-email",
    component: () => import("@/views/ActiveEmailView.vue"),
    meta: {
      layout: "active-email",
      requiresGuest: true,
    },
  },
];

export default ActiveEmailRouter;
