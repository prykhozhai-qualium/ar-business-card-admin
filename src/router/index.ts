import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Enter from "../views/Enter.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Enter",
    component: Enter,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
