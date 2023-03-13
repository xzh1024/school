<template>
  <div class="page-container-box">
    <div class="search-box">
      <a-form
        ref="searchFormRef"
        :model="searchForm"
        @submit-success="onSearch"
      >
        <a-row :gutter="16">
          <a-col :span="6">
            <a-form-item
              label="项目名称"
              field="projectIdList"
              :label-col-props="{ span: 7 }"
              :wrapper-col-props="{ span: 17 }"
            >
              <a-select
                v-model="searchForm.projectIdList"
                allow-clear
                @clear="onSelectClear"
              >
                <a-option
                  v-for="(item, index) in projectList"
                  :key="index"
                  :value="item.value"
                  >{{ item.label }}</a-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="业态"
              field="formatIdList"
              :disabled="['', undefined].includes(searchForm.projectIdList)"
            >
              <a-cascader
                v-model="searchForm.formatIdList"
                :field-names="{
                  value: 'value',
                  label: 'label'
                }"
                :options="businessTypeList"
                allow-clear
                multiple
                :max-tag-count="1"
                @popup-visible-change="onSearchPopupChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="状态" field="statusList">
              <a-cascader
                v-model="searchForm.statusList"
                :options="brand_status"
                allow-clear
                multiple
                :max-tag-count="1"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="品牌" field="name">
              <a-input v-model="searchForm.name" allow-clear :max-length="20" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-space>
          <a-button html-type="submit" type="primary">搜索</a-button>
          <a-button type="primary" @click="onReset">重置</a-button>
        </a-space>
      </a-form>
    </div>
    <div class="table-box">
      <a-space style="padding: 0 15px 12px 0">
        <a-button class="i-btn" type="primary" @click="onAdd">添加</a-button>
        <a-button class="i-btn" type="primary" @click="onExport"
          >批量导入</a-button
        >
      </a-space>
      <a-table :columns="tableColumn" :data="tableData" :pagination="false">
        <template #status="{ record }">{{
          newBrandStatus(record.status)
        }}</template>
        <template #optional="{ record }">
          <a-space>
            <div class="t-btn" @click="onEdit(record.id)">编辑</div>
            <div class="t-btn" @click="onSee(record.id)">查看</div>
            <div class="t-btn" @click="onDel(record.id)">删除</div>
          </a-space>
        </template>
      </a-table>
      <div class="pagination-box">
        <a-pagination
          v-model:current="searchForm.pageNum"
          v-model:page-size="searchForm.pageSize"
          :total="pageTotal"
          show-page-size
          show-total
          @change="pageChange"
          @page-size-change="onPageChange"
        />
      </div>
    </div>
    <create-brand
      v-model:drawer-visible="visible"
      v-model:drawer-title="drawerTitle"
      v-model:form-data="form"
      v-model:form-data-id="selectRecordId"
      :handle-type="handleType"
      @submit-success="onSuccess"
    />

    <brand-info
      :id="detailId"
      v-model:drawer-visible="infoVisible"
      :form-data="form"
      @on-update="onEdit"
    />

    <i-export
      v-model:drawer-visible="exportVisible"
      :export-type="2"
      @confirm-success="onConfirmSuccess"
    />
    <a-modal
      v-model:visible="delVisible"
      title="提示"
      title-align="start"
      @ok="confirmOk"
      @cancel="delVisible = false"
    >
      <div>数据删除后无法恢复，是否删除？</div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import { brand_status } from '@/config/resource_manage_status';
  // import IDrawer from '@/components/i-drawer/i-drawer.vue';
  import { Message, TableColumnData } from '@arco-design/web-vue';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectResourceFormatTreeGet,
    cbdApiProjectResourceMerchantBrandDeleteIdGet,
    cbdApiProjectResourceMerchantBrandInfoIdGet,
    cbdApiProjectResourceMerchantBrandPageGet
  } from '@/api';
  import CreateBrand from '@/views/resource-manage/_component_/create-brand.vue';
  import IExport from '@/views/resource-manage/_component_/i-export.vue';
  import BrandInfo from '@/views/resource-manage/_component_/brand-info.vue';

  const newBrandStatus = computed(() => (value: number) => {
    return brand_status.find((item) => item.value === value)?.label;
  });

  interface SearchForm {
    projectIdList?: string;
    projectName?: string;
    formatIdList?: string;
    formatName?: string;
    statusList?: string;
    name?: string;
    pageNum?: number;
    pageSize?: number;
  }
  const searchForm = ref<SearchForm>({
    pageNum: 1,
    pageSize: 10
  });

  onMounted(() => {
    getProjectList();
    getTableData();
  });

  const exportVisible = ref(false);
  const onExport = () => {
    exportVisible.value = true;
  };

  //批量导入成功
  const onConfirmSuccess = () => {
    getTableData();
  };

  interface BusinessType {
    label?: string;
    value?: string | number;
    parentId?: string | number;
    isLeaf?: boolean;
    children?: Array<BusinessType>;
  }
  const businessTypeList = ref<Array<BusinessType>>([]);
  const getBusinessTypeList = async () => {
    try {
      const d: any = await cbdApiProjectResourceFormatTreeGet({
        projectId: searchForm.value.projectIdList
      });
      businessTypeList.value = connectName(d);
    } catch (e) {
      console.error(e);
    }
  };

  const connectName = (arr: Array<BusinessType>) => {
    arr.forEach((item) => {
      if (item.children) {
        if (item.children.length === 0) {
          delete item.children;
        } else {
          connectName(item.children);
        }
      }
    });
    return arr;
  };

  //搜索栏业态下拉
  const onSearchPopupChange = (visible: boolean) => {
    console.log(visible, '---visible---');
    if (visible) {
      getBusinessTypeList();
    }
  };

  // //form表单业态下拉
  // const onFormPopupChange = (visible: boolean) => {
  //   if (visible) {
  //     getBusinessTypeList();
  //   }
  // };

  interface Project {
    value?: number;
    label?: string;
  }
  const projectList = ref<Array<Project>>([]);
  const getProjectList = async () => {
    try {
      projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
    } catch (e) {
      console.error(e);
    }
  };

  const onSelectClear = () => {
    searchForm.value.formatIdList = '';
  };

  const onSearch = (data: SearchForm) => {
    searchForm.value.pageNum = 1;
    searchForm.value = data;
    getTableData();
  };

  const searchFormRef: any = ref(null);
  // const current = ref(1);
  const onReset = () => {
    searchForm.value.pageNum = 1;
    searchForm.value.pageSize = 10;
    // current.value = 1;
    searchFormRef.value.resetFields();
    getTableData();
  };

  const tableColumn = reactive<TableColumnData[]>([
    // {
    //   title: '序号',
    //   dataIndex: 'id',
    //   align: 'center',
    //   width: 80
    // },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      align: 'left',
      ellipsis: true
    },
    {
      title: '编号',
      dataIndex: 'code',
      align: 'left'
    },
    {
      title: '品牌',
      dataIndex: 'name',
      align: 'left',
      ellipsis: true
    },
    {
      title: '业态',
      dataIndex: 'formatName',
      align: 'left'
    },
    {
      title: '状态',
      dataIndex: 'status',
      slotName: 'status',
      align: 'left',
    },
    {
      title: '操作',
      slotName: 'optional',
      align: 'left',
      width: 150
    }
  ]);

  interface TableData {
    id?: number;
    projectId?: number;
    projectName?: string;
    code?: string;
    name?: string;
    formatId?: number;
    formatName?: string;
    status?: number;
  }
  const tableData = ref<Array<TableData>>([]);

  const pageTotal = ref(0);

  const getTableData = async () => {
    try {
      const d = await cbdApiProjectResourceMerchantBrandPageGet({
        ...searchForm.value,
        pageNum: String(searchForm.value.pageNum),
        pageSize: String(searchForm.value.pageSize)
      });
      tableData.value = d?.rows || [];
      pageTotal.value = d?.total || 0;
    } catch (e) {
      console.error(e);
    }
  };

  const pageChange = (current: number) => {
    console.log(current, '--*--');
    getTableData();
  };

  const onPageChange = () => {
    // searchForm.value.pageNum = String(page);
    // searchForm.pageNum = page;
    searchForm.value.pageNum = 1;
    getTableData();
  };

  const onAdd = () => {
    visible.value = true;
    drawerTitle.value = '添加品牌';
    handleType.value = 1;
  };

  //选择记录的id
  const selectRecordId = ref('');
  const onEdit = async (id: number) => {
    console.log(id, '---id---');
    visible.value = true;
    drawerTitle.value = '编辑品牌';
    selectRecordId.value = String(id);
    handleType.value = 2;
    await getIdByDetail(id);
  };

  const detailId = ref('');
  const infoVisible = ref(false);
  const onSee = async (id: number) => {
    console.log(id, '---id---');
    detailId.value = id + '';
    infoVisible.value = true;
    // visible.value = true;
    // drawerTitle.value = '查看品牌';
    // handleType.value = 3;
    // disabled.value = true;
    await getIdByDetail(id);
  };

  const onSuccess = () => {
    console.log('操作成功');
    getTableData();
  };

  const delVisible = ref(false);
  const onDel = (id: string) => {
    selectRecordId.value = String(id);
    delVisible.value = true;
  };
  const confirmOk = async () => {
    try {
      await cbdApiProjectResourceMerchantBrandDeleteIdGet({
        id: String(selectRecordId.value)
      });
      Message.success({
        content: '删除成功'
      });
      delVisible.value = false;
      selectRecordId.value = '';
      await getTableData();
    } catch (e) {
      console.error(e);
    }
  };

  const getIdByDetail = async (dataId: number) => {
    try {
      form.value = await cbdApiProjectResourceMerchantBrandInfoIdGet({
        id: String(dataId)
      });
    } catch (e) {
      console.error(e);
    }
  };

  // 弹出层标题
  const drawerTitle = ref('');
  // 控制弹出层显示
  const visible = ref(false);
  // 操作类型 1添加 2修改 3查看
  const handleType = ref(0);

  type Form = {
    id?: number | string;
    projectId?: number | string;
    projectName?: string;
    code?: string;
    name?: string;
    formatId?: number | string;
    formatName?: string;
    status?: number;
    remarks?: string;
  };
  const form = ref<Form>({});
</script>

<style scoped lang="less">
  :deep(.arco-divider-text) {
    color: #1a66ff !important;
  }
  :deep(.arco-space) {
    justify-content: flex-end;
  }
  :deep(.arco-form-item) {
    margin-bottom: 10px !important;
  }
  .i-btn {
    //min-width: 80px;
    //height: 30px;
    //border-radius: 4px;
  }
  .t-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
  .bg-blue-dark {
    color: #4c8af7;
    background: #cbe3ff;
  }
  .page-container-box {
    .search-box {
      padding: 16px;
      background: #fff;
    }
    .table-box {
      margin-top: 22px;
      padding: 16px;
      background: #fff;
    }
    .pagination-box {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 12px 16px;
    }
  }
</style>
