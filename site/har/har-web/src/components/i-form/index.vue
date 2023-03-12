<template>
  <div class="i-form">
    <div :class="formOptions.formCard ? 'card' : ''">
      <a-form
        ref="refForm"
        :model="form"
        v-bind="formOptions"
        :size="formOptions.size"
        :auto-label-width="formOptions.autoLabelWidth"
        @submit="handleSubmit"
      >
        <a-row :gutter="formOptions.gutter">
          <a-col
            v-for="(item, index) in formColumns"
            :key="index"
            :span="
              item.type === 'groupTitle'
                ? 24
                : item.span || formOptions.span || 6
            "
            :style="{ padding: item.hideTitle ? 0 : '6px' }"
          >
            <template v-if="item.type === 'groupTitle'">
              <slot v-if="!item.hideTitle" :name="item.prop + 'Form'">
                <div class="group-title">
                  <div class="title">
                    {{ item.label }}
                  </div>
                </div>
              </slot>
            </template>
            <template v-else>
              <a-form-item
                :style="{
                  width: item.innerWidth
                    ? `calc(${item.innerWidth} - 6px)`
                    : '100%'
                }"
                :label="item.label"
                :field="item.prop"
                :rules="item.rules || []"
                :hide-label="item.hideLabel"
                :label-col-props="item.labelColProps"
              >
                <slot :name="item.prop + 'Form'">
                  <a-input
                    v-if="!item.type"
                    v-model="form[item.prop]"
                    :placeholder="item.placeholder || `请输入${item.label}`"
                    :allow-clear="item.allowClear || true"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-input-number
                    v-else-if="item.type === 'inputNumber'"
                    v-model="form[item.prop]"
                    :placeholder="item.placeholder || `请输入${item.label}`"
                    :allow-clear="item.allowClear || true"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-select
                    v-else-if="item.type === 'select'"
                    v-model="form[item.prop]"
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
                    v-model="form[item.prop]"
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
                    v-model="form[item.prop]"
                    :placeholder="item.placeholder || `请输入${item.label}`"
                    :allow-clear="item.allowClear || true"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-tree-select
                    v-else-if="item.type === 'treeSelect'"
                    v-model="form[item.prop]"
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
                    v-model="form[item.prop]"
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
                    v-model="form[item.prop]"
                    :placeholder="item.placeholder || `请选择${item.label}`"
                    :allow-clear="item.allowClear || true"
                    :value-format="item.valueFormat"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-month-picker
                    v-else-if="item.type === 'singleMonth'"
                    v-model="form[item.prop]"
                    :placeholder="item.placeholder || `请选择${item.label}`"
                    :allow-clear="item.allowClear || true"
                    :value-format="item.valueFormat"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-quarter-picker
                    v-else-if="item.type === 'quarter'"
                    v-model="form[item.prop]"
                    :placeholder="item.placeholder || `请选择${item.label}`"
                    :allow-clear="item.allowClear || true"
                    :value-format="item.valueFormat"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-range-picker
                    v-else-if="item.type === 'week'"
                    v-model="form[item.prop]"
                    mode="week"
                    :placeholder="item.placeholder || `请选择${item.label}`"
                    :allow-clear="item.allowClear || true"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-range-picker
                    v-else-if="item.type === 'dateRange'"
                    v-model="form[item.prop]"
                    :allow-clear="item.allowClear || true"
                    :value-format="item.valueFormat"
                    :disabled-date="item.disabledDate"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-date-picker
                    v-else-if="item.type === 'date'"
                    v-model="form[item.prop]"
                    :allow-clear="item.allowClear || true"
                    :value-format="item.valueFormat"
                    :disabled-date="item.disabledDate"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-time-picker
                    v-else-if="item.type === 'timeRange'"
                    v-model="form[item.prop]"
                    :allow-clear="item.allowClear || true"
                    :value-format="item.valueFormat"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <i-upload
                    v-else-if="item.type === 'upload'"
                    v-model="form[item.prop]"
                    :options="item.options"
                  />
                  <a-radio-group
                    v-else-if="item.type === 'radio'"
                    v-model="form[item.prop]"
                    :options="item.dic"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  />
                  <a-checkbox-group
                    v-else-if="item.type === 'checkbox'"
                    v-model="form[item.prop]"
                    :options="item.dic"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  >
                  </a-checkbox-group>
                  <a-switch
                    v-else-if="item.type === 'switch'"
                    v-model="form[item.prop]"
                    :options="item.dic"
                    v-bind="item.options"
                    v-on="item.on || {}"
                  ></a-switch>
                  <i-custom-upload
                    v-else-if="item.type === 'customUpload'"
                    v-bind="item.options"
                    v-model="form[item.prop]"
                    :limit="item.limit"
                  />
                  <a-auto-complete
                    v-else-if="item.type === 'autocomplete'"
                    :placeholder="item.placeholder || `请选择${item.label}`"
                    v-bind="item.options"
                    v-on="item.on"
                  />
                  <span v-else-if="item.type === 'span'">
                    {{ item?.formatter?.() || form[item.prop] }}
                  </span>
                </slot>
              </a-form-item>
            </template>
          </a-col>
          <a-col
            :span="formOptions.menuSpan || 6"
            :class="formOptions.menuColClass"
          >
            <a-form-item
              v-if="formOptions.menuForm"
              hide-label
              :content-class="formOptions.menuAlignRight ? 'menu-btn-c' : ''"
            >
              <a-space>
                <slot name="menuForm">
                  <a-button
                    v-if="!formOptions.submitBtn"
                    type="primary"
                    html-type="submit"
                  >
                    <template v-if="formOptions.submitBtnIcon" #icon>
                      <slot name="submitIcon"><icon-plus /></slot>
                    </template>
                    {{ formOptions.submitText || '提交' }}
                  </a-button>
                  <a-button
                    v-if="!formOptions.resetBtn"
                    type="primary"
                    @click="reset"
                  >
                    <template v-if="formOptions.resetBtnIcon" #icon>
                      <slot name="resetIcon"><icon-refresh /></slot>
                    </template>
                    {{ formOptions.resetText || '重置' }}
                  </a-button>
                </slot>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'IForm'
  });
</script>

<script setup lang="ts">
  import { computed, ref, Ref, watch } from 'vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import IUpload from '../i-upload/i-upload.vue';
  import type { FormItemDicOption, FormOptions } from './index';
  type Columns = Required<FormOptions>['columns'];
  const { modelValue = {}, options = {} } = defineProps<{
    modelValue?: object;
    options?: FormOptions;
  }>();
  const refForm: Ref = ref(null);
  const emits = defineEmits(['update:modelValue', 'submit', 'reset']);
  const form: Ref = computed({
    get() {
      return modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const formOptions = computed<FormOptions>(() => {
    const { columns = [], ...others } = options;
    return {
      gutter: [12, 12],
      menuForm: true,
      formCard: true,
      onSubmit: () => {},
      submitBtnIcon: false,
      resetBtnIcon: false,
      menuAlignRight: true,
      autoLabelWidth: true,
      ...others,
      columns: columns.filter((i) => i.display || i.display === undefined)
    };
  });
  const formColumns = ref<Columns>([]);
  watch(
    () => formOptions.value.columns,
    (v) => {
      if (v?.length) getDic(v);
    },
    { immediate: true, deep: true }
  );

  function getPathData(data: any, path?: string): FormItemDicOption[] {
    if (path) {
      const arr = path.split('.');
      return arr.reduce((pre, key) => {
        if (!pre) return undefined;
        return pre[key];
      }, data);
    }
    return data;
  }
  async function getDic(cols: Columns) {
    const colsPromise: Array<Promise<Columns[0]> | Columns[0]> = [];
    cols.forEach((col) => {
      if (col.type === 'groupTitle') return colsPromise.push(col);
      const { dic = [], dicResKey, dicRequest } = col;
      if (!dic.length && dicRequest && typeof dicRequest === 'function') {
        const request = dicRequest();
        function getDic(res: any) {
          return { ...col, dic: getPathData(res, dicResKey) };
        }
        if (typeof request.then === 'function') {
          colsPromise.push(
            request
              .then((res) => {
                return getDic(res);
              })
              .catch((e) => {
                console.error(e);
                return col;
              })
          );
        } else {
          colsPromise.push(getDic(request));
        }
      } else {
        colsPromise.push(col);
      }
    });
    const columns = await Promise.all(colsPromise);
    // todo 可能无限问题，未找到
    // @ts-ignore
    formColumns.value = columns.sort((a, b) => {
      const searchSort1 = a.searchSort ?? 1000;
      const searchSort2 = b.searchSort ?? 1000;
      return searchSort1 - searchSort2;
    });
  }

  function handleSubmit(err: any) {
    if (!err.error) {
      console.log('submit');
      emits('submit', err);
    }
  }
  function reset() {
    emits('reset', (bool = false) => {
      if (bool) {
        resetFields();
      }
    });
  }
  function submit() {
    return refForm.value.validate();
  }
  function validateField() {
    return refForm.value.validateField();
  }
  function validateFormField(fields: string | string[]) {
    return refForm.value.validateField(fields);
  }
  function clearValidate() {
    return refForm.value.clearValidate();
  }
  function resetFields() {
    // console.log('重置');
    refForm.value.resetFields();
  }
  defineExpose({
    submit,
    resetFields,
    validateField,
    validateFormField,
    clearValidate
  });
</script>

<style lang="less" scoped>
  .i-form {
    .card {
      margin-bottom: 20px;
      padding: 16px;
      background-color: #fff;
    }
  }

  .group-title {
    position: relative;
    z-index: 10;
    padding: 12px 0;
    color: #333;
    font-size: 18px;
    line-height: 24px;

    .title {
      position: relative;
      z-index: 2;
      display: inline-block;
      //padding: 0 12px;
      background: #fff;
    }

    &::after {
      //position: absolute;
      //top: 50%;
      //left: 0;
      //z-index: 1;
      //width: 100%;
      //height: 1px;
      //background: #f6f6f6;
      //transform: translateY(-50%);
      //content: '';
    }
  }

  :deep(.arco-picker) {
    flex: 1;
  }

  :deep(.menu-btn-c) {
    justify-content: flex-end;
  }
</style>
