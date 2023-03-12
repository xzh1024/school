<template>
  <drawer
    v-model="visible"
    title="设置等级豆获取规则"
    :options="{
      okLoading: isLoading
    }"
    @before-ok="onBeforeOk"
  >
    <div class="white-detail-box">
      <a-divider orientation="left">等级豆获取规则</a-divider>
      每消费
      <a-input
        v-model="form.amount"
        max-length="18"
        style="width: 200px"
        @input="
        form.amount = form.amount.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
      "
      ></a-input>
      元，赠送
      <a-input
        v-model="form.levelBean"
        style="width: 200px"
        maxlength="10"
        @input="form.levelBean = form.levelBean.replace(/\D|^0/g, '')"
      ></a-input>
      等级豆
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, onMounted, Ref, computed } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectMembersLevelBeanRuleDetailGet,
    cbdApiProjectMembersLevelBeanRuleSavePost
  } from '@/api';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible: Ref = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
  const form: Ref = ref({
    amount: '',
    levelBean: ''
  });
  const [getData] = useFuncProxy(async () => {
    form.value = await cbdApiProjectMembersLevelBeanRuleDetailGet({});
  });
  const isLoading = ref(false);
  async function onBeforeOk(done: (closed: boolean) => void) {
    try {
      isLoading.value = true;
      done(false);
      await cbdApiProjectMembersLevelBeanRuleSavePost({
        ...form.value
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
