<template>
  <a-descriptions
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
</template>
<script lang="ts" setup>
  defineProps({
    investInfo: {
      type: Object,
      default: () => {
        {
        }
      }
    }
  });
</script>
