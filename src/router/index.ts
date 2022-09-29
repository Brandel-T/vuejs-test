import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import PostsView from "../views/PostsView.vue";
import NewPostView from "../views/EditPostView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: PostsView,
  },
  {
    path: "/posts?_page=1",
    name: "posts",
    component: PostsView,
  },
  {
    path: "/edit",
    name: "edit",
    component: NewPostView,
  },
  {
    path: "/edit/:id",
    name: "detail",
    component: NewPostView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
