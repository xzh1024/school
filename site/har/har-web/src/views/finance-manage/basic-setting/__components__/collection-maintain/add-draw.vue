<template>
  <drawer
    v-model="visible"
    :title="
      drawerType === 1
        ? '添加收款账户'
        : drawerType === 2
        ? '编辑收款账户'
        : '查阅收款账户'
    "
    :show-log="drawerType === 3"
    :log-options="{
      logUrl: cbdApiProjectSysOptPageOptListPost,
      modeId: props.id,
      mode: 'cbd_collection_account'
    }"
    :options="{
      unmountOnClose: true,
      escToClose: false,
      closable: false,
      maskClosable: false,
      okText: '保存',
      cancelText: '取消'
    }"
    :width="800"
    @before="onSubmit"
  >
    <div class="drawer-box">
      <i-form ref="addForm" v-model="editForm" :options="options">
        <template #expenseTypeListForm>
          <div style="width: 100%">
            <a-row>
              <a-col :span="4" class="fee-title">费用类型</a-col>
              <a-col :span="20" class="fee-title">费用项目</a-col>
            </a-row>
            <div
              v-for="(item, idx) in editForm.expenseTypeList"
              :key="idx"
              class="each-box flex"
            >
              <a-tag
                v-if="item.children && item.children.length"
                class="type-box"
                :class="handleColor(item, true)"
                :color="handleColor(item)"
              >
                <a-checkbox
                  v-model="item.isChecked"
                  :value="item.expenseId"
                  :disabled="!item.children?.length || isView"
                  @change="onChange(item, idx)"
                  >{{ item.expenseKey }}
                </a-checkbox>
              </a-tag>
              <a-divider
                v-if="item.children && item.children.length"
                style="height: 50px"
                direction="vertical"
              />
              <div v-if="item.children && item.children.length" class="wrapper">
                <a-checkbox-group
                  v-model="item['expenseTypeId']"
                  :disabled="isView"
                  direction="horizontal"
                  @change="onChildChange(item)"
                >
                  <a-tag
                    v-for="each in item.children"
                    :key="each.expenseId"
                    class="fee-item"
                    :class="handleChildColor(item, each, true)"
                    :color="handleChildColor(item, each)"
                  >
                    <a-checkbox :value="each.expenseId">{{
                      each.expenseType
                    }}</a-checkbox>
                  </a-tag>
                </a-checkbox-group>
              </div>
            </div>
          </div>
        </template>
      </i-form>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import { computed, onMounted, ref, Ref, watch } from 'vue';
  import {
    cbdApiProjectCommonMisTreeExpenseGet,
    type CbdApiProjectCommonMisTreeExpenseGetResponse,
    cbdApiProjectMisCollectionInfoGet,
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectMisCollectionSavePost
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  type EachPayment = CbdApiProjectCommonMisTreeExpenseGetResponse[0];
  type ParamItem = {
    expenseKey?: string;
    expenseId?: number;
    expenseTypeId?: number[];
  };
  interface TempItem extends ParamItem {
    isChecked: boolean;
  }
  const addForm: Ref = ref(null);
  const emits = defineEmits([
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
    drawerType: {
      type: Number
    },
    projectId: {
      type: Number
    },
    id: {
      type: String,
      default: ''
    }
  });
  type dataSource = {
    isChecked: boolean;
    expenseKey: string;
    expenseId: number;
    expenseTypeId: number[];
    children: any[];
  };
  type EditForm = {
    switchs: boolean;
    accountName: string;
    backName: string;
    backAccount: string;
    expenseTypeList: dataSource[];
  };
  const editForm = ref<EditForm>({
    switchs: true,
    accountName: '',
    backName: '',
    backAccount: '',
    expenseTypeList: []
  });
  const isView = props.drawerType === 3;
  const options = computed<Recordable>(() => {
    return {
      menuForm: false,
      layout: 'vertical',
      columns: [
        {
          label: '是否启用',
          type: 'switch',
          prop: 'switchs',
          span: 24,
          options: {
            disabled: isView
          }
        },
        {
          label: '编号',
          prop: 'code',
          span: 6,
          options: {
            disabled: true,
            placeholder: '系统自动生成'
          }
        },
        {
          label: '账户名称',
          prop: 'accountName',
          span: 6,
          options: {
            disabled: isView || isUse.value,
            maxLength: 20
          },
          rules: [{ required: true, message: '账户名称不能为空' }]
        },
        {
          label: '银行',
          prop: 'backName',
          span: 6,
          options: {
            disabled: isView || isUse.value,
            maxLength: 20,
            onChange: () => {
              editForm.value.backAccount = '';
            }
          },
          rules: [{ required: true, message: '账户名称不能为空' }]
        },
        {
          label: '账户号',
          prop: 'backAccount',
          span: 6,
          options: {
            disabled: isView || isUse.value,
            maxLength: 30
          },
          rules: [
            { required: true, message: '账户号不能为空' },
            { match: /^\d+$/, message: '只能输入正整数' },
            { minLength: 11, message: '账户号不能少于11位' },
            { maxLength: 30, message: '账户号不能超过30位' }
          ]
        },
        {
          label: '联系方式',
          prop: 'contact',
          span: 6,
          options: {
            disabled: isView,
            maxLength: 11
          },
          rules: [
            { match: /^\d+$/, message: '只能输入正整数' },
            { length: 11, message: '只能输入11位数字' }
          ]
        },
        {
          label: '对应费用项目',
          prop: 'expenseTypeList',
          span: 24,
          options: {
            disabled: isView
          },
          rules: [
            {
              required: true,
              message: '对应费用项目不能为空'
            },
            {
              validator: async (value: TempItem[], callback: any) => {
                try {
                  const tempSelected: TempItem[] = value.filter(
                    (el: TempItem) => el.isChecked
                  );
                  if (!tempSelected.length) {
                    callback('费用类型不能为空');
                  }
                  const isAnySelected: boolean = tempSelected.some(
                    (el: TempItem) => el.expenseTypeId?.length
                  );
                  if (!isAnySelected) {
                    callback('对应费用项目不能为空');
                  }
                } catch (e: any) {
                  callback(e.msg);
                }
              }
            }
          ]
        },
        {
          label: '描述',
          prop: 'remark',
          type: 'textarea',
          span: 24,
          options: {
            disabled: isView,
            maxLength: 200,
            showWordLimit: true
          }
        }
      ]
    };
  });
  const [CommonMisTree] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonMisTreeExpenseGet({
      parentExpenseCode: '0',
      projectId: String(props.projectId || '')
    });
    editForm.value.expenseTypeList = res.map((el: EachPayment) => {
      return {
        isChecked: false,
        expenseKey: el.expenseType,
        expenseId: el.expenseId!,
        expenseTypeId: [],
        children: el.children || []
      };
    });
  });
  const isUse = ref(false);
  const [getDetailData] = useFuncProxy(async () => {
    const res = await cbdApiProjectMisCollectionInfoGet({
      id: props.id
    });
    isUse.value = res.isUse === 1;
    const { expenseTypeList = [], ...other } = res;
    const target: dataSource[] = editForm.value.expenseTypeList;
    target.forEach((el: dataSource) => {
      res.expenseTypeList!.forEach((each: ParamItem) => {
        if (each.expenseId === el.expenseId) {
          el.isChecked = true;
          el.expenseTypeId = each.expenseTypeId || [];
        }
      });
    });
    editForm.value = {
      ...other,
      switchs: res.switchs === 1,
      expenseTypeList: target
    } as EditForm;
    console.log(editForm.value.expenseTypeList);
  });
  const visible = computed({
    get() {
      return props.drawerVisible;
    },
    set(data) {
      emits('update:drawerVisible', data);
    }
  });
  const handleColor = (item: dataSource, isText?: boolean) => {
    const typeArr: number[] = [];
    editForm.value.expenseTypeList.forEach((each: dataSource) => {
      if (each.isChecked) {
        typeArr.push(each.expenseId);
      }
    });
    if (typeArr.includes(item.expenseId)) {
      return isText ? 'white-text' : '#4C8AF7';
    } else {
      return isText ? '' : '#F7F7F7';
    }
  };
  const handleChildColor = (item: dataSource, child: any, isText?: boolean) => {
    const typeArr: number[] = [];
    editForm.value.expenseTypeList.forEach((each: dataSource) => {
      // if (each.isChecked) {
      typeArr.push(...each.expenseTypeId);
      // }
    });
    if (typeArr.includes(child.expenseId)) {
      return isText ? 'white-text' : '#4C8AF7';
    } else {
      return isText ? '' : '#F7F7F7';
    }
  };
  const onChange = (record: any, idx: number) => {
    if (record.isChecked) {
      editForm.value.expenseTypeList[idx].expenseTypeId = record.children.map(
        (el: any) => el.expenseId
      );
    } else {
      editForm.value.expenseTypeList[idx].expenseTypeId = [];
    }
  };
  const onChildChange = (v: any) => {
    editForm.value.expenseTypeList.forEach((each: dataSource) => {
      if (each.expenseId === v.expenseId) {
        each.isChecked = true;
      }
    });
  };
  const onSubmit = async () => {
    const res = await addForm.value.submit();
    try {
      if (!res) {
        const { expenseTypeList = [] } = editForm.value;
        const temp: ParamItem[] = expenseTypeList
          .filter((el: dataSource) => el.isChecked)
          .map((el: dataSource) => {
            return {
              expenseKey: el.expenseKey,
              expenseId: el.expenseId,
              expenseTypeId: el.expenseTypeId
            };
          });
        await cbdApiProjectMisCollectionSavePost({
          ...editForm.value,
          accountName: editForm.value.accountName.trim(),
          backName: editForm.value.backName.trim(),
          backAccount: editForm.value.backAccount.trim(),
          expenseTypeList: temp,
          projectId: props.projectId,
          switchs: editForm.value.switchs ? 1 : 0
        });
        Message.success({
          content: '操作成功'
        });
        visible.value = false;
        emits('submitSuccess');
      }
    } catch (e) {}
  };
  onMounted(async () => {
    await CommonMisTree();
    if (props.id) {
      getDetailData();
    }
  });

  watch(
    () => visible.value,
    (val) => {}
  );
</script>

<style scoped lang="less">
  ::-webkit-scrollbar-track {
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #dddddd;
  }
  :deep(.arco-checkbox-disabled) {
    .arco-checkbox-label {
      color: #666666;
    }
  }
  .white-text {
    :deep(.arco-checkbox-label) {
      color: #ffffff;
    }
  }
  .drawer-box {
    width: 100%;
    background-color: #fff;
    padding: 16px;
    .fee-title {
      color: #666666;
      text-align: center;
    }
    .each-box {
      width: 100%;
      border-bottom: 1px solid #cccccc;
      .wrapper {
        display: inline-block;
        width: 80%;
        padding-top: 12px;
        white-space: nowrap;
        overflow-x: scroll;
      }
      .type-box {
        display: inline-block;
        width: 100px;
        padding: 2px 0;
        height: 30px;
        margin: 10px 0;
        border-radius: 5px;
        border-right: 1px dashed #cccccc;
      }
      .fee-item {
        display: inline-block;
        padding: 2px 0;
        margin: 0 10px;
        border-radius: 5px;
        height: 30px;
      }
    }
  }
</style>
