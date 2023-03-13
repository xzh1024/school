<template>
  <div>
    <i-table
      v-model="search"
      v-model:refresh-now="doRefresh"
      :options="options"
      :api="cbdApiProjectResourceMerchantPageGet"
    >
      <template #header>
        <a-space>
          <a-button class="i-btn" type="primary" @click="onCreateMerchant"
            >添加</a-button
          >
          <a-button class="i-btn" type="primary" @click="onExport"
            >批量导入</a-button
          ></a-space
        >
      </template>
      <template #statusCell="{ record }">
        {{ statusName(record.status) }}
      </template>
      <template #typeCell="{ record }">
        {{ typeName(record.type) }}
      </template>
      <template #menu="{ record }">
        <a-space>
          <div class="t-btn" @click="onEdit(record.id)">编辑</div>
          <div class="t-btn" @click="onSee(record.id)">查看</div>
          <div
            v-if="record.status === 1"
            class="t-btn"
            @click="onDel(record.id)"
            >删除</div
          >
        </a-space>
      </template>
    </i-table>

    <create-merchant
      v-model:drawer-visible="drawerVisible"
      v-model:form-data="formData"
      :form-data-id="formDataId"
      :project-list="projectList"
      :merchant-type="merchant_type"
      @confirm-submit="onConfirm"
      @on-close="submitClose"
    />

    <i-export
      v-model:drawer-visible="exportVisible"
      :export-type="3"
      @confirm-success="onConfirmSuccess"
    />

    <merchant-info
      :id="detailId"
      v-model:drawer-visible="infoVisible"
      :form-data="formData"
      @on-close="onClose"
      @on-update="onEdit"
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
  import {
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectResourceMerchantPageGet,
    cbdApiProjectResourceMerchantSavePost,
    cbdApiProjectResourceMerchantInfoIdGet,
    cbdApiProjectResourceMerchantUpdatePost,
    cbdApiProjectResourceMerchantDeleteIdGet
  } from '@/api';
  import {
    merchant_status,
    merchant_type
  } from '@/config/resource_manage_status';
  import CreateMerchant from '@/views/resource-manage/_component_/create-merchant.vue';
  import { Message } from '@arco-design/web-vue';
  import MerchantInfo from '@/views/resource-manage/_component_/merchant-info.vue';
  import IExport from '@/views/resource-manage/_component_/i-export.vue';

  onMounted(() => {
    getProjectList();
  });

  const detailId = ref('');
  const exportVisible = ref(false);
  const onExport = () => {
    exportVisible.value = true;
  };

  //批量导入成功
  const onConfirmSuccess = () => {
    doRefresh.value = true;
  };

  const projectList: any = ref([]);
  const getProjectList = async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
  };

  const formData: any = reactive({
    projectId: '',
    code: '',
    type: '',
    name: '',
    shortName: '',
    companyName: '',
    legalPerson: '',
    idNumber: '',
    businessLicenseNumber: '',
    bank: '',
    bankAccountName: '',
    bankAccount: '',
    linkman: '',
    linkTel: '',
    address: '',
    attachment: [],
    remark: ''
  });

  const drawerVisible = ref(false);
  const onCreateMerchant = () => {
    drawerVisible.value = true;
  };

  const delVisible = ref(false);
  const recordId = ref('');
  const onDel = (id: string) => {
    delVisible.value = true;
    recordId.value = id;
  };
  const confirmOk = async () => {
    try {
      await cbdApiProjectResourceMerchantDeleteIdGet({
        id: recordId.value
      });
      Message.success({
        content: '删除成功'
      });
      delVisible.value = false;
      recordId.value = '';
      doRefresh.value = true;
    } catch (e) {
      console.error(e);
    }
  };

  const formDataId = ref('');
  const onEdit = (id: string) => {
    console.log(id, '----*----');
    getDetailInfoById(id);
    drawerVisible.value = true;
  };

  const infoVisible = ref(false);
  const onSee = (id: string) => {
    detailId.value = id + '';
    getDetailInfoById(id);
    infoVisible.value = true;
  };
  const onClose = () => {
    formDataId.value = '';
    const keys = Object.keys(formData);
    const obj: { [name: string]: string } = {};
    keys.forEach((item) => {
      obj[item] = '';
    });
    Object.assign(formData, obj);
  };

  const onConfirm = async (formData: any) => {
    if (formData.confirmType === 1) {
      await onUpdate(formData);
    } else if (formData.confirmType === 2) {
      await onAdd(formData);
    }
  };
  const submitClose = () => {
    formDataId.value = '';
  };

  const doRefresh = ref(false);
  const onAdd = async (formData: any) => {
    try {
      await cbdApiProjectResourceMerchantSavePost({
        ...formData
      });
      Message.success({
        content: '新增成功'
      });
      drawerVisible.value = false;
      doRefresh.value = true;
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdate = async (formData: any) => {
    try {
      await cbdApiProjectResourceMerchantUpdatePost({
        ...formData
      });
      Message.success({
        content: '修改成功'
      });
      drawerVisible.value = false;
      formDataId.value = '';
      doRefresh.value = true;
    } catch (e) {
      console.error(e);
    }
  };

  const getDetailInfoById = async (id: string) => {
    try {
      const { baseInfo } = await cbdApiProjectResourceMerchantInfoIdGet({
        id: String(id)
      });
      formDataId.value = String(baseInfo?.id);
      formData.projectId = baseInfo?.projectId;
      formData.projectName = baseInfo?.projectName;
      formData.code = String(baseInfo?.code);
      formData.type = baseInfo?.type;
      formData.name = baseInfo?.name;
      formData.shortName = baseInfo?.shortName;
      formData.companyName = baseInfo?.companyName;
      formData.legalPerson = baseInfo?.legalPerson;
      formData.idNumber = String(baseInfo?.idNumber);
      formData.businessLicenseNumber = String(baseInfo?.businessLicenseNumber);
      formData.bank = baseInfo?.bank;
      formData.bankAccountName = baseInfo?.bankAccountName;
      formData.bankAccount = String(baseInfo?.bankAccount);
      formData.linkman = baseInfo?.linkman;
      formData.linkTel = baseInfo?.linkTel;
      formData.address = baseInfo?.address;
      formData.attachment = baseInfo?.attachmentPic?.map((item) => {
        return {
          ...item,
          key: item.id
        };
      });
      formData.remark = baseInfo?.remark;
    } catch (e) {
      console.error(e);
    }
  };

  const search = ref({});
  const options = reactive({
    menuOtherOptions: {},
    menuOptions: {
      width: 150,
      align: 'left'
    },
    menuSpan: 24,
    pageShow: true,
    columns: [
      {
        label: '项目名称',
        prop: 'projectName',
        type: 'select',
        dic: projectList
      },
      {
        label: '项目名称',
        prop: 'projectIdList',
        search: true,
        hide: true,
        type: 'select',
        dic: projectList
      },
      {
        label: '编号',
        prop: 'code'
      },
      {
        label: '商户名称',
        prop: 'name',
        search: true,
        ellipsis: true,
        options: {
          maxLength: 200
        }
      },
      {
        label: '状态',
        prop: 'status',
        type: 'select',
        dic: merchant_status
      },
      {
        label: '状态',
        prop: 'statusList',
        search: true,
        hide: true,
        type: 'select',
        options: {
          multiple: true,
          maxTagCount: 1
        },
        dic: merchant_status
      },
      {
        label: '商户性质',
        prop: 'type',
        type: 'select',
        dic: merchant_type
      },
      {
        label: '商户性质',
        prop: 'typeList',
        search: true,
        hide: true,
        type: 'select',
        dic: merchant_type
      }
    ]
  });

  const statusName = computed(() => (val: number) => {
    return (
      merchant_status.find((item) => Number(item.value) === Number(val))
        ?.label || '--'
    );
  });

  const typeName = computed(() => (val: number) => {
    return merchant_type.find((item) => Number(item.value) === Number(val))
      ?.label;
  });
</script>

<style scoped lang="less">
  //.i-btn {
  //  min-width: 80px;
  //  height: 30px;
  //  border-radius: 4px;
  //}
  .t-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
</style>
