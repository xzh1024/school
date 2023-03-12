<template>
  <a-form
    :model="formData"
    :label-col-props="labelColProps"
    :wrapper-col-props="wrapperColProps"
  >
    <a-collapse v-show="isShow" :default-active-key="['0']" accordion>
      <a-collapse-item key="basic" header="基础信息">
        <!-- {{ data }} -->
        <a-form-item label="节点名称">
          {{ node?.attrs?.id }}
          <!-- <a-input :value="data?.attrs.id" disabled placeholder="节点名称" /> -->
        </a-form-item>
        <a-form-item label="节点事件">
          {{ formData?.nodeName }}
          <!-- <a-input
            :value="data?.preEl ? '发起' : '办理'"
            disabled
            placeholder="节点事件"
          /> -->
        </a-form-item>
      </a-collapse-item>
      <a-collapse-item
        v-if="applyScope === 2 && isStartElement(node?.type)"
        key="start"
        header="节点发起设置"
      >
        <a-form-item label="发起人">
          <!-- <a-button>选择发起人</a-button> -->
          <a-select
            v-model="formData.startNodeProcessor"
            multiple
            placeholder="发起人"
          >
            <a-option
              v-for="item in userOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-collapse-item>
      <a-collapse-item
        v-if="isTaskElement(node?.type)"
        key="handle"
        header="节点处理设置"
      >
        <!-- <a-form-item label="指派规则">
          <a-select v-model="formData.assignRule" placeholder="指派规则">
            <a-option :value="1">完成当前节点自动流转</a-option>
            <a-option :value="2">完成当前节点并指派</a-option>
          </a-select>
        </a-form-item> -->
        <a-form-item label="节点处理人">
          <!-- <a-form-item v-if="formData.assignRule === 1" label="节点处理人"> -->
          <!-- <a-select v-model="formData.processor" placeholder="处理人">
            <a-option
              v-for="item in userOptions"
              :key="item.value"
              :value="item.code"
            >
              {{ item.label }}
            </a-option>
          </a-select> -->
          <div>
            <a-button @click="openChange('processor')">选择处理人</a-button>
            <br />
            <div>{{ processorText }}</div>
          </div>
        </a-form-item>
        <!-- <a-form-item label="通知">
          <a-checkbox-group
            v-model="formData.assignMsgType"
            :options="messageData"
          />
        </a-form-item> -->
      </a-collapse-item>
      <template v-if="isTaskElement(node?.type)">
        <a-collapse-item key="time" header="节点时效设置">
          <a-form-item hide-label content-class="form-item">
            <div class="row">
              <a-checkbox
                v-model="formData.nodeAgingState"
                class="row-label"
                @change="onAgingStateChange"
              >
                时效要求
              </a-checkbox>
              <div class="row-content">
                <a-select
                  v-model="formData.nodeAging"
                  :disabled="!formData.nodeAgingState"
                  placeholder="时效要求"
                >
                  <a-option
                    v-for="item in dateOptions"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-option>
                </a-select>
              </div>
            </div>
          </a-form-item>
          <a-form-item hide-label>
            <div class="row">
              <a-checkbox
                v-model="formData.interimNoticeTimeState"
                class="row-label"
                :disabled="!formData.nodeAgingState"
              >
                临期通知
              </a-checkbox>
              <div class="row-content">
                <a-select
                  v-model="formData.interimNoticeTime"
                  :disabled="!formData.interimNoticeTimeState"
                  placeholder="临期通知"
                >
                  <a-option
                    v-for="item in dateOptions"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-option>
                </a-select>
              </div>
            </div>
          </a-form-item>
          <a-form-item hide-label>
            <div class="row">
              <a-checkbox
                v-model="formData.timeoutHandlerState"
                class="row-label"
                :disabled="!formData.nodeAgingState"
              >
                超时处理
              </a-checkbox>
              <div class="row-content">
                <a-radio-group
                  v-model="formData.timeoutHandler"
                  :disabled="!formData.timeoutHandlerState"
                  direction="vertical"
                >
                  <a-radio :value="1">提醒处理人</a-radio>
                  <a-radio :value="2">本节点自动完成</a-radio>
                  <a-radio :value="3">
                    <div class="row">
                      <span>委派他人</span>
                      <div class="row-content">
                        <a-select
                          v-model="formData.timeoutHandlerProcessor"
                          placeholder="委派人"
                          :disabled="
                            !formData.timeoutHandlerState ||
                            formData.timeoutHandler !== 3
                          "
                        >
                          <a-option
                            v-for="item in userOptions"
                            :key="item.value"
                            :value="item.value"
                          >
                            {{ item.label }}
                          </a-option>
                        </a-select>
                      </div>
                    </div>
                  </a-radio>
                </a-radio-group>
              </div>
            </div>
          </a-form-item>
        </a-collapse-item>
      </template>
    </a-collapse>
  </a-form>

  <a-modal v-model:visible="visible" width="450px">
    <div class="row" style="height: 600px">
      <a-space direction="vertical" fill style="width: 100%">
        <a-radio-group
          v-model="formData.processorType"
          type="button"
          :options="processorTypeData"
          @change="formData.processor = []"
        />
        <!-- <a-input-search v-model="searchKey" /> -->
        <a-tree-select
          v-model="formData.processor"
          :data="treeData"
          multiple
          allow-clear
          :field-names="{
            key: 'value',
            title: 'label'
          }"
        />
      </a-space>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import {
    computed,
    reactive,
    isReactive,
    onMounted,
    PropType,
    ref
  } from 'vue';
  import { isStartElement, isTaskElement } from './process-dic';
  import {
    cbdApiProjectCommonDeptSelectListGet,
    CbdApiProjectCommonDeptSelectListGetResponse,
    cbdApiProjectCommonRoleSelectListGet,
    CbdApiProjectCommonRoleSelectListGetResponse,
    cbdApiProjectCommonUserSelectListGet
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import type { TreeNodeData } from '@arco-design/web-vue';
  const props = defineProps({
    node: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => {}
    },
    data: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => {}
    },
    applyScope: {
      type: Number,
      default: 1
    }
  });

  interface ListItemType extends TreeNodeData {
    label: string;
    value: string | number;
  }

  const emits = defineEmits(['update:data']);

  const isShow = computed(() => {
    return isStartElement(props.node?.type) || isTaskElement(props.node?.type);
  });

  const formData = computed({
    get() {
      return isReactive(props.data) ? props.data : reactive(props.data);
    },
    set(v) {
      emits('update:data', v);
    }
  });

  const treeData = computed<ListItemType[]>(() => {
    const optionsMap = {
      // 按用户
      1: userOptions.value,
      // 按部门
      2: deptOptions.value,
      // 按角色
      3: roleOptions.value
    } as { [key: number]: ListItemType[] };
    return optionsMap[formData.value?.processorType || -1] || [];
  });
  const labelColProps = { span: 7 };

  const wrapperColProps = { span: 17 };

  const dateOptions = [
    { label: '5分钟', value: 5 },
    { label: '10分钟', value: 10 },
    { label: '30分钟', value: 30 },
    { label: '1小时', value: 60 }
  ];

  function onAgingStateChange(v: any) {
    formData.value.nodeAgingState = v;
    // console.log(v);
    if (!v) {
      formData.value.interimNoticeTimeState = false;
      formData.value.timeoutHandlerState = false;
    }
    // console.log(isReactive(formData.value));
  }

  // const timeOutOptions = [
  //   { label: '提醒处理人', value: '1' },
  //   { label: '本节点自动完成', value: '2' },
  //   { label: '委派他人', value: '3' }
  // ];

  // const messageData = [
  //   { label: '站内信', value: 1, disabled: true },
  //   { label: '短信', value: 2 }
  // ];
  const visible = ref(false);
  const currentChangeType = ref('');
  function openChange(key: string) {
    currentChangeType.value = key;
    visible.value = true;
  }
  const processorText = computed(() => {
    const arr = [] as string[];
    (formData.value?.processor || [])?.forEach((item: number) => {
      const findItem = treeData.value?.find(
        (it: ListItemType) => it.value === item
      );
      findItem && arr.push(findItem.label);
    });
    return arr.join(',');
  });

  const processorTypeData = [
    { label: '按用户', value: 1 },
    { label: '按部门', value: 2 },
    { label: '按角色', value: 3 }
  ];
  // 用户选择下拉
  const userOptions = ref<{ label: string; value: string }[]>([]);
  const [getUserOptions] = useFuncProxy(async () => {
    const d = await cbdApiProjectCommonUserSelectListGet({
      roleId: '',
      deptId: '',
      fromType: ''
    });
    userOptions.value = d.map((item) => {
      return {
        label: item.label || '',
        value: item.code || ''
      };
    });
  });

  // 角色选择下拉
  const roleOptions = ref<CbdApiProjectCommonRoleSelectListGetResponse>([]);
  const [getRoleOptions] = useFuncProxy(async () => {
    const d = await cbdApiProjectCommonRoleSelectListGet();
    roleOptions.value = d;
  });

  // 角色选择下拉
  const deptOptions = ref<CbdApiProjectCommonDeptSelectListGetResponse>([]);
  const [getDeptOptions] = useFuncProxy(async () => {
    const d = await cbdApiProjectCommonDeptSelectListGet({
      levels: '3'
    });
    deptOptions.value = d;
  });

  onMounted(() => {
    getUserOptions();
    getRoleOptions();
    getDeptOptions();
  });
</script>

<style lang="less" scoped>
  .row {
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    flex-shrink: 0;

    &-label {
      width: 100px;
      flex-shrink: 0;
      line-height: 32px;
    }

    &-content {
      flex: 1;
    }
  }

  :deep(.arco-collapse-item-content) {
    padding: 0 15px;
  }
</style>
