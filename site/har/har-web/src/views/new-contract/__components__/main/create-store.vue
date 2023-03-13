<template>
  <i-drawer
    v-model:model-value="visible"
    :title="drawerTitle"
    :options="{
      footer: false,
      unmountOnClose: true,
      escToClose: false,
      closable: false,
      maskClosable: false
    }"
    :width="500"
  >
    <div class="drawer-box">
      <a-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        layout="vertical"
        class="i-form"
        @submit-success="onSubmit"
      >
        <a-row :gutter="16">
          <a-col :span="16">
            <a-form-item field="projectId" label="归属项目" disabled>
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
        </a-row>

        <a-col :gutter="16">
          <a-col :span="16">
            <a-form-item field="name" label="店铺名称" required>
              <a-input
                v-model="form.name"
                placeholder="请输入内容"
                allow-clear
                :max-length="100"
              />
            </a-form-item>
          </a-col>
        </a-col>
        <div class="footer-box">
          <a-button
            class="i-drawer-btn border-r margin-right-11"
            :disabled="cancelDisable"
            @click="handleCancel"
            >取消</a-button
          >
          <a-button
            html-type="submit"
            class="i-drawer-btn border-r"
            type="primary"
            :loading="confirmLoading"
            >确认</a-button
          >
        </div>
      </a-form>
    </div>
  </i-drawer>
</template>

<script setup lang="ts">
  import IDrawer from '@/components/i-drawer/i-drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import { computed, ref, toRaw, watch } from 'vue';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectContractStoreSavePost
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
    projectId: {
      type: Number,
      default: null
    },
    merchantId: {
      type: Number,
      default: null
    },
    formData: {
      type: Object,
      default: () => {}
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
        message: '店铺名称必填'
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
    try {
      const res: any = await cbdApiProjectContractStoreSavePost({
        projectId: props.projectId,
        merchantId: props.merchantId,
        name: String(form.value.name),
        // todo 接口改了? 先随便写死一个,解决ts报错
        storeType: 1
      });
      Message.success({
        content: '添加成功'
      });
      console.log(res);

      visible.value = false;
      emits('submitSuccess', res);
    } catch (e) {
      console.error(e);
    }
  };

  //修改
  const doUpdate = async () => {};

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
        form.value.projectId = props.projectId;
        form.value.merchantId = props.merchantId;
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
    padding: 16px;
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
    width: 100%;
    padding: 0 25px 34px 25px;
    background: #fff;
  }
  .margin-right-11 {
    margin-right: 11px;
  }
  .border-r {
    border-radius: 5px;
  }
  .i-drawer-btn {
    width: 90px;
    height: 40px;
  }
</style>
