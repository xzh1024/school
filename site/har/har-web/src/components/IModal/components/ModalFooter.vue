<script lang="tsx">
  import { computed, defineComponent, h, VNode } from 'vue';
  import { Button } from '@arco-design/web-vue';
  import { basicModalProps } from './props';
  import { ActionButtonOptions } from '../typings/modal';
  import { useModalContext } from '../composables/useModalContext';
  export default defineComponent({
    name: 'BasicModalFooter',
    inheritAttrs: false,
    props: basicModalProps,
    setup(props, { slots }) {
      const { okAction, cancelAction, loading } = useModalContext();
      const getOkBtnOptions = computed<ActionButtonOptions>(() => ({
        text: '提交',
        type: 'primary',
        loading: loading.value,
        ...props.okButtonOptions
      }));
      const getCancelBtnOptions = computed<ActionButtonOptions>(() => ({
        text: '取消',
        ...props.cancelButtonOptions
      }));
      type ButtonSlots = {
        default: () => string;
        icon?: () => VNode;
      };
      function getButtonSlots(options: ActionButtonOptions) {
        const obj: ButtonSlots = {
          default: () => options.text as string
        };
        if (options.iconRender) {
          obj.icon = () => h(options.iconRender!);
        }
        return obj;
      }
      return () => {
        return [
          slots.insertFooter?.(),
          props.showCancelButton ? (
            <Button
              {...getCancelBtnOptions.value}
              v-slots={getButtonSlots(getCancelBtnOptions.value)}
              onClick={cancelAction}
            />
          ) : null,
          slots.centerFooter?.(),
          props.showOkButton ? (
            <Button
              {...getOkBtnOptions.value}
              v-slots={getButtonSlots(getOkBtnOptions.value)}
              onClick={okAction}
            />
          ) : null,
          slots.appendFooter?.()
        ];
      };
    }
  });
</script>
