<template>
  <div class="i-floor-table">
    <div class="table-head">
      <div
        v-for="(column, index) in columns"
        :key="column.label"
        class="table-column"
        v-bind="column.attrs"
      >
        <div v-if="index === 2" class="table-cell-content">
          <div class="legend-box">
            <div v-for="item in config" :key="item.value" class="legend-item">
              <div
                class="legend-block"
                :style="{
                  backgroundColor: item.color
                }"
              />
              <span
                >{{ item.label }}
                <span v-if="item.value != null">{{ item.value }}个</span></span
              >
            </div>
          </div>
          <a-button v-if="hasAction" type="primary" @click="toggleManage">
            {{ manageStatus ? '取消管理' : '管理' }}
          </a-button>
        </div>
        <div v-else class="table-cell">
          {{ column.label }}
        </div>
      </div>
    </div>
    <a-checkbox-group v-model="floorChecked" class="checkbox-group">
      <div class="table-body">
        <a-empty v-if="data && data.length === 0" />
        <template v-else>
          <div
            v-for="(column, index) in columns"
            :key="column.label"
            class="table-column"
            v-bind="column.attrs"
          >
            <div
              v-for="(item, idx) in data"
              :key="idx"
              :class="
                index < 2 ? 'table-cell table-border' : 'table-cell-content'
              "
            >
              <div v-if="index === 2" class="table-cell-content">
                <div
                  v-for="(it, i) in item.estates || []"
                  :key="i"
                  class="table-cell floor-cell"
                >
                  <a-popover position="tl">
                    <div
                      class="table-cell table-cell-it"
                      :style="{
                        height: '100%',
                        border:
                          it.statusMark === 2 || it.statusMark === 3
                            ? '2px dashed red'
                            : 'none'
                      }"
                      @contextmenu="(event) => rightClick(event, it)"
                    >
                      <div v-if="manageStatus" class="table-cell-it-handle">
                        <span
                          v-if="it.editStatus"
                          class="edit-btn"
                          @click="handleEditRow(it)"
                        >
                          <img
                            alt="编辑"
                            title="编辑"
                            src="@/assets/images/edit.png"
                          />
                        </span>
                        <a-checkbox
                          v-else
                          :disabled="validCheckboxDisabled(it)"
                          :value="it.identity"
                          @click="handleCheck(it, validCheckboxDisabled(it))"
                        />
                      </div>
                      <ul class="table-cell-it-content">
                        <template
                          v-for="itm of processEstates(it)"
                          :key="itm.estateId"
                        >
                          <li
                            :style="{
                              width: `${itm.acreage}px`,
                              backgroundColor: colorMap[it.symbol]
                            }"
                          >
                            {{ itm.doorPlate }}
                          </li>
                        </template>
                      </ul>
                    </div>
                    <template #content>
                      <div class="popover-content">
                        <div
                          v-if="manageStatus && it.deleteStatus"
                          style="text-align: right"
                        >
                          <a-button
                            type="primary"
                            status="danger"
                            size="mini"
                            @click="handleDelete(it)"
                            >刪除</a-button
                          >
                        </div>
                        <div>
                          <!-- 鼠标悬停显示合同信息(铺位拆分/合并审批通过，已生效) -->
                          <template v-if="it.statusMark === 1">
                            <div class="popover-row">
                              <span>业务状态</span>
                              <span>{{ filterStates(it) }}</span>
                            </div>
                            <div class="popover-row">
                              <span>铺面面积</span>
                              <span>{{ it.acreage }}平方米</span>
                            </div>
                            <div class="popover-row">
                              <span>租赁公司</span>
                              <span>
                                <template
                                  v-if="
                                    it.statusMark === 1 &&
                                    it.contractInfo &&
                                    it.contractInfo.merchantName
                                  "
                                >
                                  {{ it.contractInfo.merchantName }}
                                </template>
                                <template v-else>-</template>
                              </span>
                            </div>
                            <div class="popover-row">
                              <span>合同开始时间</span>
                              <span>
                                <template
                                  v-if="
                                    it.statusMark === 1 &&
                                    it.contractInfo &&
                                    it.contractInfo.leaseStartDate
                                  "
                                >
                                  {{ it.contractInfo.leaseStartDate }}
                                </template>
                                <template v-else>-</template>
                              </span>
                            </div>
                            <div class="popover-row">
                              <span>合同到期时间</span>
                              <span>
                                <template
                                  v-if="
                                    it.statusMark === 1 &&
                                    it.contractInfo &&
                                    it.contractInfo.leaseEndDate
                                  "
                                >
                                  {{ it.contractInfo.leaseEndDate }}
                                </template>
                                <template v-else>-</template>
                              </span>
                            </div>
                          </template>
                          <!--鼠标悬停显示拆分/合并信息(铺位拆分/合并审批通过，但未生效||铺位拆分/合并草稿状态)-->
                          <template
                            v-else-if="
                              it.statusMark !== 1 &&
                              (it.changeType === 1 || it.changeType === 2)
                            "
                          >
                            <div class="popover-row">
                              <span>资产状态</span>
                              <span>{{ filterStates(it) }}</span>
                            </div>
                            <div class="popover-row">
                              <span>生效时间</span>
                              <span>{{ it.effectiveDate }}</span>
                            </div>
                            <div style="margin-top: 5px">
                              <i-table
                                :data="processChangeDetail(it).changeDetails"
                                :options="page.options"
                              >
                                <template #acreageCell="{ record }">
                                  <span>{{
                                    record.acreage >= 0
                                      ? `${record.acreage}㎡`
                                      : '-'
                                  }}</span>
                                </template>
                                <template #useAcreageCell="{ record }">
                                  <span>{{
                                    record.useAcreage >= 0
                                      ? `${record.useAcreage}㎡`
                                      : '-'
                                  }}</span>
                                </template>
                              </i-table>
                            </div>
                          </template>
                        </div>
                        <div
                          v-if="hasDetail"
                          class="popover-row"
                          style="justify-content: center; margin-top: 20px"
                        >
                          <a-button
                            type="primary"
                            size="mini"
                            @click="handleDetail(it)"
                          >
                            查看详情
                          </a-button>
                        </div>
                      </div>
                    </template>
                  </a-popover>
                </div>
              </div>
              <div v-else>{{ filterColumn(column, item) }}</div>
            </div>
          </div>
        </template>
      </div>
    </a-checkbox-group>
    <!-- 鼠标右键功能 -->
    <i-context-menu
      ref="contextMenuRef"
      :menu="contextMenu"
      v-bind="contextMenuStyle"
    />
    <!-- 确认拆分 -->
    <i-drawer v-model="visible" title="铺位拆分" v-bind="modalProps">
      <template #title>确认拆分铺面？</template>
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleOk">确认</a-button>
        <a-button
          v-if="
            splitData.changeApplyStatus == null ||
            splitData.changeApplyStatus !== 1
          "
          type="primary"
          @click="handleOk(true)"
          >发起审批</a-button
        >
        <a-button
          v-else-if="splitData.editStatus"
          type="primary"
          @click="handleConfirm('split')"
          >发起审批</a-button
        >
      </template>
      <split-form ref="splitDrawerFormRef" :data="splitData" @reset="reset" />
    </i-drawer>
    <!-- 确认合并 -->
    <i-drawer v-model="mergeVisible" title="铺位合并" v-bind="modalProps">
      <template #title>确认合并店铺？</template>
      <template #footer>
        <a-button @click="handleMergeCancel">取消</a-button>
        <a-button type="primary" @click="handleMergeOk">确认</a-button>
        <a-button
          v-if="
            splitData.changeApplyStatus == null ||
            splitData.changeApplyStatus !== 1
          "
          type="primary"
          @click="handleMergeOk(true)"
          >发起审批</a-button
        >
        <a-button
          v-else-if="mergeFormData.editStatus"
          type="primary"
          @click="handleConfirm('merge')"
          >发起审批</a-button
        >
      </template>
      <merge-form
        ref="mergeDrawerFormRef"
        :data="mergeFormData"
        @reset="reset"
      />
    </i-drawer>
  </div>
</template>

<script setup lang="ts">
  import { omit } from 'lodash';
  import IDrawer from '@/components/drawer/drawer.vue';
  import IContextMenu from '@/components/i-context-menu/index.vue';
  import { useContextMenu } from './useContextMenu';
  import { useSplitCell, SplitFormData } from './useSplitCell';
  import { MergeFormData, useMergeCell } from './useMergeCell';
  import { computed, nextTick, PropType, reactive, ref } from 'vue';
  import type { ConfigItemType, TableItemType, Estates } from './types';

  import {
    cbdApiProjectEstateConfirmChangeCodePut,
    cbdApiProjectEstateDeleteChangeCodeDelete,
    cbdApiProjectEstateDivergePut,
    cbdApiProjectEstateGetChangeInfoCodeGet,
    cbdApiProjectEstateMergePut
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';

  import SplitForm from './splitForm.vue';
  import MergeForm from './mergeForm.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import ITable from '@/components/i-table/index.vue';

  const props = defineProps({
    floorField: {
      type: String,
      default: 'floor'
    },
    areaField: {
      type: String,
      default: 'area'
    },
    data: {
      type: Array as PropType<TableItemType>,
      default: () => []
    },
    /**
     * @param {Boolean} hasAction @default false
     * 是否可操作管理
     */
    hasAction: {
      type: Boolean,
      default: false
    },
    /**
     * @param {Boolean} hasDetail @default false
     * 是否可 查看详情
     */
    hasDetail: {
      type: Boolean,
      default: false
    },
    /**
     * @param {Array} colors
     *
     */
    config: {
      type: Array as PropType<ConfigItemType[]>,
      default: () => {
        return [];
      }
    }
  });

  const emits = defineEmits(['detail', 'reset']);

  // 查看详情按钮
  function handleDetail(item: any) {
    emits('detail', item);
  }
  type ColumnItemType = {
    label: string;
    prop?: string | Array<string>;
    attrs: {};
  };
  // 表格列 配置
  const columns: ColumnItemType[] = [
    {
      label: '楼宇/楼层',
      prop: ['buildingName', 'floorName'] as Array<string>,
      attrs: { style: { width: '84px' } }
    },
    { label: '面积(m²)', prop: 'area', attrs: { style: { width: '130px' } } },
    {
      label: '',
      attrs: { style: { flex: 1 }, class: 'scroll-column' }
    }
  ];
  const page = reactive<Recordable>({
    search: {},
    showEditModal: false,
    showConfigModal: false,
    refresh: false,
    showDetail: false,
    options: {
      indexTitle: '序号',
      index: false,
      submitText: '搜索',
      tableCard: false,
      pageShow: false,
      menu: false,
      menuOtherOptions: {
        bordered: false,
        scroll: {
          x: 400,
          y: 200
        }
      },
      columns: [
        {
          label: '铺面名称',
          prop: 'name'
        },
        {
          label: '建筑面积',
          prop: 'acreage'
        },
        {
          label: '使用面积',
          prop: 'useAcreage'
        }
      ],
      menuOptions: {
        width: '100'
      }
    }
  });
  // 管理
  const manageStatus = ref(false);
  const currentItem = reactive({
    area: 0
  });

  const modalProps = {
    width: '600px'
  };

  // 审批
  const [onConfirmChange] = useFuncProxy(async (data) => {
    await cbdApiProjectEstateConfirmChangeCodePut({ ...data });
    Message.success('操作成功');
    reset();
    visible.value = false;
    mergeVisible.value = false;
  });

  // 拆分表格
  const { visible, splitData, handleCancel, initSplitData } = useSplitCell();
  const splitDrawerFormRef = ref();
  async function handleOk(confirm?: boolean | MouseEvent) {
    if (splitDrawerFormRef.value) {
      const entity = await splitDrawerFormRef.value.validate();
      onSplitCell({
        confirm: confirm === true,
        estateId: entity.estateId,
        divergeInfos: entity.splitList,
        effectiveDate: entity.date,
        code: entity.code
      });
    }
  }
  // 审批
  async function handleConfirm(actionType: string) {
    switch (actionType) {
      case 'split':
        if (splitDrawerFormRef.value) {
          const entity = await splitDrawerFormRef.value.validate();
          onConfirmChange({ code: entity.code });
        }
        break;
      case 'merge':
        if (mergeDrawerFormRef.value) {
          const entity = await mergeDrawerFormRef?.value?.validate();
          onConfirmChange({ code: entity.code });
        }
        break;
    }
  }

  // 刪除
  function handleDelete(row: Estates) {
    Modal.warning({
      title: '提示',
      content: '确定要进行删除吗？',
      hideCancel: false,
      maskClosable: false,
      escToClose: false,
      closable: false,
      async onOk() {
        await cbdApiProjectEstateDeleteChangeCodeDelete({
          code: row.changeApplyCode as string
        });
        Message.success('操作成功');
        reset();
        visible.value = false;
      }
    });
  }

  const [onSplitCell] = useFuncProxy(async (data) => {
    await cbdApiProjectEstateDivergePut({ ...data });
    Message.success('操作成功');
    visible.value = false;
    nextTick(() => {
      reset();
      splitData.value = new SplitFormData();
    });
  });

  // 合并表格
  const mergeDrawerFormRef = ref();
  const { mergeFormData, mergeVisible, mergeName, handleMergeCancel } =
    useMergeCell();
  async function handleMergeOk(confirm?: boolean | MouseEvent) {
    const entity = await mergeDrawerFormRef?.value?.validate();
    if (entity) {
      onMergeCell({
        ...omit(entity, ['oldEstates']),
        effectiveDate: entity.date,
        confirm: confirm === true
      });
    }
  }
  const [onMergeCell] = useFuncProxy(async (data) => {
    await cbdApiProjectEstateMergePut({ ...data });
    Message.success('操作成功');
    reset();
    mergeVisible.value = false;
    mergeFormData.value = new MergeFormData();
  });

  // 编辑点击
  async function handleEditRow(row: Estates) {
    const code = row.changeApplyCode as string;
    const entity = await cbdApiProjectEstateGetChangeInfoCodeGet({ code });
    const changeType = entity.changeType;
    const date = entity.effectiveDate;
    const { assetsStatus, changeApplyStatus } = row;
    switch (changeType) {
      // 合并
      case 1:
        const mergeInfo = entity.mergeInfo;
        const oldEstates = mergeInfo?.oldEstates ?? [];
        mergeFormData.value = {
          ...mergeInfo,
          date,
          code,
          estateId: row.estateId,
          name: mergeInfo?.name ?? '',
          acreage: mergeInfo?.acreage ?? 0,
          useAcreage: mergeInfo?.useAcreage ?? 0,
          estateIds: oldEstates.map((item) => item.estateId),
          assetsStatus,
          changeApplyStatus
        };
        mergeVisible.value = true;
        break;
      // 拆分
      case 2:
        const divergeInfo = entity.divergeInfo;
        const splitList = entity.divergeInfo?.newEstates ?? [];
        splitData.value = {
          ...divergeInfo,
          date: date,
          code: code,
          isEdit: true,
          doorPlate: divergeInfo?.doorPlate ?? '',
          estateId: divergeInfo?.estateId,
          assetsStatus: assetsStatus,
          changeApplyStatus: changeApplyStatus,
          name: divergeInfo?.name ?? '',
          acreage: divergeInfo?.acreage ?? 0,
          splitNumber: splitList.length,
          splitList: splitList
        };
        visible.value = true;
        break;
    }
  }

  // context menu
  const {
    contextMenu,
    contextMenuRef,
    contextMenuStyle,

    floorChecked,
    cacheFloorCheckedData,
    clearChecked,
    handleCheck,
    rightClick
  } = useContextMenu(
    visible,
    {
      splitData,
      mergeFormData,
      mergeVisible,
      name: mergeName,
      area: currentItem.area,
      func: initSplitData
    },
    manageStatus
  );

  function processEstates(it: Estates) {
    if (it.statusMark === 2 || it.statusMark === 3) {
      // @ts-ignore
      return (it?.changeDetails ?? []) as Array<Estates>;
    }
    return [it];
  }

  function filterColumn(column: ColumnItemType, item: any): string {
    // @ts-ignore
    return (
      (column.prop && Array.isArray(column.prop)
        ? column.prop
            .map((itm: string) => item?.[itm])
            .filter((t) => t)
            .join('/') // @ts-ignore
        : item?.[column.prop]) || '-'
    );
  }

  function filterStates(it: Estates, joinText = ' / ') {
    const text = [];
    const { status, assetsStatus, changeApplyStatus } = it;
    // 状态显示标记;1:取status状态;2:取changeApplyStatus状态;3:取assetsStatus状态+changeApplyStatus状态;
    if (it.statusMark === 1) {
      // 状态1空置，2已预定，3已签约
      switch (status) {
        case 1:
          text.push('空置');
          break;
        case 2:
          text.push('已预定');
          break;
        case 3:
          text.push('已签约');
          break;
      }
    }
    if (it.statusMark === 3) {
      // 资产状态：0、审批未通过-未生效，1、审批通过-未生效，2、已生效，3、已失效
      switch (assetsStatus) {
        // 审批未通过
        case 0:
          text.push('未生效');
          break;
        // 审批通过
        case 1:
          text.push('未生效');
          break;
        case 2:
          text.push('已生效');
          break;
        case 3:
          text.push('已失效');
          break;
      }
    }
    if (it.statusMark === 2 || it.statusMark === 3) {
      // 状态0：草稿；1：审核中；2：已通过；3：已撤销；4：已驳回；5：不通过
      switch (changeApplyStatus) {
        case 0:
          text.push('草稿');
          break;
        case 1:
          text.push('审核中');
          break;
        case 2:
          text.push('已通过');
          break;
        case 3:
          text.push('已撤销');
          break;
        case 4:
          text.push('已驳回');
          break;
        case 5:
          text.push('不通过');
          break;
      }
    }

    return text.length ? text.join(joinText) : '-';
  }

  const validCheckboxDisabled = (it: any) => {
    if (floorChecked.value[0] && cacheFloorCheckedData.value[0]) {
      if (it.categoryId === cacheFloorCheckedData.value[0].categoryId) {
        return !floorChecked.value[0].startsWith(
          `${it.projectId}-${it.buildingId}-${it.floorId}-${it.categoryId}`
        );
      }
      return true;
    }
    return false;
  };

  const colorMap = computed<string[]>(() => {
    const arr: string[] = [];
    props.config.forEach((item) => {
      arr[item.symbol] = item.color;
    });
    return arr;
  });

  function toggleManage() {
    floorChecked.value = [];
    manageStatus.value = !manageStatus.value;
  }

  function reset() {
    clearChecked();
    emits('reset');
  }

  function processChangeDetail(it: Recordable) {
    if (it.statusMark !== 1 && it.changeType === 1) {
      const cloneIt1 = { ...it };
      const cloneIt2 = { ...it };

      cloneIt1.name = cloneIt1.doorPlate;
      cloneIt1.changeDetails = [];

      cloneIt2.changeDetails = [cloneIt1];
      return cloneIt2;
    }
    return it;
  }

  defineExpose({
    clearChecked
  });
</script>

<style lang="less" scoped>
  body {
    overflow: hidden;
  }
  .edit-btn {
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #f7f7f7;
    border-bottom-right-radius: 8px;
    transition: background-color 0.25s;
    &:hover {
      background: #dedede;
    }
    > img {
      width: 16px;
    }
  }
  .table-cell-it {
    @min-width: 80px;

    min-width: @min-width;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .table-cell-it-handle {
      position: absolute;
      left: 0;
      top: 0;
    }
    > .table-cell-it-content {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-grow: 1;
      height: inherit;
      > li {
        min-width: @min-width;
        max-width: 800px;
        padding: 30px 8px;
        text-align: center;
        max-height: inherit;
        &:first-child ~ li {
          margin-left: 4px;
        }
      }
    }
  }
  .i-floor-table {
    width: 100%;
    overflow: hidden;
  }

  .legend-box {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .legend-item {
      display: flex;
      align-items: center;
      font-size: 16px;

      + .legend-item {
        margin-left: 60px;
      }
    }

    .legend-block {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }

  .table-head,
  .table-body {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .table-body {
    background-color: #ffffff;
  }

  .table-column {
    flex-shrink: 0;
    > div {
      padding: 0 10px;
      word-break: break-all;
    }
  }

  .table-cell,
  .table-cell-content {
    // flex: 1;
    height: 100px;
    display: flex;
    align-items: center;
  }

  .table-border {
    border-top: 1px solid #f3f2f4;
  }

  .table-head .table-cell-content {
    justify-content: space-between;
  }

  .floor-cell {
    flex-shrink: 0;
    padding: 2px 0;
    margin: 0 2px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      word-break: break-all;

      &:hover {
        opacity: 0.8;
        color: #ffffff;
      }
    }

    :deep(.arco-checkbox) {
      position: absolute;
      left: 6px;
      top: 6px;
      z-index: 1;
    }
  }

  .checkbox-group {
    width: 100%;
    overflow: hidden;
  }

  .table-cell {
    justify-content: center;
  }

  .scroll-column {
    overflow: auto hidden;
  }

  .popover-content {
    > div {
      margin-bottom: 6px;
    }
    .popover-row {
      align-items: center;
      font-size: 14px;
      display: table-row;
      > span {
        display: table-cell;
        &:first-child {
          text-align: right;
          color: #afafaf;
          &::after {
            content: '：';
          }
        }
        &:last-child {
          color: #1a1a1a;
        }
      }
    }
  }
</style>

<style lang="less">
  .split-modal {
    .arco-modal-footer {
      text-align: center;
    }
  }
</style>
