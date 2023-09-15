# i-vue-router

实现简单的vue-router

[vue-router 3 文档](https://v3.router.vuejs.org/zh/)

## 预览地址

[Github Pages](https://sjx1995.github.io/i-vue-router)

## 实现功能

- [x] 嵌套路由
- [x] hash模式
- [x] router-view
- [x] router-link

## 待实现功能

- [ ] history模式

## 目录结构

```text
└── src
    ├── App.vue               # vue根组件
    ├── main.js
    ├── router.js             # 路由配置
    ├── views                 # 组件
    │   ├── bar               # bar组件和子组件
    │   │   ├── child1.vue
    │   │   ├── child2.vue
    │   │   └── index.vue
    │   └── foo               # foo组件和子组件
    │       ├── child1.vue
    │       ├── child2.vue
    │       └── index.vue
    └── vue-router            # vue-router
        ├── components        # vue-router内置组件
        │   ├── link.js       # router-link
        │   └── view.js       # router-view
        ├── hashHistory.js    # hash模式处理函数
        └── index.js          # 核心逻辑
```
