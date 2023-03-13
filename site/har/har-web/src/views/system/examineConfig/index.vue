<template>
  <div class="examineConfig">
    <i-table
      v-model:refresh-now="refresh"
      :options="options"
      :api="cbdApiProjectApprovalProcessListGet"
    >
      <template #updateTimeCell="{ record }">
        {{
          record.updateTime
            ? dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss')
            : '--'
        }}
      </template>
      <template #disableCell="{ record }">
        <a-switch
          v-model="record.disable"
          :checked-value="1"
          :unchecked-value="2"
          @change="disableChange(record.id, record.disable)"
        />
      </template>
      <template #menu="{ record }">
        <a-button
          v-if="record.modify"
          v-permission="['approvalProcess:update']"
          type="text"
          @click="update(record.approvalNo, record.id)"
          >修改</a-button
        >
        <a-button
          v-if="!record.modify"
          v-permission="['approvalProcess:update']"
          type="text"
          @click="toConfigure(record.id)"
          >配置</a-button
        >
        <a-button
          v-permission="['approvalProcess:list']"
          type="text"
          @click="view(record.approvalNo)"
          >查看</a-button
        >
        <a-button
          v-permission="['approvalProcess:list']"
          type="text"
          @click="logView(record.id)"
          >日志</a-button
        >
      </template>
    </i-table>
    <a-modal
      v-model:visible="modalVisible"
      :mask-closable="false"
      :closable="false"
      width="800px"
    >
      <template #title>
        <div v-if="modalType === 1">
          {{ `${modalTitle}审批流程` }}
        </div>
        <div v-if="modalType === 2">{{ modalTitle }}</div>
      </template>
      <a-form
        v-if="modalType === 1"
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        auto-label-width
        layout="vertical"
      >
        <a-row v-for="(item, index) in editForm.data" :key="index" :gutter="20">
          <a-divider orientation="left">{{
            `${numToString(index + 1)}级审批人`
          }}</a-divider>
          <a-col :span="7">
            <a-form-item
              :field="`data.${index}.departmentId`"
              label="所属部门"
              :rules="[{ required: true, message: '请选择所属部门' }]"
            >
              <a-select
                v-model="item.departmentId"
                placeholder="请选择所属部门"
                @change="chooseDepOrRole(index, item.roleId, item.departmentId)"
              >
                <a-option
                  v-for="single in departmentList"
                  :key="single.value"
                  :value="single.value"
                >
                  {{ single.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item
              :field="`data.${index}.roleId`"
              label="所属角色"
              :rules="[{ required: true, message: '请选择所属角色' }]"
            >
              <a-select
                v-model="item.roleId"
                placeholder="请选择所属角色"
                @change="chooseDepOrRole(index, item.roleId, item.departmentId)"
              >
                <a-option
                  v-for="single in roleList"
                  :key="single.value"
                  :value="single.value"
                >
                  {{ single.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item
              :field="`data.${index}.userId`"
              label="员工姓名"
              :rules="[{ required: true, message: '请选择员工姓名' }]"
            >
              <a-select
                v-model="item.userId"
                :placeholder="
                  !item.departmentId || !item.roleId
                    ? '请选择先选择所属部门和角色'
                    : '请选择员工'
                "
                :disabled="!item.departmentId || !item.roleId"
                @change="chooseUser(item.userId, index)"
              >
                <a-option
                  v-for="single in userList[index]"
                  :key="single.value"
                  :value="single.value"
                  :disabled="filterUserList.includes(single.value)"
                >
                  {{ single.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <!-- <a-button type="primary" shape="circle" @click="approverAdd">
              <icon-plus />
            </a-button> -->
            <a-button
              v-if="index !== 0"
              type="primary"
              shape="circle"
              @click="approverDelete(index)"
            >
              <icon-minus />
            </a-button>
          </a-col>
        </a-row>
        <div class="addBtn" @click="approverAdd">
          <a-button type="text" long>
            <template #icon>
              <icon-plus />
            </template>
            添加
          </a-button>
        </div>
      </a-form>
      <a-table
        v-else-if="modalType === 2"
        :columns="logColumns"
        :data="logTableData"
      >
        <template #updateTime="{ record }">
          {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #departmentName="{ record }">
          {{ record.departmentName || '--' }}
        </template>
      </a-table>
      <template #footer>
        <div v-if="modalType === 1">
          <a-button
            style="margin-right: 12px"
            @click="cancel($refs.editFormRef)"
            >取消</a-button
          >
          <a-button
            :loading="isLoading"
            type="primary"
            @click="confirm($refs.editFormRef)"
            >确定</a-button
          >
        </div>
        <div v-if="modalType === 2">
          <a-button @click="modalVisible = false">关闭</a-button>
        </div>
      </template>
    </a-modal>
    <a-drawer v-model:visible="drawerVisible" :width="800">
      <template #title>{{ `${drawerTitle}审批流程` }}</template>
      <div class="process">
        <div class="start"> 开始 </div>
        <div
          class="arco-timeline-item arco-timeline-item-vertical-left arco-timeline-item-label-same"
          style="min-height: 48px"
        >
          <div class="arco-timeline-item-dot-wrapper">
            <div
              class="arco-timeline-item-dot-line arco-timeline-item-dot-line-is-vertical"
              style="bottom: -5px; left: 3px; border-left-style: solid"
            ></div>
          </div>
        </div>
        <a-timeline>
          <a-timeline-item v-for="(item, index) in processInfo" :key="index">
            <div class="title">{{ `${numToString(item.sort)}级审批` }}</div>
            <a-tag size="large" class="tag">{{
              `${item.departmentName}-${item.roleName}-${item.userName}`
            }}</a-tag>
          </a-timeline-item>
        </a-timeline>
        <div
          class="arco-timeline-item arco-timeline-item-vertical-left arco-timeline-item-label-same"
          style="top: -80px"
        >
          <div class="arco-timeline-item-dot-wrapper">
            <div
              class="arco-timeline-item-dot-line arco-timeline-item-dot-line-is-vertical"
              style="bottom: -5px; left: 3px; border-left-style: solid"
            ></div>
          </div>
        </div>
        <div class="end"> 结束 </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, watch } from 'vue';
  import { numToString } from '@/utils';
  import { Modal, Message } from '@arco-design/web-vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    cbdApiProjectApprovalProcessListGet,
    cbdApiProjectApprovalProcessLogGet,
    cbdApiProjectCommonDeptSelectListGet,
    cbdApiProjectCommonRoleSelectListGet,
    cbdApiProjectCommonUserSelectListGet,
    cbdApiProjectApprovalProcessUpdatePost,
    cbdApiProjectApprovalProcessInfoApprovalNoGet,
    cbdApiProjectApprovalProcessDisablePost
  } from '@/api';
  import type { CbdApiProjectApprovalProcessListGetResponse } from '@/api';
  import dayjs from 'dayjs';
  type RowData =
    Required<CbdApiProjectApprovalProcessListGetResponse>['rows'][0];
  const userList = ref<Array<any>>([[]]);
  const roleList = ref<Array<any>>([]);
  const departmentList = ref<Array<any>>([]);
  const filterUserList = ref<Array<number>>([]);

  const getDepartMentList = () => {
    cbdApiProjectCommonDeptSelectListGet({
      levels: '3'
    }).then((res: any) => {
      departmentList.value = res;
    });
  };

  const getRoleList = () => {
    cbdApiProjectCommonRoleSelectListGet({}).then((res: any) => {
      roleList.value = res;
    });
  };

  const chooseUser = (userId: any, idx: number) => {
    filterUserList.value[idx] = userId;
  };

  const refresh = ref(false);
  const options: Recordable = ref({
    index: true,
    indexTitle: '序号',
    columns: [
      {
        label: '审批编号',
        prop: 'approvalNo'
      },
      {
        label: '业务名称',
        prop: 'approvalBusinessName'
      },
      {
        label: '操作人',
        prop: 'operator',
        formatter: (e: RowData) => e.operator || '--'
      },
      {
        label: '更新时间',
        prop: 'updateTime',
        formatter: (e: RowData) => e.operator || '--'
      },
      {
        label: '是否启用',
        prop: 'disable'
      }
    ]
  });

  const disableChange = (id: number, disable: number) => {
    cbdApiProjectApprovalProcessDisablePost({
      id,
      disable
    })
      .then(() => {
        Message.success('修改成功');
        refresh.value = true;
      })
      .catch(() => {});
  };

  const modalVisible = ref<boolean>(false);
  const modalTitle = ref<string>('');
  const modalType = ref<number>(1); // 1修改配置流程 2查看日志

  interface Approver {
    sort: number;
    departmentId?: number;
    roleId?: number;
    userId?: number;
  }

  interface EditForm {
    id?: number;
    data: Array<Approver>;
  }
  const editForm = ref<EditForm>({
    data: [
      {
        sort: 1,
        departmentId: undefined,
        roleId: undefined,
        userId: undefined
      }
    ],
    id: -1
  });

  const editRules = {
    departmentId: [
      { required: true, message: '请选择所属部门', trigger: 'blur' }
    ],
    roleId: [{ required: true, message: '请选择所属角色', trigger: 'blur' }],
    userId: [{ required: true, message: '请选择员工', trigger: 'blur' }]
  };

  const getUserList = async (
    idx: number,
    roleId: string | number | undefined,
    departmentId: string | number | undefined
  ) => {
    if (roleId && departmentId) {
      userList.value[idx] = await cbdApiProjectCommonUserSelectListGet({
        roleId: String(roleId),
        deptId: String(departmentId),
        fromType: '1'
      });
      console.log(userList.value[idx]);
    }
  };

  const chooseDepOrRole = async (
    idx: number,
    roleId: any,
    departmentId: any
  ) => {
    editForm.value.data[idx].userId = undefined;
    filterUserList.value.splice(idx, 1);
    await getUserList(idx, roleId, departmentId);
  };

  const approverAdd = () => {
    editForm.value.data.push({
      sort: editForm.value.data.length + 1,
      departmentId: undefined,
      roleId: undefined,
      userId: undefined
    });
    userList.value.push([]);
  };

  const approverDelete = (idx: number) => {
    Modal.warning({
      title: '删除审批人',
      content: '是否确认删除该审批人',
      hideCancel: false,
      maskClosable: false,
      escToClose: false,
      closable: false,
      async onOk() {
        editForm.value.data.splice(idx, 1);
        userList.value.splice(idx, 1);
        filterUserList.value.splice(idx, 1);
        Message.success('删除成功');
      }
    });
  };

  const toConfigure = (id: number) => {
    editForm.value.id = id;
    modalType.value = 1;
    modalTitle.value = '配置';
    modalVisible.value = true;
  };

  const isLoading = ref(false);
  const update = async (approvalNo: string, id: number) => {
    const res = await cbdApiProjectApprovalProcessInfoApprovalNoGet({
      approvalNo
    });
    const arr = [] as any;
    res.data!.forEach((item, index) => {
      getUserList(index, item.roleId, item.departmentId);
      arr.push({
        sort: item.sort,
        departmentId: item.departmentId,
        roleId: item.roleId,
        userId: item.userId
      });
      filterUserList.value[index] = item.userId!;
    });
    editForm.value.data = arr;
    editForm.value.id = id;
    modalType.value = 1;
    modalTitle.value = '修改';
    modalVisible.value = true;
  };
  watch(
    () => userList.value,
    (v) => {
      editForm.value.data.forEach((el: any, index: number) => {
        if (!isInList(el.departmentId, departmentList.value)) {
          el.departmentId = undefined;
        }
        if (!isInList(el.userId, v[index])) {
          el.userId = undefined;
        }
      });
    },
    { deep: true }
  );
  function isInList(v: number, list: number[]) {
    return list.map((e: any) => e.value).includes(v);
  }

  interface Data {
    sort: number;
    departmentId: number;
    roleId: number;
    userId: number;
  }

  const confirm = (el: any) => {
    el.validate(async (valid: boolean) => {
      if (!valid) {
        try {
          isLoading.value = true;
          await cbdApiProjectApprovalProcessUpdatePost({
            id: editForm.value.id as number,
            data: editForm.value.data as Array<Data>
          });
          Message.success(`${modalTitle.value}成功`);
          refresh.value = true;
          filterUserList.value = [];
          modalVisible.value = false;
        } catch (e) {
          console.log(e);
        } finally {
          isLoading.value = false;
        }
      }
    });
  };

  const cancel = (el: any) => {
    el.resetFields();
    filterUserList.value = [];
    modalVisible.value = false;
  };

  const drawerVisible = ref<boolean>(false);
  const drawerTitle = ref<string>('');
  const processInfo = ref<Array<any>>([]);

  const view = async (approvalNo: string) => {
    const res = await cbdApiProjectApprovalProcessInfoApprovalNoGet({
      approvalNo
    });
    const { data } = res;
    processInfo.value = data!;
    drawerVisible.value = true;
  };

  const logTableData = ref<Array<any>>([]);
  const logColumns = [
    {
      title: '更新时间',
      slotName: 'updateTime',
      width: 180
    },
    {
      title: '操作人',
      dataIndex: 'updateBy'
    },
    {
      title: '所属部门',
      dataIndex: 'departmentName',
      slotName: 'departmentName'
    },
    {
      title: '内容',
      dataIndex: 'content'
    }
  ];
  const logPage = reactive({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const logView = async (id: number) => {
    const res = await cbdApiProjectApprovalProcessLogGet({
      id: String(id),
      pageNum: String(logPage.current),
      pageSize: String(logPage.pageSize)
    });
    logTableData.value = res.rows!;
    logPage.total = res.total!;
    modalType.value = 2;
    modalTitle.value = '操作日志-合同审批流程';
    modalVisible.value = true;
  };

  onMounted(() => {
    getDepartMentList();
    getRoleList();
  });
</script>

<style scoped lang="less">
  .addBtn {
    display: flex;
    justify-content: center;
    width: 35%;
    border: 1px dashed #929292;
    border-radius: 5px;
    cursor: pointer;
  }

  .process {
    padding-left: 60px;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
  }

  .start {
    position: relative;
    bottom: -17px;
    left: -35px;
    width: 76px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #e7e9eb;
    border-radius: 16px;
  }

  .end {
    position: relative;
    bottom: 72px;
    left: -32px;
    width: 76px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #e7e9eb;
    border-radius: 16px;
  }
</style>
