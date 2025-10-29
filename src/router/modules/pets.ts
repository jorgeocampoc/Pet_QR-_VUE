import type { RouteRecordRaw } from "vue-router";

const petsRoutes: RouteRecordRaw[] = [
  {
    path: "/pet/:id",
    name: "Petdetail",
    component: () => import("@/views/PetsView.vue"),
    meta: {
      layout: "auth",
      requiresGuest: true,
    },
  },
];
export default petsRoutes;
