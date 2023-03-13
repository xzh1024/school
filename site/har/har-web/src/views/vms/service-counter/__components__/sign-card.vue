<template>
  <drawer
    v-model="visible"
    :title="`${type === 1 ? '限期' : '次'}卡签单`"
    width="960px"
    @cancel="onCancel"
  >
    <template #footer>
      <div class="drawer-footer-row">
        <a-space>
          <div>合计<span class="font-bold">600</span>天</div>
          <div>应付<span class="font-bold color-danger">&yen;250.00</span></div>
          <div>已付<span class="font-bold color-danger">&yen;250.00</span></div>
        </a-space>
        <a-space>
          <a-button @click="onCancel">取消</a-button>
          <a-button type="primary" @click="onSave"> 打印合同 </a-button>
        </a-space>
      </div>
    </template>
    <card-form ref="cardFormRef" :type="type" />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, PropType, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  import {} from '@/api';
  import CardForm from './card-form.vue';
  import { groundPcApiCardOrderSavePost } from '@/api/ground-pc-api';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    },
    row: {
      type: Object,
      default: () => {}
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  function onCancel() {
    emits('reset');
    emits('update:modelValue', false);
  }

  const cardFormRef = ref();
  const [onSave] = useFuncProxy(async () => {
    const res = await cardFormRef.value.submit();
    if (res) {
      const params = {
        ...props.row,
        ...cardFormRef.value.formData
      };
      await groundPcApiCardOrderSavePost(params);
      Message.success('操作成功!');
      emits('update:modelValue', false);
    }
  });
</script>

<style lang="less" scoped>
  .drawer-footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .font-bold {
    font-size: 22px;
    font-weight: 500;
    color: #333333;
    line-height: 30px;
    margin: 0 6px;
  }

  .color-danger {
    color: #fa4e40;
  }
</style>
