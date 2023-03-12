<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    layout="vertical"
    auto-label-width
  >
    <a-card>
      <div class="upload-container flex">
        <div class="flex-1">
          <i-custom-upload
            v-model="fileList"
            :options="{
              disabled: fileList.length > 0,
              accept:
                'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              listType: 'text'
            }"
          >
          </i-custom-upload>
        </div>
        <div class="download-btn">
          <a-button type="text" @click="handleDownloadTpl"> 模板下载 </a-button>
        </div>
      </div>
    </a-card>

    <a-card>
      <div class="har-title">可导入</div>
      <i-table :options="tableConfig1" :data="formModel.importList"></i-table>
    </a-card>
    <a-card>
      <div class="har-title">不可导入</div>
      <i-table
        :options="tableConfig2"
        :data="formModel.importErrorList"
      ></i-table>
    </a-card>
  </a-form>
</template>

<script setup lang="ts">
  import { ref, reactive, defineExpose, watch } from 'vue';
  import { cloneDeep } from 'lodash';

  import ITable from '@/components/i-table/index.vue';
  import { download } from '@/utils/oss-upload';

  import { useForm } from '@/hooks/use-form';
  import {
    cbdApiProjectCommonExcelExportPost,
    cbdApiProjectMerchantEmployeeImportPreviewResourceIdGet,
    CbdApiProjectMerchantEmployeeImportPreviewResourceIdGetResponse
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';

  type ImportList =
    Required<CbdApiProjectMerchantEmployeeImportPreviewResourceIdGetResponse>['importList'];
  type ImportErrorList =
    Required<CbdApiProjectMerchantEmployeeImportPreviewResourceIdGetResponse>['importErrorList'];

  const {
    formRef,
    formModel,
    formRules,

    validateField,
    setFields,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  } = useForm<any>({
    resourceId: -1,
    importList: [] as ImportList,
    importErrorList: [] as ImportErrorList
  });

  const fileList = ref<File[]>([]);

  const columns = [
    {
      label: '行号',
      prop: 'index'
    },
    {
      label: '项目名称',
      prop: 'projectName'
    },
    {
      label: '店铺',
      prop: 'storeName'
    },
    {
      label: '账号',
      prop: 'accountName'
    },
    {
      label: '身份',
      prop: 'identityName'
    },
    {
      label: '收银机',
      prop: 'cashierName'
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
      label: '状态',
      prop: 'statusDesc'
    },
    {
      label: '有效期',
      prop: 'expireDate'
    }
  ];
  const tableConfig1 = reactive({
    tableCard: false,
    index: true,
    pageShow: false,
    menuOtherOptions: {
      // scroll: { y: 400 }
    },
    columns: [...cloneDeep(columns)]
  });
  const tableConfig2 = reactive({
    tableCard: false,
    index: true,
    pageShow: false,
    menuOtherOptions: {
      // scroll: { y: 400 }
    },
    columns: [
      ...cloneDeep(columns),
      {
        label: '失败原因',
        prop: 'failReason'
      }
    ]
  });

  watch(
    () => fileList.value,
    async (val) => {
      const ossRes = val[0];
      let key = '';
      let importList: CbdApiProjectMerchantEmployeeImportPreviewResourceIdGetResponse['importList'] = [];
      let importErrorList: CbdApiProjectMerchantEmployeeImportPreviewResourceIdGetResponse['importErrorList'] = [];
      if (ossRes && 'key' in ossRes) {
        const res =
          await cbdApiProjectMerchantEmployeeImportPreviewResourceIdGet({
            resourceId: ossRes.key as string
          });
        key = ossRes.key as string;
        importList = res.importList;
        importErrorList = res.importErrorList;
      }
      formModel.value.resourceId = key;
      formModel.value.importList = importList ?? [];
      formModel.value.importErrorList = importErrorList ?? [];
    }
  );

  function handleDownloadTpl() {
    download(
      {
        url: cbdApiProjectCommonExcelExportPost.requestConfig.path,
        method: 'post',
        data: { type: 5 }
      },
      '商户账户模板.xlsx'
    );
  }

  function validate() {
    return new Promise((resolve, reject) => {
      if (formModel.value.importList.length === 0) {
        Message.info('没有可以导入的数据');
        reject('没有可以导入的数据');
        return;
      }
      resolve({
        resourceId: formModel.value.resourceId
      });
    });
  }

  defineExpose({
    validate,
    validateField,
    setFields,
    resetFields() {
      resetFields();
      fileList.value = [];
      formModel.value.resourceId = null;
      formModel.value.importList = [];
      formModel.value.importErrorList = [];
    },
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  });
</script>

<style lang="less">
  .import {
    display: flex;
    position: relative;
    margin-bottom: 10px;
    > div:nth-child(1) {
      width: 100%;
      //height: 36px;
      //border: 1px solid rgb(229, 230, 235);
      //display: flex;
      //align-items: center;
      //padding: 0 14px;
      //cursor: pointer;
      //border-radius: 2px;
      //&:hover {
      //  background-color: rgb(242, 243, 245);
      //}
      //&:active {
      //  background-color: #e5e6eb;
      //}
    }
    > div:nth-child(2) {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .upload-container{
    padding-bottom: 0;
  }
</style>
