/*
 * @Description: router-link
 * @Author: Sunly
 * @Date: 2023-09-15 02:41:47
 */
const link = {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  render(h) {
    return h(
      "a",
      {
        domProps: {
          href: `#${this.to}`,
        },
      },
      [this.$slots.default]
    );
  },
};

export default link;
