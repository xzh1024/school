<template>
  <div class="struct">
    <Button style="width: 100%" @click="visible = true">{{ title }}</Button>
    <Modal v-model:visible="visible" unmount-on-close>
      <!-- <codemirror
        v-model="oldVal"
        placeholder="请输入"
        :style="{ minHeight: '400px' }"
        :extensions="extensions"
      /> -->
      <StructList :list="oldVal" :type="type" />
      <template #footer>
        <!-- <span class="_fc_err" v-if="err">
          输入内容格式有误{{ err !== true ? err : '' }}
        </span> -->
        <Button size="small" @click="visible = false">取 消</Button>
        <Button type="primary" size="small" @click="onOk">确 定</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts" name="Struct">
  // import { toJSON } from '../utils/index';
  import { PropType, ref, watch } from 'vue';
  import { Button, Modal } from '@arco-design/web-vue';
  import { deepCopy } from '@form-create/utils/lib/deepextend';
  import { ItemType } from '../types';
  import StructList from './StructList.vue';
  // import { Codemirror } from 'vue-codemirror';
  // import { javascript } from '@codemirror/lang-javascript';
  // import { oneDark } from '@codemirror/theme-one-dark';
  // const extensions = [javascript(), oneDark];

  const props = defineProps({
    modelValue: {
      type: Array as PropType<ItemType[]>
    },
    title: {
      type: String,
      default: '编辑数据'
    },
    defaultValue: {
      type: Array as PropType<ItemType[]>,
      default: () => [{ label: '', value: '' }]
    },
    type: {
      type: String,
      default: 'single'
    }
  });

  const emits = defineEmits(['update:modelValue']);

  const visible = ref(false);
  // const err = ref<boolean | string>(false);
  const oldVal = ref<ItemType[]>([]);

  function load() {
    oldVal.value = deepCopy(props.modelValue || props.defaultValue);
  }

  function onOk() {
    // if (err.value) return;
    // const str = oldVal.value;
    // let val;
    // try {
    //   val = eval(`(function () { return ${str} }())`);
    // } catch (e) {
    //   err.value = ` (${e})`;
    //   return;
    // }
    // if (props.validate && !props.validate(val)) {
    //   err.value = true;
    //   return;
    // }
    // visible.value = false;
    // if (toJSON(val) !== oldVal.value) {
    //   emits('update:modelValue', val);
    // }
    visible.value = false;
    emits('update:modelValue', oldVal.value);
  }

  watch(
    () => props.modelValue,
    () => {
      load();
    }
  );

  watch(
    () => visible.value,
    (v) => {
      v ? load() : null;
    }
  );
</script>

<style lang="less" scoped>
  .struct {
    width: 100%;
  }
</style>
