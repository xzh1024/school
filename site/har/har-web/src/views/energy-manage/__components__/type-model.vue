<template>
  <drawer v-model="visible" :title="title" width="400px">
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit">
        确认
      </a-button>
    </template>
    <div class="white-detail-box">
      <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
        <a-row>
          <a-col :span="24">
            <a-form-item field="type" label="能耗类型">
              <a-select v-model="form.type" placeholder="请选择能耗类型">
                <a-option
                  v-for="item in energyTypeData"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item field="unitPrice" label="能耗单价">
              <a-input v-model="form.unitPrice" placeholder="请输入能耗单价" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item field="category" label="费用项目">
              <a-select v-model="form.category" placeholder="请选择费用项目">
                <a-option :value="1">能耗费用</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { cbdApiProjectEnergyConsumeConfigAddPost } from '@/api';
  import { energyTypeData } from '@/utils/dic';

  const formRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'add'
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);
  const rules = {
    type: [{ required: true, message: '请选择能耗类型' }],
    unitPrice: [{ required: true, message: '请填写能耗单价' }],
    category: [{ required: true, message: '请选择费用项目' }]
  };
  const form = ref({
    type: 1,
    unitPrice: '',
    category: 1
  });

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      if (formRef.value) {
        formRef.value.resetFields();
      }
      emits('update:modelValue', v);
    }
  });

  const onSubmit = () => {
    formRef.value.validate((value: any) => {
      if (!value) {
        toSubmit();
      }
    });
  };

  const [toSubmit, loading] = useFuncProxy(async () => {
    await cbdApiProjectEnergyConsumeConfigAddPost({
      type: form.value.type,
      unitPrice: Number(form.value.unitPrice),
      category: form.value.category
    });
    Message.success('操作成功!');
    formRef.value.resetFields();
    emits('reset');
  });
</script>

<style scoped lang="less">
  // .
</style>
