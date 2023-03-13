<template>
  <drawer
    v-model:visible="drawerVisible"
    :options="{
      footer: false,
      unmountOnClose: true,
      escToClose: false,
      closable: false,
      maskClosable: false
    }"
    :title="formDataId !== '' ? '修改' : '新增'"
    width="50vw"
    @cancel="onCancel"
  >
    <div class="i-form-box">
      <a-form
        ref="formDataRef"
        layout="vertical"
        :model="formDataContent"
        :rules="formRules"
        @submit-success="onSubmit"
      >
        <div class="base-info">
          <div class="title">基本信息</div>
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item field="projectId" label="归属项目" required>
                <a-select
                  v-model="formDataContent.projectId"
                  allow-clear
                  placeholder="请选择"
                >
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
              <a-form-item field="code" label="编号" disabled>
                <a-input
                  v-model="formDataContent.code"
                  placeholder="系统自动生成"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="type" label="商户性质" required>
                <a-select
                  v-model="formDataContent.type"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-option
                    v-for="item of merchantType"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="name" label="商户名称" required>
                <a-input
                  v-model="formDataContent.name"
                  placeholder="请输入"
                  :max-length="100"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item field="shortName" label="别名">
                <a-input
                  v-model="formDataContent.shortName"
                  placeholder="请输入"
                  :max-length="20"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="companyName" label="公司名称">
                <a-input
                  v-model="formDataContent.companyName"
                  placeholder="请输入"
                  :max-length="100"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="businessLicenseNumber" label="营业执照编号">
                <a-input
                  v-model="formDataContent.businessLicenseNumber"
                  placeholder="请输入"
                  :max-length="50"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="legalPerson" label="法人姓名">
                <a-input
                  v-model="formDataContent.legalPerson"
                  placeholder="请输入"
                  :max-length="30"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item field="idNumber" label="法人身份证号">
                <a-input
                  v-model="formDataContent.idNumber"
                  placeholder="请输入"
                  :max-length="18"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="bankAccountName" label="账户名称">
                <a-input
                  v-model="formDataContent.bankAccountName"
                  placeholder="请输入"
                  :max-length="100"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="bank" label="开户银行">
                <a-input
                  v-model="formDataContent.bank"
                  placeholder="请输入"
                  :max-length="50"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="bankAccount" label="开户银行账号">
                <a-input
                  v-model="formDataContent.bankAccount"
                  placeholder="请输入"
                  allow-clear
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item field="linkman" label="联系人">
                <a-input
                  v-model="formDataContent.linkman"
                  placeholder="请输入"
                  :max-length="30"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="linkTel" label="联系电话">
                <a-input
                  v-model="formDataContent.linkTel"
                  placeholder="请输入"
                  :max-length="11"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="address" label="联系地址">
                <a-input
                  v-model="formDataContent.address"
                  placeholder="请输入"
                  :max-length="200"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="remark" label="备注">
                <a-input
                  v-model="formDataContent.remark"
                  placeholder="请输入"
                  :max-length="200"
                  show-word-limit
                  allow-clear
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div class="file-info">
          <div class="title">附件信息</div>
          <a-row :gutter="16">
            <a-col>
              <a-form-item field="attachment">
                <i-custom-upload
                  v-model="formDataContent.attachment"
                  url-key="previewAddress"
                ></i-custom-upload>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div class="space-box"></div>
        <div class="footer-box">
          <a-space>
            <a-button @click="onCancel">取消</a-button>
            <a-button html-type="submit" type="primary">确认</a-button>
          </a-space>
        </div>
      </a-form>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { computed, PropType, ref, toRaw, watch } from 'vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';

  const emits = defineEmits([
    'update:formData',
    'update:drawerVisible',
    'update:modalTitle',
    'confirmSubmit',
    'onClose'
  ]);

  interface OptionList {
    value: string | number;
    label: string;
  }

  const props = defineProps({
    drawerVisible: {
      type: Boolean,
      default: false
    },
    formDataId: {
      type: [Number, String],
      default: ''
    },
    formData: {
      type: Object,
      default: () => {}
    },
    projectList: {
      type: Array as PropType<OptionList[]>,
      default: () => []
    },
    merchantType: {
      type: Array as PropType<OptionList[]>,
      default: () => []
    }
  });

  const formRules = {
    projectId: [
      {
        required: true,
        message: '归属项目必填'
      }
    ],
    type: [
      {
        required: true,
        message: '商户性质必填'
      }
    ],
    name: [
      {
        required: true,
        message: '商户名称必填'
      }
    ],
    bankAccountName: [
      {
        required: true,
        message: '账户名称必填'
      }
    ],
    bank: [
      {
        required: true,
        message: '开户银行必填'
      }
    ],
    businessLicenseNumber: [
      // {
      //   required: true,
      //   message: '营业执照必填'
      // }
    ],
    legalPerson: [
      // {
      //   required: true,
      //   message: '法人姓名必填'
      // }
    ],
    idNumber: [
      // {
      //   required: true,
      //   message: '法人身份证号必填'
      // },
      {
        validator: (val: string, callback: any) => {
          const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if (val && !reg.test(val)) {
            callback('身份证输入错误');
          }
        }
      }
    ],
    bankAccount: [
      {
        required: true,
        message: '开户银行账号必填'
      },
      {
        validator: (val: string, callback: any) => {
          if (val && val.length < 11) {
            callback('开户银行账号输入错误');
          }
        }
      }
    ],
    linkman: [
      // {
      //   required: true,
      //   message: '联系人必填'
      // }
    ],
    linkTel: [
      // {
      //   required: true,
      //   message: '联系电话必填'
      // },
      {
        validator: (val: string, callback: any) => {
          const reg =
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
          if (val && !reg.test(val)) {
            callback('联系电话输入错误');
          }
        }
      }
    ],
    address: [
      // {
      //   required: true,
      //   message: '联系地址必填'
      // }
    ]
  };

  const onCancel = () => {
    drawerVisible.value = false;
  };

  const onSubmit = (data: any) => {
    if (data) {
      // console.log(data, '-*-');
      // data.code = Math.floor(Math.random() * 100 + 2) + '';
      if (props.formDataId !== '') {
        emits('confirmSubmit', {
          ...data,
          attachment: data.attachment.map((item: any) => item.key),
          id: props.formDataId,
          confirmType: 1
        });
      } else {
        emits('confirmSubmit', {
          ...data,
          attachment: data.attachment.map((item: any) => item.key),
          confirmType: 2
        });
      }
    }
  };

  const formDataContent = computed({
    get() {
      return props.formData;
    },
    set(v) {
      emits('update:formData', toRaw(v));
    }
  });
  watch(
    () => formDataContent.value.legalPerson,
    (val: string) => {
      formDataContent.value.linkman = val;
    }
  );

  const drawerVisible = computed({
    get() {
      return props.drawerVisible;
    },
    set(data) {
      emits('update:drawerVisible', data);
    }
  });

  const formDataRef: any = ref(null);
  watch(
    () => drawerVisible.value,
    (val) => {
      if (!val) {
        formDataRef.value.resetFields();
        formDataContent.value.legalPerson = '';
        emits('onClose');
      }
    }
  );
</script>

<style scoped lang="less">
  .i-form-box {
    .base-info {
      margin-bottom: 12px;
      padding: 12px;
      background: #fff;
      border-radius: 4px;
    }
    .file-info {
      padding: 12px;
      background: #fff;
      border-radius: 4px;
    }
    .title {
      margin-bottom: 12px;
      color: #333;
      font-size: 16px;
    }
  }
  .space-box {
    width: 100%;
    height: 64px;
  }
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
    width: 50vw;
    padding: 12px 25px;
    background: #fff;
  }
</style>
