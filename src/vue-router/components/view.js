/*
 * @Description: router-view
 * @Author: Sunly
 * @Date: 2023-09-14 11:04:06
 */
const view = {
  functional: true,
  render(h, { parent, data }) {
    const { matched } = parent.$route;

    data.routerView = true;
    let depth = 0;

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    const record = matched[depth];

    if (!record) {
      return h();
    }

    const component = record.component;

    return h(component, data);
  },
};

export default view;
