import { defineComponent, unref } from 'vue';
import { basicFormItemProps } from '../props';
import { Col, FormItem, Tooltip } from '@arco-design/web-vue';
import { IconQuestionCircleFill } from '@arco-design/web-vue/es/icon';
import { computed } from 'vue';
import { getSlot } from '@/utils/helper';
import type { RenderCallbackParams } from '../typings/form';
import { isBoolean, isFunction } from '@/utils/is';
import { componentMap } from '../componentMap';
import { get } from 'lodash';
export default defineComponent({
  name: 'BasicFormItem',
  inheritAttrs: false,
  props: basicFormItemProps,
  setup(props, { slots }) {
    // const { schema, formProps } = toRefs(props);
    // 统一回调外部参数
    const getValues = computed<RenderCallbackParams>(() => {
      const { schema, formModel } = props;
      return {
        field: schema.field,
        formModel,
        schema
      };
    });
    // 获取内容组件props
    const getComponentProps = computed<Recordable>(() => {
      return props.schema.componentProps || {};
    });
    // 获取组件是否禁用 优先级 1.shcema的dynamicDisabled，2.formProps的，3.内容组件的
    const getDisable = computed(() => {
      let disabled =
        props.formProps.disabled || unref(getComponentProps).disabled || false;
      const { dynamicDisabled } = props.schema;
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled;
      } else if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues));
      }
      return disabled;
    });
    // 内容组件渲染
    function renderComponent() {
      const {
        field,
        label,
        // changeEvent = 'change',
        component = 'input',
        valueField,
        vSlots
      } = props.schema;
      const { Comp, defaultProps } = componentMap.get(component) || {};
      if (!Comp) {
        console.error(component + '组件不存在请检查', props.schema);
        return null;
      }
      const modelValueKey = valueField || 'modelValue';
      const on = {
        ['onUpdate:' + modelValueKey]: (...args: Nullable<Recordable>[]) => {
          const [value] = args;

          props.setFormModel(field, value);
        }
      };
      const globalProps = {
        allowClear: true,
        placeholder: `请输入${label}`
      };
      const getDefaultProps = isFunction(defaultProps)
        ? defaultProps(props.schema)
        : defaultProps;
      const propsData: Recordable = {
        ...globalProps,
        ...getDefaultProps,
        ...unref(getComponentProps),
        disabled: unref(getDisable)
      };
      const bindValue: Recordable = {
        [modelValueKey]: get(props.formModel, field)
      };
      const compAttr = {
        ...propsData,
        ...on,
        ...bindValue
      };
      return <Comp {...compAttr} v-slots={vSlots} />;
    }
    // form item 渲染
    function renderItem() {
      const { field, label, rules, slot, render, labelTip } = props.schema;
      function getContent() {
        return slot
          ? getSlot(slots, slot, unref(getValues))
          : render
          ? render(unref(getValues))
          : renderComponent();
      }
      const itemSlots = {
        label: () => {
          if (labelTip) {
            return (
              <Tooltip content={labelTip} position="top">
                <label>
                  <IconQuestionCircleFill /> {label}
                </label>
              </Tooltip>
            );
          }
          return label;
        }
      };
      return (
        <FormItem v-slots={itemSlots} field={field} rules={rules}>
          {getContent()}
        </FormItem>
      );
    }
    function getShowStatus(
      status?:
        | boolean
        | ((renderCallbackParams: RenderCallbackParams) => boolean)
    ) {
      let show = true;
      if (isBoolean(status)) {
        show = status;
      } else if (isFunction(status)) {
        show = status(unref(getValues));
      }
      return show;
    }
    function getShow() {
      const { ifShow, show } = props.schema;
      return {
        isIfShow: getShowStatus(ifShow),
        isShow: getShowStatus(show)
      };
    }
    // const getShow = computed(() => {
    //   const { ifShow, show } = props.schema;
    //   return {
    //     isIfShow: getShowStatus(ifShow),
    //     isShow: getShowStatus(show)
    //   };
    // });
    return () => {
      const { isIfShow, isShow } = getShow();
      if (!isIfShow) return null;
      const colProps = {
        ...props.formProps.colProps,
        ...(props.schema.colProps || {})
      };
      return (
        <Col v-show={isShow} {...colProps}>
          {renderItem()}
        </Col>
      );
    };
  }
});
