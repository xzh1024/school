<template>
  <div>
    <a-drawer v-model:visible="visible" :width="1000" :footer="isFooter">
      <template #title>进件账户查询</template>
      <div class="white-detail-box">
        <i-loading :loading="loading" />
        <a-divider orientation="left">账户信息</a-divider>
        <a-descriptions>
          <descriptions-item label="状态">{{
            statusFilter(info.status)
          }}</descriptions-item>
          <descriptions-item label="入账卡号">{{
            info.bankCardNo
          }}</descriptions-item>
          <descriptions-item label="入账卡类型">{{
            cardTypeFilter(info.cardType)
          }}</descriptions-item>
          <descriptions-item label="开户行地址">{{
            bankDetail
          }}</descriptions-item>
          <descriptions-item label="行别">{{
            info.bankTypeName
          }}</descriptions-item>
          <descriptions-item label="开户行">{{
            info.bankName
          }}</descriptions-item>
        </a-descriptions>
        <a-divider orientation="left">联系人信息</a-divider>
        <a-descriptions>
          <descriptions-item label="联系人姓名">{{
            info.contacts
          }}</descriptions-item>
          <descriptions-item label="联系电话">{{
            info.contactsPhone
          }}</descriptions-item>
          <descriptions-item label="邮箱">{{
            info.contactsEmail
          }}</descriptions-item>
        </a-descriptions>
        <a-divider orientation="left">店铺信息</a-divider>
        <i-table
          :options="storeOptions"
          :data="info.storeList"
          :pagination="false"
        />
        <a-divider orientation="left">营业执照信息</a-divider>
        <div class="margin-bottom">
          <a-row :gutter="20">
            <a-col :span="4">
              <div class="margin-bottom-xs"> 营业执照 </div>
              <i-custom-upload
                v-model="info.businessLicense"
                url-key="previewAddress"
                :options="{
                  showUploadButton: false,
                  showRemoveButton: false
                }"
              />
            </a-col>
            <a-col :span="4">
              <div class="margin-bottom-xs"> 开户许可证 </div>
              <i-custom-upload
                v-model="info.accountOpenPermit"
                url-key="previewAddress"
                :options="{
                  showUploadButton: false,
                  showRemoveButton: false
                }"
              />
            </a-col>
            <a-col :span="4">
              <div class="margin-bottom-xs"> 增值协议 </div>
              <i-custom-upload
                v-model="info.incrementAgreement"
                url-key="previewAddress"
                :options="{
                  showUploadButton: false,
                  showRemoveButton: false
                }"
              />
            </a-col>
            <a-col :span="4">
              <div class="margin-bottom-xs"> 门店照片 </div>
              <i-custom-upload
                v-model="info.storePhoto"
                url-key="previewAddress"
                :options="{
                  showUploadButton: false,
                  showRemoveButton: false
                }"
              />
            </a-col>
          </a-row>
        </div>
        <a-descriptions>
          <descriptions-item label="商户全称">{{
            info.merName
          }}</descriptions-item>
          <descriptions-item label="商户简称">{{
            info.merShortName
          }}</descriptions-item>
          <descriptions-item label="法人代表">{{
            info.legalPerson
          }}</descriptions-item>
          <descriptions-item label="社会统一信用代码">{{
            info.businessLicenseCode
          }}</descriptions-item>
          <descriptions-item label="证件有效期">{{
            info.businessLicenseValidity
          }}</descriptions-item>
          <descriptions-item label="客服电话">{{
            info.servicePhone
          }}</descriptions-item>
          <descriptions-item label="经营范围">{{
            info.categoryName
          }}</descriptions-item>
          <descriptions-item label="经营地址">{{
            businessAddressDetail
          }}</descriptions-item>
        </a-descriptions>
        <a-divider orientation="left">法人身份证</a-divider>
        <div class="margin-bottom">
          <a-row :gutter="20">
            <a-col :span="4">
              <i-custom-upload
                v-model="info.idCardFront"
                url-key="previewAddress"
                :options="{
                  showUploadButton: false,
                  showRemoveButton: false,
                  accept: 'image/*'
                }"
              />
            </a-col>
            <a-col :span="4">
              <i-custom-upload
                v-model="info.idCardBack"
                url-key="previewAddress"
                :options="{
                  showUploadButton: false,
                  showRemoveButton: false
                }"
              />
            </a-col>
          </a-row>
        </div>
        <a-descriptions>
          <descriptions-item label="法人姓名">{{
            info.legalName
          }}</descriptions-item>
          <descriptions-item label="身份证号码">{{
            info.legalIdCardNo
          }}</descriptions-item>
          <descriptions-item label="户籍地址">{{
            info.idAddress
          }}</descriptions-item>
          <descriptions-item label="签发机关">{{
            info.signOrgan
          }}</descriptions-item>
          <descriptions-item label="有效期限">{{
            periodDate
          }}</descriptions-item>
        </a-descriptions>
      </div>
      <template #footer>
        <a-button
          v-if="info.status === 6"
          v-permission="['incoming:acc:relation:store']"
          type="primary"
          @click="merchantVisible = true"
          >关联店铺</a-button
        >
        <a-button v-if="info.status === 1" type="outline" @click="accountEdit"
          >编辑</a-button
        >
        <template v-if="info.status === 2 && info.hasApproval">
          <a-button @click="contractOperate('refuse')">拒绝认证</a-button>
          <a-button type="primary" @click="contractOperate('pass')"
            >通过认证</a-button
          >
        </template>
      </template>
    </a-drawer>
    <related-shop
      v-if="merchantVisible"
      v-model:modal-visible="merchantVisible"
      v-model:dataId="info.id"
      v-model:merchantSelected="merchantSelected"
      v-model:merchant-id="info.merchantId"
      :check-list="checklist"
      @refresh="getInfo"
      @confirm-merchant-select="merchantSelectConfirm"
    />
    <i-modal
      v-model="opinionVisible"
      title="账户认证"
      :on-before-ok="refuseAuthenticate"
    >
      <div>
        <div class="opinion-tip margin-bottom">{{ descTip }}</div>
        <div>
          <a-textarea
            v-model="opinion"
            :max-length="200"
            show-word-limit
            placeholder="请输入备注"
          ></a-textarea>
        </div>
      </div>
    </i-modal>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'IncomingDetail'
  };
</script>

<script setup lang="ts">
  import { computed, Ref, ref, watch } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { DescriptionsItem, Message } from '@arco-design/web-vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import {
    cbdApiProjectIncomingAccDetailIdGet,
    cbdApiProjectIncomingAccModifyStatusPut
  } from '@/api';
  import { accStatusList, cardTypeList, StatusListType } from '@/utils/dic';
  import dayjs from 'dayjs';
  import ITable from '@/components/i-table/index.vue';
  import IModal from '@/components/i-modal/index.vue';
  import ILoading from '@/components/i-loading/index.vue';
  import RelatedShop from '../../__components__/incomingParts/related-shop.vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue', 'editChange']);
  const visible = computed<boolean>({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  watch(
    () => props.id,
    () => {
      if (props.id) getInfo();
    }
  );
  // 意见内容
  const opinion: Ref<string> = ref('');
  // 意见类型 // refuse 拒绝  pass 通过
  const opinionType: Ref<string> = ref('');
  const opinionVisible: Ref<boolean> = ref(false);
  const info = ref<any>({});
  const descTip = computed(() => {
    if (opinionType.value === 'pass') {
      return '请确认是否通过当前账户认证？';
    }
    return '请确认是否拒绝当前账户认证？';
  });

  const checklist = computed(() => {
    const { storeList = [] } = info.value;
    return storeList.map((i: any) => i.id) || [];
  });
  const storeOptions = ref({
    index: false,
    menu: false,
    pageShow: false,
    columns: [
      {
        label: '店铺名称',
        prop: 'storeName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '经营业态',
        prop: 'manageName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '所属区域',
        prop: 'provinceName',
        ellipsis: true,
        tooltip: true,
        formatter: (v: any) => {
          const { provinceName, cityName, districtName } = v;
          return `${provinceName}${cityName}${districtName}`;
        }
      },
      {
        label: '联系人',
        prop: 'contacts'
      },
      {
        label: '联系电话',
        prop: 'contactsPhone'
      }
    ]
  });

  const isFooter = computed(() => {
    const { status, hasApproval } = info.value;
    return [6, 1].includes(status) || (status === 2 && hasApproval);
  });

  const [getInfo, loading] = useFuncProxy(async () => {
    info.value = await cbdApiProjectIncomingAccDetailIdGet({
      id: `${props.id}`
    });
  });

  const businessAddressDetail = computed<string>(() => {
    const {
      businessProvinceName,
      businessCityName,
      businessDistrictName,
      businessAddress
    } = info.value;
    return `${businessProvinceName}${businessCityName}${businessDistrictName}${businessAddress}`;
  });
  const bankDetail = computed<string>(() => {
    const { provinceName, cityName, districtName } = info.value;
    return `${provinceName}${cityName}${districtName}`;
  });
  const periodDate = computed<string>(() => {
    let { idCardStartDate, idCardEndDate } = info.value;
    idCardStartDate = idCardStartDate
      ? dayjs(idCardStartDate).format('YYYY-MM-DD')
      : '';
    idCardEndDate = idCardEndDate
      ? dayjs(idCardEndDate).format('YYYY-MM-DD')
      : '';
    return `${idCardStartDate} - ${idCardEndDate}`;
  });
  async function accountEdit() {
    emits('editChange');
  }

  async function refuseAuthenticate(done: (closed: boolean) => void) {
    try {
      await cbdApiProjectIncomingAccModifyStatusPut({
        id: info.value.id as number,
        status: opinionType.value === 'refuse' ? 5 : 3,
        remark: opinion.value
      });
      Message.success('操作成功');
      done(true);
      getInfo();
    } catch (e) {
      done(false);
      console.error(e);
    }
  }
  function contractOperate(v: 'refuse' | 'pass') {
    opinionType.value = v;
    opinionVisible.value = true;
  }

  function statusFilter(v: number) {
    return accStatusList.find((i: StatusListType) => i.value === v)?.label;
  }
  function cardTypeFilter(v: number) {
    return cardTypeList.find((i: StatusListType) => i.value === v)?.label;
  }

  const merchantVisible: Ref<boolean> = ref(false);
  const merchantSelected: Ref<Array<number>> = ref([]);

  function merchantSelectConfirm() {
    console.log(11);
  }
  defineExpose({ getInfo });
</script>

<style scoped></style>
