<template>
  <i-drawer
    v-model="visible"
    show-log
    :options="{ footer: false }"
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_merchant'
    }"
    title="查看"
    :width="800"
  >
    <div class="detail-box">
      <a-descriptions
        :data="formDataColumn.basicInfo"
        title="基本信息"
        layout="inline-vertical"
        :column="4"
        :label-style="{
          fontSize: '14px',
          color: '#999',
          paddingTop: '16px',
          paddingBottom: '8px'
        }"
      >
        <descriptions-item
          v-for="(item, index) of formDataColumn.basicInfo"
          :key="index"
          :span="item?.span || 1"
          :label="item.label"
        >
          <template v-if="item.value === 'type'">{{
            newType(formData[item.value])
          }}</template>
          <template v-else>
            {{ formData[item.value] ? formData[item.value] : '--' }}
          </template>
        </descriptions-item>
      </a-descriptions>
      <a-descriptions
        class="margin-top"
        title="附件信息"
        layout="inline-vertical"
      >
        <a-descriptions-item>
          <i-custom-upload
            :model-value="formData.attachment"
            url-key="previewAddress"
            :options="{
              showUploadButton: false,
              showRemoveButton: false
            }"
          />
        </a-descriptions-item>
      </a-descriptions>
      <div class="footer-box">
        <a-button
          class="i-drawer-btn margin-right-8 bg-blue-dark"
          @click="visible = false"
          >返回</a-button
        >
        <a-button class="i-drawer-btn" type="primary" @click="onUpdate"
          >修改</a-button
        >
      </div>
    </div>
  </i-drawer>
</template>

<script setup lang="ts">
  import IDrawer from '@/components/drawer/drawer.vue';
  import { DescriptionsItem } from '@arco-design/web-vue';
  import { computed, reactive, watch } from 'vue';
  import { merchant_type } from '@/config/resource_manage_status';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { cbdApiProjectSysOptPageOptListPost } from '@/api';

  const emits = defineEmits(['update:drawerVisible', 'onClose', 'onUpdate']);

  const props = defineProps({
    drawerVisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
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

  const onUpdate = () => {
    visible.value = false;
    emits('onUpdate', props.id);
  };

  const newType = computed(() => (val: number) => {
    return merchant_type.find((item) => item.value === val)?.label;
  });

  const formDataColumn = reactive({
    basicInfo: [
      {
        value: 'projectName',
        label: '归属项目'
      },
      {
        value: 'code',
        label: '编号'
      },
      {
        value: 'type',
        label: '商户性质'
      },
      {
        value: 'name',
        label: '商户名称'
      },
      {
        value: 'shortName',
        label: '别名'
      },
      {
        value: 'companyName',
        label: '公司名称'
      },
      {
        value: 'businessLicenseNumber',
        label: '营业执照编号'
      },
      {
        value: 'legalPerson',
        label: '法人姓名'
      },
      {
        value: 'idNumber',
        label: '法人身份证号'
      },
      {
        value: 'bankAccountName',
        label: '账户名称'
      },
      {
        value: 'bank',
        label: '开户银行'
      },
      {
        value: 'bankAccount',
        label: '开户银行账号'
      },
      {
        value: 'linkman',
        label: '联系人'
      },
      {
        value: 'linkTel',
        label: '联系电话'
      },
      {
        value: 'address',
        label: '联系地址',
        span: 2
      },
      {
        value: 'remark',
        label: '备注'
      }
    ]
  });

  watch(
    () => visible.value,
    (val) => {
      if (!val) {
        emits('onClose');
      }
    }
  );
</script>

<style scoped lang="less">
  .detail-box {
    width: 100%;
    padding: 16px;
    background-color: #fff;
  }
  :deep(.arco-descriptions-row) {
    display: flex;
    .arco-descriptions-item {
      display: inline-flex;
      flex: 1;
      flex-direction: column;
      word-break: break-all;
    }
    &:nth-of-type(4) {
      .arco-descriptions-item {
        flex: none;
        width: 25%;
        &:last-child {
          width: 50%;
        }
      }
    }
  }
  //:deep(.arco-descriptions-item) {
  //  display: inline-flex;
  //  flex: 1;
  //  flex-direction: column;
  //  word-break: break-all;
  //}
  .margin-right-8 {
    margin-right: 8px;
  }
  .i-drawer-btn {
    width: 104px;
    height: 40px;
    color: #117cfa;
    font-size: 16px;
    background: #dbe8fd;
    border-radius: 4px;
  }
  .bg-blue-dark {
    color: #fff !important;
    background: #117cfa !important;
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
