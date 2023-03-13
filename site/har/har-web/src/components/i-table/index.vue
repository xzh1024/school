<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div class="i-table">
    <i-form
      v-if="formColumns.length"
      v-model="form"
      :options="formOptions"
      @submit="submit"
      @reset="reset"
    >
      <template v-for="slot in formSlots" #[slot]>
        <slot :name="slot" />
      </template>
      <template #submitIcon>
        <slot name="submitIcon">
          <icon-search />
        </slot>
      </template>
    </i-form>
    <div :class="tableOption.tableCard ? 'i-card' : ''">
      <div v-if="$slots.header" class="margin-bottom-xs">
        <slot name="header"></slot>
      </div>
      <a-table
        v-model:selectedKeys="selectedKeys"
        :data="tableActualData"
        :loading="actualLoading"
        :pagination="false"
        v-bind="tableOption.menuOtherOptions"
        :hoverable="tableOption.menuOtherOptions?.hoverable || false"
      >
        <template #columns>
          <a-table-column
            v-for="(item, index) in columns"
            :key="index"
            :align="item.align || tableOption.align"
            :title="item.tableLabel || item.label"
            :data-index="item.prop"
            :width="item.width"
            :fixed="item.fixed"
            :ellipsis="item.ellipsis"
            :sortable="item.sortable"
            :filterable="item.filterable"
            :cell-style="item.cellStyle"
            :header-cell-style="item.headerCellStyle"
            :body-cell-style="item.bodyCellStyle"
            :tooltip="item.tooltip"
          >
            <template v-if="item.prop === '_index'" #cell="data">
              <template v-if="$slots.indexCell">
                <slot
                  name="indexCell"
                  :index="
                    data.record.isSummary ? '--' : indexPlus(data.rowIndex + 1)
                  "
                  v-bind="data"
                />
              </template>
              <template v-else>
                {{
                  data.record.isSummary ? '--' : indexPlus(data.rowIndex + 1)
                }}
              </template>
            </template>
            <template v-else-if="item.formatter" #cell="{ record }">
              {{ item.formatter && item.formatter(record) }}
            </template>
            <template v-else-if="slots[`${item.prop}Cell`]" #cell="row">
              <slot
                :name="item.prop + 'Cell'"
                :record="row.record || {}"
                :row-index="row.rowIndex"
                :column="row.column"
              ></slot
            ></template>
            <template v-else #cell="{ record }">
              {{
                !record[item.prop] || record[item.prop] === ''
                  ? '--'
                  : record[item.prop]
              }}
            </template>
            <template v-if="slots[`${item.prop}Title`]" #title>
              <slot :name="item.prop + 'Title'"></slot
            ></template>
          </a-table-column>
          <a-table-column
            v-if="tableOption.menu"
            title="操作"
            :align="tableOption.menuOptions?.align || 'left'"
            data-index="menu"
            v-bind="tableOption.menuOptions"
          >
            <template #cell="row">
              <slot
                name="menu"
                :record="row.record"
                :row-index="row.rowIndex"
                :column="row.column"
              ></slot>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <div
        v-if="tableOption.pageShow"
        class="margin-top-xs flex"
        :class="
          tableOption.menuOtherOptions &&
          tableOption.menuOtherOptions.pagePosition === 'bl'
            ? 'justify-start'
            : 'justify-end'
        "
      >
        <a-pagination
          v-model:current="pageOptions.current"
          v-model:page-size="pageOptions.pageSize"
          :total="pageOptions.total"
          show-page-size
          show-total
          @change="pageChange"
          @page-size-change="pageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ITable'
  };
</script>

<script lang="ts" setup>
  import {
    computed,
    getCurrentInstance,
    nextTick,
    onMounted,
    PropType,
    Ref,
    ref,
    watch,
    watchEffect,
    useSlots
  } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import type { TableOptions } from '@/components/i-table/index';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { FormOptions } from '../i-form';
  import { cloneDeep } from 'lodash';

  const props = defineProps({
    options: {
      type: Object
    },
    modelValue: {
      type: Object,
      default: () => {
        return {};
      }
    },
    page: {
      type: Object,
      default: () => {
        return { total: 0, pageSize: 10, current: 1 };
      }
    },
    data: {
      type: Array,
      default: () => []
    },
    api: {
      type: Function
    },
    apiAutoGet: {
      type: Boolean,
      default: true
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    refreshNow: {
      type: Boolean,
      default: false
    },
    selectedKeys: {
      type: Array,
      default: () => []
    },
    disabledKeys: {
      // 有选择行功能时,禁用某些数据
      type: Array as PropType<Array<number>>,
      default: () => []
    }
  });
  const emits = defineEmits([
    'update:modelValue',
    'update:refreshNow',
    'pageChange',
    'submit',
    'reset',
    'update:page',
    'pageSizeChange',
    'dataAfter',
    'update:selectedKeys'
  ]);
  const tableData: Ref = ref([]);
  // 每次请求后或者传进来的数据变化了都存到这里面,最后暴露出去,不能用tableActualData,因为tableActualData只是当前页的,如果翻页选择就会有bug
  const tableTempData: Ref = ref<any[]>([]);
  const form: Ref = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const pageOptions: any = computed({
    get() {
      return props.page;
    },
    set(v) {
      emits('update:page', v);
    }
  });

  const selectedKeys = computed({
    get() {
      return props.selectedKeys;
    },
    set(v) {
      emits('update:selectedKeys', v);
    }
  });

  const tableOption = computed(() => {
    const o = props?.options || {};
    return {
      columns: [],
      tableCard: true,
      menu: true,
      pageShow: true,
      ...o
    } as TableOptions;
  });
  const columns = computed(() => {
    const c = tableOption.value?.columns || [];
    if (tableOption.value?.index && c[0].prop !== '_index') {
      c.unshift({
        label: tableOption.value.indexTitle || '',
        prop: '_index',
        width: tableOption.value.indexWidth || 75,
        align: tableOption.value?.indexAlign || ('' as any)
      });
    }
    return c.filter((i) => !i.hide);
  });

  const slots = useSlots();

  const formOptions = computed<FormOptions>(() => {
    return {
      submitText: '搜索',
      ...tableOption.value,
      columns: formColumns.value
    } as FormOptions; // 临时处理
  });

  const formSlots = computed(() => {
    const arrKeys = Object.keys(slots);
    return arrKeys.filter((i) => i.indexOf('Form') > -1);
  });

  const formColumns = computed(() => {
    const c = tableOption.value?.columns || [];
    return c.filter((i) => i.search);
  });

  const refresh = computed({
    get() {
      return props.refreshNow;
    },
    set(v) {
      emits('update:refreshNow', v);
    }
  });

  function resetPageNumAs1() {
    pageOptions.value.current = 1;
  }
  function submit(val: any) {
    // 从第一页开始显示
    resetPageNumAs1();
    emits('submit', val);
    if (props.apiAutoGet && props.api) getList();
  }
  function pageChange(val: number) {
    console.log(val);
    pageOptions.value.current = val;
    emits('pageChange', val);
    if (props.api) getList();
  }
  function pageSizeChange(val: number) {
    pageOptions.value.pageSize = val;
    emits('pageSizeChange', val);
    if (props.api) getList();
  }
  function reset(done: (bool: boolean) => void) {
    // 点击重置按钮时,从第一页开始显示
    resetPageNumAs1();
    emits('reset', done);
    if (props.api) {
      done(true);
      nextTick(() => {
        getList();
      });
    }
  }
  watch(refresh, (v) => {
    if (v) {
      console.log('list 刷新');
      getList();
    }
  });
  const rowsKey = computed(() => {
    return props.options?.menuOtherOptions?.rowKey || 'id';
  });
  const tableActualData = computed<any[]>(() => {
    const temp = props.data.length ? props.data : tableData.value;
    temp.forEach((el: any) => {
      if ((props.disabledKeys || []).includes(el[rowsKey.value])) {
        el.disabled = true;
      }
    });
    return temp || [];
  });
  watchEffect(() => {
    setTableTempData(props.data || []);
  });
  function setTableTempData(data: any[]) {
    data.forEach((el) => {
      const idx = tableTempData.value.findIndex(
        (a: any) => a[rowsKey.value] === el[rowsKey.value]
      );
      if (idx > -1) {
        tableTempData.value[idx] = el;
      } else {
        tableTempData.value.push(el);
      }
    });
  }
  const actualLoading: Ref<boolean> = computed(() => {
    return props.api ? loading.value : props.tableLoading;
  });

  const [getList, loading] = useFuncProxy(async () => {
    if (props.api) {
      const res = await props.api({
        ...pageOptions.value,
        pageNum: pageOptions.value.current,
        ...form.value
      });
      tableData.value = tableOption.value.notPage ? res : res?.rows || [];
      setTableTempData(tableData.value);
      pageOptions.value.total = res?.total || 0;
      emits('dataAfter', res);
      refresh.value = false;
    }
  });
  onMounted(() => {
    if (props.apiAutoGet) getList();
  });

  function indexPlus(v: number) {
    const { current = 1, pageSize = 10 } = pageOptions.value;
    const res = (Number(current) - 1) * Number(pageSize) + v;
    return res;
  }

  function clearTableData() {
    tableData.value = [];
    pageOptions.value.total = [];
    selectedKeys.value = [];
  }

  function getTableData() {
    return cloneDeep(tableActualData.value);
  }

  defineExpose({
    data: tableTempData,
    search: submit,
    getTableData,
    clearTableData,
    reset
  });
</script>

<style scoped lang="less">
  .i-table {
    :deep(.arco-form-item) {
      margin-bottom: 0;
    }
  }
</style>
