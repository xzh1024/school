<template>
  <Modal
    class="i-modal"
    v-bind="getBindValue"
    @cancel="cancelAction"
    @update:visible="toggle"
  >
    <template #title>
      <div>{{ getBindValue.title }}</div>
    </template>
    <template #footer>
      <slot name="footer">
        <ModalFooter v-bind="getBindValue">
          <template v-for="name in footerSlots" #[name]>
            <slot :name="name" />
          </template>
        </ModalFooter>
      </slot>
    </template>
    <ModalWrapper v-bind="getWrapperProps" ref="wrapperRef">
      <slot />
    </ModalWrapper>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'BasicModal'
  });
</script>
<script lang="ts" setup>
  import { Modal } from '@arco-design/web-vue';
  import ModalFooter from './ModalFooter.vue';
  import {
    computed,
    unref,
    ref,
    watchEffect,
    watch,
    onMounted,
    useAttrs
  } from 'vue';
  import type { ModalActionType, ModalProps } from '../typings/modal';
  import { basicModalProps } from './props';
  import { createModalContext } from '../composables/useModalContext';
  import { useMergeData } from '@/composables/useMergeData';
  import { useToggle } from '@har/use';
  import ModalWrapper from './ModalWrapper.vue';
  const props = defineProps(basicModalProps);
  const [visible, toggle] = useToggle(props.visible);
  const attrs = useAttrs();
  const emit = defineEmits(['update:visible', 'ok', 'cancel', 'register']);
  const [getProps, setProps] = useMergeData<ModalProps>(props);
  const getBindValue = computed(() => {
    return {
      ...attrs,
      ...unref(getProps),
      visible: unref(visible)
    };
  });
  const getWrapperProps = computed(() => {
    const { useWrapper, minHeight, height, loading, loadingTip, visible } =
      unref(getBindValue);
    return {
      useWrapper,
      minHeight,
      height,
      loading,
      loadingTip,
      visible
    };
  });
  watchEffect(() => {
    toggle(!!props.visible);
  });
  watch(
    visible,
    (v) => {
      emit('update:visible', v);
    },
    { immediate: false }
  );

  function okAction() {
    emit('ok');
  }
  async function cancelAction() {
    if (props.beforeClose) {
      const isClose = await props.beforeClose();
      toggle(isClose);
      return;
    }
    toggle(false);
    emit('cancel');
  }
  createModalContext({
    loading: computed(() => !!getProps.value.submitLoading),
    okAction,
    cancelAction
  });
  const footerSlots = ['insertFooter', 'centerFooter', 'appendFooter'];

  const wrapperRef = ref();
  const modalActions: ModalActionType = {
    setProps,
    scrollTop(top) {
      wrapperRef.value.scrollTop(top);
    },
    changeVisible: toggle
  };
  defineExpose(modalActions);
  onMounted(() => {
    emit('register', modalActions);
  });
</script>
<style lang="less">
  .i-modal {
    .arco-modal-body {
      padding: 0;
    }
  }
</style>
