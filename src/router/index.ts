import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

const MainView = () => import("../views/MainView.vue");
const EditorView = () => import("../views/EditorView.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: MainView
  },
  {
    path: "/editor",
    name: "Editor",
    component: EditorView
  }
];

const router = new VueRouter({
  routes
});

export default router;
