<template>
  <drawer
    v-model="visible"
    title="查看楼宇信息"
    @cancel="visible = false"
    @before="onSubmit"
  >
    <div class="i-card">
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
          <a-button type="text" @click="onDownload(4, '铺位配置模板')"
            >模板下载</a-button
          >
        </div>
      </div>
      <div class="split-bg"></div>
      <div class="block-title">可导入</div>
      <i-table
        style="padding-bottom: 16px"
        :options="qualified"
        :data="data.importList"
      />
      <div class="split-bg"></div>
      <div class="block-title">不可导入</div>
      <i-table :options="unqualified" :data="data.importErrorList" />
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { Message } from '@arco-design/web-vue';
  import { download } from '@/utils';
  import axios from 'axios';
  import {
    cbdApiProjectEstateImportPreviewResourceIdGet,
    cbdApiProjectEstateImportSaveResourceIdGet,
    type CbdApiProjectEstateImportPreviewResourceIdGetResponse
  } from '@/api';
  // import lsStore from '@/utils/ls-store';
  import useToken from '@/composables/useToken';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: undefined
    }
  });
  const emits = defineEmits(['update:modelValue', 'update', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const fileList = ref<any>([]);
  const qualified = ref<Recordable>({
    tableCard: false,
    index: false,
    menu: false,
    pageShow: false,
    menuOtherOptions: {
      scroll: {
        y: 230
      }
    },
    columns: [
      {
        label: '序号',
        prop: 'index'
      },
      {
        label: '项目名称',
        prop: 'projectName'
      },
      {
        label: '楼宇',
        prop: 'buildingName'
      },
      {
        label: '楼层',
        prop: 'floorName'
      },
      {
        label: '铺位类型',
        prop: 'categoryName'
      },
      {
        label: '铺位号',
        prop: 'doorPlate'
      },
      {
        label: '建筑面积(㎡)',
        prop: 'acreage',
        width: 120
      },
      {
        label: '使用面积(㎡)',
        prop: 'useAcreage',
        width: 120
      }
    ]
  });
  const unqualified = computed(() => {
    return {
      ...qualified.value,
      columns: [
        ...qualified.value.columns,
        {
          label: '失败原因',
          prop: 'failReason'
        }
      ]
    };
  });
  const data = ref<CbdApiProjectEstateImportPreviewResourceIdGetResponse>({
    importList: [],
    importErrorList: []
  });
  // const update = () => {
  //   emits('update');
  // };
  const onSubmit = async () => {
    if (fileList.value && fileList.value.length) {
      try {
        await cbdApiProjectEstateImportSaveResourceIdGet({
          resourceId: fileList.value[0].key
        });
        Message.success('保存成功');
        visible.value = false;
        emits('refresh');
      } catch (e) {}
    } else {
      Message.error('请您先上传模板');
    }
  };
  async function getPreviewData() {
    if (fileList.value && fileList.value.length) {
      data.value = await cbdApiProjectEstateImportPreviewResourceIdGet({
        resourceId: fileList.value[0].key
      });
    } else {
      Message.error('请您先上传模板');
    }
  }
  const token = useToken();
  const onDownload = async (type: number, name: string) => {
    try {
      const d: any = await axios({
        method: 'get',
        url: `/cbd-api-project/common/excel-export?type=${type}`,
        headers: {
          Authorization: token.getToken() || ''
        },
        responseType: 'blob'
      });
      const blob = new Blob([d.data], { type: d.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      download(url, name);
    } catch (e) {
      console.error(e);
    }
  };
  watch(
    () => fileList.value,
    () => {
      if (fileList.value?.length && fileList.value[0].key) {
        getPreviewData();
      }
    }
  );
</script>
<style lang="less" scoped>
</style>
