<template>
  <div class="edit-specs">
    <div v-for="(item, index) in specNames" :key="index" class="box">
      <a-form-item
        :field="`specNames.${index}.specId`"
        :hide-asterisk="true"
        :hide-label="true"
        :rules="[{ required: true, message: '请选择规格项' }]"
      >
        <div class="flex align-center">
          <a-select
            v-model="item.specId"
            class="s-width"
            placeholder="请选择规格项"
            :field-names="{
              value: 'id',
              label: 'name'
            }"
            :options="specList"
            @change="(v) => selectChange(v, index)"
          ></a-select>
          <a-button type="text" class="btn-pos" @click="addSpecs"
            >新增规格项</a-button
          >
        </div>
      </a-form-item>
      <a-form-item
        v-if="item.specId"
        :hide-asterisk="true"
        :hide-label="true"
        :field="`specNames.${index}.specVals`"
        :rules="[{ required: true, message: '请选择规格值' }]"
      >
        <div>
          <template v-if="item.specVals">
            <a-space wrap>
              <a-tag
                v-for="tag in item.specVals"
                :key="tag.specValueId"
                closable
                color="orangered"
                @close="closeChange(tag, index)"
                >{{ tag.specValueName }}</a-tag
              >
            </a-space>
          </template>
          <a-popconfirm
            content-class="edit-specs-content-class"
            @ok="checkSelectChange(index, checkedHash[index]?.children, item)"
          >
            <a-button type="text" class="btn-pos">选择规格值</a-button>
            <template #icon><span></span></template>
            <template #content>
              <div class="specs-width">
                <a-select
                  :default-value="checkedHash[index].select"
                  multiple
                  placeholder="请选择规格值"
                  :options="checkedHash[index]?.children || []"
                  :field-names="{
                    value: 'id',
                    label: 'name'
                  }"
                  @change="popConfirmSelectChange($event, index)"
                ></a-select>
              </div>
            </template>
          </a-popconfirm>
          <a-button
            type="text"
            class="btn-pos"
            @click="addSpecsVal(item.specId, index)"
            >新增规格值</a-button
          >
        </div>
      </a-form-item>
      <a-button class="delete-item" type="text" @click="deleteItem(index)">删除规格项</a-button>
    </div>
    <a-button v-if="specNames.length < 3" type="primary" @click="addItem"
      >添加规格项</a-button
    >
    <specs-edit
      v-if="specVisible"
      v-model="specVisible"
      :parent-id="currentParentId"
      @confirm="specsConfirm"
    ></specs-edit>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'EditSpecs'
  };
</script>

<script setup lang="ts">
  import { computed, onMounted, ref, Ref, watch } from 'vue';
  import { getSpecificationsDic } from '@/utils/getDic';
  import SpecsEdit from '../goods-attribute/__components__/specs-edit.vue';
  import { groundPcApiCommonProductAttributeSpecificationsGet } from '@/api/ground-pc-api';

  const currentParentId: Ref = ref(null);
  const currentIndex: Ref<number | null> = ref(null);
  const specVisible: Ref<boolean> = ref(false);
  const checkedHash: Ref = ref({});
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => []
    }
  });
  const emits = defineEmits(['update:modelValue', 'resetValidate']);

  const specNames: Ref = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  watch(
    () => props.modelValue,
    () => {
      initCheckedHash();
    }
  );
  const specList: Ref = ref([]);
  onMounted(() => {
    initDic();
  });
  async function initDic(v?: boolean) {
    try {
      specList.value = await groundPcApiCommonProductAttributeSpecificationsGet(
        v
      );
    } catch (e) {
      console.error(e);
    }
  }
  function selectChange(v: any, index: number, edit?: boolean) {
    // console.log(v, index);
    const item = specList.value.find((i: any) => i.id === v);
    // console.log(item, 'item');
    const { id, name, children = [] } = item || {};
    checkedHash.value[index] = item;
    // 重置字典
    resetDic();
    if (edit) {
      specNames.value[index] = {
        ...specNames.value[index],
        specsDic: children
      };
    } else {
      specNames.value[index] = {
        specId: id,
        specName: name,
        specVals: [],
        specsDic: children
      };
    }
  }

  const temp = ref<number[]>([]);
  const isRemove = ref(false);
  const removeItems = ref<number[]>([]);
  function popConfirmSelectChange(v: any, index: number) {
    temp.value = v;
    isRemove.value = v.length < checkedHash.value[index].select?.length;
    if (isRemove.value) {
      removeItems.value = checkedHash.value[index].select.filter(
        (el: number) => {
          return !v.includes(el);
        }
      );
    }
  }
  function checkSelectChange(index: number, dic = [], item: any) {
    checkedHash.value[index].select = temp.value;
    let { specVals = [] } = specNames.value[index];
    const checkList = specVals.map((i: any) => i.psvId);
    const newIdList = checkList
      .concat(checkedHash.value[index].select)
      .filter((i: number) => !checkList.some((j: number) => j === i));
    const currentList = dic.filter((i: any) =>
      newIdList.some((j: any) => j === i.id)
    );
    specVals = specVals.concat(
      currentList.map((i: any) => {
        const { id, name } = i;
        return {
          ...i,
          specValueId: id,
          specValueName: name,
          psvId: id
        };
      })
    );
    specVals = specVals.filter((el: any) => {
      return !removeItems.value.includes(el.psvId);
    });
    removeItems.value = [];
    specNames.value[index] = {
      ...specNames.value[index],
      specVals
    };
    emits('resetValidate');
  }

  // 删除规格值
  function closeChange(item: any, index: number) {
    const { specVals = [] } = specNames.value[index];
    const SIndex = specVals.findIndex(
      (i: any) => i.specValueId === item.specValueId
    );
    specVals.splice(SIndex, 1);
    checkedHash.value[index].select = checkedHash.value[index].select.filter(
      (el: number) => el !== item.specValueId
    );
    temp.value = checkedHash.value[index].select;
  }

  // 新增规格项
  function addItem() {
    specNames.value.push({});
  }
  // 删除规格项
  function deleteItem(index: number) {
    specNames.value.splice(index, 1);
    delete checkedHash.value[index];
    resetDic();
  }
  // 重置字典 disabled
  function resetDic() {
    specList.value = specList.value.map((i: any) => {
      let disabled = false;
      if (Object.values(checkedHash.value).some((j: any) => j.id === i.id)) {
        disabled = true;
      }
      return { ...i, disabled };
    });
  }
  async function specsConfirm() {
    await initDic(true);
    console.log(currentParentId.value, typeof currentIndex.value === 'number');
    if (currentParentId.value && typeof currentIndex.value === 'number') {
      selectChange(currentParentId.value, currentIndex.value, true);
    }
  }
  function addSpecs() {
    currentParentId.value = null;
    currentIndex.value = null;
    specVisible.value = true;
  }
  function addSpecsVal(v: number, index: number) {
    currentParentId.value = v;
    currentIndex.value = index;
    specVisible.value = true;
  }
  function initCheckedHash() {
    const hash: any = {};
    specNames.value?.forEach((i: any, index: number) => {
      const item = specList.value.find((j: any) => j.id === i?.specId);
      if (item) hash[index] = item;
    });
    checkedHash.value = hash;
    resetDic();
  }
</script>

<style lang="less">
  .edit-specs-content-class {
    display: flex;

    .arco-btn {
      height: 32px;
      line-height: 32px;
    }
  }
</style>

<style scoped lang="less">
  .specs-width {
    width: 200px;
  }

  :deep(.s-width) {
    width: 200px;
  }

  .btn-pos {
    &:hover {
      background: transparent;
    }
  }

  .edit-specs {
    width: 100%;

    .box {
      position: relative;
      margin-bottom: 12px;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 2px;

      .delete-item {
        position: absolute;
        top: 20px;
        right: 12px;
        z-index: 1;
        padding: 0;
        font-size: 14px;
        line-height: 32px;
      }
    }
  }
</style>
