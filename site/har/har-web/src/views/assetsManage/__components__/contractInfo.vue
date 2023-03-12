<template>
  <div class="contractInfo">
    <a-form ref="searchFormRef" :model="searchForm" auto-label-width>
      <a-row>
        <a-col :span="8">
          <a-form-item field="key" label="基本资料:">
            <a-input
              v-model="searchForm.key"
              placeholder="请输入合同编号/商户/企业名称搜索"
              clearable
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="status" label="状态:">
            <a-select
              v-model="searchForm.status"
              placeholder="请选择状态"
              clearable
              @change="handleSelectClick"
            >
              <a-option
                v-for="item in contractStatusList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-button type="primary" @click="handleSearch">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
            <a-button
              style="margin-left: 10px"
              @click="handleReset($refs.searchFormRef)"
            >
              <template #icon>
                <icon-sync />
              </template>
              重置
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      v-if="tableData && tableData.length"
      :columns="tableColumns"
      :data="tableData"
    >
      <template #id="{ rowIndex }">
        <span>{{ rowIndex + 1 }}</span>
      </template>
      <template #status="{ record }">
        <span :style="{ color: statusFc(record.status).color }">
          {{ statusFc(record.status).text }}</span
        >
      </template>
      <template #operation="{ record }">
        <a-button type="text" @click="handleViewContract(record.contractId)"
          >查看</a-button
        >
      </template>
    </a-table>
    <contract-detail
      :id="contractDetailId"
      v-model="contractDetailModel"
    ></contract-detail>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ContractInfo'
  };
</script>

<script lang="ts" setup>
  import { ref, Ref, reactive, computed, onMounted } from 'vue';
  import { contractStatusList, SelectChangeValueType } from '@/utils/dic';
  import { cbdApiProjectAssetContractGet } from '@/api';
  import type { CbdApiProjectAssetContractGetResponse } from '@/api';
  import ContractDetail from '../../contract/__components__/contract-detail.vue';

  interface Props {
    estateId: number | null;
  }
  type TableItem = Required<CbdApiProjectAssetContractGetResponse>['rows'][0];

  const props = withDefaults(defineProps<Props>(), {
    estateId: null
  });

  const estateId = computed(() => {
    return props.estateId;
  });
  /**
   * @param 详情模态框
   */
  const contractDetailModel = ref(false);
  const contractDetailId = ref('');

  onMounted(() => {
    handleGetContractData();
  });

  /**
   * @param 获取合同数据
   */
  const handleGetContractData = async () => {
    const res = await cbdApiProjectAssetContractGet({
      key: '',
      status: '',
      estateId: `${estateId.value}`,
      pageNum: '1',
      pageSize: '10'
    });
    tableData.value = res.rows || [];
  };

  type statusFcType = () => { text: string; color: string };
  interface a {
    [key: number]: statusFcType;
  }
  /**
   * @param 状态处理函数
   */
  const statusFc = (status: number) => {
    const options: a = {
      1() {
        return {
          text: '草稿',
          color: '#999999'
        };
      },
      2() {
        return {
          text: '审核中',
          color: '#F9BF73'
        };
      },
      3() {
        return {
          text: '未生效',
          color: '#98CA49'
        };
      },
      4() {
        return {
          text: '生效中',
          color: '#165DFF'
        };
      },
      5() {
        return {
          text: '审核拒绝',
          color: '#F3AEB7'
        };
      },
      6() {
        return {
          text: '已到期',
          color: '#9A63DE'
        };
      },
      7() {
        return {
          text: '已作废',
          color: '#D7D7D7'
        };
      }
    };
    return options[status]();
  };

  /**
   * @param 表单
   */
  const searchForm = reactive({
    key: '',
    status: ''
  });

  /**
   * @param 状态选择的第几项
   */
  const handleSelectClick = (e: SelectChangeValueType) => {
    searchForm.status = String(e);
  };

  /**
   * @param 搜索
   */
  const handleSearch = async () => {
    const res = await cbdApiProjectAssetContractGet({
      key: searchForm.key || '',
      status: searchForm.status || '',
      estateId: `${estateId.value}`,
      pageNum: '1',
      pageSize: '10'
    });
    tableData.value = res.rows || [];
  };

  /**
   * @param 重置表单
   */
  const handleReset = (el: any) => {
    el.resetFields();
    handleGetContractData();
  };

  /**
   * @param 表格表头
   */
  const tableColumns = [
    {
      title: '序号',
      slotName: 'id'
    },
    {
      title: '合同编号',
      dataIndex: 'contractCode'
    },
    {
      title: '商户/企业名称',
      dataIndex: 'merchantCompanyName'
    },
    {
      title: '合同金额(¥)',
      dataIndex: 'totalAmount'
    },
    {
      title: '合同开始时间',
      dataIndex: 'periodStart'
    },
    {
      title: '合同结束时间',
      dataIndex: 'periodEnd'
    },
    {
      title: '状态',
      slotName: 'status'
    },
    {
      title: '操作',
      slotName: 'operation'
    }
  ];

  /**
   * @param 表格数据
   */
  const tableData: Ref<Array<TableItem>> = ref([]);

  /**
   * @param 查看详情
   */
  const handleViewContract = (id: number) => {
    console.log(id);
    contractDetailModel.value = true;
    contractDetailId.value = id as unknown as string;
  };
</script>

<style scoped lang="less">
  @import './contractInfo.less';

  :deep(.arco-form-item-content-flex) {
    justify-content: flex-end;
  }
</style>
