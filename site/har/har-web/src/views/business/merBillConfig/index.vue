<template>
  <i-table
    v-model="search"
    v-model:page="pageOptions"
    :options="options"
    :data="data.rows"
    @submit="getParams"
  >
    <!--    :api="cbdApiAdminMerBillListGet"-->
    <template #statusCell="{ record }">
      <div>{{ enumObj[record.status] }}</div>
    </template>
    <template #menu="{ record }">
      <a-button type="text" @click="handleClickRow(record)">
        <template #icon> <icon-edit /> </template
        >{{ record.status === 1 ? '配置' : '编辑' }}</a-button
      >
    </template>
  </i-table>
  <a-modal
    v-model:visible="isModelVisible"
    title="分账配置"
    title-align="start"
  >
    <a-form :model="configForm">
      <a-form-item
        field="billModel"
        label="分账规则："
        :rules="[{ required: true, message: 'billModel is required' }]"
      >
        <a-select
          v-model="configForm.billModel"
          :style="{ width: '250px' }"
          placeholder="请选择分账模式"
        >
          <a-option
            v-for="item in billModelDicList"
            :key="item.value"
            :value="item.value"
            >{{ item.label }}</a-option
          >
        </a-select>
      </a-form-item>
      <a-form-item
        field="rate"
        label="对应比例："
        :rules="[
          { required: true, message: '分账比例必填' },
          { type: 'number', min: 90, message: '费率不能低于90' },
          { type: 'number', max: 100, message: '费率不能高于100' }
        ]"
      >
        <a-input
          v-model="configForm.rate"
          :disabled="configForm.billModel === 2"
          placeholder="请输入对应比例，如 98"
          maxlength="6"
          style="width: 250px"
          class="base-input"
        >
          <template #append>%</template>
        </a-input>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="save">提交</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'MerBillConfig'
  };
</script>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  // todo 暂时未用到的界面
  // import {
  //   cbdApiAdminMerBillAddPost,
  //   CbdApiAdminMerBillAddPostRequest,
  //   cbdApiAdminMerBillEditPost,
  //   cbdApiAdminMerBillListGet
  // } from '@/api';
  import useDictData from '@/hooks/useDictData';

  const isModelVisible = ref<boolean>(false);
  const [configDic, enumObj] = useDictData('mer_bill_status');
  const [billModelDicList] = useDictData('mer_bill_model');
  enum ConfigStatus {
    notConfig = 1,
    didConfig = 2
  }
  const pageOptions = ref<{
    pageSize: string;
    pageNum: string;
    total: number;
  }>({
    pageSize: '10',
    pageNum: '1',
    total: 0
  });
  const configForm = reactive<{
    id: number;
    status: number;
    billModel?: number;
    rate: any;
  }>({
    id: 0,
    status: 0,
    billModel: undefined,
    rate: undefined
  });
  const search = reactive<{ [key: string]: any }>({});
  const options = reactive<any>({
    submitText: '搜索',
    tableCard: true,
    columns: [
      {
        label: '商户编号',
        prop: 'merchantCode'
      },
      {
        label: '商户名称',
        prop: 'merchantName',
        search: true
      },
      {
        label: '分账规则',
        prop: 'billModel'
      },
      {
        label: '分账比例',
        prop: 'ratePercent'
      },
      {
        label: '配置状态',
        prop: 'status',
        type: 'select',
        search: true,
        dic: configDic.value
      },
      {
        label: '更新时间',
        prop: 'updateTime'
      }
    ]
  });
  const data = reactive<any>({
    rows: [],
    total: pageOptions.value.total
  });
  const params = ref<{
    merchantName: string;
    status: string;
    pageSize: string;
    pageNum: string;
  }>({
    merchantName: '',
    status: '',
    pageSize: pageOptions.value.pageSize,
    pageNum: pageOptions.value.pageNum
  });
  const getParams = (v: any) => {
    params.value.merchantName = v.values.merchantName;
    params.value.status = v.values.status;
  };
  const getDataList = async () => {
    // const res = await cbdApiAdminMerBillListGet(params.value);
    // data.rows = res.rows || [];
    // pageOptions.value.total = res.total || 0;
  };
  const handleClickRow = (v: any) => {
    configForm.id = v.id;
    configForm.status = v.status;
    isModelVisible.value = true;
    if (configForm.status === ConfigStatus.notConfig) {
      configForm.rate = undefined;
      configForm.billModel = undefined;
    } else {
      configForm.rate = v.status;
      configForm.billModel = v.billModel;
    }
  };
  // 保存
  const save = async () => {
    const { rate = 0 } = configForm;
    if (!configForm.billModel) {
      Message.error('分账模式不能为空');
      return false;
    }
    if (Number(configForm.billModel) === 1) {
      if (!rate) {
        Message.error('费率不能为空');
        return false;
      }
      if (rate < 90) {
        Message.error('费率不能低于90%');
        return false;
      }
    }
    if (rate / 100 > 1) {
      Message.error('费率不能超过100%');
      return false;
    }
    const p: any = {
      rate: rate / 100,
      id: configForm.id,
      billModel: configForm.billModel
    };
    try {
      if (configForm.status === ConfigStatus.notConfig) {
        // await cbdApiAdminMerBillAddPost(p);
      } else {
        // await cbdApiAdminMerBillEditPost(p);
      }
      Message.success('提交成功');
      await getDataList();
      isModelVisible.value = false;
    } catch (e) {
      console.error(e);
    }
    return null;
  };
  const handleCancel = () => {
    isModelVisible.value = false;
  };
</script>
