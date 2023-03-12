<template>
  <drawer v-model="visible" :title="title" width="54%">
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
      <a-button @click="onCancel">取消</a-button>

      <!-- <a-button type="primary" v-if="editForm.id && !isEdit" @click="onEdit">
        编辑
      </a-button> -->
      <!-- v-if="isEdit" -->
      <a-button
        type="primary"
        :loading="editForm.id ? editLoading : loading"
        @click="onSubmit"
      >
        确认
      </a-button>
    </template>
    <div class="member-model-box">
      <a-form ref="formRef" :model="editForm" :rules="rules" layout="vertical">
        <a-card :bordered="false">
          <a-row class="flex align-center">
            <a-form-item field="projectId" label="项目名称">
              <a-select
                v-model="editForm.projectId"
                :style="{ width: '230px' }"
                placeholder="请选择项目名称"
                @change="onProjectChange"
              >
                <a-option
                  v-for="item in projectOptions"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-row>
          <div class="photo_title">会员人脸</div>
          <a-row class="flex">
            <div class="photo_left">
              <div class="faceBox">
                <!-- @/assets/images/cashier-pic.png -->
                <a-image
                  class="bgImg"
                  width="230"
                  height="230"
                  :src="editForm.avatarUrl"
                >
                  <template #extra>
                    <div
                      class="flex align-center justify-center"
                      @click="onClearImg"
                    >
                      <span class="action"
                        ><icon-close-circle size="20"
                      /></span>
                    </div>
                  </template>
                </a-image>
                <div class="btns">
                  <div class="photo_btn" @click="goTakePhoto">拍照</div>
                  <i-custom-upload
                    v-model="uploadImgs"
                    :show-file-list="false"
                    url-key="faceImg"
                    :options="{
                      listType: 'text',
                      limit: 1,
                      disabled: Boolean(editForm.avatarUrl),
                      accept: '*'
                    }"
                  >
                    <template #uploadButton>
                      <div>上传照片</div>
                    </template>
                  </i-custom-upload>
                </div>
              </div>
            </div>
            <a-col :span="9">
              <a-form-item field="name" label="姓名">
                <a-input
                  v-model="editForm.name"
                  class="nameInput"
                  :style="{ width: '440px', paddingRight: 0 }"
                  placeholder="请输入"
                  allow-clear
                >
                  <template #suffix>
                    <a-select v-model="editForm.personType" placeholder="请选择">
                      <a-option
                        v-for="item in personList"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </a-option>
                    </a-select>
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item field="phone" label="手机号">
                <a-input
                  v-model="editForm.phone"
                  class="phoneInput"
                  :style="{ width: '440px', paddingLeft: 0 }"
                  :max-length="11"
                  placeholder="请输入"
                  allow-clear
                >
                  <template #prefix>
                    <a-select :default-value="['+86']" placeholder="请选择">
                      <a-option
                        v-for="item in phonePreList"
                        :key="item"
                        :value="item"
                      >
                        {{ item }}
                      </a-option>
                    </a-select>
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item field="identityNo" label="身份证号">
                <a-input
                  v-model="editForm.identityNo"
                  :style="{ width: '440px' }"
                  placeholder="请输入身份证号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item field="projectId" label="备注">
            <a-textarea
              v-model="editForm.remark"
              placeholder="请输入备注"
              :auto-size="{
                minRows: 5,
                maxRows: 6
              }"
              :max-length="200"
              allow-clear
              show-word-limit
            />
          </a-form-item>
        </a-card>

        <a-card :bordered="false">
          <i-form
            ref="iFormRef"
            v-model="editForm"
            class="equipment_form"
            :options="formProps"
          >
            <template #genderForm>
              <a-radio-group v-model="editForm.gender">
                <a-radio
                  v-for="(item, index) in genderList"
                  :key="index"
                  :value="item.value"
                >
                  <div class="flex align-center">
                    <span>{{ item.label }}</span>
                    <img :src="item.icon" alt="" />
                  </div>
                </a-radio>
              </a-radio-group>
            </template>
            <template #heightForm>
              <a-input-number
                v-model="editForm.height"
                class="slotInput"
                placeholder="请输入"
                :allow-clear="true"
              >
                <template #append>CM</template>
              </a-input-number>
            </template>
            <template #weightForm>
              <a-input-number
                v-model="editForm.weight"
                class="slotInput"
                placeholder="请输入"
                :allow-clear="true"
              >
                <template #append>KG</template>
              </a-input-number>
            </template>
            <template #fitnessLevelForm>
              <a-rate v-model="editForm.fitnessLevel" allow-clear />
            </template>
          </i-form>
          <a-row>
            <a-form-item class="fitnessGoal" field="projectId" label="健身目标">
              <a-textarea
                v-model="editForm.fitnessGoal"
                placeholder="请输入健身目标"
                :auto-size="{
                  minRows: 1,
                  maxRows: 1
                }"
                :max-length="50"
                allow-clear
                show-word-limit
              />
            </a-form-item>
          </a-row>
        </a-card>
      </a-form>
    </div>
    <TakePhoto
      v-model="cameraVisible"
      @take-photo-success="onTakePhotoSuccess"
    ></TakePhoto>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, onMounted, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import TakePhoto from './takePhotoCom.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  // import type { EditForm } from '../type/useAddModel';
  import IForm from '@/components/i-form/index.vue';
  import { FormOptions } from '@/components/i-form/index';
  // import dayjs from 'dayjs';
  // import NP from 'number-precision';
  import {
    groundPcApiMemberLabelSelectListGet,
    GroundPcApiMemberLabelSelectListGetResponse,
    groundPcApiMemberAddPost,
    groundPcApiMemberEditPost,
    groundPcApiMemberDetailIdGet
  } from '@/api/ground-pc-api';
  import { cbdApiProjectCommonProjectSelectListGet } from '@/api';
  import man from '@/assets/images/member/man.png';
  import woman from '@/assets/images/member/woman.png';
  import { useProjectOptions } from '@/views/vms/hooks/usePorject';

  const formRef: Ref = ref(null);
  const iFormRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    rowId: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'add'
    },
    options: {
      type: Object,
      default: () => {
        return {
          energyTypeData: [],
          usageTypeData: []
        };
      }
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);
  const rules = {
    name: [{ required: true, message: '姓名不能为空' }],
    phone: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: (value: string, cbfn: (error?: string) => void) => {
          if (value) {
            const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!reg.test(value)) {
              cbfn('请输入正确的手机号码');
            }
            cbfn();
          } else {
            return cbfn('请输入手机号');
          }
        }
      }
    ]
  };

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      if (formRef.value) {
        formRef.value.resetFields();
        iFormRef.value?.resetFields();
      }
      emits('update:modelValue', v);
    }
  });
  const editForm = ref<any>({});
  const formProps = computed<FormOptions>(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '会员来源',
        prop: 'sourceType',
        type: 'select',
        placeholder: '请选择会员来源',
        dic: sourceTypeData
      },
      {
        label: '会员标签',
        prop: 'labelIds',
        type: 'select',
        dic: memberLabelData.value,
        options: {
          multiple: true,
          maxTagCount: 2
        },
        placeholder: '请选择会员标签'
      },
      {
        label: '生日',
        prop: 'birthDay',
        type: 'date'
      },
      {
        label: '性别',
        prop: 'gender'
      },
      {
        label: '身高',
        prop: 'height',
        type: 'inputNumber',
        options: {
          disabled: false,
          placeholder: '请输入'
        }
      },
      {
        label: '体重',
        prop: 'weight',
        type: 'inputNumber',
        options: {
          disabled: false,
          placeholder: '请输入'
        }
      },
      {
        label: '健身等级',
        prop: 'fitnessLevel'
      }
    ]
  }));

  function idCardValidate(val: string) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (val && !reg.test(val)) {
      return false;
    }
    return true;
  }
  type optionItem = {
    label?: string;
    value?: string | number;
  };
  const genderList = ref([
    {
      label: '男',
      value: 1,
      icon: man
    },
    {
      label: '女',
      value: 0,
      icon: woman
    }
  ]);
  const personList = ref<optionItem[]>([
    {
      label: '成年人',
      value: 1
    },
    {
      label: '未成年人',
      value: 2
    }
  ]);
  const phonePreList = ref<string[]>(['+86']);
  // 项目名称--下拉列表
  const { getProjectOptions, projectOptions } = useProjectOptions();

  // 会员来源--下拉列表
   const sourceTypeData = [
    { label: '小程序注册', value: 1 },
    { label: '老带新', value: 2 },
    { label: '顾问推荐', value: 3 },
    { label: '客户自到店', value: 4 },
    { label: '自主发掘', value: 5 }
  ];
  // 会员标签--下拉列表
  const memberLabelData = ref<GroundPcApiMemberLabelSelectListGetResponse>([]);
  const [getMemberLabelData] = useFuncProxy(async (v: string) => {
    memberLabelData.value = await groundPcApiMemberLabelSelectListGet({});
  });

  const [initEditInfo] = useFuncProxy(async () => {
    const res = await groundPcApiMemberDetailIdGet({ id: props.rowId });
    // 编辑回显的时候要看，有些默认值是否存在，不存在特殊 处理
    editForm.value = { ...res };
  });

  const initBaseInfo = () => {
    editForm.value = {
      projectId: undefined,
      name: '', // 姓名
      personType: 1, // 1 成年人 2 未成年人
      phone: '', // 手机号
      identityNo: '', // 身份证号
      remark: '', // 备注
      sourceType: undefined, // 会员来源
      labelIds: [], // 会员标签
      gender: undefined, // 性别
      birthDay: '', // 生日
      height: undefined, // 身高
      weight: undefined, // 体重
      fitnessLevel: undefined, // 健身等级
      fitnessGoal: '' // 健身目标
    };
  };
  // 照相--相关
  const cameraVisible = ref(false);
  function goTakePhoto() {
    if (Boolean(editForm.value.avatarUrl)) return;
    cameraVisible.value = true;
  }
  function onTakePhotoSuccess(pic: string) {
    editForm.value.avatarUrl = pic;
  }
  const uploadImgs = ref<any>([]);
  watch(
    () => uploadImgs.value,
    (val: any) => {
      console.log(val, 66);
      if (val.length > 0 && !val?.[0]?.url.includes('https:')) {
        return false;
      }
      editForm.value.avatarUrl = val?.[0]?.url;
    },
    {
      deep: true
    }
  );
  const onClearImg = () => {
    uploadImgs.value = [];
  };

  // const isEdit = ref(false);
  // const onEdit = () => {
  //   isEdit.value = true;
  // };
  const onCancel = () => {
    Modal.open({
      title: '取消确认',
      content: '取消后不保存本次编辑内容，是否取消？',
      onOk: () => {
        visible.value = false;
      }
    });
  };
  const onSubmit = async () => {
    console.log(editForm.value, '提交信息');
    const res1 = await formRef.value.validate();
    if (res1) return false;
    if (editForm.value.identityNo && !idCardValidate(editForm.value.identityNo))
      return Message.warning('身份证输入错误~');
    // const res2 = await iFormRef.value?.submit();
    if (!res1) {
      try {
        console.log(editForm.value, '提交信息');
        if (editForm.value.id) {
          editMember();
        } else {
          addMember();
        }
      } catch (e) {
      } finally {
      }
    }
  };
  const onProjectChange = (v: any) => {};

  // 新增
  const [addMember, loading] = useFuncProxy(async () => {
    await groundPcApiMemberAddPost(editForm.value);
    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });
  // 编辑
  const [editMember, editLoading] = useFuncProxy(async () => {
    await groundPcApiMemberEditPost(editForm.value);
    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });
  watch(
    () => props.modelValue,
    (v) => {
      if (v && props.rowId) {
        initEditInfo();
      }
      if (v && !props.rowId) {
        // 新增
        initBaseInfo();
      }
    }
  );

  onMounted(() => {
    getProjectOptions();
    getMemberLabelData();
  });
</script>

<style scoped lang="less">
  .member-model-box {
    :deep(.arco-input-wrapper) {
      background: #fff;
      border: 1px solid #dcdcdc;
      border-radius: 4px;
    }
    :deep(.arco-input-append) {
      border: 1px solid #dcdcdc;
      border-radius: 0 4px 4px 0;
    }
    :deep(.arco-input-prepend) {
      border-radius: 4px 0 0 4px;
      border: 1px solid #dcdcdc;
    }
    .slotInput {
      :deep(.arco-input-wrapper) {
        border-right: none !important;
        border-radius: 4px 0 0 4px !important;
      }
      :deep(.arco-input-append) {
        border-left: none !important;
      }
      :deep(.arco-input-prepend) {
        border: none !important;
      }
    }
    .nameInput {
      :deep(.arco-select) {
        border-radius: 0 4px 4px 0 !important;
        border: none !important;
        border-left: 1px solid #dcdcdc !important;
      }
    }
    .phoneInput {
      :deep(.arco-select) {
        border-radius: 4px 0 0 4px !important;
        border: none !important;
        border-right: 1px solid #dcdcdc !important;
      }
    }
    .fitnessGoal {
      margin-bottom: 0 !important;
    }

    .photo_title {
      font-size: 14px;
      color: #333333;
      line-height: 22px;
      margin-bottom: 8px;
    }

    .photo_left {
      margin-right: 16px;
      cursor: pointer;

      .faceBox {
        width: 230px;
        height: 230px;
        background: #e6e6e6;
        border-radius: 4px;
        display: flex;
        align-items: flex-end;
        position: relative;

        :deep(.arco-upload) {
          display: block !important;
        }

        :deep(.arco-upload-list-item) {
          display: none !important;
        }

        :deep(.arco-image-footer) {
          top: 10px !important;
          right: 0 !important;
          left: 180px !important;
          bottom: 200px !important;
          width: 50px !important;
          // background: none !important;

          .arco-image-footer-extra {
            padding-left: 0 !important;
          }
        }

        .bgImg {
          display: inline-block;
          width: 230px;
          height: 230px;
        }

        .btns {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 38px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 0px 0px 4px 4px;

          & > div {
            width: 50%;
            text-align: center;
            color: #fff;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .photo_btn {
            position: relative;
          }

          .photo_btn::after {
            content: '';
            display: inline-block;
            width: 1;
            height: 22px;
            border: 1px solid #ffffff;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
          }
        }
      }
    }

    .noDataBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 290px;

      & > img {
        display: inline-block;
        width: 162px;
        height: 120px;
        margin-bottom: 16px;
      }

      & > span {
        font-size: 14px;
        color: #333333;
      }
    }

    .title {
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 24px;
      margin-bottom: 16px;
    }

    :deep(.equipment_form) {
      .card {
        margin-bottom: 0 !important;
        padding: 0 !important;
      }
    }
  }
</style>
