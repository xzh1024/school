<template>
  <div class="page">
    <i-form
      v-model="formData"
      :options="formOptions"
      @submit="getList"
      @reset="reset"
    />

    <div v-if="pageList.length" class="contract-list">
      <template v-for="item in pageList" :key="item">
        <div class="contract-item">
          <h3 class="type-name">
            {{ getComputedTmplType(item.templateType) }}合同模板
          </h3>
          <p class="tips">
            会员购买{{
              getComputedTmplType(item.templateType)
            }}，即可查看或打印{{ getComputedTmplType(item.templateType) }}合同
          </p>

          <span class="shop-name">店铺：{{ item.storeName }}</span>

          <a-button class="edit-btn" type="primary" @click="linkDetail(item)">
            <template #icon>
              <icon-edit />
            </template>
          </a-button>
        </div>
      </template>
    </div>

    <a-empty v-else />

    <!-- <a-pagination :total="200" show-page-size /> -->
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    groundPcApiGroundContractTemplateGetTemplateByReqPost,
    GroundPcApiGroundContractTemplateGetTemplateByReqPostResponse
  } from '@/api/ground-pc-api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { useProjectOptions } from '@/views/vms/hooks/usePorject';
  import { sessionKey, templateType } from './dic';
  const router = useRouter();
  const { getProjectOptions, projectOptions } = useProjectOptions();

  const formData = reactive({
    projectId: '',
    storeIdList: []
  });
  const formOptions = computed(() => {
    return {
      formCard: false,
      // menuForm: false,
      // layout: 'vertical',
      columns: [
        {
          label: '项目名称',
          prop: 'projectId',
          type: 'select',
          dic: projectOptions,
          span: 6
        },
        {
          label: '店铺名称',
          prop: 'storeIdList',
          type: 'select',
          dic: [],
          options: {
            multiple: true
          },
          span: 12
        }
      ]
    };
  });

  function linkDetail(
    item: GroundPcApiGroundContractTemplateGetTemplateByReqPostResponse[0]
  ) {
    sessionStorage.setItem(sessionKey, JSON.stringify(item));
    router.push(`/vms/system/contract/detail?id=${item.id}`);
  }

  function getComputedTmplType(type: number) {
    return templateType[type] || '';
  }

  const pageList =
    ref<GroundPcApiGroundContractTemplateGetTemplateByReqPostResponse>([]);
  const [getList] = useFuncProxy(async () => {
    const d = await groundPcApiGroundContractTemplateGetTemplateByReqPost({
      projectId: +formData.projectId,
      storeIdList: formData.storeIdList
    });
    pageList.value = d;
  });

  function reset() {
    formData.projectId = '';
    formData.storeIdList = [];
    getList();
  }

  onMounted(() => {
    getProjectOptions();
    getList();
  });
</script>

<style lang="less" scoped>
  .page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
  }

  .contract-list {
    // flex: 1;
    display: flex;
    flex-shrink: 0;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 16px;
    overflow-y: auto;
    margin-bottom: 16px;
  }

  .contract-item {
    width: calc(33.33333% - 11px);
    height: 156px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid #ccdbff;
    background: linear-gradient(
      135deg,
      #c5d6ff 0%,
      rgba(202, 221, 255, 0.66) 36%,
      rgba(219, 242, 255, 0) 100%
    );
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .type-name {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    margin: 0;
  }

  .tips {
    margin-top: 8px;
    flex: 1;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
  }

  .shop-name {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
  }

  .edit-btn {
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 2;
  }
</style>
