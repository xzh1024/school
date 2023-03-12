<script lang="ts" name="DragBox">
  // @ts-nocheck
  import { h, resolveComponent, defineComponent } from 'vue';

  export default defineComponent({
    name: 'DragBox',
    // eslint-disable-next-line vue/require-prop-types
    props: ['rule', 'tag', 'formCreateInject'],
    render(ctx) {
      const subRule = { ...ctx.$props.rule.props, ...ctx.$attrs };
      let _class = subRule.tag + '-drag drag-box';
      if (!Object.keys(ctx.$slots).length) {
        _class += ' ' + subRule.tag + '-holder';
      }
      subRule.class = _class;
      subRule.modelValue = [...this.$props.formCreateInject.children];

      const keys = {};
      if (ctx.$slots.default) {
        const children = ctx.$slots.default();
        children.forEach((v) => {
          if (v.key) {
            keys[v.key] = v;
          }
        });
      }

      return h(resolveComponent('draggable'), subRule, {
        item: ({ element }) => {
          return h('div', {}, keys[(element?.__fc__?.key || '') + 'fc']);
        }
      });
    }
  });
</script>

<style lang="less" scoped>
  .drag-box {
    min-height: 80px;
  }
</style>
