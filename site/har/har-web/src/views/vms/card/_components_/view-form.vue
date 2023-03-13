<template>
  <div class="page">
    <div class="i-card">
      <i-form v-model="formData" :options="cardFormOptions">
        <template #CardForm>
          <card :name="formData.name" :type="`${type}`" />
        </template>
      </i-form>
    </div>

    <div class="i-card">
      <h3>基础信息</h3>
      <i-form v-model="formData" :options="baseFormOptions">
        <template #TableForm>
          <card />
        </template>
      </i-form>
    </div>

    <div class="i-card">
      <h3>权益设置</h3>
      <i-form v-model="formData" :options="equityFormOptions" />
    </div>

    <div class="i-card">
      <h3>卡设置</h3>
      <i-form v-model="formData" :options="cardInfoFormOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { GroundPcApiCardBaseDetailGetResponse } from '@/api/ground-pc-api';
  import { sectionToChinese } from '@/utils';
  import { computed, ref } from 'vue';
  import Card from './card.vue';
  defineProps({
    type: {
      type: Number,
      default: 1
    }
  });

  const formData = ref<GroundPcApiCardBaseDetailGetResponse>({
    admissionTimes: []
  });
  const commonOptions = {
    formCard: false,
    menuForm: false,
    layout: 'vertical'
  };
  const cardFormOptions = {
    ...commonOptions,
    columns: [
      { prop: 'Card', span: 6 },
      {
        label: '已售',
        prop: 'saleCount',
        type: 'span',
        span: 6,
        options: {
          class: 'bold-text'
        }
      },
      {
        label: '天数',
        prop: 'daysOrTimes',
        type: 'span',
        span: 6,
        options: {
          class: 'bold-text'
        }
      },
      {
        label: '价格合计',
        prop: 'totalPrice',
        type: 'span',
        span: 6,
        options: {
          class: 'bold-text'
        }
      },
      { label: '项目名称', prop: 'projectName', type: 'span', span: 6 },
      { label: '卡名称', prop: 'name', type: 'span', span: 6 },
      { label: '上架状态', prop: 'shelfStatusName', type: 'span', span: 6 },
      { label: '销售状态', prop: 'saleStatusName', type: 'span', span: 6 },
      { label: '产品介绍', prop: 'cardContent', type: 'span', span: 24 }
    ]
  };

  const baseFormOptions = {
    ...commonOptions,
    columns: [
      { label: '店铺名称', prop: 'storeName', type: 'span', span: 6 },
      { label: '支持场馆', prop: 'venuesName', type: 'span', span: 6 },
      { label: '销售时间', prop: 'saleDate', type: 'span', span: 6 },
      { label: '销售渠道', prop: 'saleChannelName', type: 'span', span: 6 },
      { label: '激活方式', prop: 'activeMethod', type: 'span', span: 24 },
      { label: '售价信息', prop: 'shelveName', type: 'Table', span: 6 }
    ]
  };

  const equityFormOptions = computed(() => {
    return {
      ...commonOptions,
      columns: [
        { label: '入场时段', prop: 'admissionName', type: 'span', span: 6 },
        {
          label: '是否支持转让',
          prop: 'allowTransferTypeName',
          type: 'span',
          span: 18
        },
        ...(formData.value?.admissionTimes || []).map((item: any) => {
          return {
            label: `周${sectionToChinese(item.week)}`,
            type: 'span',
            span: 6,
            formatter() {
              return item.time.map((it: number) => `${it}:00`).join('~');
            }
          };
        })
      ]
    };
  });

  const cardInfoFormOptions = {
    ...commonOptions,
    columns: [
      { label: '上架信息', prop: 'shelveName', type: 'span', span: 24 },
      { label: '卡说明', prop: 'cardContent', type: 'span', span: 24 }
    ]
  };

  function setFormData(data: GroundPcApiCardBaseDetailGetResponse) {
    console.log(data);
    formData.value = data;
  }

  defineExpose({ setFormData });
</script>

<style lang="less" scoped>
  .page {
    width: 100%;
  }

  :deep(.arco-form-item) {
    margin-bottom: 0;
  }

  .bold-text {
    font-size: 24px;
    font-weight: 500;
    color: #333333;
    line-height: 32px;
  }
</style>
