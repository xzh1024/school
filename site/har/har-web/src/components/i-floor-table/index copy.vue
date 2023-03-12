<template>
  <div class="i-floor-table">
    <a-checkbox-group v-model="floorChecked" class="checkbox-group">
      <a-table
        :data="data"
        :pagination="false"
        table-layout-fixed
        sticky-header
      >
        <template #columns>
          <a-table-column
            v-for="(column, index) in columns"
            :key="index"
            :title="column.label"
            :data-index="column.prop"
            :width="column.width"
            :fixed="column.fixed"
          >
            <!-- 视图 title -->
            <template v-if="column.prop === 'views'" #title>
              <div class="legend-box">
                <div>
                  <div
                    v-for="item in config"
                    :key="item.value"
                    class="legend-item"
                  >
                    <div
                      class="legend-block"
                      :style="{
                        backgroundColor: item.color
                      }"
                    />
                    <span>{{ item.label }}</span>
                  </div>
                </div>

                <a-button v-if="hasAction" type="primary" @click="toggleManage">
                  {{ manageStatus ? '取消管理' : '管理' }}
                </a-button>
              </div>
            </template>
            <!-- 视图 body -->
            <template v-if="column.prop === 'views'" #cell="{ rowIndex }">
              <div class="floor-cell">
                <div
                  v-for="(it, i) in 20"
                  :key="it"
                  class="table-cell"
                  :style="{
                    width: `100px`,
                    backgroundColor: config[i]?.color || '#FFB44C'
                  }"
                >
                  <a-checkbox
                    v-show="manageStatus"
                    :disabled="validCheckboxDisabled(rowIndex + 1)"
                    :value="rowIndex + 1 + 'F0' + i"
                  />
                  <a-popover position="tl">
                    <div
                      class="table-cell-text"
                      @contextmenu="
                        (event) => rightClick(event, rowIndex + 1 + 'F0' + i)
                      "
                    >
                      {{ rowIndex + 1 + 'F0' + i }}
                    </div>

                    <template #content>
                      <div class="popover-row">
                        <span>当前状态</span>
                        <span>租赁中</span>
                      </div>
                      <div class="popover-row">
                        <span>铺面面积</span>
                        <span>12038平方米</span>
                      </div>
                      <div class="popover-row">
                        <span>租赁公司</span>
                        <span>成都汇安融信息技术有限公司</span>
                      </div>
                      <div class="popover-row">
                        <span>合同开始时间</span>
                        <span>1971年03月26日</span>
                      </div>
                      <div class="popover-row">
                        <span>合同到期时间</span>
                        <span>1983年01月30日</span>
                      </div>
                      <div
                        v-if="hasDetail"
                        class="popover-row"
                        style="justify-content: center"
                      >
                        <a-button
                          type="primary"
                          size="mini"
                          @click="handleDetail"
                        >
                          查看详情
                        </a-button>
                      </div>
                    </template>
                  </a-popover>
                </div>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-checkbox-group>

    <i-context-menu
      ref="contextMenuRef"
      :menu="contextMenu"
      v-bind="contextMenuStyle"
    />

    <!-- 确认拆分 -->
    <a-modal
      v-model:visible="visible"
      modal-class="split-modal"
      draggable
      unmount-on-close
      width="275px"
      @ok="handleOk"
      @close="handleCancel"
    >
      <template #title>确认拆分铺面？</template>
      <div>
        <span>当前铺面面积：100平方米</span>
        <div class="split-row">拆分份数</div>
        <a-input-number
          v-model="splitNumber"
          class="split-row"
          mode="button"
          size="large"
          :min="1"
          :step="1"
        />
        <div v-for="item in splitNumber" :key="item" class="split-row">
          <a-input :default-value="`50`">
            <template #prepend>
              <!--              <a-input-->
              <!--                :default-value="`${contextEvent}-${item}`"-->
              <!--                style="width: 80px"-->
              <!--              />-->
            </template>
            <template #append>平方米</template>
          </a-input>
        </div>
      </div>
    </a-modal>
    <!-- 确认合并 -->
    <a-modal
      v-model:visible="mergeVisible"
      draggable
      unmount-on-close
      width="275px"
      modal-class="split-modal"
      @ok="handleMergeOk"
      @close="handleMergeCancel"
    >
      <template #title>确认合并店铺？</template>
      <div class="popover-row">
        <span style="width: 190px">合并店铺名称</span>
        <a-input v-model="mergeName" />
      </div>
      <div class="popover-row">
        <span>合并铺面面积</span>
        <span>12803平方米</span>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import IContextMenu from '@/components/i-context-menu/index.vue';
  import { useContextMenu } from './useContextMenu';
  import { useSplitCell } from './useSplitCell';
  import { useMergeCell } from './useMergeCell';
  import { PropType, ref } from 'vue';
  type ConfigItemType = {
    label: string;
    color: string;
    value?: string;
  };
  defineProps({
    floorField: {
      type: String,
      default: 'floor'
    },
    areaField: {
      type: String,
      default: 'area'
    },
    data: {
      type: Array as PropType<any>,
      default: () => [1, 2, 3, 4, 5]
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
        return [
          { label: '商铺', value: '1', color: '#4C8AF7' },
          { label: '广告位', value: '2', color: '#69AF0F' },
          { label: '场地', value: '3', color: '#FFB44C' }
        ];
      }
    }
  });

  const emits = defineEmits(['detail']);

  // 查看详情按钮
  function handleDetail() {
    emits('detail');
  }
  // 表格列 配置
  interface columnsType {
    label: string;
    prop: string;
    width?: number;
    fixed?: 'left' | 'right' | undefined;
  }
  const columns: columnsType[] = [
    { label: '楼层', prop: 'floor', width: 70, fixed: 'left' },
    { label: '面积(m²)', prop: 'area', width: 130, fixed: 'left' },
    {
      label: '',
      prop: 'views',
      fixed: undefined
    }
  ];
  // 管理
  const manageStatus = ref(false);

  // 拆分表格
  const {
    visible,
    handleOk,
    handleCancel,
    // @ts-ignore
    splitData: { splitNumber }
  } = useSplitCell();

  // 合并表格
  const {
    mergeVisible,
    mergeName,

    handleMergeOk,
    handleMergeCancel
  } = useMergeCell();
  // todo 检查splitNumber 是否正确????
  // todo 检查mergeName 是否正确????
  // context menu
  const {
    contextMenuRef,
    // contextEvent,
    contextMenu,

    contextMenuStyle,
    floorChecked,
    rightClick
    // @ts-ignore
  } = useContextMenu(visible, { mergeVisible, name: mergeName }, manageStatus);

  const validCheckboxDisabled = (i: number) => {
    if (floorChecked.value[0]) {
      return !floorChecked.value[0].startsWith(`${i}`);
    }
    return false;
  };

  function toggleManage() {
    floorChecked.value = [];
    manageStatus.value = !manageStatus.value;
  }
</script>

<style lang="less" scoped>
  .i-floor-table {
    width: 100%;
    overflow: hidden;

    :deep(.arco-table-th-title) {
      width: 100%;
    }
  }

  .legend-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
    }

    .legend-item {
      display: flex;
      align-items: center;
      font-size: 16px;

      + .legend-item {
        margin-left: 30px;
      }
    }

    .legend-block {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }

  .table-cell {
    flex-shrink: 0;
    min-width: 30px;
    height: 100px;
    display: flex;
    align-items: center;
    margin-right: 5px;
    position: relative;
    cursor: pointer;

    .table-cell-text {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      opacity: 0.8;
      color: #ffffff;
    }

    :deep(.arco-checkbox) {
      position: absolute;
      left: 6px;
      top: 6px;
      z-index: 1;
    }
  }

  .floor-cell {
    display: flex;
    align-items: flex-start;
    padding-right: 5px;
  }

  :deep(.arco-table-cell) {
    padding: 3px 10px;
  }

  .checkbox-group {
    width: 100%;
    overflow: hidden;
  }

  .popover-row {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 6px;

    span {
      &:first-child {
        width: 100px;
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

  .split-row {
    margin-top: 10px;

    :deep(.arco-input-prepend),
    :deep(.arco-input-wrapper),
    :deep(.arco-input-append) {
      padding: 0 4px;

      .arco-input {
        margin: 0;
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
  body {
    overflow: hidden;
  }
</style>
