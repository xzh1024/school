<template>
  <div class="freeze margin-top-xl">
    <i-table
      v-model="search"
      :options="options"
      :api="svcWebServiceCounterFreezeHistoryMemberCardIdGet"
    >
      <template #menu="{ record }">
        <a-button type="text" @click="viewHandle(record.memberCardFreezeId)"
          >查看</a-button
        >
      </template>
    </i-table>
    <i-modal
      v-if="visible"
      v-model="visible"
      :options="modalOptions"
      title="冻结/解冻详情"
      :width="960"
    >
      <freeze-detail :id="currentId" />
    </i-modal>
  </div>
</template>
<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import IModal from '@/components/i-modal/index.vue';
  import FreezeDetail from './freezeDetail.vue';
  import { svcWebServiceCounterFreezeHistoryMemberCardIdGet } from '@/api/svc-web';
  import { freezeStatusList } from '@/utils/dic';

  const props = defineProps({
    id: {
      type: [Number, String]
    }
  });
  interface listItemType {
    memberCardFreezeId?: number;
    type?: number;
    code?: string;
    freezeBy?: string;
    freezeTime?: string;
  }
  const currentId = ref<number | string>('');
  const search = ref({ memberCardId: props.id });
  const visible = ref(false);
  const modalOptions = reactive({
    titleAlign: 'start',
    footer: false,
    bodyStyle: {
      background: '#f7f7f7'
    }
  });
  const page = reactive({
    pageSize: 10,
    current: 1,
    total: 0
  });
  const options = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      pageShow: !!page.total,
      columns: [
        {
          label: '类型',
          prop: 'type',
          formatter: (record: listItemType) => {
            return freezeStatusList.find((i) => i.value === record.type)?.label;
          }
        },
        {
          label: '单号',
          prop: 'code'
        },
        {
          label: '操作人',
          prop: 'freezeBy'
        },
        {
          label: '操作时间',
          prop: 'freezeTime'
        }
      ]
    };
  });

  function viewHandle(id: number) {
    console.log(id);
    currentId.value = id;
    visible.value = true;
  }
</script>
<style scoped lang="less"></style>
