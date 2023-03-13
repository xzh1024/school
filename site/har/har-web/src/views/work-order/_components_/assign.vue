<template>
  <a-modal
    v-model:visible="visible"
    title="指派"
    title-align="start"
    :ok-loading="loading"
    :on-before-ok="handleBeforeOk"
    @cancel="handleCancel"
  >
    <i-form ref="formRef" v-model="form" :options="formProps">
      <template #nodeForm>
        <a-input
          v-model="props!.nodeName"
          style="width: 100%"
          placeholder=""
          disabled
        ></a-input>
      </template>
    </i-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, Ref, computed } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import IForm from '@/components/i-form/index.vue';
  import {
    cbdApiProjectEstateWorkOrderRecordAssignPut,
    cbdApiProjectCommonUserSelectListGet
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
    cbdApiProjectEstateWorkOrderRecordAssignPut,
    {
      manual: true,
      onSuccess: () => {
        Message.success('指派成功!');
        formRef.value?.resetFields();
        visible.value = false;
        emits('finish');
      }
    }
  );

  type OptionModel = { label?: String; value?: String };
  const userList = ref<OptionModel[]>([]);
  const { run: getUserSelectList } = useRequest(
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

  const handleBeforeOk = async (): Promise<boolean> => {
    console.log(formRef.value?.submit());
    const field = await formRef.value?.submit();
    console.log(field);
    if (!field) {
      onSubmit({
        ...form.value,
        id: Number(props.id)
      });
    }
    return false;
  };

  const handleCancel = () => {
    formRef.value?.resetFields();
  };

  interface Form {
    userCode: string; // 指派处理人
    remark: string;
  }
  const form = ref<Form>({
    userCode: '',
    remark: ''
  });
  const formProps: Ref = computed(() => {
    return {
      menuForm: false,
      columns: [
        {
          label: '业务节点',
          prop: 'node',
          span: 24
        },
        {
          label: '指派处理人',
          prop: 'userCode',
          type: 'select',
          span: 24,
          rules: [{ required: true, message: '指派处理人不能为空' }],
          dic: userList
        },
        {
          label: '备注',
          prop: 'remark',
          type: 'textarea',
          span: 24,
          options: {
            maxLength: 200,
            autoSize: true,
            showWordLimit: true
          }
        }
      ]
    };
  });

  const show = () => {
    visible.value = true;
    getUserSelectList({});
  };

  defineExpose({
    show
  });
</script>
