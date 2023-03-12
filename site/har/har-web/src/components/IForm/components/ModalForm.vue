<template>
  <BasicModal
    v-bind="getBindModalProps"
    ref="modalRef"
    v-model:visible="visible"
    @ok="ok"
    @before-close="beforeClose"
  >
    <BasicForm
      v-bind="getFormProps"
      class="modal-form"
      @register="register"
      @submit="submit"
    >
      <template #formHeader>
        <slot name="formHeader"></slot>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  export default {
    name: 'ModalForm',
    inheritAttrs: false
  };
</script>
<script lang="ts" setup>
  import { BasicModal } from '@/components/IModal';
  import BasicForm from './BasicForm.vue';
  import { modalFormProps } from '../props';
  import type { ModalFormProps } from '../typings/form';
  import { useForm } from '../composables/useForm';
  import { computed, onMounted, ref, useAttrs, watch, watchEffect } from 'vue';
  import { omit } from 'lodash';
  import { useMergeData } from '@/composables/useMergeData';
  import { useToggle } from '@har/use';
  const attrs = useAttrs();
  const emit = defineEmits(['submit', 'cancel', 'register', 'update:visible']);
  const props = defineProps(modalFormProps);
  const [visible, toggle] = useToggle(props.visible);
  type OmitVisible = Omit<ModalFormProps, 'visible'>;
  const [getProps, setProps] = useMergeData<OmitVisible>(props);
  const getFormProps = computed(() => {
    const data = omit(getProps.value, [
      'visible',
      'title',
      'loading',
      'loadingTip',
      'height',
      'minHeight',
      'useWrapper',
      'beforeClose',
      'footer',
      'submitLoading'
    ]);
    return {
      ...data,
      ...attrs,
      // loading: getProps.value.submitLoading,
      showActionButtonGroup: false
    };
  });
  const getBindModalProps = computed(() => {
    const { showSubmitButton, submitButtonOptions, beforeClose, ...others } =
      getProps.value;
    return {
      showOkButton: showSubmitButton,
      okButtonOptions: submitButtonOptions,
      ...others,
      ...attrs,
      beforeClose() {
        if (beforeClose) {
          return beforeClose();
        }
        return !!getProps.value.submitLoading;
      }
    };
  });
  const [register, methods] = useForm<OmitVisible>();
  const modalRef = ref();
  function beforeClose() {
    methods.resetFields();
    modalRef.value.scrollTop();
  }
  function ok() {
    methods.submit();
  }
  function submit(data: any) {
    emit('submit', data);
  }
  const actions = {
    ...methods,
    setProps,
    show() {
      toggle(true);
    },
    hide() {
      toggle(false);
    }
  };
  watchEffect(() => {
    toggle(!!props.visible);
  });
  watch(visible, (val) => {
    emit('update:visible', val);
  });
  onMounted(() => {
    emit('register', actions);
  });
</script>
<style>
  .modal-form {
    padding: 20px;
  }
</style>
