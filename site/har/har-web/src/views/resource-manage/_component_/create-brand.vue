<template>
  <drawer
    v-model:model-value="visible"
    show-log
    :title="drawerTitle"
    :options="{
      footer: false,
      unmountOnClose: true,
      escToClose: false,
      closable: false,
      maskClosable: false
    }"
    width="50vw"
  >
    <div class="drawer-box">
      <div class="base-info">
        <div class="title-box">基本信息</div>
        <a-form
          ref="formRef"
          :disabled="handleType === 3"
          :model="form"
          :rules="formRules"
          layout="vertical"
          class="i-form"
          @submit-success="onSubmit"
        >
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item field="projectId" label="归属项目" required>
                <a-select v-model="form.projectId" allow-clear>
                  <a-option
                    v-for="item of projectList"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </a-select>
              </a-form-item>
            </a-col>
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
              <a-form-item field="name" label="品牌">
                <a-input
                  v-model="form.name"
                  placeholder="请输入"
                  :max-length="200"
                  :show-word-limit="true"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                field="formatId"
                label="业态"
                :disabled="
                  ['', undefined].includes(form.projectId) || handleType === 3
                "
              >
                <a-cascader
                  v-model="form.formatId"
                  :field-names="{
                    value: 'value',
                    label: 'label'
                  }"
                  :options="businessTypeList"
                  allow-clear
                  @popup-visible-change="onFormPopupChange"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-col :gutter="16">
            <a-col :span="12">
              <a-form-item field="remark" label="备注">
                <a-input
                  v-model="form.remark"
                  placeholder="请输入"
                  :max-length="200"
                  :show-word-limit="true"
                  allow-clear
                />
              </a-form-item>
            </a-col>
          </a-col>
          <div class="footer-box">
            <a-space>
              <a-button
                :disabled="cancelDisable"
                @click="handleCancel"
              >取消</a-button
              >
              <a-button
                v-if="handleType !== 3"
                html-type="submit"
                type="primary"
                :loading="confirmLoading"
              >确认</a-button
              >
            </a-space>
          </div>
        </a-form>
      </div>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import { computed, ref, toRaw, watch } from 'vue';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectResourceFormatTreeGet,
    cbdApiProjectResourceMerchantBrandUpdatePost,
    cbdApiProjectResourceMerchantBrandSavePost
  } from '@/api';

  const emits = defineEmits([
    'update:formData',
    'update:drawerVisible',
    'update:modalTitle',
    'update:formDataId',
    'submitSuccess',
    'confirmSubmit',
    'onClose'
  ]);

  const props = defineProps({
    drawerVisible: {
      type: Boolean,
      default: false
    },
    drawerTitle: {
      type: String
    },
    formDataId: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => {}
    },
    // 操作类型 1添加 2修改 3查看
    handleType: {
      type: Number,
      default: 0
    }
  });

  const formRef: any = ref(null);
  // 表单禁用
  const disabled = ref(false);
  // 取消禁用
  const cancelDisable = ref(false);
  // 确认loading
  const confirmLoading = ref(false);
  const formRules = {
    projectId: [
      {
        required: true,
        message: '归属项目必填'
      }
    ],
    name: [
      {
        required: true,
        message: '品牌必填'
      }
    ],
    formatId: [
      {
        required: true,
        message: '业态必填'
      }
    ]
  };

  const onSubmit = (data: any) => {
    if (data) {
      if (props.formDataId !== '') {
        doUpdate();
      } else {
        doAdd();
      }
    }
  };

  //新增
  const doAdd = async () => {
    console.log(form.value);
    try {
      await cbdApiProjectResourceMerchantBrandSavePost({
        projectId: Number(form.value.projectId),
        code: form.value.code || Math.floor(Math.random() * 100 + 2) + '',
        name: String(form.value.name),
        formatId: Number(form.value.formatId),
        remark: form.value.remark
      });
      Message.success({
        content: '添加成功'
      });
      visible.value = false;
      emits('submitSuccess');
    } catch (e) {
      console.error(e);
    }
  };

  //修改
  const doUpdate = async () => {
    try {
      await cbdApiProjectResourceMerchantBrandUpdatePost({
        id: Number(props.formDataId),
        projectId: Number(form.value.projectId),
        name: String(form.value.name),
        formatId: Number(form.value.formatId),
        remark: form.value.remark
      });
      Message.success({
        content: '修改成功'
      });
      visible.value = false;
      emits('submitSuccess');
    } catch (e) {
      console.error(e);
    }
  };

  //搜索栏业态下拉
  const onFormPopupChange = (visible: boolean) => {
    console.log(visible, '---visible---');
    if (visible) {
      getBusinessTypeList();
    }
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
        projectId: String(form.value.projectId)
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

  const handleCancel = () => {
    visible.value = false;
    disabled.value = false;
  };

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

  const form = computed({
    get() {
      return props.formData;
    },
    set(v) {
      emits('update:formData', toRaw(v));
    }
  });
  watch(
    () => form.value.projectId,
    (val: string) => {
      if (val) {
        getBusinessTypeList();
      }
    }
  );

  const visible = computed({
    get() {
      return props.drawerVisible;
    },
    set(data) {
      emits('update:drawerVisible', data);
    }
  });

  watch(
    () => visible.value,
    (val) => {
      if (val) {
        getProjectList();
      } else {
        form.value = {};
        emits('update:formDataId', '');
      }
    }
  );
</script>

<style scoped lang="less">
  .drawer-box {
    width: 100%;
    .base-info {
      padding: 12px 12px 0 12px;
      background: #fff;
      border-radius: 4px;
    }
    .title-box {
      margin-bottom: 16px;
    }
  }
  .footer-box {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    width: 50vw;
    padding: 12px 25px;
    background: #fff;
  }
  .margin-left-11 {
    margin-left: 11px;
  }
  .border-r {
    border-radius: 5px;
  }
  .i-drawer-btn {
    width: 104px;
    height: 40px;
    color: #117cfa;
    font-size: 16px;
    background: #dbe8fd;
    border-radius: 4px;
  }
  .i-active-btn {
    color: #fff !important;
    background: #117cfa !important;
  }
</style>
