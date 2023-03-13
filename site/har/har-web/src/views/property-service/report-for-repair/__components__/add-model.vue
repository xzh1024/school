<template>
  <drawer
    v-model="visible"
    :title="`${title}维修单`"
    :footer="isEdit"
    @close="onClose"
  >
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
      <a-button @click="onClose">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit">
        确认
      </a-button>
    </template>
    <i-loading :loading="loading1" />
    <div class="white-detail-box">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        layout="vertical"
        :disabled="!isEdit"
      >
        <a-divider orientation="left">基本信息</a-divider>
        <a-row>
          <a-col :span="6">
            <a-form-item field="faultTypeId" label="故障类型">
              <a-select v-model="form.faultTypeId" placeholder="请选择故障类型">
                <a-option
                  v-for="item in options.faultTypeData"
                  :key="item.value"
                  :value="`${item.value}`"
                >
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="location" label="发生地点">
              <a-input v-model="form.location" placeholder="请输入发生地点" />
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="reporter" label="提报人">
              <a-select v-model="form.reporter" placeholder="请选择提报人">
                <a-option
                  v-for="item in options.userList"
                  :key="item.value"
                  :value="`${item.value}`"
                >
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="reportTime" label="报修时间">
              <a-date-picker
                v-model="form.reportTime"
                show-time
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="14" :offset="2">
            <a-form-item field="remark" label="备注">
              <a-textarea
                v-model="form.remark"
                placeholder="请输入备注"
                allow-clear
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">
          事件处理信息
          <a-button v-show="isEdit && handleInfoIsAdd" @click="addHandleInfo">
            <slot name="icon">
              <icon-plus-circle-fill />
            </slot>
            增加行
          </a-button>
        </a-divider>
        <template v-for="(item, index) in form.handleInfo" :key="index">
          <div>
            <div class="flex justify-between">
              <div>第{{ sectionToChinese(index + 1) }}次维修</div>
              <a-button
                v-show="handleInfoRowIsDisabled(index)"
                type="text"
                @click="removeHandleInfo(index)"
              >
                删除
              </a-button>
            </div>
            <a-row>
              <a-col :span="6">
                <a-form-item field="name" label="维修人">
                  <a-select
                    v-model="item.handler"
                    placeholder="请选择维修人"
                    :disabled="!handleInfoRowIsDisabled(index)"
                  >
                    <a-option
                      v-for="it in options.userList"
                      :key="it.value"
                      :value="it.value"
                    >
                      {{ it.label }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6" :offset="2">
                <a-form-item field="purposeId" label="维修时间">
                  <a-date-picker
                    v-model="item.handleTime"
                    show-time
                    style="width: 100%"
                    :disabled="!handleInfoRowIsDisabled(index)"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6" :offset="2">
                <a-form-item field="status" label="维修结果">
                  <a-select
                    v-model="item.status"
                    placeholder="请选择维修结果"
                    :disabled="!handleInfoRowIsDisabled(index)"
                  >
                    <a-option
                      v-for="it in repairData"
                      :key="it.value"
                      :value="it.value"
                    >
                      {{ it.label }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="chargeType" label="是否收费">
                  <a-select
                    v-model="item.chargeType"
                    placeholder="请选择是否收费"
                    :disabled="!handleInfoRowIsDisabled(index)"
                  >
                    <a-option
                      v-for="(it, idx) in ['否', '是']"
                      :key="it"
                      :value="idx"
                    >
                      {{ it }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-if="+item.chargeType === 1" :span="6" :offset="2">
                <a-form-item field="expense" label="收费金额">
                  <a-input-number
                    v-model="item.expense"
                    :disabled="!handleInfoRowIsDisabled(index)"
                    :min="0"
                    hide-button
                    placeholder="请输入收费金额"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6" :offset="2">
                <a-form-item field="remark" label="备注">
                  <a-textarea
                    v-model="item.remark"
                    placeholder="请输入备注"
                    allow-clear
                    style="width: 100%"
                    :disabled="!handleInfoRowIsDisabled(index)"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-form-item field="remark" label="现场照片">
                  <i-custom-upload
                    v-model="item.pics"
                    :disabled="!handleInfoRowIsDisabled(index)"
                    :options="{
                      // limit: 1,
                      listType: 'picture-card',
                      accept: 'image/*'
                    }"
                    url-key="previewAddress"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </template>
        <a-divider orientation="left">
          事件处理验收信息
          <a-button v-show="isEdit && checkInfoIsAdd" @click="addCheckInfo">
            <slot name="icon">
              <icon-plus-circle-fill />
            </slot>
            增加行
          </a-button>
        </a-divider>
        <template v-for="(item, index) in form.checkInfo" :key="index">
          <div>
            <div class="flex justify-between">
              <div>第{{ sectionToChinese(index + 1) }}次验收</div>
              <a-button
                v-show="checkInfoRowIsDisabled(index)"
                type="text"
                @click="removeCheckInfo(index)"
              >
                删除
              </a-button>
            </div>
            <a-row>
              <a-col :span="6">
                <a-form-item field="checker" label="验收人">
                  <a-select
                    v-model="item.checker"
                    placeholder="请选择验收人"
                    :disabled="!checkInfoRowIsDisabled(index)"
                  >
                    <a-option
                      v-for="it in options.userList"
                      :key="it.value"
                      :value="it.value"
                    >
                      {{ it.label }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6" :offset="2">
                <a-form-item field="checkTime" label="验收时间">
                  <a-date-picker
                    v-model="item.checkTime"
                    show-time
                    :disabled="!checkInfoRowIsDisabled(index)"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6" :offset="2">
                <a-form-item field="status" label="验收结果">
                  <a-select
                    v-model="item.status"
                    :disabled="!checkInfoRowIsDisabled(index)"
                    placeholder="请选择验收结果"
                  >
                    <a-option
                      v-for="it in checkData"
                      :key="it.value"
                      :value="it.value"
                    >
                      {{ it.label }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  field="remark"
                  :disabled="!checkInfoRowIsDisabled(index)"
                  label="备注"
                >
                  <a-textarea
                    v-model="item.remark"
                    placeholder="请输入备注"
                    allow-clear
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </template>
      </a-form>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, watch, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { sectionToChinese } from '@/utils';
  import {
    cbdApiProjectWorkOrderInfoUpdateInitIdGet,
    cbdApiProjectWorkOrderAddOrderPost,
    cbdApiProjectWorkOrderUpdateInfoPost
  } from '@/api';
  import type { FormType } from './type';
  const formRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      default: 'add',
      validator(value: string) {
        return ['add', 'edit', 'watch'].includes(value);
      }
    },
    options: {
      type: Object,
      default: () => ({})
    },
    rowId: {
      type: String,
      default: ''
    }
  });
  interface DicType {
    [key: string]: string;
  }
  const title = computed(() => {
    const dic: DicType = {
      add: '新增',
      edit: '编辑',
      watch: '查看'
    };
    return dic[props.source] || '';
  });
  const emits = defineEmits(['update:modelValue', 'reset', 'close']);
  const rules = {
    faultTypeId: [{ required: true, message: '请选择故障类型' }],
    location: [{ required: true, message: '请填写发生地点' }],
    reporter: [{ required: true, message: '请选择提报人' }],
    reportTime: [{ required: true, message: '请选择报修时间' }]
  };
  const form = ref<FormType>({
    faultTypeId: '',
    location: '',
    reporter: '',
    reportTime: '',
    remark: '',
    // 事件处理信息
    handleInfo: [],
    // 事件处理验收信息
    checkInfo: []
  });

  const baseHandleInfoItem = {
    handler: '',
    handleTime: '',
    status: '',
    chargeType: '',
    expense: 0,
    remark: '',
    pics: []
  };

  const baseCheckInfoItem = {
    checker: '',
    checkTime: '',
    status: '',
    remark: ''
  };

  const handleInfoLength = computed(() => {
    return form.value.handleInfo.length;
  });

  const checkDataLength = computed(() => {
    return form.value.checkInfo.length;
  });

  const latestHandleInfo = computed(() => {
    return form.value.handleInfo[handleInfoLength.value - 1];
  });

  const latestCheckInfo = computed(() => {
    return form.value.checkInfo[checkDataLength.value - 1];
  });
  // 维修结果为已维修次数
  const handledInfoLength = computed(() => {
    return form.value.handleInfo.filter((item) => +item.status === 1).length;
  });
  // 审核结果为不通过次数
  const checkedInfoLength = computed(() => {
    return form.value.checkInfo.filter((item) => +item.status === 0).length;
  });

  // 是否可新增事件处理信息
  const handleInfoIsAdd = computed(() => {
    if (!handleInfoLength.value) return true;
    // 最后一条维修结果为 延迟维修
    if (+latestHandleInfo.value?.status == 2) return true;
    // 维修结果为已维修
    if (+latestHandleInfo.value?.status === 1) {
      // if (!checkDataLength) return true;
      // console.log(handledInfoLength, checkedInfoLength);
      // 审核结果 为 不通过
      // @ts-ignore
      if (latestCheckInfo.value?.status === 0) {
        if (handledInfoLength.value === checkedInfoLength.value) return true;
      }
    }
    return false;
  });
  // 是否可新增验收信息
  const checkInfoIsAdd = computed(() => {
    // 最后一次审核结果为空或审核通过
    if (
      latestCheckInfo.value?.status === '' ||
      +latestCheckInfo.value?.status === 1
    )
      return false;
    if (checkedInfoLength.value < handledInfoLength.value) {
      if (+latestHandleInfo.value?.status === 1) {
        return true;
      }
    }

    return false;
  });

  // 处理信息是否可操作
  function handleInfoRowIsDisabled(index: number) {
    if (!isEdit.value) return false;
    if (index || checkDataLength.value) {
      if (index < handleInfoLength.value - 1) return false;
      if (
        latestHandleInfo.value?.status === '' ||
        +latestHandleInfo.value?.status === 2
      )
        return true;
      // 最后一次审核结果为空或审核通过
      if (
        latestCheckInfo.value?.status === '' ||
        +latestCheckInfo.value?.status === 1
      ) {
        return false;
      }
      if (checkedInfoLength.value === handledInfoLength.value) {
        return false;
      }
    }
    return index === handleInfoLength.value - 1;
  }

  // 验收信息是否可操作
  function checkInfoRowIsDisabled(index: number) {
    if (!isEdit.value) return false;
    if (index < checkDataLength.value - 1) return false;
    if (
      latestHandleInfo.value?.status === '' ||
      +latestHandleInfo.value?.status === 2
    )
      return false;
    if (checkedInfoLength.value < handledInfoLength.value) {
      if (
        latestCheckInfo.value?.status === '' ||
        +latestCheckInfo.value?.status === 1
      ) {
        return true;
      }
      return false;
    }
    return index === checkDataLength.value - 1;
  }

  // 新增事件处理信息
  function addHandleInfo() {
    form.value.handleInfo.push({
      ...baseHandleInfoItem
    });
  }

  // 删除事件处理信息
  function removeHandleInfo(index: number) {
    form.value.handleInfo.splice(index, 1);
  }
  // 新增事件处理验收信息
  function addCheckInfo() {
    form.value.checkInfo.push({
      ...baseCheckInfoItem
    });
  }
  // 删除事件处理验收信息
  function removeCheckInfo(index: number) {
    form.value.checkInfo.splice(index, 1);
  }

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      if (formRef.value) {
        formRef.value.resetFields();
        form.value.handleInfo = [];
        form.value.checkInfo = [];
      }
      emits('update:modelValue', v);
    }
  });

  const isEdit = computed(
    () => props.source === 'edit' || props.source === 'add'
  );
  // 维修结果
  const repairData = [
    { label: '已维修', value: 1 },
    { label: '延迟维修', value: 2 }
    // { label: '不可维修', value: 3 }
  ];
  // 验收结果
  const checkData = [
    { label: '不通过', value: 0 },
    { label: '通过', value: 1 }
  ];

  const [toAddOrder, loading] = useFuncProxy(async () => {
    const handleInfo = form.value.handleInfo.map((item) => {
      return {
        handler: item.handler,
        handleTime: item.handleTime,
        status: item.status,
        chargeType: item.chargeType,
        expense: item.expense,
        remark: item.remark,
        pics: item.pics?.map((it) => it.key)
      };
    });
    await cbdApiProjectWorkOrderAddOrderPost({
      faultTypeId: Number(form.value.faultTypeId),
      location: form.value.location,
      reporter: Number(form.value.reporter),
      reportTime: form.value.reportTime,
      remark: form.value.remark,
      // @ts-ignore
      handleInfos: handleInfo,
      // @ts-ignore
      checkInfos: form.value.checkInfo
    });
    Message.success('操作成功!');
    formRef.value.resetFields();
    visible.value = false;
    emits('reset');
  });
  const [toEditOrder] = useFuncProxy(async () => {
    const handleInfo = form.value.handleInfo.map((item) => {
      return {
        handler: item.handler,
        handleTime: item.handleTime,
        status: item.status,
        chargeType: item.chargeType,
        expense: item.expense,
        remark: item.remark,
        pics: item.pics?.map((it) => it.key || it.id)
      };
    });
    await cbdApiProjectWorkOrderUpdateInfoPost({
      id: Number(props.rowId),
      faultTypeId: Number(form.value.faultTypeId),
      location: form.value.location,
      reporter: Number(form.value.reporter),
      reportTime: form.value.reportTime,
      remark: form.value.remark,
      // @ts-ignore
      handleInfos: handleInfo,
      // @ts-ignore
      checkInfos: form.value.checkInfo
    });
    Message.success('操作成功!');
    formRef.value.resetFields();
    visible.value = false;
    emits('reset');
  });
  const onSubmit = () => {
    formRef.value.validate((value: any) => {
      if (!value) {
        if (props.source === 'add') {
          toAddOrder();
        } else {
          toEditOrder();
        }
      }
    });
  };

  function onClose() {
    visible.value = false;
    emits('close');
  }

  const [getDetail, loading1] = useFuncProxy(async () => {
    const res = await cbdApiProjectWorkOrderInfoUpdateInitIdGet({
      id: props.rowId
    });
    // @ts-ignore
    res.handleInfos.forEach((item) => {
      // @ts-ignore
      item.pics = item.picAttachments;
    });
    form.value = {
      faultTypeId: String(res.faultTypeId),
      location: res.location,
      reporter: String(res.reporter),
      reportTime: res.reportTime,
      remark: String(res.remark),
      // @ts-ignore
      handleInfo: res.handleInfos || [],
      // @ts-ignore
      checkInfo: res.checkInfos || []
    };
  });

  onMounted(() => {
    if (props.rowId) {
      getDetail();
    }
  });

  watch(
    () => props.rowId,
    () => {
      if (props.rowId) {
        getDetail();
      }
    }
  );
</script>

<style scoped lang="less">
  // .
</style>
