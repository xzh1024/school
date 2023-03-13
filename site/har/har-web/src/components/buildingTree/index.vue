<template>
  <div class="buildingTree">
    <a-tree
      :data="projectTree"
      :field-names="{
        key: 'label',
        title: 'label',
        children: 'children'
      }"
      @select="clickBuilding"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BuildingTree'
  };
</script>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import {
    cbdApiProjectCommonBuildingListSelectGet,
    type CbdApiProjectCommonBuildingListSelectGetResponse,
    cbdApiProjectCommonProjectSelectListGet
  } from '@/api';
  import { getCookie } from '@/utils/cookies';
  import lsStore from '@/utils/ls-store';

  type BuildingItem =
    Required<CbdApiProjectCommonBuildingListSelectGetResponse>[0];
  interface BuildIngItemType extends BuildingItem {
    isLeaf: boolean;
  }
  const emits = defineEmits(['getBuildingId']);

  const projectTree = ref<Array<any>>([]);

  async function getProjectTree() {
    const projectId = lsStore.getItem('projectId')!;
    projectTree.value = await cbdApiProjectCommonProjectSelectListGet({
      name: '',
      areaId: '',
      companyId: ''
    });
    if (projectTree.value && projectTree.value.length) {
      // 当前项目index
      const idx = projectTree.value.findIndex(
        (el) => el.value === Number(projectId)
      );
      // 当前项目的楼宇
      const result = await cbdApiProjectCommonBuildingListSelectGet({
        projectId
      });
      // 楼宇数据构造
      const children: BuildIngItemType[] = [];
      result.forEach((el) => {
        children.push({
          ...el,
          isLeaf: true
        });
      });
      // 重新构造项目数据
      projectTree.value[idx] = {
        ...projectTree.value[idx],
        children
      };
    }
  }

  function clickBuilding(data: any, e: any) {
    const buildingId = e.node.isLeaf ? e.node.value : '';
    emits('getBuildingId', buildingId);
  }

  onMounted(() => {
    getProjectTree();
  });
</script>

<style scoped lang="less">
  .buildingTree {
    padding-top: 20px;
    border: 1px solid #f2f3f5;
  }
</style>
