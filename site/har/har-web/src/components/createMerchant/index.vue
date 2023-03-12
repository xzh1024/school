<template>
  <a-modal
    v-model:visible="modalVisible"
    :mask-closable="false"
    :closable="false"
    width="800px"
  >
    <template #title>
      {{ `${modalTitle}商户` }}
    </template>
    <a-form
      ref="editFormRef"
      :model="editFormContent"
      :rules="editRules"
      auto-label-width
      layout="vertical"
      style="max-height: 70vh; overflow-x: hidden; overflow-y: auto"
    >
      <a-divider orientation="left">基本信息</a-divider>
      <a-row :gutter="20">
        <a-col :span="8">
          <a-form-item field="name" label="商户/企业名称">
            <a-input
              v-model="editFormContent.name"
              placeholder="请输入商户/企业名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="status" label="状态">
            <a-radio-group v-model="editFormContent.status">
              <a-radio
                v-for="(item, index) in statusList"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="8">
          <a-form-item field="linkman" label="联系人姓名">
            <a-input
              v-model="editFormContent.linkman"
              placeholder="例如:张三"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="linkTel" label="联系电话">
            <a-input
              v-model="editFormContent.linkTel"
              placeholder="请输入联系电话"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="sceneId" label="经营业态">
            <a-cascader
              v-model="editFormContent.sceneId"
              :options="sceneList"
              placeholder="请选择业态"
              :field-names="{
                value: 'id',
                label: 'name'
              }"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="typeId" label="商户类型">
            <a-select v-model="editFormContent.typeId" placeholder="请选择类型">
              <a-option
                v-for="item in typeList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="purposeId" label="租赁用途">
            <a-select
              v-model="editFormContent.purposeId"
              placeholder="请选择用途"
            >
              <a-option
                v-for="item in purposeList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="requireArea" label="需求面积㎡">
            <a-input
              v-model="editFormContent.requireArea"
              placeholder="请输入需求面积"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="areaCode" label="请选择省 / 市 / 区">
            <a-cascader
              v-model="editFormContent.areaCode"
              :options="addressOptions"
              :path-mode="true"
              placeholder="请选择省 / 市 / 区"
              @change="areaChange"
            />
          </a-form-item>
        </a-col>
        <a-col :span="16">
          <a-form-item field="address" label="详细地址">
            <a-input
              v-model="editFormContent.address"
              placeholder="******小区**栋**单元**楼**号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item field="remark" label="备注">
            <a-textarea
              v-model="editFormContent.remark"
              placeholder="请输入备注"
              :max-length="{ length: 200, errorOnly: true }"
              allow-clear
              show-word-limit
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider orientation="left">企业信息</a-divider>
      <div style="display: flex; width: 100%">
        <div style="width: 50%">
          <div style="margin-bottom: 12px">
            <strong class="arco-form-item-label-required-symbol">
              <svg
                fill="currentColor"
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
                color="red"
              >
                <path
                  d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z"
                ></path>
              </svg>
            </strong>
            承租人身份证
          </div>
          <a-row>
            <a-col :span="10">
              <a-form-item field="principalIdFrontAttachment">
                <i-custom-upload
                  v-model="editFormContent.principalIdFrontAttachment"
                  url-key="previewAddress"
                  :options="{
                    limit: 1,
                    tip: '请上传身份证正面',
                    accept: 'image/*'
                  }"
                />
                <template #extra>
                  <div>请确认企业法人身份信息</div>
                </template>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item field="principalIdBackAttachment">
                <i-custom-upload
                  v-model="editFormContent.principalIdBackAttachment"
                  url-key="previewAddress"
                  :options="{
                    limit: 1,
                    tip: '请上传身份证反面',
                    accept: 'image/*'
                  }"
                />
                <template #extra>
                  <div>若有误请修改</div>
                </template>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <a-divider direction="vertical" style="height: auto" />
        <div style="width: 50%">
          <div style="margin-bottom: 12px">营业执照</div>
          <a-form-item field="businessLicenseAttachment">
            <i-custom-upload
              v-model="editFormContent.businessLicenseAttachment"
              url-key="previewAddress"
              :options="{
                limit: 1,
                accept: 'image/*',
                tip: '请上传营业执照'
              }"
            />
            <template #extra>
              <div>请确认企业营业执照信息是否正确，若有误请修改</div>
            </template>
          </a-form-item>
        </div>
      </div>
      <a-row :gutter="20">
        <a-col :span="8">
          <a-form-item field="principal" label="承租人/负责人姓名">
            <a-input
              v-model="editFormContent.principal"
              placeholder="例如:张三"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="principalId" label="身份证号码">
            <a-input
              v-model="editFormContent.principalId"
              placeholder="请输入正确的身份证号码"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="principalRegisterAddress" label="户籍地址">
            <a-input
              v-model="editFormContent.principalRegisterAddress"
              placeholder="请输入正确的户籍地址"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="companyName" label="公司名称">
            <a-input
              v-model="editFormContent.companyName"
              placeholder="请输入公司名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="legalPerson" label="法人代表">
            <a-input
              v-model="editFormContent.legalPerson"
              placeholder="请输入法人代表"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="uscCode" label="社会统一信用代码">
            <a-input
              v-model="editFormContent.uscCode"
              placeholder="请输入正确的社会统一信用代码"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button @click="cancel($refs.editFormRef)">取消</a-button>
      <a-button type="primary" @click="confirm($refs.editFormRef)"
        >确认</a-button
      >
    </template>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'CreateMerchant'
  };
</script>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted, toRaw, watch, Ref } from 'vue';
  import { statusList } from '@/utils/dic';
  import addressOptions from '@/utils/area.json';
  import {
    cbdApiProjectMerchantUpdateMerchantIdPut,
    cbdApiProjectMerchantAddPost,
    cbdApiProjectMerchantCheckParamPost,
    cbdApiProjectCommonFormatSelectListGet
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import useDataDictionary from '@/hooks/useDataDictionary';
  import useAreaInfo from '@/hooks/useAreaInfo';
  import { filterEmptyChildren } from '@/utils';
  import {
    deleteLocalForm,
    getLocalForm,
    setLocalForm
  } from '@/utils/localFormStore';

  const typeList = useDataDictionary('00007');

  const purposeList = useDataDictionary('00008');

  const sceneList = ref<Array<any>>([]);
  const getSceneList = () => {
    cbdApiProjectCommonFormatSelectListGet().then((res: any) => {
      sceneList.value = filterEmptyChildren(res);
    });
  };

  interface EditForm {
    name: string;
    linkman: string;
    linkTel: string;
    sceneId?: number;
    typeId?: number;
    purposeId?: number;
    requireArea?: string;
    areaCode: Array<string>;
    areaName: {
      cityName: string;
      districtName: string;
      provinceName: string;
    };
    address: string;
    status: number;
    remark: string;
    principal: string;
    principalId: string;
    principalIdFrontAttachment: Array<any>;
    principalIdBackAttachment: Array<any>;
    principalRegisterAddress: string;
    companyName: string;
    legalPerson: string;
    uscCode: string;
    businessLicenseAttachment: Array<any>;
    id?: number;
  }
  interface Props {
    modalVisible: boolean;
    modalTitle?: string;
    editForm?: any;
    sourceKey?: string;
    source?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modalVisible: false,
    modalTitle: '新建',
    sourceKey: 'merchantManage',
    source: '',
    editForm: () => {
      return {};
      /*     return {
        name: '',
        linkman: '',
        linkTel: '',
        sceneId: undefined,
        typeId: undefined,
        purposeId: undefined,
        requireArea: '',
        areaCode: [],
        areaName: {
          cityName: '',
          districtName: '',
          provinceName: ''
        },
        address: '',
        status: 1,
        remark: '',
        principal: '',
        principalId: '',
        principalIdFrontAttachment: [],
        principalIdBackAttachment: [],
        principalRegisterAddress: '',
        companyName: '',
        legalPerson: '',
        uscCode: '',
        businessLicenseAttachment: []
      };*/
    }
  });

  const sourceKey = computed(() => {
    return props.sourceKey;
  });

  const emits = defineEmits([
    'update:editForm',
    'update:modalVisible',
    'update:modalTitle',
    'confirm'
  ]);

  const editFormContent: Ref<EditForm> = computed({
    get() {
      console.log(props.editForm);
      return props.editForm;
    },
    set(v) {
      emits('update:editForm', toRaw(v));
    }
    // return props.editForm;
  });

  async function getCache() {
    const res = await getLocalForm(sourceKey.value);
    // console.log(res, 1111);
    if (JSON.parse(res as string)) {
      editFormContent.value = res as EditForm;
    }
  }

  const modalVisible = computed({
    get() {
      return props.modalVisible;
    },
    set(data) {
      emits('update:modalVisible', data);
    }
  });

  const modalTitle = computed(() => {
    return props.modalTitle;
  });

  const editRules = reactive({
    name: [
      { required: true, message: '请输入商户/企业名称', trigger: 'blur' },
      {
        validator: async (value: string, callback: any) => {
          try {
            if (modalTitle.value === '新建') {
              await cbdApiProjectMerchantCheckParamPost({ name: value });
            } else if (modalTitle.value === '编辑') {
              await cbdApiProjectMerchantCheckParamPost({
                id: editFormContent.value.id,
                name: value
              });
            }
            callback();
          } catch (e) {
            callback('不可用商户/企业名称');
          }

          callback();
        }
      }
    ],
    status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
    linkman: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
    linkTel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
    sceneId: [{ required: true, message: '请选择经营业态', trigger: 'blur' }],
    typeId: [{ required: true, message: '请选择商户类型', trigger: 'blur' }],
    purposeId: [{ required: true, message: '请选择租赁用途', trigger: 'blur' }],
    principal: [
      { required: true, message: '请输入承租人/负责人姓名', trigger: 'blur' }
    ],
    principalId: [
      { required: true, message: '请输入身份证号码', trigger: 'blur' }
    ],
    principalRegisterAddress: [
      { required: true, message: '请输入户籍地址', trigger: 'blur' }
    ],
    companyName: [
      { required: true, message: '请输入公司名称', trigger: 'blur' }
    ]
    // principalIdFrontAttachment: [
    //   { required: true, message: '请上传身份证正面照', trigger: 'blur' }
    // ],
    // principalIdBackAttachment: [
    //   { required: true, message: '请上传身份证反面照', trigger: 'blur' }
    // ]
    // legalPerson: [
    //   { required: true, message: '请输入法人代表', trigger: 'blur'}
    // ],
    // uscCode: [
    //   { required: true, message: '请输入社会统一信用代码', trigger: 'blur'}
    // ]
  });

  const areaChange = async (e: any) => {
    const { provinceName, cityName, countyName } = await useAreaInfo(
      String(e[0]),
      String(e[1]),
      String(e[2])
    );
    editFormContent.value.areaName = {
      provinceName,
      cityName,
      districtName: countyName
    };
  };

  const handleFilesList = async (list: Array<any>): Promise<string> => {
    const fileList: Array<string> = [];
    list.forEach((item: any) => {
      if (modalTitle.value === '新建') {
        fileList.push(item.response.data.key);
      } else if (modalTitle.value === '编辑') {
        if (item.response) {
          fileList.push(item.response.data.key);
        } else {
          fileList.push(item.id);
        }
      }
    });
    return fileList[0];
  };

  const confirm = (el: any) => {
    el.validate(async (valid: boolean) => {
      if (!valid) {
        const {
          principalIdFrontAttachment,
          principalIdBackAttachment,
          businessLicenseAttachment,
          areaCode,
          areaName,
          sceneId,
          typeId,
          purposeId,
          requireArea,
          id,
          ...params
        } = editFormContent.value;

        const principalIdFrontList = await handleFilesList(
          principalIdFrontAttachment
        );
        const principalIdBackList = await handleFilesList(
          principalIdBackAttachment
        );
        const businessLicenseList = await handleFilesList(
          businessLicenseAttachment
        );

        let responseId = null;

        if (modalTitle.value === '新建') {
          responseId = await cbdApiProjectMerchantAddPost({
            ...params,
            sceneId: sceneId as number,
            typeId: typeId as number,
            purposeId: purposeId as number,
            requireArea: Number(requireArea),
            principalIdFrontAttachment: principalIdFrontList,
            principalIdBackAttachment: principalIdBackList,
            businessLicenseAttachment: businessLicenseList,
            provinceCode: areaCode[0],
            cityCode: areaCode[1],
            districtCode: areaCode[2],
            provinceName: areaName.provinceName,
            cityName: areaName.cityName,
            districtName: areaName.districtName
          });
        } else if (modalTitle.value === '编辑') {
          await cbdApiProjectMerchantUpdateMerchantIdPut({
            ...params,
            sceneId: sceneId as number,
            typeId: typeId as number,
            purposeId: purposeId as number,
            requireArea: Number(requireArea),
            principalIdFrontAttachment: principalIdFrontList,
            principalIdBackAttachment: principalIdBackList,
            businessLicenseAttachment: businessLicenseList,
            provinceCode: areaCode[0],
            cityCode: areaCode[1],
            districtCode: areaCode[2],
            merchantId: String(id),
            provinceName: areaName.provinceName,
            cityName: areaName.cityName,
            districtName: areaName.districtName
          });
        }
        Message.success(`${modalTitle.value}成功`);
        try {
          await deleteLocalForm(sourceKey.value);
        } catch (e) {
        } finally {
          modalVisible.value = false;
          emits('confirm', responseId);
        }
      }
    });
  };

  const cancel = async (el: any) => {
    try {
      await setLocalForm(
        sourceKey.value,
        JSON.stringify(editFormContent.value)
      );
    } catch (e) {
    } finally {
      el.resetFields();
      modalVisible.value = false;
    }
  };

  /*   watch(modalVisible, () => {
    if (modalVisible.value) {
      getCache();
    }
  });*/
  watch(
    () => props.source,
    (v) => {
      if (v === 'add') {
        getCache();
      }
    }
  );

  onMounted(() => {
    getSceneList();
  });
</script>

<style scoped></style>
