<template>
  <a-tree
    :data="treeData"
    :field-names="{
      key: 'value',
      title: 'label',
      children: 'items'
    }"
    check-strictly
    @select="handleCheck"
  />
</template>

<script lang="ts" setup>
  import { onMounted, ref, PropType } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectCommonAssetsSelectListGet,
    CbdApiProjectCommonAssetsSelectListGetRequest,
    CbdApiProjectCommonAssetsSelectListGetResponse
  } from '@/api';
  // import {
  //   cbdApiErpCommonOrgTreeGet,
  //   type CbdApiErpCommonOrgTreeGetRequest,
  //   type CbdApiErpCommonOrgTreeGetResponse
  // } from '@/api';
  const props = defineProps({
    params: {
      type: Object as PropType<any>,
      default: () => {}
    }
  });
  const emits = defineEmits(['select']);
  // const treeData = [
  //   {
  //     label: 'Trunk 0-0',
  //     value: '0-0',
  //     items: [
  //       {
  //         label: 'Branch 0-0-2',
  //         value: '0-0-2',
  //         selectable: false,
  //         items: [
  //           {
  //             label: 'Leaf',
  //             value: '0-0-2-1',
  //             items: [
  //               {
  //                 label: 'Leaf 0-0-2',
  //                 value: '0-0-2-1-0',
  //                 items: [
  //                   {
  //                     label: 'Leaf',
  //                     value: '0-0-2-1-0-0'
  //                   }
  //                 ]
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Trunk 0-1',
  //     value: '0-1',
  //     items: [
  //       {
  //         label: 'Branch 0-1-1',
  //         value: '0-1-1',
  //         items: [
  //           {
  //             label: 'Leaf',
  //             value: '0-1-1-0'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  const treeData = ref<CbdApiProjectCommonAssetsSelectListGetResponse>([]);
  // 获取树形
  const [getFirstLevelData] = useFuncProxy(async () => {
    treeData.value = await cbdApiProjectCommonAssetsSelectListGet({
      ...props.params
    } as CbdApiProjectCommonAssetsSelectListGetRequest);
  });
  // 选择树形
  function handleCheck(v: Array<string | number>, data: any): void {
    emits('select', data);
  }
  onMounted(() => {
    getFirstLevelData();
  });
</script>

<style scoped></style>
