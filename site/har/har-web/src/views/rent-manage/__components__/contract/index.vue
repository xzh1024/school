<template>
  <a-divider orientation="left">收款单基本信息</a-divider>
  <a-descriptions
    :data="page.basicInfo"
    layout="inline-horizontal"
    :value-style="listItemStyle"
  >
    <descriptions-item
      v-for="(item, idx) in basicInfoItems"
      :key="idx"
      :span="item.span || 1"
      :label="item.label + '：'"
    >
      {{ useFormatDescription(page.basicInfo, item) }}
    </descriptions-item>
  </a-descriptions>
  <div>
    <div style="margin-bottom: 15px; color: rgb(134 144 156)">合同文件</div>
    <i-custom-upload
      v-model="page.basicInfo.files"
      url-key="previewAddress"
      :options="{
        showUploadButton: false,
        showRemoveButton: false
      }"
    ></i-custom-upload>
  </div>

  <a-divider orientation="left">承租人信息</a-divider>
  <a-descriptions
    :data="page.lesseeInfo"
    layout="inline-horizontal"
    :column="2"
    :value-style="listItemStyle"
  >
    <descriptions-item
      v-for="(item, idx) in lesseeInfoItems"
      :key="idx"
      :span="item.span || 1"
      :label="item.label + '：'"
    >
      {{ useFormatDescription(page.lesseeInfo, item) }}
    </descriptions-item>
  </a-descriptions>

  <a-divider orientation="left">合同信息</a-divider>
  <i-table :options="page.bondConfig" :data="bondData" />
  <div v-for="(each, i) in page.contractInfo" :key="i">
    <a-descriptions
      layout="inline-horizontal"
      :data="each"
      style="margin-top: 20px"
      :value-style="listItemStyle"
    >
      <descriptions-item
        v-for="(item, idx) in contractInfoItems"
        :key="idx"
        :span="item.span || 1"
        :label="item.label + '：'"
      >
        {{ useFormatDescription(each, item) }}
      </descriptions-item>
    </a-descriptions>
    <fund-type :config="page.typeListConfig" :data-list="each.estateBillList">
      <template #extra>
        <p style="color: #333; font-weight: bold"
          >合计 ￥ {{ calculateTotalPrice(each) }}</p
        >
      </template>
    </fund-type>
  </div>
</template>

<script setup lang="ts">
  import { reactive, computed, inject } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { DescriptionsItem } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import useFormatDescription from '@/hooks/useFormatDescription';
  import {
    cbdApiProjectLeaseRecordContractInfoGet,
    CbdApiProjectLeaseRecordContractInfoGetRequest
  } from '@/api';
  import { ListDataType, listItemStyle, contractStatusHash } from '@/utils/dic';
  import FundType from '../common/fund-type.vue';

  const basicInfoItems: Array<ListDataType> = [
    {
      label: '合同甲方',
      prop: 'ascriptionCompanyName'
    },
    {
      label: '合同编号',
      prop: 'code'
    },
    {
      label: '状态',
      prop: 'status',
      isEnum: true,
      source: contractStatusHash
    },
    {
      label: '方案号',
      prop: 'schemeCode'
    },
    {
      label: '合同开始时间',
      prop: 'periodStart'
    },
    {
      label: '合同结束时间',
      prop: 'periodEnd'
    },
    {
      label: '合同地址',
      prop: 'address',
      span: 3
    },
    {
      label: '备注',
      prop: 'remark',
      span: 3
    }
  ];
  const lesseeInfoItems: Array<ListDataType> = [
    {
      label: '商户 / 企业名称',
      prop: 'merchantName'
    },
    {
      label: '地址',
      prop: 'address'
    },
    {
      label: '承租人 / 负责人姓名',
      prop: 'principal'
    },
    {
      label: '身份证号码',
      prop: 'principalId'
    },
    {
      label: '户籍地址',
      prop: 'principalRegisterAddress'
    },
    {
      label: '公司名称',
      prop: 'companyName'
    },
    {
      label: '法人代表',
      prop: 'legalPerson'
    },
    {
      label: '社会统一信用代码',
      prop: 'uscCode'
    }
  ];
  const contractInfoItems: Array<ListDataType> = [
    {
      label: '房源门牌号',
      prop: 'doorPlate'
    },
    {
      label: '项目名称',
      prop: 'projectName'
    },
    {
      label: '归属楼宇',
      prop: 'buildingName'
    },
    {
      label: '房源面积',
      prop: 'acreage',
      hasUnit: true,
      unit: '㎡'
    },
    {
      label: '房源类型',
      prop: 'categoryName'
    },
    {
      label: '房源编号',
      prop: 'code'
    },
    {
      label: '地址',
      prop: 'address',
      span: 3
    },
    {
      label: '租赁用途',
      prop: 'leasePurposeName'
    },
    {
      label: '经营业态',
      prop: 'manageName'
    }
  ];
  const page = reactive<any>({
    basicInfo: {
      files: [],
      bond: '',
      costType: '',
      address: ''
    },
    lesseeInfo: {
      address: ''
    },
    contractInfo: [],
    bondConfig: {
      tableCard: false,
      pageShow: false,
      menu: false,
      columns: [
        {
          label: '保证金（¥）',
          prop: 'bond'
        },
        {
          label: '费用类型',
          prop: 'costType'
        }
      ]
    },
    typeListConfig: {
      tableCard: false,
      pageShow: false,
      menu: false,
      columns: [
        {
          label: '缴费日期',
          prop: 'billLastRepaymentDate'
        },
        {
          label: '期数',
          prop: 'billCycle'
        },
        {
          label: '优惠前金额（¥）',
          prop: 'totalAmount'
        },
        {
          label: '优惠金额（¥）',
          prop: 'discountAmount'
        },
        {
          label: '应收金额（¥）',
          prop: 'actualAmount'
        }
      ]
    }
  });
  const bondData = computed(() => {
    return [
      {
        bond: page.basicInfo.bond,
        costType: page.basicInfo.costType
      }
    ];
  });
  interface AddressObj {
    address: string;
    provinceName?: string;
    cityName?: string;
    districtName?: string;
  }
  function handleFullAddress(add: AddressObj) {
    return `${add.provinceName || ''}${add.cityName || ''}${
      add.districtName || ''
    }${' '.repeat(5) + add.address}`;
  }
  function calculateTotalPrice(target: any) {
    return target.estateBillList.reduce(
      (pre: number, cur: any) => pre + cur.totalAmount,
      0
    );
  }
  const [getInfo] = useFuncProxy(async () => {
    const houseId = inject<any>('houseId');
    const contractId = inject<any>('contractId');
    const { contractInfo, lesseeInfo, estateInfo } =
      await cbdApiProjectLeaseRecordContractInfoGet({
        id: houseId.value,
        contractId: contractId.value
      } as CbdApiProjectLeaseRecordContractInfoGetRequest);
    page.basicInfo = contractInfo;
    page.basicInfo.address = handleFullAddress(contractInfo as AddressObj);
    page.lesseeInfo = lesseeInfo;
    page.lesseeInfo.address = handleFullAddress(lesseeInfo as AddressObj);
    page.contractInfo = estateInfo;
    page.contractInfo.address = handleFullAddress(
      estateInfo as unknown as AddressObj
    );
  });
  getInfo();
</script>

<style scoped></style>
