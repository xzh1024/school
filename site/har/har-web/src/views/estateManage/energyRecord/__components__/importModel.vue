<template>
  <drawer
    v-model="visible"
    :mask-close="false"
    title="能耗记录导入"
    width="60%"
    @cancel="visible = false"
  >
    <div class="detail_box">
      <a-card :bordered="false">
        <div class="flex header">
          <i-custom-upload
            v-model="fileList"
            :options="{
              listType: 'text',
              disabled: fileList.length > 0,
              accept: '*'
            }"
          >
            <template #fileIcon>
              <img
                class="fileIcon"
                src="@/assets/images/upload/file.png"
                alt=""
              />
            </template>
            <template #fileName="{ fileItem }">
              <span class="fileName">{{ fileItem.name }}</span>
            </template>
            <template #uploadButton>
              <a-button type="primary" :disabled="fileList.length > 0"
                >点击上传</a-button
              >
            </template>
          </i-custom-upload>
          <a-button
            class="modelFix"
            type="text"
            @click="onDownload(6, '能耗记录模板')"
            >模板下载</a-button
          >
        </div>
      </a-card>
      <a-spin
        style="width: 100%; margin-top: 16px"
        :loading="spinLoading"
        tip="加载中..."
      >
        <a-card :bordered="false">
          <div class="title">可导入</div>
          <a-table
            :data="successList"
            :bordered="true"
            :pagination="false"
            style="margin-top: 16px"
          >
            <template #columns>
              <a-table-column
                v-for="(item, index) in newTableColumn(1)"
                :key="index"
                :title="item.title"
                :width="item.width"
                :data-index="item.dataIndex"
              >
                <template #cell="{ record, rowIndex }">
                  <span v-if="item.dataIndex === '_index'">{{
                    record.sum ? record.sum : rowIndex + 1
                  }}</span>
                  <span v-else-if="item.dataIndex === 'deviceType'">{{
                    deviceTypeList.find(
                      (item) => item.value == record.deviceType
                    )?.label
                  }}</span>
                  <span v-else>{{ record[item.dataIndex] }}</span>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </a-card>
        <a-card :bordered="false">
          <div class="title">不可导入</div>
          <a-table
            :data="errorList"
            :bordered="true"
            :pagination="false"
            style="margin-top: 16px"
          >
            <template #columns>
              <a-table-column
                v-for="(item, index) in newTableColumn(2)"
                :key="index"
                :title="item.title"
                :width="item.width"
                :data-index="item.dataIndex"
              >
                <template #cell="{ record, rowIndex }">
                  <span v-if="item.dataIndex === '_index'">{{
                    record.sum ? record.sum : rowIndex + 1
                  }}</span>
                  <span v-else-if="item.dataIndex === 'deviceType'">{{
                    deviceTypeList.find(
                      (item) => item.value == record.deviceType
                    )?.label
                  }}</span>
                  <span v-else>{{ record[item.dataIndex] }}</span>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </a-card>
      </a-spin>
    </div>

    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button
        type="primary"
        :loading="submitLoading"
        :disabled="confirmDisabled"
        @click="makeSure"
        >确认</a-button
      >
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { ref, computed, watch } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import IUpload from '@/components/i-upload/i-upload.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { download } from '@/utils';
  import { Message } from '@arco-design/web-vue';
  import axios from 'axios';
  import {
    cbdApiProjectEstateEnergyConsumeRecordImportConfirmResourceIdGet,
    cbdApiProjectEstateEnergyConsumeRecordImportPreviewResourceIdGet
  } from '@/api';
  import useToken from '@/composables/useToken';
  import { deviceTypeList } from '@/utils/dic';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: undefined
    }
  });
  const emits = defineEmits(['update:modelValue', 'confirmSuccess']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const successList: any = ref([]);
  const errorList: any = ref([]);

  const spinLoading = ref(false);
  //业态预览
  const formatPreview = async (key: string) => {
    spinLoading.value = true;
    try {
      const d =
        await cbdApiProjectEstateEnergyConsumeRecordImportPreviewResourceIdGet({
          resourceId: key
        });
      successList.value = d.successDataList;
      errorList.value = d.failDataList;
    } catch (e) {
      console.error(e);
    } finally {
      spinLoading.value = false;
    }
  };
  const submitLoading = ref(false);

  const confirmDisabled = computed(() => {
    return !(fileList.value.length == 1 && successList.value.length > 0);
    // return false
  });
  // 确认导入
  const makeSure = async () => {
    submitLoading.value = true;
    try {
      await cbdApiProjectEstateEnergyConsumeRecordImportConfirmResourceIdGet({
        resourceId: fileList.value[0].key
      });
      Message.success({
        content: '导入成功'
      });
      submitLoading.value = false;
      visible.value = false;
      fileList.value = [];
      emits('confirmSuccess');
    } catch (e) {
      console.error(e);
      submitLoading.value = false;
    }
  };
  const fileList = ref<any>([]);
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
  const columns = [
    {
      title: '序号',
      dataIndex: '_index',
      width: 75,
      align: '' as any
    },
    {
      title: '项目名称',
      width: 200,
      dataIndex: 'projectName'
    },
    {
      title: '楼宇',
      dataIndex: 'buildingName',
      width: 110
    },
    {
      title: '楼层',
      dataIndex: 'buildingFloorName',
      width: 110
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      width: 110
    },
    {
      title: '设备名称(编号)',
      width: 200,
      dataIndex: 'deviceName'
    },
    {
      title: '抄表日期',
      dataIndex: 'currentMeterReadingDate',
      width: 110
    },
    {
      title: '本期读数',
      width: 110,
      dataIndex: 'currentReadOutNum'
    },
    {
      title: '本期单价',
      width: 110,
      dataIndex: 'currentPrice'
    }
  ];
  const newTableColumn = computed(() => (val: number) => {
    switch (val) {
      case 1:
        return [...columns];
      case 2:
        return [
          ...columns,
          { title: '失败原因', dataIndex: 'errorMsg', width: 200 }
        ];
    }
  });
  watch(
    () => fileList.value,
    (value: any) => {
      //清空预览列表数据
      if (value.length < 1) {
        successList.value = [];
        errorList.value = [];
      }
      if (value.length > 0 && value[0].key) {
        formatPreview(value[0].key);
      }
    }
  );
</script>
<style scoped lang="less">
  .detail_box {
    width: 100%;
    height: 100%;
    overflow: auto;

    :deep(.i-custom-upload) {
      width: 100%;
    }

    .header {
      position: relative;

      .modelFix {
        position: absolute;
        top: 0;
        left: 96px;
        z-index: 555;
        padding: 0 !important;
      }
    }

    .fileIcon {
      width: 14px;
      height: 14px;
      display: inline-block;
    }

    .fileName {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      color: #4c8af7;
      line-height: 22px;
    }

    .title {
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 24px;
    }
  }
</style>
