<template>
  <drawer
    v-model="visible"
    title="设置积分获取规则"
    :options="{
      okLoading: isLoading
    }"
    @before-ok="onBeforeOk"
  >
    <div class="white-detail-box">
      <a-divider orientation="left">积分获取规则</a-divider>
      单笔订单消费每满
      <a-input
        v-model="from.amount"
        style="width: 150px"
        max-length="18"
        @input="
          from.amount = from.amount.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
        "
      ></a-input>
      元，赠送积分
      <a-input
        v-model="from.integral"
        max-length="10"
        style="width: 150px"
        @input="from.integral = from.integral.replace(/^\D*(\d+).*$/g, '$1')"
      ></a-input>
      分
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, onMounted, Ref, computed } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectMembersIntegralIntegralObtainGet,
    cbdApiProjectMembersIntegralIntegralObtainSavePost
  } from '@/api';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
  const from: Ref = ref({
    amount: '',
    integral: ''
  });
  const [getData] = useFuncProxy(async () => {
    from.value = await cbdApiProjectMembersIntegralIntegralObtainGet({});
  });
  const isLoading = ref(false);
  async function onBeforeOk(done: (closed: boolean) => void) {
    try {
      isLoading.value = true;
      done(false);
      await cbdApiProjectMembersIntegralIntegralObtainSavePost({
        ...from.value
      });
      done(true);
      emits('refresh');
      visible.value = false;
    } catch (e) {
    } finally {
      isLoading.value = false;
    }
  }
  onMounted(() => {
    getData();
  });
</script>
