import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/HomePage.vue"),
    name: "HomePage",
  },
  {
    path: "/location",
    component: () => import("../views/LocationPage.vue"),
    name: "LocationPage",
  },
  {
    path: "/rooms",
    component: () => import("../views/Rooms.vue"),
    name: "RoomsPage",
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/ErrorPage.vue"),
    name: "ErrorPage",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
