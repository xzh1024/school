<template>
  <div class="warp">
    <div class="block-title">基本信息</div>
    <a-descriptions
      table-layout="fixed"
      :label-style="{ 'margin-bottom': '20px' }"
      layout="vertical"
      :column="4"
    >
      <a-descriptions-item label="归属项目：">{{
        infoData.projectName || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="招商计划名称：">{{
        infoData.investPlanName || '--'
      }}</a-descriptions-item>
    </a-descriptions>
    <div v-if="infoData.investPlanId" class="details-warp">
      <a-descriptions
        table-layout="fixed"
        :label-style="{ 'margin-bottom': '20px' }"
        layout="vertical"
        :column="4"
      >
        <a-descriptions-item label="编号：">{{
          investInfo.code || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="公司性质：">{{
          investInfo.type === 1 ? '个人' : investInfo.type === 2 ? '公司' : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="商户名称：">{{
          investInfo.merchantName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="别名：">{{
          investInfo.merchantShortName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="公司名称：">{{
          investInfo.companyName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="营业执照编号：">{{
          investInfo.businessLicenseNumber || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="法人姓名：">{{
          investInfo.legalPerson || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label=""></a-descriptions-item>
        <a-descriptions-item label="法人身份证：">{{
          investInfo.idNumber || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="账户名称：">{{
          investInfo.bankAccountName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="开户银行：">{{
          investInfo.bank || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="开户银行编号：">{{
          investInfo.bankAccount || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="联系人：">{{
          investInfo.linkman || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="联系电话：">{{
          investInfo.linkTel || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="联系地址：">{{
          investInfo.address || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label=""></a-descriptions-item>
        <a-descriptions-item label="谈判标的：">{{
          investInfo.estateName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="目标品牌：">{{
          investInfo.brandName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="开始时间：">{{
          investInfo.startDate || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="结束时间：">{{
          investInfo.endDate || '--'
        }}</a-descriptions-item>
      </a-descriptions>
    </div>

    <a-descriptions
      table-layout="fixed"
      :label-style="{ 'margin-bottom': '20px' }"
      layout="vertical"
      :column="4"
    >
      <a-descriptions-item
        :label="
          contractStore.contractInfo.contractType === 1
            ? '意向合同编号：'
            : '正式合同编号：'
        "
        >{{ infoData.code || '--' }}</a-descriptions-item
      >
      <a-descriptions-item label="纸质合同号：">{{
        infoData.paperCode || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="商户名称：">{{
        infoData.merchantName || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="品牌：">{{
        infoData.brandName || '--'
      }}</a-descriptions-item>

      <a-descriptions-item label="业态：">{{
        infoData.formatName || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="店铺名称：">{{
        infoData.storeName || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="经营方式：">{{
        infoData.operatMode === 1
          ? '自营'
          : infoData.operatMode === 2
          ? '联营'
          : '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="签约日期：">{{
        infoData.signDate || '--'
      }}</a-descriptions-item>

      <a-descriptions-item label="租赁开始日期：">{{
        infoData.leaseStartDate || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="租赁结束日期：">{{
        infoData.leaseEndDate || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="合同生效日期：">{{
        infoData.effectStartDate || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="合同失效日期：">{{
        infoData.effectEndDate || '--'
      }}</a-descriptions-item>
    </a-descriptions>

    <div class="split-bg"></div>

    <div class="block-title">相关信息</div>

    <a-descriptions
      table-layout="fixed"
      :label-style="{ 'margin-bottom': '25px' }"
      layout="vertical"
      :column="4"
    >
      <a-descriptions-item label="是否主力店铺：">{{
        infoData.mainStores === 1 ? '是' : '否'
      }}</a-descriptions-item>
      <a-descriptions-item label="是否统一收据：">{{
        infoData.unifiedCashier === 1 ? '是' : '否'
      }}</a-descriptions-item>
      <a-descriptions-item label="违约金：">{{
        infoData.defaultAmount + ' 元' || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="货品组别：">{{
          infoData.goodsNames || '--'
        }}</a-descriptions-item>
    </a-descriptions>

<!--    <a-descriptions-->
<!--      :label-style="{ 'margin-bottom': '20px' }"-->
<!--      layout="vertical"-->
<!--      :column="1"-->
<!--    >-->

<!--    </a-descriptions>-->

    <a-descriptions
      :label-style="{ 'margin-bottom': '20px' }"
      layout="vertical"
      :column="1"
    >
      <a-descriptions-item label="备注：">{{
        infoData.remark || '--'
      }}</a-descriptions-item>
    </a-descriptions>

    <div class="split-bg"></div>

    <!-- 开票信息表单 -->
    <div class="invoice">
      <div class="titles">
        <span>开票信息</span>
        <span class="left-line"></span>
        <span class="right-line"></span>
      </div>
      <a-descriptions
        v-if="showInvoice"
        :label-style="{ 'margin-bottom': '20px' }"
        layout="vertical"
        :column="4"
      >
        <a-descriptions-item label="发票类型：">{{
          infoData.invoice.invoiceType === 1
            ? '普票'
            : infoData.invoice.invoiceType === 2
            ? '专票'
            : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="发票抬头：">{{
          infoData.invoice.invoiceRise || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="纳税人类别：">{{
          infoData.invoice.categoryType === 1
            ? '一般纳税人'
            : infoData.invoice.categoryType === 2
            ? '小规模纳税人'
            : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="纳税人识别号：">{{
          infoData.invoice.category || '--'
        }}</a-descriptions-item>

        <a-descriptions-item label="开户银行：">{{
          infoData.invoice.bank || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="银行账号：">{{
          infoData.invoice.bankNo || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="联系电话：">{{
          infoData.invoice.phone || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="开票地址：">{{
          infoData.invoice.address || '--'
        }}</a-descriptions-item>
      </a-descriptions>
    </div>

    <div class="bottoms">
      <footer-btn
        :need-save="false"
        :need-pre="false"
        @on-update="updateClick"
        @on-del="deleteClick"
        @on-stop="stopClick"
        @on-contract-cancel="contractCancel"
        @on-next="nextClick"
        @on-settle="settleClick"
        @on-confirm="confirmClick"
        @on-cancel="cancel"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, Ref } from 'vue';
  import {
    cbdApiProjectInvestPlanContractDetailIdGet,
    cbdApiProjectCommonGoodsGroupSelectGet,
    cbdApiProjectFormalContractSubjectInfoContractIdGet,
    type CbdApiProjectCommonGoodsGroupSelectGetResponse
  } from '@/api';
  import { isEmpty } from 'lodash';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { useContractStore } from '@/store/project/contract';
  import FooterBtn from '../footer-btn.vue';
  const contractStore = useContractStore();

  const emits = defineEmits([
    'onUpdate',
    'onDel',
    'onConfirm',
    'onStop',
    'onContractCancel',
    'onSettle',
    'onCancel',
    'onSave',
    'onPre',
    'onNext',
    'onExamine'
  ]);

  const pageForm = ref<any>({
    merchantId: '',
    brandId: '',
    projectId: ''
  });
  const infoData: Ref = ref({});

  const showInvoice = ref(false);

  const investInfo: Ref = ref({});
  const kindsDropList = ref<CbdApiProjectCommonGoodsGroupSelectGetResponse>([]);

  //获取货品类别下拉
  const [getKindsList] = useFuncProxy(async () => {
    kindsDropList.value = await cbdApiProjectCommonGoodsGroupSelectGet({
      projectId: pageForm.value.projectId
    });
    if (infoData.value.goodsGroupIds.length > 0) {
      const kindNameArr: any = [];
      infoData.value.goodsGroupIds.forEach((element: string) => {
        kindsDropList.value.filter((items: any) => {
          if (items.value == element) {
            kindNameArr.push(items.label);
          }
          //   kindNameArr.push(element);
        });
      });

      infoData.value.goodsNames = kindNameArr.join(',');
    }
  });
  //获取主体详情
  const getMainDetail = async () => {
    const res = await cbdApiProjectFormalContractSubjectInfoContractIdGet({
      contractId: contractStore.contractInfo.contractId + ''
    });

    if (!isEmpty(res.invoice)) {
      // 判断是否含有开票信息
      showInvoice.value = true;
      infoData.value = res;
    } else {
      showInvoice.value = false;
      infoData.value = res;
    }

    if (res.investPlanId) {
      getInvestmentDetail(res.investPlanId + '');
    }
    getKindsList();
  };
  //获取招商详情
  const getInvestmentDetail = async (detailId: string) => {
    investInfo.value = await cbdApiProjectInvestPlanContractDetailIdGet({
      id: detailId
    });
  };

  //保存

  //下一步
  const nextClick = async () => {
    // await submitClick();
    await emits('onNext');
  };
  //修改
  const updateClick = async () => {
    await emits('onUpdate');
  };
  //删除
  const deleteClick = async () => {
    await emits('onDel');
  };
  //停止
  const stopClick = async () => {
    await emits('onStop');
  };
  //作废
  const contractCancel = async () => {
    await emits('onContractCancel');
  };
  //清算
  const settleClick = async () => {
    await emits('onSettle');
  };
  const cancel = async () => {
    await emits('onCancel');
  };
  //确认
  const confirmClick = async () => {
    await emits('onSettle');
  };

  getMainDetail();
</script>
<style lang="less" scoped>
  .warp {
    height: 100%;
    background-color: #fff;
    padding: 16px;
    margin: 16px;
    .details-warp {
      width: 100%;
      height: 324px;
      background: #f7f7f7;
      padding: 16px;
      margin-bottom: 20px;
    }
    .input-box {
      position: relative;
      width: 100%;

      .btn-pos {
        position: absolute;
        top: -35px;
        right: 0;
        z-index: 1;
        padding: 0;

        &:hover {
          background: transparent;
        }
      }
    }
    .invoice {
      margin-top: 16px;
      position: relative;

      .titles {
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        .isAdd {
          position: absolute;
          right: 12%;
        }
        .left-line {
          position: absolute;
          top: 50%;
          left: 5%;
          z-index: 1;
          width: 80%;
          height: 1px;
          background: #f6f6f6;
          transform: translateY(-50%);
          content: '';
        }
        .right-line {
          position: absolute;
          top: 50%;
          right: 0;
          z-index: 1;
          width: 10%;
          height: 1px;
          background: #f6f6f6;
          transform: translateY(-50%);
          content: '';
        }
      }
    }
    .bottoms {
      position: absolute;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 12px 16px;
      background: #fff;
      .btn {
        width: 100px;
        margin-right: 8px;
        border-radius: 4px;
      }
    }
  }
</style>
