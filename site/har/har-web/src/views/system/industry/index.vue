<template>
  <div>
    <i-table
      v-model:expandedKeys="expandedKeys"
      :options="page.options"
      :data="data"
    >
      <template #header>
        <a-button
          v-permission="['format:add']"
          type="primary"
          @click="onAddNew({})"
          >新增业态</a-button
        >
      </template>
      <template #iconCell="{ record }">
        <a-image
          :src="record.iconAttachment.previewAddress"
          width="70"
        ></a-image>
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['format:add']"
          type="text"
          @click="onAddNew(record)"
          >新增子业态</a-button
        >
        <a-button
          v-permission="['format:edit']"
          type="text"
          @click="onEdit(record)"
          >编辑</a-button
        >
      </template>
    </i-table>
    <edit
      v-if="addVisible"
      :id="currentItem.id"
      v-model="addVisible"
      :parent-id="currentItem.parentId"
      @confirm="onRefresh"
    ></edit>
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Edit from './__components__/edit.vue';
  import type { IndustryItem } from './__components__/edit.d';
  import { cbdApiProjectFormatTreeGet } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { formatData } from '@/utils';

  const addVisible = ref(false);
  const currentItem: Ref = ref({});
  const expandedKeys = ref<Array<string>>([]);
  const data: Ref = ref([]);
  const page = reactive<{
    refresh: boolean;
    options: any;
  }>({
    refresh: false,
    options: {
      tableCard: true,
      pageShow: false,
      menuOtherOptions: {
        rowKey: 'id',
        onExpandedChange(v: any) {
          console.log(v);
        }
      },
      columns: [
        { label: '业态名称', prop: 'name' },
        { label: '序号', prop: 'sort' },
        { label: '业态图标', prop: 'icon' },
        { label: '备注', prop: 'remark' }
      ]
    }
  });
  const onAddNew = (record: IndustryItem) => {
    currentItem.value = { parentId: record.id };
    addVisible.value = true;
  };
  const onEdit = (record: IndustryItem) => {
    currentItem.value = record;
    addVisible.value = true;
  };
  const [getData] = useFuncProxy(async () => {
    const res = await cbdApiProjectFormatTreeGet({});
    data.value = formatData(res);
  });
  function onRefresh() {
    getData();
  }
  onMounted(() => {
    getData();
  });
</script>
<style scoped></style>
