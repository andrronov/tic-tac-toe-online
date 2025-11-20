import { createWebHashHistory, createRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/local",
    name: "local",
    component: () => import("@/pages/Local.vue"),
  },
  {
    path: "/lobby",
    name: "lobby",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/Lobby.vue"),
  },
  {
    path: "/game/:id",
    name: "game",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/Game.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.user) {
    next({ name: "main" });
  } else {
    next();
  }
});

export default router;
