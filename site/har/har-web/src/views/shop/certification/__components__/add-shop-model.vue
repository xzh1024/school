<template>
  <drawer v-model="visible" :title="title">
    <template #footer>
      <a-button @click="onSubmit('draft')">保存草稿</a-button>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit('save')"
        >确认</a-button
      >
    </template>
    <div class="white-detail-box">
      <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
        <a-divider orientation="left">商户信息</a-divider>
        <div class="flex align-center">
          <a-button
            type="primary"
            style="width: 90px; text-align: center"
            @click="checkMerchant"
            >选择商户</a-button
          >
          <span style="margin-left: 15px">{{ selectMerchant.linkman }}</span>
          <span style="margin-left: 15px">{{
            selectMerchant.companyName
          }}</span>
        </div>
        <a-divider orientation="left">店铺信息</a-divider>
        <a-row>
          <a-col :span="6">
            <a-form-item field="name" label="店铺名称">
              <a-input v-model="form.name" placeholder="请输入店铺名称" />
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="linkman" label="联系人姓名">
              <a-input v-model="form.linkman" placeholder="请输入联系人姓名" />
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="linkTel" label="联系电话">
              <a-input v-model="form.linkTel" placeholder="请输入联系电话" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="purposeId" label="租赁用途">
              <a-select v-model="form.purposeId" placeholder="请选择租赁用途">
                <a-option
                  v-for="item in rentPurposeList"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</a-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="sceneId" label="经营业态">
              <a-cascader
                v-model="form.sceneId"
                :options="industryList"
                :field-names="{
                  value: 'id',
                  label: 'formatData'
                }"
              ></a-cascader>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item field="remark" label="备注">
              <a-textarea
                v-model="form.remark"
                placeholder="请输入备注"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item field="shopPhotoAttachments" label="门店照片">
              <i-custom-upload
                v-model="form.shopPhotoAttachments"
                :options="{
                  limit: 1,
                  listType: 'picture-card',
                  accept: 'image/*'
                }"
                url-key="previewAddress"
              ></i-custom-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">店铺资产信息</a-divider>
        <a-row>
          <a-col :span="14">
            <a-form-item field="estateIds" label="店铺资产">
              <a-cascader
                v-model="form.estateIds"
                :options="assetsSelectList"
                placeholder="请选择资产"
                :load-more="loadMore"
                :fallback="fallbackRes"
                multiple
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <i-table :options="assetOptions" :data="shopAssets">
              <template #assetsCell="{ record }">
                <div>{{
                  record.assets === '合计' ? '合计' : handleAssetsShow(record)
                }}</div>
              </template>
              <template #addressDetailCell="{ record }">
                <div>{{
                  record.addressDetail === '--'
                    ? '--'
                    : handleAddressShow(record)
                }}</div>
              </template>
            </i-table>
          </a-col>
        </a-row>
        <a-divider orientation="left">企业基本信息</a-divider>
        <a-row>
          <a-col :span="12">
            <a-row flex>
              <a-col :span="8">
                <a-form-item field="idCardFront" label="法人身份证(正)">
                  <i-custom-upload
                    v-model="form.idCardFront"
                    :options="{
                      limit: 1,
                      listType: 'picture-card',
                      accept: 'image/*'
                    }"
                    url-key="previewAddress"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="16">
                <a-form-item field="idCardEnd" label="法人身份证(反)">
                  <i-custom-upload
                    v-model="form.idCardEnd"
                    :options="{
                      limit: 1,
                      listType: 'picture-card',
                      accept: 'image/*'
                    }"
                    url-key="previewAddress"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <p class="tip">请确认企业法人身份证信息是否正确，若有误请修改</p>
          </a-col>
          <a-col :span="12">
            <a-form-item field="businessLicenseAttachment" label="营业执照">
              <i-custom-upload
                v-model="form.businessLicenseAttachment"
                :options="{
                  limit: 1,
                  listType: 'picture-card',
                  accept: 'image/*'
                }"
                url-key="previewAddress"
              />
            </a-form-item>
            <p class="tip">请确认企业营业执照信息是否正确，若有误请修改</p>
          </a-col>
          <a-col :span="6">
            <a-form-item field="realName" label="法人姓名">
              <a-input v-model="form.realName" placeholder="请输入法人姓名" />
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="idCardNum" label="身份证号码">
              <a-input
                v-model="form.idCardNum"
                placeholder="请输入身份证号码"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="registerAddress" label="户籍地址">
              <a-input
                v-model="form.registerAddress"
                placeholder="请输入户籍地址"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="companyName" label="公司名称">
              <a-input
                v-model="form.companyName"
                placeholder="请输入公司名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="legalPerson" label="法人代表">
              <a-input
                v-model="form.legalPerson"
                placeholder="请输入法人代表"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="uscCode" label="社会统一信用代码">
              <a-input
                v-model="form.uscCode"
                placeholder="请输入社会统一信用代码"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              field="otherCertificateAttachments"
              label="其他有效证件"
            >
              <i-custom-upload
                v-model="form.otherCertificateAttachments"
                :options="{
                  listType: 'picture-card',
                  accept: 'image/*'
                }"
                url-key="previewAddress"
              />
            </a-form-item>
            <p class="tip">例：餐饮行业需上传《食品安全许可证》等</p>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-modal
      :visible="showMerchant"
      title="选择商户"
      width="50vw"
      @cancel="showMerchant = false"
      @ok="onOk"
    >
      <div style="max-height: 70vh">
        <i-table
          ref="chooseTable"
          v-model="merchantParams"
          v-model:selectedKeys="selectKeys"
          :options="merchantTable"
          :api="cbdApiProjectMerchantListGet"
        ></i-table>
      </div>
    </a-modal>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, watch, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useDictData from '@/hooks/useDictData';
  import {
    cbdApiProjectMerchantListGet,
    cbdApiProjectStoreBasicAddPost,
    type CbdApiProjectStoreBasicAddPostRequest,
    cbdApiProjectCommonFormatSelectListGet,
    cbdApiProjectCommonAssetsSelectListGet,
    cbdApiProjectStoreBasicInitInfoIdGet,
    type CbdApiProjectStoreBasicUpdateIdPutRequest,
    type CbdApiProjectMerchantListGetResponse,
    cbdApiProjectStoreBasicUpdateIdPut
  } from '@/api';
  import NP from 'number-precision';
  import type { FormType, RecordType } from './type';
  import type {
    CbdApiProjectStoreBasicInitInfoIdGetResponse,
    CbdApiProjectCommonAssetsSelectListGetResponse,
    CbdApiProjectCommonFormatSelectListGetResponse
  } from '@/api';
  type EstateInfoItem =
    Required<CbdApiProjectStoreBasicInitInfoIdGetResponse>['estateInfos'][0];
  type AssertsItem =
    Required<CbdApiProjectCommonAssetsSelectListGetResponse>[0];
  type IndustryListItem =
    Required<CbdApiProjectCommonFormatSelectListGetResponse>[0];
  type MerchantItem = Required<CbdApiProjectMerchantListGetResponse>['rows'][0];

  const [rentPurposeList] = useDictData('00008');
  const formRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    shopId: {
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);
  const assetOptions = computed(() => {
    return {
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
          data.forEach((record: any) => {
            countData.acreage = NP.plus(countData.acreage, record.acreage);
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
          prop: 'categoryName'
        },
        {
          label: '地址',
          prop: 'addressDetail'
        }
      ]
    };
  });
  const rules = {
    name: [{ required: true, message: '请填写店铺名' }],
    linkman: [{ required: true, message: '请填写联系人' }],
    linkTel: [{ required: true, message: '请填写联系电话' }],
    purposeId: [{ required: true, message: '请选择租赁用途' }],
    sceneId: [{ required: true, message: '请选择经营业态' }],
    shopPhotoAttachments: [{ required: true, message: '请上传门店照片' }],
    estateIds: [{ required: true, message: '请选择店铺资产' }],
    businessLicenseAttachment: [{ required: true, message: '请上传营业执照' }],
    idCardEnd: [{ required: true, message: '请上传法人身份证反面' }],
    idCardFront: [{ required: true, message: '请上传法人身份证正面' }],
    realName: [{ required: true, message: '请填写法人姓名' }],
    idCardNum: [{ required: true, message: '请填写身份证号码' }],
    registerAddress: [{ required: true, message: '请填写户籍地址' }],
    companyName: [{ required: true, message: '请填写公司名称' }],
    legalPerson: [{ required: true, message: '请填写法人代表' }],
    uscCode: [{ required: true, message: '请填写社会统一信用代码' }]
  };
  const form = ref<FormType>({
    name: '',
    linkman: '',
    merchantId: undefined,
    idCardFront: [],
    idCardEnd: [],
    linkTel: '',
    purposeId: '',
    sceneId: '',
    remark: '',
    shopPhotoAttachments: [],
    estateIds: [],
    businessLicenseAttachment: [],
    idCardAttachments: [],
    realName: '',
    idCardNum: '',
    registerAddress: '',
    companyName: '',
    legalPerson: '',
    uscCode: '',
    otherCertificateAttachments: [],
    storeStatus: undefined
  });

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const shopAssets = ref<Array<EstateInfoItem>>([]);
  const [submitShopInfo, loading] = useFuncProxy(async () => {
    const {
      shopPhotoAttachments = [],
      otherCertificateAttachments = [],
      businessLicenseAttachment = []
    } = form.value;
    const businessLicenseAttachmentTemp: string =
      businessLicenseAttachment[0].key;
    const shopPhotoAttachmentsTemp: string[] = [];
    const otherCertificateAttachmentsTemp: string[] = [];
    shopPhotoAttachments.forEach((el: any) => {
      if (el.key) {
        shopPhotoAttachmentsTemp.push(el.key);
      }
    });
    const idCardAttachmentsTemp: string[] = [];
    idCardAttachmentsTemp[0] = form.value.idCardFront[0]?.key;
    idCardAttachmentsTemp[1] = form.value.idCardEnd[0]?.key;
    otherCertificateAttachments.forEach((el: any) => {
      if (el.key) {
        otherCertificateAttachmentsTemp.push(el.key);
      }
    });
    await cbdApiProjectStoreBasicAddPost({
      ...form.value,
      shopPhotoAttachments: shopPhotoAttachmentsTemp,
      idCardAttachments: idCardAttachmentsTemp,
      otherCertificateAttachments: otherCertificateAttachmentsTemp,
      businessLicenseAttachment: businessLicenseAttachmentTemp
    } as CbdApiProjectStoreBasicAddPostRequest);
    formRef.value.resetFields();
    visible.value = false;
    emits('reset');
  });
  const isEdit: Ref = computed(() => props.source === 'edit');
  const [updateData] = useFuncProxy(async () => {
    const {
      shopPhotoAttachments = [],
      otherCertificateAttachments = [],
      businessLicenseAttachment = []
    } = form.value;
    const businessLicenseAttachmentTemp: string =
      businessLicenseAttachment[0].id || businessLicenseAttachment[0].key;
    const shopPhotoAttachmentsTemp: string[] = [];
    const otherCertificateAttachmentsTemp: string[] = [];
    shopPhotoAttachments.forEach((el: any) => {
      if (el.id || el.key) {
        shopPhotoAttachmentsTemp.push(el.id || el.key);
      }
    });
    const idCardAttachmentsTemp: string[] = [];
    idCardAttachmentsTemp[0] = form.value.idCardFront[0]?.id;
    idCardAttachmentsTemp[1] = form.value.idCardEnd[0]?.id;
    otherCertificateAttachments.forEach((el: any) => {
      if (el.id || el.key) {
        otherCertificateAttachmentsTemp.push(el.id || el.key);
      }
    });
    await cbdApiProjectStoreBasicUpdateIdPut({
      id: String(props.shopId!),
      ...form.value,
      shopPhotoAttachments: shopPhotoAttachmentsTemp,
      idCardAttachments: idCardAttachmentsTemp,
      otherCertificateAttachments: otherCertificateAttachmentsTemp,
      businessLicenseAttachment: businessLicenseAttachmentTemp
    } as CbdApiProjectStoreBasicUpdateIdPutRequest);
    Message.success('操作成功!');
    formRef.value.resetFields();
    visible.value = false;
    emits('reset');
  });
  const onSubmit = (type: string) => {
    formRef.value.validate((value: any) => {
      if (!value) {
        form.value.storeStatus = type === 'draft' ? 0 : undefined;
        try {
          loading.value = true;
          if (isEdit.value) {
            updateData();
          } else {
            submitShopInfo();
          }
        } catch (e) {
        } finally {
          loading.value = false;
        }
      }
    });
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

  const [getShopDetail] = useFuncProxy(async () => {
    const res = await cbdApiProjectStoreBasicInitInfoIdGet({
      id: String(props.shopId!)
    });
    form.value = {
      ...res,
      idCardFront: [res.idCardAttachments[0]],
      idCardEnd: [res.idCardAttachments[1]],
      businessLicenseAttachment: [res.businessLicenseAttachment]
    } as unknown as FormType;
    selectKeys.value = [res.merchantId];
    latestList.value = res.estateInfos;
  });
  function fallbackRes(item: any) {
    interface ObjectType {
      [key: string]: any;
    }
    const { estateInfos = [] } = form.value;
    const info: any = estateInfos.find((i: ObjectType) => i.id === item);
    return (
      info &&
      info.projectName + info.buildingName + info.floorName + info.doorPlate
    );
  }
  const industryList = ref<Array<IndustryListItem>>([]);
  const [getIndustryList] = useFuncProxy(async () => {
    industryList.value = await cbdApiProjectCommonFormatSelectListGet({});
    deleteEmptyChildren(industryList.value || []);
  });
  function deleteEmptyChildren(arr: Array<IndustryListItem>) {
    if (Array.isArray(arr)) {
      arr.forEach((item: IndustryListItem) => {
        if (!item.children || !item.children.length) {
          delete item.children;
        } else {
          deleteEmptyChildren(item.children);
        }
      });
    }
  }
  const assetsSelectList = ref<Array<AssertsItem>>([]);
  const [getAssetsSelectList] = useFuncProxy(async () => {
    assetsSelectList.value = await cbdApiProjectCommonAssetsSelectListGet({});
  });

  const latestList = ref<Array<EstateInfoItem>>([]);
  // 远程加载内容
  async function loadMore(option: any, done: any) {
    // console.log(option, done);
    if (!form.value.merchantId) {
      Message.error('请先选择商户');
      return false;
    }
    const { level, value } = option;
    try {
      const res = await cbdApiProjectCommonAssetsSelectListGet({
        level: level + 1,
        parentValue: value,
        extraParam: '1',
        merchantId: `${form.value.merchantId}`
      });
      if (level === 3) {
        done(
          res.map((i: any) => {
            latestList.value.push({ ...i.extra });
            return { ...i, ...i.extra, isLeaf: true };
          })
        );
      } else {
        done(res);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 选择商户
  const showMerchant = ref<boolean>(false);
  const selectKeys = ref<number[]>([]);
  const merchantParams = ref<{ status: number }>({
    status: 1
  });
  const merchantTable = ref({
    tableCard: false,
    menu: false,
    menuOtherOptions: {
      rowKey: 'id',
      rowSelection: {
        type: 'radio'
      }
    },
    columns: [
      {
        label: '商户编号',
        prop: 'code'
      },
      {
        label: '商户 / 企业名称',
        prop: 'name'
      },
      {
        label: '联系人',
        prop: 'linkman'
      },
      {
        label: '联系电话',
        prop: 'linkTel'
      },
      {
        label: '经营业态',
        prop: 'sceneName'
      },
      {
        label: '商户类型',
        prop: 'typeName'
      },
      {
        label: '租赁用途',
        prop: 'purposeName'
      }
    ]
  });
  const checkMerchant = () => {
    showMerchant.value = true;
  };
  const chooseTable = ref<any>(null);
  const selectMerchant = ref<MerchantItem>({} as MerchantItem);
  const onOk = () => {
    form.value.merchantId = selectKeys.value[0];
    selectMerchant.value = chooseTable.value!.data.find(
      (e: MerchantItem) => e.id === selectKeys.value[0]
    );
    showMerchant.value = false;
  };
  onMounted(() => {
    getIndustryList();
    // getAssetsSelectList();
  });
  watch(
    () => form.value.estateIds,
    (v) => {
      if (v && v.length) {
        shopAssets.value = latestList.value.filter((el: EstateInfoItem) => {
          return v.indexOf(el.id || '') > -1;
        });
      } else {
        shopAssets.value = [];
      }
    }
  );
  watch(
    visible,
    () => {
      if (assetsSelectList.value.length < 1) getAssetsSelectList();
    },
    { immediate: true }
  );
  watch(
    () => props.shopId,
    (v) => {
      if (v) {
        getShopDetail();
        if (assetsSelectList.value.length < 1) getAssetsSelectList();
      }
    },
    { immediate: true }
  );
</script>

<style scoped lang="less">
  .tip {
    margin-bottom: 15px;
    padding: 0;
    color: #b3b3b3;
  }
</style>
