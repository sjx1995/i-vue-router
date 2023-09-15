/*
 * @Description: 创建哈希路由
 * @Author: Sunly
 * @Date: 2023-09-14 09:07:34
 */
import { createRoute } from "./index.js";

class HashHistory {
  constructor(router) {
    this.router = router;
    // 如果没有/#/，则填充
    ensureSlash();
    this.setupHashLister();

    // 初始化current
    this.current = createRoute(null, {
      path: "/",
    });
  }

  // 监听hash变化
  setupHashLister() {
    window.addEventListener("hashchange", () => {
      this.transitionTo(window.location.hash.slice(1));
    });
  }

  // 路由跳转时执行
  transitionTo(location) {
    // 找到当前路由对应的的所有组件（包括父组件和子组件）
    const route = this.router.createMatcher(location);

    // hash更新的时候赋值给current
    this.current = route;

    // 执行回调，更新route
    this.cb && this.cb(route);
  }

  listen(cb) {
    this.cb = cb;
  }
}

// 保证url上存在#
function ensureSlash() {
  if (window.location.hash) {
    return;
  }
  window.location.hash = "/";
}

export default HashHistory;
