<template>
  <div class="_fc-isRequired">
    <Switch v-model="isRequired" />
    <Input v-if="isRequired" v-model="requiredMsg" placeholder="请输入提示语" />
  </div>
</template>

<script setup lang="ts" name="IsRequired">
  import is from '@form-create/utils/lib/type';
  import { PropType, ref, watch } from 'vue';
  import { Switch, Input } from '@arco-design/web-vue';

  const props = defineProps({
    modelValue: {
      type: Object as PropType<any>
    }
  });

  const emits = defineEmits(['update:modelValue']);

  const flag = is.String(props.modelValue);

  const isRequired = ref(
    props.modelValue ? false : flag ? true : !!props.modelValue
  );
  const requiredMsg = ref(flag ? props.modelValue : '');

  function update() {
    let val;
    if (isRequired.value === false) {
      val = false;
    } else {
      val = requiredMsg.value;
    }
    emits('update:modelValue', val);
  }

  watch(
    () => isRequired.value,
    () => {
      update();
    }
  );

  watch(
    () => requiredMsg.value,
    () => {
      update();
    }
  );

  watch(
    () => props.modelValue,
    (n) => {
      const flag = is.String(n);
      isRequired.value = n === undefined ? false : flag ? true : !!n;
      requiredMsg.value = flag ? n : '';
    }
  );
</script>

<style lang="less" scoped>
  ._fc-isRequired {
    display: flex;
    align-items: center;
  }

  ._fc-isRequired .el-input {
    margin-left: 15px;
  }

  ._fc-isRequired .el-switch {
    height: 28px;
  }
</style>
