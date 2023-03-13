<template>
  <div class="page-container-box">
    <a-empty v-if="menuList.length < 1">
      <template #image>
        <a-image
          :preview="false"
          fit="cover"
          :width="180"
          :height="174"
          src="@/assets/images/icon-noData.png"
        />
      </template>
      暂无数据
    </a-empty>
    <div v-else class="content-box">
      <div class="menu-box">
        <i-tree
          :data="menuList"
          :default-props="defaultProps"
          :select-content="treeSelectContent"
          @on-select-handler="onSelectHandler"
        >
          <a-tree
            ref="treeRef"
            block-node
            :check-strictly="true"
            :field-names="{
              key: 'value',
              title: 'label'
            }"
            :data="treeData"
            @select="onSelect"
          />
        </i-tree>
        <!--<a-collapse
          v-model:active-key="collapseKey"
          destroy-on-hide
          :bordered="false"
          @change="collapseChange"
        >
          <div v-for="(item, index) in menuList" :key="index">
            <a-collapse-item :key="`${item.value}`">
              <template #header>
                <div
                  :class="collapseKey[0] === item.value ? 'text-blue' : ''"
                  >{{ item.label }}</div
                >
              </template>
              <a-tree
                ref="treeRef"
                block-node
                :check-strictly="true"
                :field-names="{
                  key: 'value',
                  title: 'label'
                }"
                :data="treeData"
                @select="onSelect"
              />
            </a-collapse-item>
          </div>
        </a-collapse> -->
      </div>
      <div class="detail-info-box">
        <div class="handle-box">
          <template v-if="menuList.length > 0">
            <a-button
              :disabled="!selectInfo?.canAdd"
              class="i-btn"
              type="primary"
              @click="onAdd"
              >添加</a-button
            >
            <a-button
              :disabled="updateDisabled"
              class="i-btn"
              type="primary"
              @click="onUpdate"
              >修改</a-button
            >
            <a-button
              :disabled="!selectInfo?.canDelete"
              class="i-btn"
              type="primary"
              @click="onDel"
              >删除</a-button
            >
            <!-- <a-button class="i-btn" type="primary">展开</a-button>
            <a-button class="i-btn" type="primary">收缩</a-button> -->
          </template>
          <a-button class="i-btn" type="primary" @click="onExport"
            >批量导入</a-button
          >
        </div>
        <a-spin class="fill-box" :loading="loading" tip="加载中...">
          <template v-if="showInfo">
            <i-cell label="归属项目：" :value="selectInfo?.projectName" />
            <i-cell label="编号：" :value="String(selectInfo?.code || '')" />
            <i-cell label="名称：" :value="selectInfo?.name" />
            <i-cell label="描述：" :value="selectInfo?.remark" />
            <i-cell
              label="图标："
              is-img
              :value="selectInfo?.iconAttachment?.previewAddress || ''"
            />
          </template>
        </a-spin>
        <i-logs
          visible
          :options="{
            modeId: formatId,
            logUrl: cbdApiProjectSysOptPageOptListPost,
            mode: 'cbd_format'
          }"
        />
      </div>
      <drawer
        v-model:model-value="visible"
        :title="drawerTitle"
        :options="{
          header: true,
          footer: false,
          unmountOnClose: true,
          escToClose: false,
          closable: false,
          maskClosable: false
        }"
        :width="920"
      >
        <div class="drawer-container">
          <div class="form-title">基本信息</div>
          <a-form
            ref="formRef"
            :disabled="disabled"
            :model="form"
            :rules="formRules"
            layout="vertical"
            class="i-form"
            @submit-success="onSubmit"
          >
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item field="code" label="编号" :disabled="true">
                  <a-input
                    v-model="form.code"
                    placeholder="系统自动生成"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="name" label="名称" required>
                  <a-input
                    v-model="form.name"
                    placeholder="请输入名称"
                    :max-length="50"
                    :show-word-limit="true"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item field="remark" label="描述">
                  <a-input
                    v-model="form.remark"
                    placeholder="请输入描述"
                    :max-length="200"
                    :show-word-limit="true"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item field="iconList" label="图标">
                  <i-custom-upload
                    v-model="form.iconList"
                    url-key="previewAddress"
                    :options="{
                      limit: 1,
                      tip: '请上传业态图标',
                      accept: 'image/png,image/jpg,image/jpeg'
                    }"
                  ></i-custom-upload>
                </a-form-item>
              </a-col>
            </a-row>
            <div class="footer-box">
              <a-button
                class="i-drawer-btn margin-right-11"
                :disabled="cancelDisable"
                @click="handleCancel(form.projectId || -1)"
                >取消</a-button
              >
              <a-button
                html-type="submit"
                type="primary"
                class="i-drawer-btn i-active-btn"
                :loading="confirmLoading"
                >确认</a-button
              >
            </div>
          </a-form>
        </div>
      </drawer>
    </div>
    <i-export
      v-model:drawer-visible="exportVisible"
      :export-type="1"
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
  import ICell from '@/views/resource-manage/_component_/i-cell.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import ILogs from '@/components/i-logs/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectResourceFormatDeleteIdGet,
    cbdApiProjectResourceFormatInfoIdGet,
    cbdApiProjectResourceFormatSavePost,
    cbdApiProjectResourceFormatTreeGet,
    cbdApiProjectResourceFormatUpdatePost
  } from '@/api';
  import IExport from '@/views/resource-manage/_component_/i-export.vue';
  import ITree from '@/views/resource-manage/_component_/i-tree.vue';

  interface MenuList {
    canAdd?: boolean;
    canDelete?: boolean;
    canUpdate?: boolean;
    label: string;
    showInfo?: boolean;
    value: string | number;
  }
  const menuList = ref<any>([]);
  onMounted(() => {
    getProjectList();
  });

  const updateDisabled = computed(() => {
    return !!(
      JSON.stringify(selectInfo.value) === '{}' || selectInfo.value?.canUpdate
    );
  });

  const showInfo = computed(() => {
    console.log(selectInfo.value, '--selectInfo.value--');
    if (JSON.stringify(selectInfo.value) !== '{}') {
      return !(
        selectInfo.value?.showInfo !== undefined && !selectInfo.value?.showInfo
      );
    } else {
      return false;
    }
  });

  const treeSelectContent = ref('');
  const getProjectList = async () => {
    try {
      const d = await cbdApiProjectCommonProjectSelectListGet({});
      menuList.value = d.map((item) => {
        return {
          ...item,
          value: String(item.value),
          canDelete: false,
          canAdd: true,
          canUpdate: true,
          showInfo: false
        };
      });
      if (d.length) {
        treeSelectContent.value = d[0].label;
        await getTreeList(d[0].value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // const collapseKey = ref<(string | number)[]>([]);
  // const collapseChange = (activeKey: (string | number)[]) => {
  //   if (activeKey.length) {
  //     const activeId = String(activeKey[activeKey.length - 1]);
  //     const obj = menuList.value.find((item) => item.value === activeId);
  //     selectInfo.value = {
  //       ...obj,
  //       id: '',
  //       projectId: '',
  //       projectName: ''
  //     };
  //     collapseKey.value = [activeId];
  //     getTreeList(activeId);
  //   } else {
  //     selectInfo.value = {};
  //   }
  // };

  const treeData: any = ref([]);
  const getTreeList = async (id: number | string) => {
    try {
      treeData.value = await cbdApiProjectResourceFormatTreeGet({
        projectId: String(id)
      });
    } catch (e) {
      console.error(e);
    }
  };

  // watch(
  //   () => collapseKey.value,
  //   (val) => {
  //     if (val.length) {
  //       const obj = menuList.value.find((item) => item.value === val[0]);
  //       selectInfo.value = {
  //         ...obj,
  //         id: '',
  //         projectId: '',
  //         projectName: ''
  //       };
  //       // console.log(val[0], '--*--');
  //     }
  //   }
  // );

  const exportVisible = ref(false);
  const onExport = () => {
    exportVisible.value = true;
  };

  //树中单条数据查询loading
  const loading = ref(false);
  const treeRef: any = ref(null);
  const formatId = ref('');
  const onSelect = async (selectedKeys: (string | number)[]) => {
    loading.value = true;
    formatId.value = String(selectedKeys[0]);
    const res = await getInfoById(String(selectedKeys[0]));
    selectInfo.value = res;
    form.value.projectId = Number(selectInfo.value?.projectId);
    form.value.iconList = res?.iconAttachment.id ? [res?.iconAttachment] : [];
    // console.log(menuList.value);
    // if (idInProjectList(Number(selectedKeys[0]))) {
    //   selectInfo.value = menuList.value.find(
    //     (item) => Number(item.projectId) === Number(selectedKeys[0])
    //   );
    // } else {
    //   if (Number(selectedKeys[0]) === Number(selectInfo.value?.projectId))
    //     return;
    //   loading.value = true;
    //   selectInfo.value = await getInfoById(String(selectedKeys[0]));
    // }
  };

  // const idInProjectList = (id: number) => {
  //   return (
  //     menuList.value.findIndex(
  //       (item) => Number(item.projectId) === Number(id)
  //     ) > -1
  //   );
  // };

  // const loadMore = async (nodeData: MenuList) => {
  //   if (nodeData.children || nodeData.isLeaf === true) return;
  //   try {
  //     const d = await cbdApiProjectResourceFormatTreeGet({
  //       projectId: String(nodeData.projectId)
  //     });
  //     nodeData.children = connectName(d);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // const connectName = (arr: Array<MenuList>) => {
  //   arr.forEach((item) => {
  //     if (item.children) {
  //       if (item.children.length === 0) {
  //         item.isLeaf = true;
  //         delete item.children;
  //       } else {
  //         connectName(item.children);
  //       }
  //     }
  //   });
  //   return arr;
  // };

  type SelectInfo = {
    id?: number | string;
    projectId?: number | string;
    projectName?: string;
    name?: string;
    code?: string | number;
    remark?: string;
    canDelete?: boolean;
    canAdd?: boolean;
    canUpdate?: boolean;
    showInfo?: boolean;
    iconAttachment?: any;
  };

  const selectInfo = ref<SelectInfo | void>({});
  const getInfoById = async (id: string) => {
    loading.value = false;
    try {
      return await cbdApiProjectResourceFormatInfoIdGet({
        id: String(id)
      });
    } catch (e) {
      console.error(e);
      loading.value = false;
    }
  };

  // 弹出层标题
  const drawerTitle = ref('');
  // 控制弹出层显示
  const visible = ref(false);
  // 操作类型 1添加 2修改
  const handleType = ref(0);

  const onAdd = () => {
    visible.value = true;
    drawerTitle.value = '添加业态';
    handleType.value = 1;
    if (selectInfo.value?.projectId !== undefined) {
      form.value.projectId = Number(selectInfo.value?.projectId);
      form.value.id = selectInfo.value?.id;
    }
  };

  const onUpdate = async () => {
    visible.value = true;
    drawerTitle.value = '修改业态';
    handleType.value = 2;
    const d = await getInfoById(String(selectInfo.value?.id));
    form.value.id = d?.id;
    form.value.iconList = d?.iconAttachment.id ? [d?.iconAttachment] : [];
    form.value.code = String(d?.code);
    form.value.name = d?.name;
    form.value.remark = d?.remark;
  };

  const onDel = () => {
    delVisible.value = true;
  };

  interface Form {
    id?: number | string;
    projectId?: number;
    pid?: number;
    code?: string;
    iconList?: any[];
    name?: string;
    remark?: string;
  }
  const form = ref<Form>({
    iconList: []
  });
  const formRef: any = ref(null);
  // 表单禁用
  const disabled = ref(false);
  // 取消禁用
  const cancelDisable = ref(false);
  // 确认loading
  const confirmLoading = ref(false);
  const formRules = {
    name: [
      {
        required: true,
        message: '名称必填'
      }
    ]
  };

  const onSubmit = (data: Form) => {
    if (data) {
      if (confirmLoading.value) return;
      // console.log(data);
      disabled.value = true;
      cancelDisable.value = true;
      confirmLoading.value = true;
      if (handleType.value === 1) {
        doAdd();
      } else if (handleType.value === 2) {
        doUpdate();
      }
    }
  };

  //批量导入成功
  const onConfirmSuccess = () => {
    // console.log('导入成功回调');
    getTreeList(form.value.projectId || '');
    // getTreeList();
  };

  //修改
  const doUpdate = async () => {
    try {
      const { iconList = [] } = form.value;
      const key: string = iconList.map((el: any) => el.key || el.id).join(',');
      await cbdApiProjectResourceFormatUpdatePost({
        id: Number(form.value.id),
        name: form.value.name || '',
        remark: form.value.remark,
        icon: key
      });
      Message.success({
        content: '修改成功'
      });
      await getTreeList(form.value.projectId || '');
      const res = await getInfoById(String(form.value.id));
      selectInfo.value = res;
      form.value.projectId = Number(selectInfo.value?.projectId);
      form.value.iconList = res?.iconAttachment.id ? [res?.iconAttachment] : [];
      handleCancel(form.value?.projectId || -1);
      resetStatus();
    } catch (e) {
      resetStatus();
      console.error(e);
    }
  };

  //新增
  const doAdd = async () => {
    try {
      const { iconList = [] } = form.value;
      const key: string = iconList.map((el: any) => el.key || '').join(',');
      await cbdApiProjectResourceFormatSavePost({
        projectId: form.value.projectId || -1,
        pid: form.value.id === '' ? undefined : Number(form.value.id),
        icon: key,
        name: form.value.name || '',
        remark: form.value.remark
      });
      Message.success({
        content: '添加成功'
      });
      await getTreeList(form.value?.projectId || '');
      handleCancel(form.value?.projectId || -1);
      resetStatus();
    } catch (e) {
      resetStatus();
      console.error(e);
    }
  };

  //重置按钮状态及表单状态
  const resetStatus = () => {
    disabled.value = false;
    cancelDisable.value = false;
    confirmLoading.value = false;
  };

  const handleCancel = (projectId?: number) => {
    visible.value = false;
    form.value = {
      iconList: []
    };
    form.value.projectId = projectId;
    handleType.value = 0;
  };

  //控制删除二次确认弹窗
  const delVisible = ref(false);
  const confirmOk = async () => {
    try {
      await cbdApiProjectResourceFormatDeleteIdGet({
        id: String(selectInfo.value?.id)
      });
      Message.success({
        content: '删除成功'
      });
      delVisible.value = false;
      await getTreeList(form.value.projectId || '');
    } catch (e) {
      console.error(e);
    }
  };

  const defaultProps = reactive({
    children: 'children',
    label: 'label'
  });
  const onSelectHandler = (data: MenuList) => {
    const { value } = data;
    form.value.projectId = Number(value);
    selectInfo.value = data;
    treeData.value = [];
    getTreeList(value);
  };
</script>

<style scoped lang="less">
  :deep(.arco-divider-text) {
    color: #1a66ff !important;
  }
  :deep(.arco-empty) {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  :deep(.arco-tree-node-title) {
    flex: 1;
    width: 0;
  }
  :deep(.arco-tree-node-title-text) {
    overflow: hidden !important;
    white-space: nowrap;
    text-overflow: ellipsis !important;
  }
  .margin-right-11 {
    margin-right: 11px;
  }
  .text-blue {
    color: #4c8af7;
  }
  .border-r {
    border-radius: 4px;
  }
  .i-drawer-btn {
    //width: 104px;
    //height: 40px;
    //color: #117cfa;
    //font-size: 16px;
    //background: #dbe8fd;
    //border-radius: 4px;
  }
  //.i-active-btn {
  //  color: #fff !important;
  //  background: #117cfa !important;
  //}
  .fill-box {
    width: 100%;
    height: 100%;
    padding: 0 16px;
  }
  .page-container-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    .handle-box {
      padding: 16px;
      .i-btn {
        //  width: 90px;
        //  height: 35px;
        margin-right: 23px;
        //  background: #4c8af7;
        //  border-radius: 5px;
      }
    }
    .content-box {
      display: flex;
      width: 100%;
      height: 100%;
      .menu-box {
        width: 200px;
        height: 100%;
        padding: 16px;
        background: #fff;
        box-shadow: 3px 0 6px 1px rgba(0, 0, 0, 0.16);
      }
      .detail-info-box {
        position: relative;
        flex: 1;
        height: 100%;
      }
    }
  }
  .drawer-container {
    width: 100%;
    padding: 12px 12px 0 12px;
    background: #fff;
    border-radius: 4px;
    .form-title {
      margin-bottom: 24px;
      color: #333;
      font-size: 16px;
    }
  }
  //.drawer-title {
  //  position: absolute;
  //  top: 0;
  //  right: 0;
  //  z-index: 99;
  //  width: 100%;
  //  height: 46px;
  //  font-size: 14px;
  //  color: #333333;
  //  background: #fff;
  //  padding: 12px 16px;
  //}
  .footer-box {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 12px 16px;
    background: #fff;
  }
</style>
