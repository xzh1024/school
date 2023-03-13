<template>
  <drawer
    v-model="visible"
    :options="{
      ...options,
      okLoading: isLoading,
      escToClose: false,
      maskClosable: false
    }"
    :title="!!id ? '修改渠道信息' : '新增渠道信息'"
    @before="onBeforeUpdate"
  >
    <i-form ref="iForm" v-model="editForm" :options="formProps">
      <template #tableListForm>
        <i-table :options="tableProps" :data="others">
          <template #header>
            <div class="flex justify-between">
              <div style="padding: 0 0 16px 0; font-size: 18px; color: #333333"
                >其他人员</div
              >
              <a-button
                v-permission="['invest:channel:add:user']"
                type="primary"
                @click="onAddPerson"
                >添加</a-button
              >
            </div>
          </template>
          <template #menu="data">
            <a-popconfirm content="确认删除该信息吗?" @ok="onDelete(data)">
              <a-button type="text" status="danger">删除</a-button>
            </a-popconfirm>
          </template>
        </i-table>
      </template>
      <template #line1Form>
        <div class="split-bg"></div>
      </template>
      <template #line2Form>
        <div class="split-bg"></div>
      </template>
    </i-form>
    <modal-form
      v-bind="addStaffForm"
      v-model:visible="addStaffForm.visible"
      :mask-closable="false"
      :closable="false"
      @register="resetRegister"
      @submit="onSubmit"
    >
    </modal-form>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, Ref } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import type { EditForm, OtherItem } from './add';
  import {
    ModalForm,
    type ModalFormProps,
    useModalForm
  } from '@/components/IForm';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    type CbdApiProjectCommonProjectSelectListGetResponse,
    cbdApiProjectInvestChannelInfoIdGet,
    cbdApiProjectInvestChannelSavePost,
    cbdApiProjectInvestChannelUpdatePost,
    CbdApiProjectInvestChannelSavePostRequest,
    CbdApiProjectInvestChannelUpdatePostRequest
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import { channelTypeList } from '@/utils/dic';
  import { getActiveProjectId } from '@/utils';

  const [resetRegister] = useModalForm<ModalFormProps>();
  const isLoading = ref(false);
  const iForm: Ref = ref(null);
  const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: undefined
    },
    options: {
      type: Object,
      default: () => {}
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const tableProps = ref<Recordable>({
    tableCard: false,
    indexTitle: '序号',
    index: true,
    pageShow: false,
    columns: [
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '电话',
        prop: 'phone'
      },
      {
        label: '职务',
        prop: 'post'
      }
    ]
  });
  const addStaffForm = ref({
    visible: false,
    title: '添加谈判人员',
    submitLoading: false,
    schemas: [
      {
        label: '姓名',
        field: 'name',
        componentProps: {
          maxLength: 18
        },
        rules: [
          { required: true, message: '姓名不能为空' },
          { maxLength: 18, message: '最多输入18个字符' }
        ]
      },
      {
        label: '电话',
        field: 'phone',
        componentProps: {
          maxLength: 50
        },
        rules: [
          { required: true, message: '电话不能为空' },
          { match: /^[0-9]+/, message: '只能输入数字' }
        ]
      },
      {
        label: '职务',
        field: 'post',
        componentProps: {
          maxLength: 100
        },
        rules: [{ required: true, message: '职务不能为空' }]
      }
    ]
  });
  const formProps = ref({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '基本信息',
        prop: 'basicInfo',
        type: 'groupTitle'
      },
      {
        label: '归属项目：',
        prop: 'projectId',
        type: 'select',
        dic: projectList,
        options: {
          allowSearch: true
        },
        rules: [{ required: true, message: '归属项目不能为空' }]
      },
      {
        label: '编号：',
        prop: 'code',
        options: {
          disabled: true,
          placeholder: '系统自动生成'
        }
      },
      {
        label: '渠道类型：',
        type: 'select',
        prop: 'type',
        dic: channelTypeList,
        rules: [{ required: true, message: '渠道类型不能为空' }]
      },
      {
        label: '渠道名称：',
        prop: 'name',
        options: {
          maxLength: 100
        },
        rules: [{ required: true, message: '渠道名称不能为空' }]
      },
      {
        label: '办公地址：',
        prop: 'address',
        rules: [
          { required: true, message: '办公地址不能为空' },
          { maxLength: 20 }
        ]
      },
      {
        label: '主要负责人姓名：',
        prop: 'principalName',
        options: {
          maxLength: 100
        },
        rules: [{ required: true, message: '主要负责人姓名不能为空' }]
      },
      {
        label: '主要负责人职位：',
        prop: 'principalPost',
        options: {
          maxLength: 50
        },
        rules: [{ required: true, message: '主要负责人职位不能为空' }]
      },
      {
        label: '主要负责人联系方式：',
        prop: 'principalPhone',
        options: {
          maxLength: 30
        },
        rules: [
          { required: true, message: '主要负责人联系方式不能为空' },
          { maxLength: 30, message: '最多输入30个字符' },
          { match: /^[0-9]+/, message: '只能输入数字' }
        ]
      },
      {
        prop: 'line1',
        type: 'groupTitle'
      },
      {
        prop: 'tableList',
        type: 'groupTitle'
      },
      {
        prop: 'line2',
        type: 'groupTitle'
      },
      {
        label: '附件信息',
        type: 'groupTitle'
      },
      {
        prop: 'attachmentPic',
        type: 'customUpload',
        span: 24,
        limit: 1,
        options: {
          urlKey: 'previewAddress'
        }
      }
    ]
  });
  const editForm = ref<EditForm>({
    id: undefined,
    projectId: undefined,
    code: '',
    type: undefined,
    name: '',
    address: '',
    principalName: '',
    principalPost: '',
    principalPhone: '',
    attachment: '',
    attachmentPic: []
  });
  const others = ref<OtherItem[]>([]);
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
  });
  const [initEditInfo] = useFuncProxy(async () => {
    const res = await cbdApiProjectInvestChannelInfoIdGet({
      id: String(props.id)
    });
    editForm.value = res.baseInfo as EditForm;
    editForm.value.attachmentPic = res.baseInfo!.attachmentPic!;
    others.value = res.channelMemberInfoList as OtherItem[];
  });
  const onBeforeUpdate = async () => {
    const res = await iForm.value?.submit();
    if (!res) {
      const { attachmentPic = [] } = editForm.value;
      const picCodeTempList = attachmentPic.map((i: any) => i.key || i.id);
      // todo 先写死自动生成的 code
      const p = {
        ...editForm.value,
        attachment: picCodeTempList || [],
        channelMemberInfoList: others.value,
        id: props.id,
        code: `${Date.now()}`
      };
      try {
        isLoading.value = true;
        if (!props.id) {
          await cbdApiProjectInvestChannelSavePost(
            p as CbdApiProjectInvestChannelSavePostRequest
          );
        } else {
          await cbdApiProjectInvestChannelUpdatePost(
            p as CbdApiProjectInvestChannelUpdatePostRequest
          );
        }
        Message.success('保存成功');
        emits('refresh');
        visible.value = false;
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    }
  };
  // 点击添加按钮
  const onAddPerson = () => {
    addStaffForm.value.visible = true;
  };
  // 暂存添加人员信息
  async function onSubmit(data: OtherItem) {
    try {
      others.value.push(data);
      addStaffForm.value.visible = false;
    } catch (e) {}
  }
  function onDelete(e: Recordable) {
    others.value.splice(e.rowIndex, 1);
  }
  onMounted(async () => {
    getProjectList();
    if (props.id) {
      initEditInfo();
    } else {
      editForm.value.projectId = getActiveProjectId();
    }
  });
</script>
<style scoped lang="less"></style>
