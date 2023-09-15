/*
 * @Description: routes
 * @Author: Sunly
 * @Date: 2023-09-14 07:14:54
 */
import VueRouter from "./vue-router";
import Vue from "vue";

import Foo from "./views/foo/index.vue";
import FooChild1 from "./views/foo/child1.vue";
import FooChild2 from "./views/foo/child2.vue";
import Bar from "./views/bar/index.vue";
import BarChild1 from "./views/bar/child1.vue";
import BarChild2 from "./views/bar/child2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/foo",
    component: Foo,
    children: [
      {
        path: "child1",
        component: FooChild1,
      },
      {
        path: "child2",
        component: FooChild2,
      },
    ],
  },
  {
    path: "/bar",
    component: Bar,
    children: [
      {
        path: "child1",
        component: BarChild1,
      },
      {
        path: "child2",
        component: BarChild2,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
