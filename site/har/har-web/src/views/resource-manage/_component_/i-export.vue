<template>
  <drawer
    v-model:model-value="visible"
    :options="{
      footer: false,
      unmountOnClose: true,
      escToClose: false,
      closable: false,
      maskClosable: false
    }"
    title="批量导入"
    :width="800"
  >
    <div class="upload-container flex">
      <div class="flex-1">
        <i-custom-upload
          v-model="file"
          :options="{
            listType: 'text',
            disabled: file.length > 0,
            accept:
              'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }"
        />
      </div>
      <div class="download-btn">
        <a-button
          v-if="exportType === 1"
          type="text"
          size="small"
          @click="onDownload(1, '业态模板')"
          >业态模板下载</a-button
        >
        <a-button
          v-if="exportType === 2"
          type="text"
          size="small"
          @click="onDownload(2, '品牌模板')"
          >品牌模板下载</a-button
        >
        <a-button
          v-if="exportType === 3"
          type="text"
          size="small"
          @click="onDownload(3, '商户模板')"
          >商户模板下载</a-button
        >
      </div>
    </div>
    <a-spin style="width: 100%" :loading="spinLoading" tip="加载中...">
      <div class="table-box">
        <div class="success-box">
          <div class="title">可导入</div>
          <a-table
            :columns="newTableColumn(1)"
            :data="successList"
            :pagination="false"
          >
            <template #type="{ record }">
              {{ Number(record.type) === 1 ? '个人' : '公司' }}
            </template>
          </a-table>
        </div>
        <div class="error-box">
          <div class="title">不可导入</div>
          <a-table
            :columns="newTableColumn(2)"
            :data="errorList"
            :pagination="false"
          >
            <template #type="{ record }">
              {{ Number(record.type) === 1 ? '个人' : '公司' }}
            </template>
          </a-table>
        </div>
      </div>
    </a-spin>
    <div class="footer-box">
      <a-button
        class="i-btn bg-blue-dark margin-right-8"
        :disabled="submitLoading"
        @click="onCancel"
        >取消</a-button
      >
      <a-button
        :loading="submitLoading"
        :disabled="confirmDisabled"
        class="i-btn"
        type="primary"
        @click="onSubmit"
        >确认</a-button
      >
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { computed, reactive, ref, watch } from 'vue';
  import {
    cbdApiProjectResourceFormatBatchSavePost,
    cbdApiProjectResourceFormatPreviewGet,
    cbdApiProjectResourceMerchantBrandBatchSavePost,
    cbdApiProjectResourceMerchantBrandPreviewGet,
    cbdApiProjectResourceMerchantPreviewGet,
    cbdApiProjectResourceMerchantBatchSavePost
    // cbdApiProjectCommonExcelExportPost
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import axios from 'axios';
  import { download } from '@/utils';
  import useToken from '@/composables/useToken';

  const emits = defineEmits(['update:drawerVisible', 'confirmSuccess']);

  const props = defineProps({
    drawerVisible: {
      type: Boolean,
      default: false
    },
    //1业态 2品牌 3商户
    exportType: {
      type: Number,
      default: 0
    }
  });

  const t = useToken();
  const onDownload = async (type: number, name: string) => {
    try {
      const d: any = await axios({
        method: 'get',
        url: `/cbd-api-project/common/excel-export?type=${type}`,
        headers: {
          Authorization: t.getToken() || ''
        },
        responseType: 'arraybuffer'
      });
      const blob = new Blob([d.data], { type: d.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      download(url, name);
    } catch (e) {
      console.error(e);
    }
  };

  const file: any = ref([]);
  const submitLoading = ref(false);

  const confirmDisabled = computed(() => {
    return file.value.length < 1 || successList.value.length < 1;
  });

  const onSubmit = async () => {
    submitLoading.value = true;
    // console.log(file);
    switch (props.exportType) {
      case 1:
        await doBusinessType();
        break;
      case 2:
        await doBrand();
        break;
      case 3:
        await doMerchant();
        break;
    }
  };

  const onCancel = () => {
    file.value = [];
    visible.value = false;
  };

  //批量导入业态
  const doBusinessType = async () => {
    try {
      await cbdApiProjectResourceFormatBatchSavePost({
        file: file.value[0].key
      });
      Message.success({
        content: '导入成功'
      });
      submitLoading.value = false;
      visible.value = false;
      file.value = [];
      emits('confirmSuccess');
    } catch (e) {
      console.error(e);
      submitLoading.value = false;
    }
  };
  //批量导入品牌
  const doBrand = async () => {
    try {
      await cbdApiProjectResourceMerchantBrandBatchSavePost({
        file: file.value[0].key
      });
      Message.success({
        content: '导入成功'
      });
      submitLoading.value = false;
      visible.value = false;
      file.value = [];
      emits('confirmSuccess');
    } catch (e) {
      console.error(e);
      submitLoading.value = false;
    }
  };
  //批量导入商户
  const doMerchant = async () => {
    try {
      await cbdApiProjectResourceMerchantBatchSavePost({
        file: file.value[0].key
      });
      Message.success({
        content: '导入成功'
      });
      submitLoading.value = false;
      visible.value = false;
      file.value = [];
      emits('confirmSuccess');
    } catch (e) {
      console.error(e);
      submitLoading.value = false;
    }
  };

  watch(
    () => file.value,
    (value: any) => {
      // console.log(value[0]?.status, '-----');
      //清空预览列表数据
      if (value.length < 1) {
        successList.value = [];
        errorList.value = [];
      }
      if (value.length > 0 && value[0].key) {
        //do something
        switch (props.exportType) {
          case 1:
            formatPreview(value[0].key);
            break;
          case 2:
            brandPreview(value[0].key);
            break;
          case 3:
            merchantPreview(value[0].key);
            break;
        }
      }
    }
  );

  const spinLoading = ref(false);
  //业态预览
  const formatPreview = async (key: string) => {
    spinLoading.value = true;
    try {
      const d = await cbdApiProjectResourceFormatPreviewGet({
        file: key
      });
      successList.value = d.successDataList;
      errorList.value = d.failDataList;
    } catch (e) {
      console.error(e);
    } finally {
      spinLoading.value = false;
    }
  };
  //品牌预览
  const brandPreview = async (key: string) => {
    spinLoading.value = true;
    try {
      const d = await cbdApiProjectResourceMerchantBrandPreviewGet({
        file: key
      });
      successList.value = d.successDataList;
      errorList.value = d.failDataList;
    } catch (e) {
      console.error(e);
    } finally {
      spinLoading.value = false;
    }
  };
  //商户预览
  const merchantPreview = async (key: string) => {
    spinLoading.value = true;
    try {
      const d = await cbdApiProjectResourceMerchantPreviewGet({
        file: key
      });
      successList.value = d.successDataList;
      errorList.value = d.failDataList;
    } catch (e) {
      console.error(e);
    } finally {
      spinLoading.value = false;
    }
  };

  const tableColumn = reactive([
    {
      title: '序号',
      dataIndex: 'lineNumber'
    },
    {
      title: '项目名称',
      dataIndex: 'projectName'
    },
    // {
    //   title: '编号',
    //   dataIndex: 'code'
    // },
    {
      title: '上级名字',
      dataIndex: 'parentName'
    },
    // {
    //   title: '编号',
    //   dataIndex: '',
    //   width: 80
    // },
    {
      title: '名字',
      dataIndex: 'name'
    },
    {
      title: '描述',
      dataIndex: 'remark'
    }
  ]);

  const brandColumn = reactive([
    {
      title: '序号',
      dataIndex: 'lineNumber'
    },
    {
      title: '项目名称',
      dataIndex: 'projectName'
    },
    // {
    //   title: '编号',
    //   dataIndex: 'code'
    // },
    {
      title: '名字',
      dataIndex: 'name'
    },
    {
      title: '业态',
      dataIndex: 'formatName'
    },
    {
      title: '描述',
      dataIndex: 'remark'
    }
  ]);

  const merchantColumn = reactive([
    {
      title: '序号',
      dataIndex: 'lineNumber'
    },
    {
      title: '项目名称',
      dataIndex: 'projectName'
    },
    // {
    //   title: '编号',
    //   dataIndex: 'merchantCode'
    // },
    {
      title: '名字',
      dataIndex: 'name'
    },
    {
      title: '商户性质',
      dataIndex: 'type',
      slotName: 'type'
    }
  ]);

  const newTableColumn = computed(() => (val: number) => {
    switch (props.exportType) {
      case 1:
        return val === 1
          ? tableColumn
          : [...tableColumn, { title: '失败原因', dataIndex: 'failMsg' }];
      case 2:
        return val === 1
          ? brandColumn
          : [...brandColumn, { title: '失败原因', dataIndex: 'failMsg' }];
      case 3:
        return val === 1
          ? merchantColumn
          : [...merchantColumn, { title: '失败原因', dataIndex: 'failMsg' }];
    }
  });

  const successList: any = ref([]);
  const errorList: any = ref([]);

  const visible = computed({
    get() {
      return props.drawerVisible;
    },
    set(data) {
      emits('update:drawerVisible', data);
    }
  });
</script>

<style scoped lang="less">
  .download-btn {
    position: absolute;
    left: 130px;
    display: flex;
    align-items: center;
    height: 32px;
    margin-left: 12px;
  }
  .margin-right-8 {
    margin-right: 8px;
  }
  .bg-blue-dark {
    color: #4c8af7;
    background: #dbe8fd !important;
  }
  .i-btn {
    //width: 104px;
    //height: 40px;
    //background: #4c8af7;
    //border-radius: 4px;
  }
  .upload-container {
    position: relative;
    width: 100%;
    padding: 12px;
    background: #fff;
    border-radius: 4px;
  }
  .table-box {
    padding-top: 12px;
    padding-bottom: 60px;
    .success-box {
      margin-bottom: 16px;
      padding: 12px;
      background: #fff;
      border-radius: 4px;
    }
    .error-box {
      padding: 12px;
      background: #fff;
      border-radius: 4px;
    }
  }
  .title {
    padding-bottom: 12px;
    color: #333;
    font-size: 16px;
  }
  .footer-box {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    width: 800px;
    padding: 12px 25px;
    background: #fff;
  }
</style>
