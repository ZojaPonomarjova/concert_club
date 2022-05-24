import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/posts",
    name: "posts",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PostsView.vue"),
  },
  // {
  //   path: "/post",
  //   name: "post",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/PostsView.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
