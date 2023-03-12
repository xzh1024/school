<template>
  <template v-if="item.type === 'Divider'">
    <div class="block-title">{{ item.text }}</div>
  </template>
  <template v-else-if="item.type === 'Row'">
    <row-template :list="item.children || []" />
  </template>
  <template v-else-if="item.type === 'Form'">
    <i-form
      v-bind="item.attrs"
      :label-col-props="{ span: 8 }"
      :model-value="calcPropData(detailData, item.prop)"
    >
      <a-form-item
        :label="item.label"
        :field="item.prop"
        :rules="item.rules || []"
        :hide-label="item.hideLabel"
        :label-col-props="item.labelColProps"
      >
        <slot :name="item.prop + 'Form'">
          <a-input
            v-if="!item.type"
            v-model="detailData[item.prop]"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :allow-clear="item.allowClear || true"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-input-number
            v-else-if="item.type === 'inputNumber'"
            v-model="detailData[item.prop]"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :allow-clear="item.allowClear || true"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-select
            v-else-if="item.type === 'select'"
            v-model="detailData[item.prop]"
            :options="item.dic || []"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :field-names="item.props"
            :allow-clear="item.allowClear || true"
            :allow-search="item.allowSearch || false"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-cascader
            v-else-if="item.type === 'cascader'"
            v-model="detailData[item.prop]"
            :options="item.dic || []"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :field-names="item.props"
            :allow-clear="item.allowClear || true"
            :allow-search="item.allowSearch || false"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-textarea
            v-else-if="item.type === 'textarea'"
            v-model="detailData[item.prop]"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :allow-clear="item.allowClear || true"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-tree-select
            v-else-if="item.type === 'treeSelect'"
            v-model="detailData[item.prop]"
            :data="item.dic || []"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :field-names="item.props"
            :allow-clear="item.allowClear || true"
            :allow-search="item.allowSearch || false"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-range-picker
            v-else-if="item.type === 'month'"
            v-model="detailData[item.prop]"
            mode="month"
            :placeholder="
              item.placeholder || [`请选择开始月份`, '请选择结束月份']
            "
            :allow-clear="item.allowClear || true"
            v-bind="item.options"
            :value-format="item.valueFormat"
            v-on="item.on || {}"
          />
          <a-year-picker
            v-else-if="item.type === 'year'"
            v-model="detailData[item.prop]"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :allow-clear="item.allowClear || true"
            :value-format="item.valueFormat"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-quarter-picker
            v-else-if="item.type === 'quarter'"
            v-model="detailData[item.prop]"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :allow-clear="item.allowClear || true"
            :value-format="item.valueFormat"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-range-picker
            v-else-if="item.type === 'week'"
            v-model="detailData[item.prop]"
            mode="week"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :allow-clear="item.allowClear || true"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-range-picker
            v-else-if="item.type === 'dateRange'"
            v-model="detailData[item.prop]"
            :allow-clear="item.allowClear || true"
            :value-format="item.valueFormat"
            :disabled-date="item.disabledDate"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-date-picker
            v-else-if="item.type === 'date'"
            v-model="detailData[item.prop]"
            :allow-clear="item.allowClear || true"
            :value-format="item.valueFormat"
            :disabled-date="item.disabledDate"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-time-picker
            v-else-if="item.type === 'timeRange'"
            v-model="detailData[item.prop]"
            :allow-clear="item.allowClear || true"
            :value-format="item.valueFormat"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <i-upload
            v-else-if="item.type === 'upload'"
            v-model="detailData[item.prop]"
            :options="item.options"
          />
          <a-radio-group
            v-else-if="item.type === 'radio'"
            v-model="detailData[item.prop]"
            :options="item.dic"
            v-bind="item.options"
            v-on="item.on || {}"
          />
          <a-checkbox-group
            v-else-if="item.type === 'checkbox'"
            v-model="detailData[item.prop]"
            :options="item.dic"
            v-bind="item.options"
            v-on="item.on || {}"
          >
          </a-checkbox-group>
          <i-custom-upload
            v-else-if="item.type === 'customUpload'"
            v-bind="item.options"
            v-model="detailData[item.prop]"
            :limit="item.limit"
          />
          <a-auto-complete
            v-else-if="item.type === 'autocomplete'"
            :placeholder="item.placeholder || `请选择${item.label}`"
            v-bind="item.options"
            v-on="item.on"
          />
        </slot>
      </a-form-item>
    </i-form>
  </template>
  <template v-else-if="item.type === 'Table'">
    <a-table
      v-bind="item.attrs.options"
      :pagination="false"
      style="margin-bottom: 20px"
      :data="calcPropData(detailData, item.prop)"
    >
      <template #columns>
        <a-table-column
          v-for="(each, index) in item.attrs.options.columns"
          :key="index"
          :align="each.align"
          :title="each.tableLabel || each.label"
          :data-index="each.prop"
          :width="each.width"
          :fixed="each.fixed"
          :ellipsis="each.ellipsis"
          :sortable="each.sortable"
          :filterable="each.filterable"
          :cell-style="each.cellStyle"
          :header-cell-style="each.headerCellStyle"
          :body-cell-style="each.bodyCellStyle"
          :tooltip="each.tooltip"
        >
          <template v-if="each.isSlot" #cell="row">
            <slot
              :name="each.prop + 'Cell'"
              :record="row.record"
              :row-index="row.rowIndex"
              :column="row.column"
            ></slot
          ></template>
          <template v-else #cell="{ record }">
            {{ record[each.prop] ?? '--' }}
          </template>
          <template v-if="slots[`${each.prop}Title`]" #title>
            <slot :name="each.prop + 'Title'"></slot
          ></template>
        </a-table-column>
      </template>
    </a-table>
  </template>
  <template v-else>
    <div>当前类型{{ item.type }}暂未支持，请联系管理员添加</div>
  </template>
</template>

<script setup lang="ts">
  import { PropType, getCurrentInstance, Ref, computed } from 'vue';
  import RowTemplate from './row-template.vue';
  import IForm from '@/components/i-form/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import IUpload from '../i-upload/i-upload.vue';
  const instance = getCurrentInstance();
  const slots: Ref = computed(() => {
    return instance?.slots;
  });
  defineProps({
    item: {
      type: Object as PropType<any>,
      required: true
    },
    detailData: {
      type: Object as PropType<any>,
      default: () => {}
    }
  });
  function calcPropData(data: any, path: string) {
    let result = data;
    const arr = path.split('.');
    arr.forEach((item) => {
      if (item) {
        result = result[item];
      }
    });
    return result;
  }
</script>
<style lang="less" scoped>
  :deep(.arco-input-wrapper) {
    .arco-input[disabled] {
      -webkit-text-fill-color: #666666;
    }
  }
  :deep(.arco-select-view-value) {
    color: #666666;
  }
  :deep(.arco-select-view-tag) {
    color: #666666;
  }
  :deep(.arco-select-view-multiple) {
    &.arco-select-view-disabled {
      .arco-select-view-tag {
        color: #666666;
        border: none;
      }
    }
  }
</style>
