<template>
  <Col v-if="showActionButtonGroup" v-bind="actionColOpt">
    <FormItem :label-col-props="{ span: 0 }" :wrapper-col-props="{ span: 24 }">
      <Space size="medium" v-bind="actionSpaceOpt">
        <slot name="submitBefore"></slot>
        <Button
          v-if="showSubmitButton"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
          ><template v-if="getSubmitBtnOptions.iconRender" #icon>
            <icon-search
              v-if="getSubmitBtnOptions.iconType === 'search'"
            /> </template
          >{{ getSubmitBtnOptions.text }}</Button
        >
        <slot name="resetBefore"></slot>
        <Button
          v-if="showResetButton"
          v-bind="getResetBtnOptions"
          @click="resetAction"
          ><template v-if="getResetBtnOptions.iconRender" #icon>
            <!--            <getResetBtnOptions.iconRender />-->
            <icon-refresh
              v-if="getResetBtnOptions.iconType === 'refresh'"
            /> </template
          >{{ getResetBtnOptions.text }}</Button
        >
        <slot name="resetAfter"></slot>
      </Space>
    </FormItem>
  </Col>
</template>
<script lang="ts">
  export default {
    name: 'BasicFormAction',
    inheritAttrs: false
  };
</script>
<script setup lang="ts">
  import { FormItem, Button, Col, Space } from '@arco-design/web-vue';
  import { basicFormActionProps } from '../props';
  import { computed } from 'vue';
  import type { CSSProperties } from 'vue';
  import type { FormActionProps } from '../typings/form';
  import { useFormContext } from '../composables/useFormContext';
  const props = defineProps(basicFormActionProps);

  const { submitAction, resetAction, loading } = useFormContext();

  const actionColOpt = computed<FormActionProps['actionColOptions']>(() => {
    console.log(props);
    return {
      ...props.actionColOptions,
      span: props.actionSpan || 6
    };
  });
  const actionSpaceOpt = computed<FormActionProps['actionSpaceOptions']>(() => {
    const style: CSSProperties = Object.assign(
      {
        width: '100%',
        justifyContent: 'end'
      },
      {},
      props.actionSpaceOptions || {}
    );
    return {
      fill: true,
      align: 'end',
      ...props.actionSpaceOptions,
      style
    };
  });

  const getSubmitBtnOptions = computed(() => {
    return Object.assign(
      {
        text: '提交',
        type: 'primary',
        loading: loading.value
      },
      props.submitButtonOptions
    );
  });
  // const submitIcon = computed(() => {
  //   const { iconRender } = getSubmitBtnOptions.value;
  //   if (!iconRender) {
  //     return null;
  //   }
  //   return {
  //     default: () => iconRender
  //   };
  // });
  const getResetBtnOptions = computed(() => {
    return Object.assign(
      {
        text: '重置',
        loading: loading.value
      },
      props.resetButtonOptions
    );
  });
</script>
<style scoped>
  .form-action {
    width: 100%;
  }
</style>
