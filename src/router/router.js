import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../components/menu.vue"),
  },
  {
    path: "/local",
    component: () => import("../components/localGame.vue"),
  },
  {
    path: "/lobby",
    component: () => import("../components/lobby.vue"),
  },
  {
    path: "/game/:id",
    name: "game",
    component: () => import("../components/game.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
