/* eslint-disable no-unused-vars */
/*
 * @Description: iVueRouter
 * @Author: Sunly
 * @Date: 2023-09-14 07:08:15
 */
import HashHistory from "./hashHistory.js";
import View from "./components/view.js";

class VueRouter {
  constructor(options) {
    this.options = options;

    // 默认hahs模式
    this.mode = options.mode || "hash";

    // 判断路由模式
    switch (this.mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;

      case "history":
        // todo this.history = new HTML5History(this)
        break;

      case "abstract":
        // todo non-browser environment
        break;
    }
  }

  init(app) {
    // 将设置route的回调传入listen，保证每次current更新时都能更新route
    this.history.listen((route) => {
      app._route = route;
    });

    // 初始化的时候不会触发hashchange，手动执行跳转函数，保证页面能正常显示
    this.history.transitionTo(window.location.hash.slice(1));
  }

  // 根据传入的路径，返回路径对应的所有组件：matched
  createMatcher(location) {
    // 传入hash，获取对应的组件列表（包括父组件和子组件）
    const { pathMap } = createRouteMap(this.options.routes);

    // 从路径map中找到对应的记录，但这里只是全路径对应的子组件，还需要找到嵌套的父组件
    const record = pathMap[location];

    // 添加到matched结果中的全路径值
    const local = {
      path: location,
    };

    // 通过while判断，找到所有的嵌套的匹配的组件
    if (record) {
      return createRoute(record, local);
    }
    return createRoute(null, local);
  }
}

// 使用Vue.use()注册时，调用的函数，传入的参数是vue的构造函数
VueRouter.install = (Vue) => {
  // 在vue的生命周期中混入钩子，当每一个组件beforeCreate时调用钩子
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        // 说明是app根组件
        this._routerRoot = this;
        // 将根组件的vueRouter实例挂载到this上，这样在组件中就可以通过this.$router访问到了
        this.$router = this.$options.router;
        // 初始化
        this.$router.init(this);

        // 在根节点上存储响应式的_route
        Vue.util.defineReactive(this, "_route", this.$router.history.current);
      } else {
        // 不是根组件
        // 向上找到根组件，把根组件的全局router实例挂载到当前组件上
        this._routerRoot = this.$parent && this.$parent._routerRoot;
        this.$router = this._routerRoot.$router;
      }
    },
  });

  // 将_route挂载到根组件上，在任意组件访问$route，就等于在访问根组件的_route
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route;
    },
  });

  // 注册router-view
  Vue.component("RouterView", View);
};

// 创建路由到组件的映射
function createRouteMap(routes) {
  // 所有路径的集合
  const pathList = [];
  // { 路径: { path: 路径, component: 组件, parent: 父组件 } }
  const pathMap = {};

  routes.forEach((route) => {
    addRouteRecord(route, pathList, pathMap);
  });

  return {
    pathList,
    pathMap,
  };
}

// 递归的将所有路径对应的组件、父组件关系找到
function addRouteRecord(route, pathList, pathMap, parent) {
  const path = parent ? `${parent.path}/${route.path}` : route.path;
  const { component, children = null } = route;
  const record = {
    path,
    component,
    parent,
  };
  if (!pathMap[path]) {
    pathList.push(path);
    pathMap[path] = record;
  }
  if (children) {
    children.forEach((child) => {
      addRouteRecord(child, pathList, pathMap, record);
    });
  }
}

// 找到当前路径匹配的所有的嵌套的匹配的组件
function createRoute(record, location) {
  const res = [];

  // 通过组件的parent属性，找组件对应的父组件，层层向上，找到所有匹配的嵌套组件d
  if (record) {
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
  }

  return {
    ...location,
    matched: res,
  };
}

export { createRoute };

export default VueRouter;
