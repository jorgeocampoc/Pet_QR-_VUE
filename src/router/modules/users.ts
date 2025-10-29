import type { RouteRecordRaw } from "vue-router";

const userRouter: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/users/HomeView.vue"),
    meta: {
      layout: "home",
      requiresGuest: true,
    },
  },
];
export default userRouter;
