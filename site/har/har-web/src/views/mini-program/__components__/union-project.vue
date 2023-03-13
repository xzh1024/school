<template>
  <a-modal
    v-model:visible="IVisible"
    title-align="start"
    title="关联地产项目"
    :mask-closable="false"
  >
    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
      <a-button
        type="primary"
        :loading="unionLoading"
        @click="submitUnionProject"
        >确定</a-button
      >
    </template>
    <a-form :model="form" size="large">
      <a-form-item field="name" label="项目名称">
        <a-select
          v-model="form.businessIdList"
          multiple
          allow-clear
          :field-names="{}"
          placeholder="请选择项目类型"
        >
          <a-option
            v-for="(item, index) in projectList"
            :key="index"
            :value="item.id"
            :label="item.name"
          ></a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'UnionProject'
  };
</script>

<script setup lang="ts">
  import { computed, onMounted, Ref, ref } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  /*  import {
    cbdApiClientBusinessListSelectGet,
    CbdApiClientBusinessListSelectGetResponse,
    cbdApiClientWechatThirdAppletModifyBusinessPost,
    CbdApiClientWechatThirdAppletModifyBusinessPostRequest
  } from '@/api'; */
  import { Message } from '@arco-design/web-vue';

  const props = defineProps({
    id: Number,
    visible: {
      type: Boolean,
      default: false
    },
    businessIdList: {
      type: Array,
      default: () => []
    }
  });
  const emits = defineEmits(['getData', 'update:visible']);
  const form: Ref = ref({
    id: -1
  });
  onMounted(() => {
    form.value = {
      id: props.id as number,
      businessIdList: props.businessIdList as Array<number>
    };
    getProjectList();
  });
  const projectList: Ref = ref([]);

  const [getProjectList] = useFuncProxy(async () => {
    // projectList.value = await cbdApiClientBusinessListSelectGet();
  });

  // 提交关联项目修改
  const [submitUnionProject, unionLoading] = useFuncProxy(async () => {
    /*  await cbdApiClientWechatThirdAppletModifyBusinessPost({
      ...form.value,
      id: props.id as number
    }); */
    Message.success('修改成功');
    IVisible.value = false;
    emits('getData');
  });

  // 弹窗处理
  function handleCancel() {
    IVisible.value = false;
  }
  const IVisible: Ref<boolean> = computed({
    get() {
      return props.visible;
    },
    set(v) {
      emits('update:visible', v);
    }
  });
</script>
