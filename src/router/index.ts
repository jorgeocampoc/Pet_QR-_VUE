import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import authRoutes from "./modules/auth";
import userRouter from "./modules/users";
import ActiveEmailRouter from "./modules/active.email";
import notFoundRoutes from "./modules/not.found";
import petsRoutes from "./modules/pets";
const routes: RouteRecordRaw[] = [
  ...authRoutes,
  ...userRouter,
  ...ActiveEmailRouter,
  ...notFoundRoutes,
  ...petsRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
