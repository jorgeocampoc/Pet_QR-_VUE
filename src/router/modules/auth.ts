import type { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/AuthView.vue"),
    meta: {
      layout: "auth",
      requiresGuest: true,
    },
  },
];

export default authRoutes;
