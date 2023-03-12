<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    layout="vertical"
    class="form-vertical"
  >
    <a-card>
      <a-form-item
        field="name"
        label="当前铺面名称"
        :rules="[{ required: true, message: '必填项' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input :model-value="formModel.name" style="width: 100%" disabled />
      </a-form-item>
      <a-form-item
        field="acreage"
        label="当前铺面面积"
        :rules="[{ required: true, message: '必填项' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input-number
          :model-value="formModel.acreage"
          style="width: 100%"
          disabled
        />
      </a-form-item>
    </a-card>

    <a-card>
      <a-form-item
        field="splitNumber"
        :rules="[{ required: true, message: '必填项' }]"
        :validate-trigger="['change', 'blur']"
        class="a-form-item--hide-label"
      >
        <div
          style="
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div>拆分份数</div>
          <div>
            <a-input-number
              v-model="formModel.splitNumber"
              mode="button"
              size="large"
              :min="2"
              :max="50"
              @change="initSplitData(formModel.doorPlate, formModel.acreage)"
            />
          </div>
        </div>
      </a-form-item>
      <a-table
        :data="formModel.splitList ?? []"
        :pagination="false"
        style="margin-top: 12px"
      >
        <template #columns>
          <a-table-column title="铺面名称">
            <template #cell="{ record, rowIndex }">
              <a-form-item
                :field="`splitList.${rowIndex}.name`"
                :rules="[{ required: true, message: '必填项' }]"
                :validate-trigger="['change', 'blur']"
                class="a-form-item--hide-label a-form-item--inline-error"
              >
                <a-input v-model="record.name" :max-length="60" />
              </a-form-item>
            </template>
          </a-table-column>
          <a-table-column title="建筑面积">
            <template #cell="{ record, rowIndex }">
              <a-form-item
                :field="`splitList.${rowIndex}.acreage`"
                :rules="[{ validator: validateUseAcreage.bind(null, record) }]"
                :validate-trigger="['change', 'blur']"
                class="a-form-item--hide-label a-form-item--inline-error"
              >
                <a-input-number
                  v-model="record.acreage"
                  :min="0"
                  :max="9999999.99"
                  style="width: 130px"
                  hide-button
                  @change="
                    handleChangeAcreage(
                      record,
                      `splitList.${rowIndex}.useAcreage`
                    )
                  "
                >
                  <template #suffix>㎡</template>
                </a-input-number>
              </a-form-item>
            </template>
          </a-table-column>
          <a-table-column title="使用面积">
            <template #cell="{ record, rowIndex }">
              <a-form-item
                :field="`splitList.${rowIndex}.useAcreage`"
                :rules="[{ validator: validateUseAcreage.bind(null, record) }]"
                :validate-trigger="['change', 'blur']"
                class="a-form-item--hide-label a-form-item--inline-error"
              >
                <a-input-number
                  v-model="record.useAcreage"
                  :min="0"
                  :max="9999999.99"
                  style="width: 130px"
                  hide-button
                  @change="
                    handleChangeAcreage(record, `splitList.${rowIndex}.acreage`)
                  "
                >
                  <template #suffix>㎡</template>
                </a-input-number>
              </a-form-item>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-card>
      <a-form-item
        field="date"
        label="生效日期"
        :rules="[{ required: true, message: '必填项' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-date-picker v-model="formModel.date" style="width: 100%" />
      </a-form-item>
    </a-card>
  </a-form>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash';
  import { PropType, defineProps, defineExpose, watch } from 'vue';

  import { assignDeep } from '@/utils';
  import { ISplitFormData } from './types';
  import { useForm } from '@/hooks/use-form';
  import { SplitFormData } from './useSplitCell';

  const formProps = defineProps({
    data: {
      type: Object as PropType<ISplitFormData>,
      default: () => new SplitFormData()
    },
    // ADD = '新增', EDIT = '修改'
    type: {
      type: String as PropType<string>,
      default: 'ADD'
    }
  });

  const {
    formRef,
    formModel,
    formRules,

    validate,
    validateField,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate
  } = useForm<ISplitFormData>(new SplitFormData());

  function initSplitData(name: string, area: number) {
    const arr = [];
    for (let index = 0; index < formModel.value.splitNumber; index++) {
      const num = area / formModel.value.splitNumber;
      arr.push({
        acreage: num,
        useAcreage: num,
        name: [name, index + 1].filter((t) => t).join('-')
      });
    }
    formModel.value.name = name;
    formModel.value.acreage = area;
    formModel.value.splitList = arr;
  }

  function validateUseAcreage(
    row: Recordable,
    value: number | undefined | null,
    callback: Function
  ) {
    if (value == null) {
      callback('必填项');
    } else if (row.acreage && row.useAcreage && row.useAcreage > row.acreage) {
      callback('使用面积不能大于建筑面积');
    } else {
      callback();
    }
  }

  function handleChangeAcreage(
    row: { acreage: number; useAcreage: number },
    field: string
  ) {
    if (row.acreage && row.useAcreage) {
      validateField(field);
    }
  }

  watch(
    () => formProps.data,
    () => {
      const data = cloneDeep(formProps.data) as ISplitFormData & {
        newEstates: Array<any>;
      };
      assignDeep(formModel, data);
      // 草稿编辑状态下才有这个字段，没有就是新增
      if (!data.newEstates) {
        initSplitData(data.doorPlate, data.acreage);
      }
    },
    { immediate: true, deep: true }
  );

  defineExpose({
    formRef,
    formModel,

    validate,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate
  });
</script>

<style lang="less" scoped>
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
  ::v-deep(.arco-form-item-message) {
    white-space: nowrap;
  }
</style>
