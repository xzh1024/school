<template>
  <drawer
    v-model="visible"
    :title="title"
    :footer="
      shopInfo.data.storeStatus === 0 ||
      (shopInfo.storeStatus === 1 && shopInfo.hasApproval)
    "
  >
    <template #footer>
      <a-button v-if="shopInfo.data.storeStatus === 0" @click="handleEditShop"
        >编辑店铺</a-button
      >
      <template v-if="shopInfo.storeStatus === 1 && shopInfo.hasApproval">
        <a-button @click="handleCertify('refuse')">认证拒绝</a-button>
        <a-button type="primary" @click="handleCertify('pass')"
          >认证通过</a-button
        >
      </template>
    </template>
    <div class="white-detail-box">
      <a-divider orientation="left">店铺信息</a-divider>
      <a-descriptions
        :column="3"
        :data="shopInfo.data"
        layout="inline-horizontal"
        :value-style="listItemStyle"
      >
        <descriptions-item
          v-for="(item, idx) in shopInfoItems"
          :key="idx"
          :span="item.span"
          :label="item.label + '：'"
        >
          {{ useFormatDescription(shopInfo.data, item) }}
        </descriptions-item>
      </a-descriptions>
      <a-descriptions layout="vertical">
        <descriptions-item label="门店照片：">
          <a-image
            v-for="(it, idx) in shopInfo.data.shopPhotoAttachments"
            :key="idx"
            :src="it.previewAddress"
            width="120"
            height="120"
          ></a-image>
        </descriptions-item>
      </a-descriptions>
      <a-divider orientation="left">店铺资产信息</a-divider>
      <i-table :options="tableOption" :data="assetsInfo.estateInfos">
        <template #assetsCell="{ record }">
          <div>{{
            record.assets === '合计' ? '合计' : handleAssetsShow(record)
          }}</div>
        </template>
        <template #addressDetailCell="{ record }">
          <div>{{
            record.addressDetail === '--' ? '--' : handleAddressShow(record)
          }}</div>
        </template>
      </i-table>
      <a-divider orientation="left">企业基本信息</a-divider>
      <a-descriptions layout="vertical" :column="2">
        <descriptions-item label="法人身份证：">
          <a-image
            v-for="(it, idx) in companyInfo.data.idCardAttachments"
            :key="idx"
            :src="it.previewAddress"
            width="120"
            height="120"
            style="margin-right: 15px"
          >
          </a-image>
        </descriptions-item>
        <descriptions-item label="营业执照：">
          <a-image
            width="120"
            height="120"
            :src="companyInfo.data.businessLicenseAttachment.previewAddress"
          ></a-image>
        </descriptions-item>
      </a-descriptions>
      <a-descriptions
        :column="3"
        :data="companyInfo.data"
        layout="inline-horizontal"
        :value-style="listItemStyle"
      >
        <descriptions-item
          v-for="(item, idx) in companyBasicItems"
          :key="idx"
          :span="item.span"
          :label="item.label + '：'"
        >
          {{ useFormatDescription(companyInfo.data, item) }}
        </descriptions-item>
      </a-descriptions>
      <a-descriptions layout="vertical">
        <descriptions-item label="其他有效证件：">
          <a-image
            v-for="(it, idx) in companyInfo.data.otherCertificateAttachments"
            :key="idx"
            :src="it.previewAddress"
            width="120"
            height="120"
          ></a-image>
        </descriptions-item>
      </a-descriptions>
    </div>
    <audit-modal
      v-model="detail.showAudit"
      :top-title="detail.title"
      :title="detail.tip"
      @submit="handleAudit"
    ></audit-modal>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import useFormatDescription from '@/hooks/useFormatDescription';
  import { ListDataType, listItemStyle, shopStatusHash } from '@/utils/dic';
  import AuditModal from '@/components/audit-modal.vue';
  import {
    cbdApiProjectCommonFormatSelectListGet,
    cbdApiProjectStoreBasicApprovalPost,
    cbdApiProjectStoreBasicInfoIdGet
  } from '@/api';
  import type { CbdApiProjectStoreBasicInfoIdGetResponse } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useDictData from '@/hooks/useDictData';
  import { DescriptionsItem } from '@arco-design/web-vue';
  import NP from 'number-precision';
  import { RecordType } from './type';

  type TableItem =
    Required<CbdApiProjectStoreBasicInfoIdGetResponse>['estateInfos'][0];
  const [, rentPurposeHash] = useDictData('00008');
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '查询店铺'
    },
    shopId: {
      type: Number
    }
  });
  const emits = defineEmits([
    'update:modelValue',
    'edit',
    'update:refresh',
    'refresh'
  ]);

  const industryHash = ref<{ [index: number]: string }>({});
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const tableOption = reactive({
    tableCard: false,
    menu: false,
    pageShow: false,
    menuOtherOptions: {
      summary({ data = [] }) {
        const countData = {
          assets: '合计',
          code: '--',
          acreage: 0,
          categoryName: '--',
          addressDetail: '--'
        };
        data.forEach((record: TableItem) => {
          countData.acreage = NP.plus(countData.acreage, record.acreage!);
        });
        return [countData];
      }
    },
    columns: [
      {
        label: '资产',
        prop: 'assets'
      },
      {
        label: '房源编号',
        prop: 'code'
      },
      {
        label: '面积（㎡）',
        prop: 'acreage'
      },
      {
        label: '房源类型',
        prop: 'categoryId',
        isEnum: true,
        source: []
      },
      {
        label: '地址',
        prop: 'addressDetail'
      }
    ]
  });
  interface DataObject {
    data: any;
  }
  interface DetailData {
    showAudit: boolean;
    title: string;
    tip: string;
    auditType: string;
    isEdit: boolean;
  }
  interface AssetsInfoType {
    estateIds: string[];
    estateInfos: object[];
  }
  interface AuditRemarkType {
    remark: string;
  }

  const shopInfo = reactive<any>({
    data: {
      shopPhotoAttachments: []
    },
    storeStatus: '',
    hasApproval: false
  });
  const assetsInfo = reactive<AssetsInfoType>({
    estateIds: [],
    estateInfos: []
  });
  const companyInfo = reactive<DataObject>({
    data: {
      idCardAttachments: [],
      businessLicenseAttachment: [],
      otherCertificateAttachments: []
    }
  });
  const shopInfoItems: Array<ListDataType> = [
    {
      label: '经营业态',
      prop: 'sceneName'
    },
    {
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '租赁用途',
      prop: 'purposeId',
      isEnum: true,
      source: rentPurposeHash.value
    },
    {
      label: '状态',
      prop: 'storeStatus',
      isEnum: true,
      source: shopStatusHash
    },
    {
      label: '店铺名称',
      prop: 'name'
    },
    {
      label: '联系人姓名',
      prop: 'linkman'
    },
    {
      label: '联系电话',
      prop: 'linkTel'
    },
    {
      label: '备注',
      prop: 'remark',
      span: 3
    }
  ];
  const companyBasicItems: Array<ListDataType> = [
    {
      label: '法人姓名',
      prop: 'realName'
    },
    {
      label: '身份证号码',
      prop: 'idCardNum',
      span: 2
    },
    {
      label: '户籍地址',
      prop: 'registerAddress',
      span: 3
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
  const detail = reactive<DetailData>({
    showAudit: false,
    isEdit: false,
    title: '店铺认证',
    tip: '',
    auditType: ''
  });
  const handleEditShop = () => {
    emits('edit', props.shopId);
  };
  const handleCertify = (type: string): void => {
    detail.showAudit = !detail.showAudit;
    detail.auditType = type;
    detail.isEdit = true;
    detail.tip =
      type === 'refuse'
        ? '请确认是否拒绝当前店铺认证?'
        : '请确认是否通过当前店铺认证?';
  };
  const handleAudit = async (e: AuditRemarkType) => {
    detail.showAudit = !detail.showAudit;
    await cbdApiProjectStoreBasicApprovalPost({
      id: props.shopId!,
      opinions: e.remark,
      result: detail.auditType === 'pass' ? 1 : 0
    });
    emits('refresh');
    getInfoById();
  };
  const handleAssetsShow = (p: RecordType) => {
    return (
      p.projectName +
        ' '.repeat(5) +
        p.buildingName +
        ' '.repeat(5) +
        p.floorName +
        ' '.repeat(5) +
        p.doorPlate || '--'
    );
  };
  const handleAddressShow = (p: RecordType) => {
    return (
      p.provinceName +
        p.cityName +
        p.districtName +
        ' '.repeat(5) +
        p.address || '--'
    );
  };

  const [getInfoById] = useFuncProxy(async () => {
    const res = await cbdApiProjectStoreBasicInfoIdGet({
      id: String(props.shopId!)
    });
    shopInfo.data = res.info || {};
    shopInfo.storeStatus = res.storeStatus;
    shopInfo.data.storeStatus = res.storeStatus;
    shopInfo.hasApproval = res.hasApproval;
    // assetsInfo.estateIds = res.assets.estateIds;
    assetsInfo.estateInfos = res.estateInfos;
    companyInfo.data = res.businessInfo || {};
    emits('update:refresh', false);
  });

  const [getIndustryList] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonFormatSelectListGet();
    handleIndustryHash(res);
  });
  const handleIndustryHash = (data: object[]) => {
    data.forEach((el: any) => {
      if (!el.children || !el.children.length) {
        industryHash.value[el.id] = el.formatData;
      } else {
        industryHash.value[el.id] = el.formatData;
        handleIndustryHash(el.children);
      }
    });
  };
  onMounted(() => {
    getIndustryList();
  });
  watch(
    () => props.shopId,
    (v) => {
      if (v) {
        getInfoById();
      }
    }
  );
  watch(
    () => props.refresh,
    (v) => {
      if (v && props.shopId) {
        getInfoById();
      }
    }
  );
</script>

<style scoped lang="less"></style>
