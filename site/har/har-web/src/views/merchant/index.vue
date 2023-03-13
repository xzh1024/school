<template>
  <div class="merchantManage">
    <i-table
      v-model="search"
      v-model:refresh-now="refresh"
      :options="options"
      :api="cbdApiProjectMerchantListGet"
    >
      <template #header>
        <a-button
          v-permission="['merchant:add']"
          type="primary"
          @click="merchantAdd"
          >新建商户</a-button
        >
      </template>
      <template #statusCell="{ record }">
        <a-switch
          v-model="record.status"
          :disabled="useSwitchPermission('merchant:update')"
          :checked-value="1"
          :unchecked-value="2"
          @change="statusChange(record.id, record.status)"
        ></a-switch>
      </template>
      <template #optionalCell="{ record }">
        <a-space>
          <div
            v-permission="['merchant:update']"
            class="i-btn"
            @click="configAccount(record)"
            >配置账号</div
          >
          <div
            v-permission="['merchant:update']"
            class="i-btn"
            @click="merchantEdit(record.id)"
            >编辑</div
          >
          <div
            v-permission="['merchant:info']"
            class="i-btn"
            @click="merchantView(record.id, record.name)"
            >查看</div
          >
        </a-space>
      </template>
    </i-table>
    <create-merchant
      v-if="modalVisible"
      v-model:modal-visible="modalVisible"
      v-model:modal-title="modalTitle"
      v-model:edit-form="editForm"
      :source="sourceKey"
      source-key="merchantManage"
      @confirm="editConfirm"
    />
    <modal-form
      v-bind="formProps"
      v-model:visible="formProps.visible"
      :mask-closable="false"
      :closable="false"
      @register="resetRegister"
      @submit="onSubmit"
    >
      <template #formHeader>
        <h4 class="form-tip">
          当前配置的账号为该店铺商家业务端超级管理员账号
          <br />账号体系包含：商户端、商城后台、收银台</h4
        >
        <p>默认密码是:{{ defaultPwd }}</p>
      </template>
    </modal-form>
    <a-drawer v-model:visible="drawerVisible" :width="1000">
      <template #title>{{ `${drawerTitle}商户信息查询` }}</template>
      <a-divider orientation="left">基本信息</a-divider>
      <a-descriptions :data="infoConfig.basicInfo">
        <descriptions-item
          v-for="(item, index) of infoConfig.basicInfo"
          :key="index"
          :label="item.label"
        >
          {{ info.basicInfo[item.value] ? info.basicInfo[item.value] : '--' }}
        </descriptions-item>
      </a-descriptions>
      <a-divider orientation="left">企业信息</a-divider>

      <div style="display: flex; width: 100%">
        <div style="width: 50%">
          <div style="margin-bottom: 12px">承租人身份证 </div>
          <a-row>
            <a-col :span="10">
              <i-custom-upload
                v-model="principalIdFrontView"
                url-key="previewAddress"
                :options="{
                  showUploadButton: false,
                  showRemoveButton: false
                }"
              />
            </a-col>
            <a-col :span="10">
              <i-custom-upload
                v-model="principalIdBackView"
                url-key="previewAddress"
                :options="{
                  showUploadButton: false,
                  showRemoveButton: false
                }"
              />
            </a-col>
          </a-row>
        </div>
        <a-divider direction="vertical" style="height: auto" />
        <div style="width: 50%">
          <div style="margin-bottom: 12px">营业执照</div>
          <i-custom-upload
            v-if="businessLicenseView.length > 0"
            v-model="businessLicenseView"
            url-key="previewAddress"
            :options="{
              showUploadButton: false,
              showRemoveButton: false
            }"
          />
          <div
            v-if="businessLicenseView.length <= 0"
            style="
              width: 100px;
              height: 100px;
              line-height: 100px;
              text-align: center;
            "
          >
            暂无
          </div>
        </div>
      </div>

      <a-descriptions :data="infoConfig.businessInfo">
        <descriptions-item
          v-for="(item, index) of infoConfig.businessInfo"
          :key="index"
          :label="item.label"
        >
          {{ info.businessInfo[item.value] || '--' }}
        </descriptions-item>
      </a-descriptions>
      <template #footer>
        <a-button @click="merchantEdit()">编 辑</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { DescriptionsItem, Message } from '@arco-design/web-vue';
  import useSwitchPermission from '@/hooks/useSwitchPermission';
  import {
    cbdApiProjectMerchantListGet,
    cbdApiProjectMerchantInfoMerchantIdGet,
    cbdApiProjectMerchantUpdateInitMerchantIdPost,
    cbdApiProjectMerchantUpdateMerchantIdStatusPut,
    cbdApiProjectCommonFormatSelectListGet,
    cbdApiProjectMerchantSetManagerPut
  } from '@/api';
  import type {
    CbdApiProjectMerchantListGetResponse,
    CbdApiProjectMerchantInfoMerchantIdGetResponse,
    CbdApiProjectCommonFormatSelectListGetResponse
  } from '@/api';
  import {
    ModalForm,
    type ModalFormProps,
    useModalForm
  } from '@/components/IForm';
  import CreateMerchant from '@/components/createMerchant/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import useDataDictionary from '@/hooks/useDataDictionary';
  import { statusList } from '@/utils/dic';

  type ListItem = Required<CbdApiProjectMerchantListGetResponse>['rows'][0];
  type IDFront =
    Required<CbdApiProjectMerchantInfoMerchantIdGetResponse>['businessInfo']['principalIdFrontAttachment'];
  type IDBack =
    Required<CbdApiProjectMerchantInfoMerchantIdGetResponse>['businessInfo']['principalIdBackAttachment'];
  type LicenseItem =
    Required<CbdApiProjectMerchantInfoMerchantIdGetResponse>['businessInfo']['businessLicenseAttachment'];
  type FormatItem = CbdApiProjectCommonFormatSelectListGetResponse[0];
  const search = ref({
    name: '',
    businessStatus: '',
    sceneId: '',
    typeId: '',
    purposeId: '',
    status: ''
  });

  const refresh = ref<boolean>(false);
  const formProps = reactive<ModalFormProps>({
    title: '配置管理员账号',
    visible: false,
    submitLoading: false,
    schemas: [
      {
        label: '电话号码',
        field: 'phone',
        rules: {
          required: true,
          message: '电话号码有误',
          match: /^1\d{10}$/,
          length: 11,
          maxLength: 11
        }
      }
    ]
  });
  const sourceKey = ref<string>('add');
  const typeList = useDataDictionary('00007');
  const purposeList = useDataDictionary('00008');
  const sceneList = ref<Array<FormatItem>>([]);
  const getSceneList = async () => {
    sceneList.value = await cbdApiProjectCommonFormatSelectListGet();
  };
  getSceneList();

  const options = reactive({
    submitText: '搜索',
    tableCard: true,
    index: true,
    autoLabelWidth: true,
    menuSpan: 18,
    menu: false,
    indexTitle: '序号',
    menuOtherOptions: {
      scroll: {
        x: '140%'
      }
    },
    columns: [
      {
        label: '商户编号',
        prop: 'code'
      },
      {
        label: '商户/企业名称',
        prop: 'name',
        search: true,
        ellipsis: true,
        tooltip: true
      },
      {
        label: '联系人',
        prop: 'linkman',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '联系电话',
        prop: 'linkTel'
      },
      {
        label: '经营业态',
        prop: 'sceneId',
        search: true,
        type: 'cascader',
        dic: sceneList,
        props: {
          value: 'id',
          label: 'name'
        },
        options: {
          checkStrictly: true
        },
        hide: true
      },
      {
        label: '经营业态',
        prop: 'sceneName'
      },
      {
        label: '商户类型',
        prop: 'typeId',
        search: true,
        type: 'select',
        dic: typeList,
        hide: true
      },
      {
        label: '商户类型',
        prop: 'typeName'
      },
      {
        label: '租赁用途',
        prop: 'purposeId',
        search: true,
        type: 'select',
        dic: purposeList,
        hide: true
      },
      {
        label: '租赁用途',
        prop: 'purposeName'
      },
      {
        label: '状态',
        prop: 'status',
        search: true,
        type: 'select',
        dic: statusList
      },
      {
        label: '操作',
        prop: 'optional',
        width: 180,
        fixed: 'right'
      }
    ]
  });
  // const tableLoading = ref<boolean>(false);
  const statusChange = (id: number, e: number) => {
    cbdApiProjectMerchantUpdateMerchantIdStatusPut({
      merchantId: String(id),
      status: String(e)
    }).then(() => {
      Message.success('修改成功');
      refresh.value = true;
    });
  };

  const modalVisible = ref<boolean>(false);
  const modalTitle = ref<string>('新建');
  interface EditForm {
    name: string;
    linkman: string;
    linkTel: string;
    sceneId?: number;
    typeId?: number;
    purposeId?: number;
    requiredArea?: number;
    areaCode: Array<any>;
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
    principalIdFrontAttachment: Array<IDFront>;
    principalIdBackAttachment: Array<IDBack>;
    principalRegisterAddress: string;
    companyName: string;
    legalPerson: string;
    uscCode: string;
    businessLicenseAttachment: Array<LicenseItem>;
  }
  const editForm = ref<EditForm>({
    name: '',
    linkman: '',
    linkTel: '',
    sceneId: undefined,
    typeId: undefined,
    purposeId: undefined,
    requiredArea: undefined,
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
  });
  const currentId = ref<number>();

  const merchantAdd = () => {
    editForm.value = {
      name: '',
      linkman: '',
      linkTel: '',
      sceneId: undefined,
      typeId: undefined,
      purposeId: undefined,
      requiredArea: undefined,
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
    };
    modalVisible.value = true;
    modalTitle.value = '新建';
    sourceKey.value = 'add';
  };

  const merchantEdit = async (id?: number) => {
    const params = id ? String(id) : String(currentId.value);
    const res = await cbdApiProjectMerchantUpdateInitMerchantIdPost({
      merchantId: params
    });

    const {
      provinceCode,
      cityCode,
      districtCode,
      principalIdFrontAttachment,
      principalIdBackAttachment,
      businessLicenseAttachment,
      cityName = '',
      districtName = '',
      provinceName = '',
      ...data
    } = res;
    editForm.value = data as unknown as EditForm;
    if (provinceCode) {
      editForm.value.areaCode = [
        Number(provinceCode),
        Number(cityCode),
        Number(districtCode)
      ];
      editForm.value.areaName = {
        cityName,
        districtName,
        provinceName
      };
    } else {
      editForm.value.areaCode = [];
      editForm.value.areaName = {} as unknown as any;
    }

    editForm.value.principalIdFrontAttachment =
      JSON.stringify(principalIdFrontAttachment) === '{}'
        ? []
        : [principalIdFrontAttachment];
    editForm.value.principalIdBackAttachment =
      JSON.stringify(principalIdBackAttachment) === '{}'
        ? []
        : [principalIdBackAttachment];
    editForm.value.businessLicenseAttachment =
      JSON.stringify(businessLicenseAttachment) === '{}'
        ? []
        : [businessLicenseAttachment];

    console.log(editForm.value);

    sourceKey.value = 'edit';
    modalVisible.value = true;
    modalTitle.value = '编辑';
  };

  const drawerVisible = ref<boolean>(false);
  const drawerTitle = ref<string>('');

  const infoConfig: {
    basicInfo: {
      label: string;
      value: keyof BasicInfo;
    }[];
    businessInfo: {
      label: string;
      value: keyof BusinessInfo;
    }[];
  } = {
    basicInfo: [
      {
        value: 'name',
        label: '商户/企业名称'
      },
      {
        value: 'status',
        label: '状态'
      },
      {
        value: 'linkman',
        label: '联系人姓名'
      },
      {
        value: 'linkTel',
        label: '联系电话'
      },
      {
        value: 'sceneName',
        label: '经营业态'
      },
      {
        value: 'typeName',
        label: '商户类型'
      },
      {
        value: 'purposeName',
        label: '租赁用途'
      },
      {
        value: 'requireArea',
        label: '需求面积'
      },
      {
        value: 'address',
        label: '地址'
      },
      {
        value: 'remark',
        label: '备注'
      }
    ],
    businessInfo: [
      {
        value: 'principal',
        label: '承租人/负责人姓名'
      },
      {
        value: 'principalId',
        label: '身份证号码'
      },
      {
        value: 'principalRegisterAddress',
        label: '户籍地址'
      },
      {
        value: 'companyName',
        label: '公司名称'
      },
      {
        value: 'legalPerson',
        label: '法人代表'
      },
      {
        value: 'uscCode',
        label: '社会统一信用代码'
      }
    ]
  };
  type BasicInfo = Omit<
    CbdApiProjectMerchantInfoMerchantIdGetResponse['basicInfo'],
    'status' | 'requireArea'
  > & { status: string | number; requireArea: string | number };
  type BusinessInfo = {
    principal: string;
    principalId: string;
    principalRegisterAddress: string;
    companyName: string;
    legalPerson: string;
    uscCode: string;
  };
  const info = reactive<{
    basicInfo: Partial<BasicInfo>;
    businessInfo: Partial<BusinessInfo>;
  }>({
    basicInfo: {},
    businessInfo: {}
  });

  const principalIdFrontView = ref<Array<IDFront>>([]);
  const principalIdBackView = ref<Array<IDBack>>([]);
  const businessLicenseView = ref<Array<LicenseItem>>([]);

  const merchantView = async (id: number, name?: string) => {
    const res = await cbdApiProjectMerchantInfoMerchantIdGet({
      merchantId: String(id)
    });
    const { provinceName, cityName, districtName, address, status, ...basic } =
      res.basicInfo;

    info.basicInfo = basic;
    info.basicInfo.status = status === 1 ? '启用' : '禁用';
    info.basicInfo.address = `${provinceName}-${cityName}-${districtName} ${address}`;
    info.basicInfo.requireArea = info.basicInfo.requireArea
      ? `${info.basicInfo.requireArea} ㎡`
      : '--';
    currentId.value = id;

    const {
      principalIdFrontAttachment,
      principalIdBackAttachment,
      businessLicenseAttachment,
      ...business
    } = res.businessInfo;
    principalIdFrontView.value =
      JSON.stringify(principalIdFrontAttachment) === '{}'
        ? []
        : [principalIdFrontAttachment];
    principalIdBackView.value =
      JSON.stringify(principalIdBackAttachment) === '{}'
        ? []
        : [principalIdBackAttachment];
    businessLicenseView.value =
      JSON.stringify(businessLicenseAttachment) === '{}'
        ? []
        : [businessLicenseAttachment];
    info.businessInfo = business;

    if (name) {
      drawerTitle.value = name;
    }

    drawerVisible.value = true;
  };

  const editConfirm = () => {
    refresh.value = true;
    if (drawerVisible.value) {
      merchantView(currentId.value as number);
    }
  };

  const [resetRegister, methods] = useModalForm<ModalFormProps>();
  const configId = ref<number>();
  const defaultPwd = ref<string>('');
  function configAccount(record: ListItem) {
    formProps.visible = true;
    configId.value = record.id;
    defaultPwd.value = record.defaultPwd!;
    methods.setFieldsValue({
      phone: record.managerPhone
    });
  }
  async function onSubmit(data: Recordable) {
    try {
      formProps.submitLoading = true;
      const { phone } = data;
      await cbdApiProjectMerchantSetManagerPut({
        id: configId.value!,
        phone
      });
      Message.success('账号配置成功');
      refresh.value = true;
      formProps.visible = false;
    } catch (e) {
    } finally {
      formProps.submitLoading = false;
    }
  }
</script>

<style scoped lang="less">
  .form-tip {
    margin-top: 0;
    padding-top: 0;
    padding-left: 20px;
  }
  .i-btn {
    color: #4c8af7;
    cursor: pointer;
  }
</style>
