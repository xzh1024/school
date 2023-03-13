<template>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    :closable="false"
    width="1000px"
    :title="title"
  >
    <div class="modal-overflow">
      <i-loading v-if="loading" :loading="loading" />
      <i-form ref="refForm" v-model="form" :options="options">
        <template #businessLicenseValidityForm>
          <div class="input-box">
            <a-date-picker
              v-model="form.businessLicenseValidity"
              :disabled="licenseChecked"
              :disabled-date="(current: Date) => dayjs(current).isBefore(dayjs())"
              class="width"
            />
            <a-checkbox
              v-model="licenseChecked"
              value="1"
              class="btn-pos"
              @change="businessLicenseChange"
              >长期有效</a-checkbox
            >
          </div>
        </template>
        <template #areaForm>
          <a-cascader
            ref="refArea"
            v-model="form.area"
            :options="areaList"
            path-mode
            class="width"
            placeholder="请选择开户行地址"
          />
        </template>
        <template #businessAreaForm>
          <a-cascader
            ref="refBusinessArea"
            v-model="form.businessArea"
            :options="areaList"
            path-mode
            class="width"
            placeholder="请选择经营地址"
          />
        </template>
      </i-form>
    </div>

    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button @click="submit(1)">保存为草稿</a-button>
      <a-button type="primary" :loading="loading" @click="submit(2)"
        >提交认证</a-button
      >
    </template>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'IncomingEdit'
  };
</script>

<script setup lang="ts">
  import { computed, onMounted, Ref, ref, toRaw, watch } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import { cardTypeList } from '@/utils/dic';
  import {
    getAreaListDic,
    getBankTypeListDic,
    getBusinessListDic
  } from '@/utils/getDic';
  import {
    cbdApiProjectIncomingAccDetailIdGet,
    cbdApiProjectIncomingAccSavePost,
    cbdApiProjectIncomingCommonBankListGet,
    cbdApiProjectCommonMerchantSelectGet,
    type CbdApiProjectCommonMerchantSelectGetResponse
  } from '@/api';
  import {
    deleteLocalForm,
    getLocalForm,
    setLocalForm
  } from '@/utils/localFormStore';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ILoading from '@/components/i-loading/index.vue';
  import dayjs from 'dayjs';

  type MerchantType = CbdApiProjectCommonMerchantSelectGetResponse[0];
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed<boolean>({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const title = computed<string>(() => {
    return props.id ? '编辑账户' : '新增账户';
  });
  const refForm: Ref = ref(null);
  const refArea: Ref = ref(null);
  const refBusinessArea: Ref = ref(null);
  const bankList = ref<any>([]);
  const businessList = ref<any>([]);
  const merchantList = ref<MerchantType[]>([]);
  const areaList = ref<any>([]);
  const bankTypeList = ref<any>([]);
  const form: Ref = ref({ cardType: 1 });
  const licenseChecked = ref(false);
  const loading = ref<boolean>(false);
  // 长期有效时间
  const longTime = ref('2099-12-31');
  onMounted(() => {
    initDic();
    getMerchantData();
  });

  async function initDic() {
    try {
      // 账户进件 经营范围
      businessList.value = await getBusinessListDic();
      // 账户进件 省市区下拉
      areaList.value = await getAreaListDic();
      // 账户进件 行别
      bankTypeList.value = await getBankTypeListDic();
    } catch (e) {
      console.error(e);
    }
  }
  watch([() => form.value.area, () => form.value.bankTypeCode], () => {
    // form.value.bankCode = '';
    getBankListDic();
  });
  async function getBankListDic() {
    try {
      const { area = [], bankTypeCode } = form.value;
      const [, cityCode] = area;
      bankList.value = await cbdApiProjectIncomingCommonBankListGet({
        cityCode,
        typeCode: bankTypeCode
      });
    } catch (e) {
      console.error(e);
    }
  }
  function onCancel() {
    setLocalForm('incoming', JSON.stringify(toRaw(form.value)));
    visible.value = false;
  }
  watch(
    visible,
    async (v) => {
      if (v) {
        if (!props.id) {
          const res = await getLocalForm('incoming');
          if (res) form.value = JSON.parse(res as string);
        } else {
          await getInfo();
          await getBankListDic();
        }
      }
    },
    { immediate: true }
  );

  // watch(
  //   form,
  //   () => {
  //     // 缓存本地
  //     setLocalForm('incoming', toRaw(form.value));
  //     console.log(form.value)
  //   },
  //   { deep: true }
  // );

  const [getInfo] = useFuncProxy(async () => {
    const res = await cbdApiProjectIncomingAccDetailIdGet({
      id: `${props.id}`
    });
    const {
      idCardStartDate,
      idCardEndDate,
      businessProvinceCode,
      businessCityCode,
      businessDistrictCode,
      provinceCode,
      cityCode,
      districtCode,
      businessLicenseValidity
    } = res;

    if (businessLicenseValidity === longTime.value) licenseChecked.value = true;
    form.value = {
      ...res,
      area: [provinceCode, cityCode, districtCode],
      businessArea: [
        businessProvinceCode,
        businessCityCode,
        businessDistrictCode
      ],
      idCard: [idCardStartDate, idCardEndDate]
    };
  });

  const options: Ref = computed(() => {
    return {
      menuForm: false,
      span: 8,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '账户信息',
          type: 'groupTitle'
        },
        {
          label: '账户名',
          prop: 'accountName',
          rules: [{ required: true, message: '请填写账户名' }]
        },
        {
          label: '入账卡号',
          prop: 'bankCardNo',
          options: {
            maxlength: 19
          },
          rules: [
            { required: true, message: '请填写入账卡号' },
            { pattern: /^\d{0,19}$/, message: '请填写正确的卡号' }
          ]
        },
        {
          label: '入账卡类型',
          prop: 'cardType',
          type: 'radio',
          dic: cardTypeList
        },
        {
          label: '开户行地址',
          prop: 'area',
          type: 'cascader',
          options: {
            pathMode: true
          },
          dic: areaList.value,
          rules: [{ required: true, message: '请选择开户行地址' }]
        },
        {
          label: '行别',
          prop: 'bankTypeCode',
          type: 'select',
          dic: bankTypeList.value,
          options: {
            allowSearch: true
          },
          rules: [{ required: true, message: '请选择行别' }]
        },
        {
          label: '开户行',
          prop: 'bankCode',
          type: 'select',
          dic: bankList.value,
          options: {
            allowSearch: true
          },
          rules: [{ required: true, message: '请选择开户行' }]
        },
        {
          label: '联系人信息',
          type: 'groupTitle'
        },
        {
          label: '联系人姓名',
          prop: 'contacts',
          rules: [{ required: true, message: '请填写联系人姓名' }]
        },
        {
          label: '联系电话',
          prop: 'contactsPhone',
          options: {
            maxlength: 11
          },
          rules: [
            { required: true, message: '请填写联系电话' },
            { pattern: /^1\d{10}$/, message: '请填写正确的手机号码' }
          ]
        },
        {
          label: '邮箱',
          prop: 'contactsEmail',
          options: {
            maxlength: 50
          },
          rules: [
            { required: true, message: '请填写邮箱' },
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: '请填写正确的邮箱'
            }
          ]
        },
        {
          label: '营业执照信息',
          type: 'groupTitle'
        },
        {
          label: '营业执照',
          prop: 'businessLicense',
          type: 'customUpload',
          limit: 1,
          options: {
            urlKey: 'previewAddress'
          },
          rules: [{ required: true, message: '请上传营业执照' }]
        },
        {
          label: '开户许可证',
          prop: 'accountOpenPermit',
          type: 'customUpload',
          limit: 1,
          options: {
            urlKey: 'previewAddress'
          },
          rules: [{ required: true, message: '请上传开户许可证' }]
        },
        {
          label: '增值协议',
          prop: 'incrementAgreement',
          type: 'customUpload',
          limit: 1,
          options: {
            urlKey: 'previewAddress'
          },
          rules: [{ required: true, message: '请上传增值协议' }]
        },
        {
          label: '门店照片',
          prop: 'storePhoto',
          type: 'customUpload',
          limit: 1,
          options: {
            urlKey: 'previewAddress'
          },
          span: 24,
          rules: [{ required: true, message: '请上传门店照片' }]
        },
        {
          label: '商户',
          prop: 'merchantId',
          type: 'select',
          rules: [{ required: true, message: '请选择商户' }],
          dic: merchantList.value
        },
        // {
        //   label: '商户简称',
        //   prop: 'merShortName',
        //   rules: [{ required: true, message: '请填写商户简称' }]
        // },
        {
          label: '法人代表',
          prop: 'legalPerson',
          rules: [{ required: true, message: '请填写法人代表' }]
        },

        {
          label: '社会统一信用代码',
          prop: 'businessLicenseCode',
          options: {
            maxlength: 18
          },
          rules: [{ required: true, message: '请填写社会统一信用代码' }]
        },
        {
          label: '证件有效期',
          prop: 'businessLicenseValidity',
          rules: [{ required: true, message: '请选择证件有效期' }]
        },
        {
          label: '客服电话',
          prop: 'servicePhone',
          options: {
            maxlength: 11
          },
          rules: [{ required: true, message: '请填写客服电话' }]
        },
        {
          label: '经营范围',
          prop: 'categoryId',
          type: 'cascader',
          dic: businessList.value,
          rules: [{ required: true, message: '请选择经营范围' }]
        },
        {
          label: '经营地址',
          prop: 'businessArea',
          /*  type: 'cascader',
          dic: areaList.value,
          options: {
            pathMode: true
          }, */
          rules: [{ required: true, message: '请选择经营地址' }]
        },
        {
          label: '详细地址',
          prop: 'businessAddress',
          rules: [{ required: true, message: '请填写详细地址' }]
        },
        {
          label: '法人信息',
          type: 'groupTitle'
        },
        {
          label: '法人身份证正面',
          prop: 'idCardFront',
          type: 'customUpload',
          limit: 1,
          options: {
            urlKey: 'previewAddress'
          },
          rules: [{ required: true, message: '请上传法人身份证正面' }]
        },
        {
          label: '法人身份证反面',
          prop: 'idCardBack',
          type: 'customUpload',
          limit: 1,
          options: {
            urlKey: 'previewAddress'
          },
          span: 16,
          rules: [{ required: true, message: '请上传法人身份证反面' }]
        },
        {
          label: '法人姓名',
          prop: 'legalName',
          rules: [{ required: true, message: '请填写法人姓名' }]
        },
        {
          label: '身份证号码',
          prop: 'legalIdCardNo',
          options: {
            maxlength: 50
          },
          rules: [{ required: true, message: '请填写身份证号码' }]
        },
        {
          label: '户籍地址',
          prop: 'idAddress',
          options: {
            maxlength: 50
          },
          rules: [
            { required: true, message: '请填写户籍地址' },
            {
              minLength: 6,
              message: '最小长度为6个字符'
            }
          ]
        },
        {
          label: '签发机关',
          prop: 'signOrgan'
        },
        {
          label: '有效期限',
          prop: 'idCard',
          type: 'dateRange',
          rules: [{ required: true, message: '请选择身份证号码' }]
        }
      ]
    };
  });
  async function submit(type: number) {
    console.log(type);
    try {
      const res = await refForm.value.submit();
      if (res) return;
      loading.value = true;
      let {
        businessLicense = [],
        accountOpenPermit = [],
        incrementAgreement = [],
        storePhoto = [],
        idCardFront = [],
        idCardBack = []
      } = form.value;
      let BusinessAreaText = refBusinessArea.value.selectViewValue?.[0] || {};
      BusinessAreaText = (BusinessAreaText?.label || '')?.split('/');
      let areaText = refArea.value.selectViewValue?.[0] || {};
      areaText = (areaText?.label || '')?.split('/');
      const { idCard = [], area = [], businessArea = [] } = form.value;
      businessLicense = businessLicense.map((i: any) => i.key || i.id)?.join();
      accountOpenPermit = accountOpenPermit
        .map((i: any) => i.key || i.id)
        ?.join();
      incrementAgreement = incrementAgreement
        .map((i: any) => i.key || i.id)
        ?.join();
      idCardFront = idCardFront.map((i: any) => i.key || i.id)?.join();
      idCardBack = idCardBack.map((i: any) => i.key || i.id)?.join();
      storePhoto = storePhoto.map((i: any) => i.key || i.id)?.join();
      const [idCardStartDate, idCardEndDate] = idCard;
      const [businessProvinceName, businessCityName, businessDistrictName] =
        BusinessAreaText;
      const [businessProvinceCode, businessCityCode, businessDistrictCode] =
        businessArea;
      const [provinceName, cityName, districtName] = areaText;
      const [provinceCode, cityCode, districtCode] = area;
      const p = {
        ...form.value,
        type: 1,
        businessLicense,
        accountOpenPermit,
        incrementAgreement,
        storePhoto,
        idCardStartDate,
        idCardEndDate,
        idCardFront,
        idCardBack,
        provinceCode,
        cityCode,
        districtCode,
        provinceName,
        cityName,
        districtName,
        businessProvinceName,
        businessCityName,
        businessDistrictName,
        businessProvinceCode,
        businessCityCode,
        businessDistrictCode,
        status: type
      };
      await cbdApiProjectIncomingAccSavePost(p);
      Message.success('保存成功');
      await deleteLocalForm('incoming');
      visible.value = false;
      emits('refresh');
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  function businessLicenseChange(
    v: boolean | (string | number | boolean)[],
    e: Event
  ) {
    console.log(v);
    if (v) {
      form.value.businessLicenseValidity = longTime.value;
    } else {
      form.value.businessLicenseValidity = '';
    }
  }
  const [getMerchantData] = useFuncProxy(async () => {
    merchantList.value = await cbdApiProjectCommonMerchantSelectGet({});
  });
</script>

<style scoped lang="less">
  :deep(.arco-modal-body) {
    padding: 0 20px 24px;
  }

  :deep(.width) {
    width: 100%;
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
</style>
