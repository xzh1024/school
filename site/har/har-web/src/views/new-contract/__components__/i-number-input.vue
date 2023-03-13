<template>
  <a-input
    v-model="value"
    type="text"
    :placeholder="placeholder"
    :max-length="inputObj.maxLength"
    class="digit-input"
    :disabled="disabled"
    @input="onInputEvent"
  >
    <template v-if="needAppend" #append>
      <slot name="append"></slot>
    </template>
  </a-input>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  const emits = defineEmits(['update:inputValue', 'update:maxLength']);

  const props = defineProps({
    //plus 正数 plusNumber 正整数
    valueType: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'digit'
    },
    inputValue: {
      type: [String, Number],
      default: ''
    },
    maxValue: {
      type: String,
      default: '999999999.99'
    },
    needAppend: {
      type: Boolean,
      default: false
    }
  });

  const value = computed({
    get() {
      return String(props.inputValue);
    },
    set(v) {
      emits('update:inputValue', v);
    }
  });

  const inputObj = reactive({
    maxLength: 0
  });

  const pointNum = (value: string) => {
    let val = value;
    val = val.replace(/[^\d.]/g, ''); //清除"数字"和"."以外的字符
    val = val.replace(/\.{2,}/g, '.'); //只保留第一个. 清除多余的
    val = val.replace(/^0+\./g, '0.');
    val = val.match(/^0+[1-9]+/) ? (val = val.replace(/^0+/g, '')) : val;
    val = val.match(/^\d*(\.?\d{0,2})/g)?.[0] || '';
    return val;
  };

  const onInputEvent = (v: string) => {
    let realVal = '';
    const val = pointNum(v);
    if (val.includes('.')) {
      if (props.valueType === 'plusNumber') {
        realVal = val.slice(0, val.length - 1);
      } else {
        if (Number(val) > Number(props.maxValue)) {
          Message.error({ content: `请输入小于${props.maxValue}的值` });
        } else {
          const numDian = val.toString().split('.')[1].length;
          if (numDian === 2) {
            // inputObj.maxLength = val.length;
          }
          realVal = val;
        }
      }
    } else {
      if (props.valueType === 'plus' && Number(val) === 0 && val !== '') {
        realVal = '';
        Message.error({ content: '金额不能为0' });
      } else if (Number(val) > Number(props.maxValue)) {
        inputObj.maxLength = val.length - 1;
        realVal = val.slice(0, val.length - 1);
        Message.error({ content: `请输入小于${props.maxValue}的值` });
        inputObj.maxLength = 0;
      } else {
        inputObj.maxLength = 0;
        realVal = val;
      }
    }
    setTimeout(() => {
      value.value = realVal;
    }, 10);
  };
</script>

<style scoped lang="less"></style>
