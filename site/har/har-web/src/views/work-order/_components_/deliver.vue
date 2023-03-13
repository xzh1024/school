<template>
  <a-modal
    v-model:visible="visible"
    title="转交"
    title-align="start"
    :ok-loading="loading"
    :on-before-ok="handleBeforeOk"
    @cancel="onReset"
  >
    <a-form
      ref="formRef"
      :model="form"
      :label-col-props="{ span: 5 }"
      :wrapper-col-props="{ span: 19 }"
    >
      <a-form-item field="businessNode" label="业务节点">
        <a-input
          v-model="props!.nodeName"
          style="width: 100%"
          placeholder=""
          disabled
        ></a-input>
      </a-form-item>

      <a-form-item field="transferToDepartment" label="转交部门">
        <template #label>
          <div class="label-box">
            <a-radio v-model="form.type" value="dept"></a-radio>
            <div class="label-text">转交部门</div>
          </div>
        </template>
        <a-select v-model="form.dept" placeholder="请选择用户组">
          <a-option
            v-for="item in deptList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="designee" label="指定人">
        <template #label>
          <div class="label-box">
            <a-radio v-model="form.type" value="user"></a-radio>
            <div class="label-text">指定人</div>
          </div>
        </template>
        <a-select v-model="form.user" placeholder="请选择指定人员">
          <a-option
            v-for="(item, idx) in userList"
            :key="idx"
            :value="item.value"
          >
            {{ item.label }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="remark" label="备注">
        <a-textarea
          v-model="form.remark"
          placeholder=""
          allow-clear
          show-word-limit
          :max-length="200"
          :auto-size="{ minRows: 1, maxRows: 1 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import IForm from '@/components/i-form/index.vue';
  import {
    cbdApiProjectEstateWorkOrderRecordForwardPut,
    cbdApiProjectCommonUserSelectListGet,
    cbdApiProjectCommonDeptSelectListGet,
    CbdApiProjectCommonDeptSelectListGetResponse
  } from '@/api';
  const props = defineProps({
    id: {
      type: Number
    },
    nodeName: {
      type: String,
      default: ''
    }
  });

  const emits = defineEmits(['finish']);

  const visible = ref(false);

  const formRef = ref<InstanceType<typeof IForm> | null>(null);
  const { run: onSubmit, loading } = useRequest(
    cbdApiProjectEstateWorkOrderRecordForwardPut,
    {
      manual: true,
      onSuccess: () => {
        Message.success('转交成功!');
        visible.value = false;
        onReset();
        emits('finish');
      }
    }
  );

  type OptionModel = { label?: String; value?: String };
  const userList = ref<OptionModel[]>([]);
  const { run: getUserList } = useRequest(
    cbdApiProjectCommonUserSelectListGet,
    {
      manual: true,
      onSuccess: (res) => {
        userList.value = res.map((item) => {
          return {
            label: item.label,
            value: item.code
          };
        });
      }
    }
  );
  const deptList = ref<CbdApiProjectCommonDeptSelectListGetResponse>([]);
  const { run: getDeptList } = useRequest(
    cbdApiProjectCommonDeptSelectListGet,
    {
      manual: true,
      onSuccess: (res) => {
        deptList.value = res;
      }
    }
  );

  const handleBeforeOk = async (): Promise<boolean> => {
    const params = {
      id: Number(props.id),
      remark: form.value.remark,
      userCode: ''
    };
    if (form.value.type === 'dept') {
      params.userCode = form.value.dept;
    } else {
      params.userCode = form.value.user;
    }
    onSubmit(params);
    return false;
  };

  const onReset = () => {
    form.value = {
      type: 'dept',
      dept: '',
      user: '',
      remark: ''
    };
  };

  interface Form {
    type: string;
    dept: string;
    user: string;
    remark: string;
  }
  const form = ref<Form>({
    type: 'dept',
    dept: '',
    user: '',
    remark: ''
  });

  const show = () => {
    visible.value = true;
    getUserList({});
    getDeptList({});
  };

  defineExpose({
    show
  });
</script>

<style lang="less" scoped>
  .label-box {
    display: flex;
    align-items: center;
    .label-text {
      margin-left: 5px;
    }
  }
</style>
