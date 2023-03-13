<template>
  <drawer v-model="visible" title="查看会员等级">
    <template #footer>
      <a-button type="primary" @click="onEdit">编辑</a-button>
    </template>
    <div class="white-detail-box">
      <a-divider orientation="left">基本信息</a-divider>
      <a-descriptions>
        <a-descriptions-item label="会员等级" :span="3">{{
            data.defaultName
          }}</a-descriptions-item>
        <a-descriptions-item label="等级名称">{{
            data.name
          }}</a-descriptions-item>
        <a-descriptions-item label=" 获取条件"
        >{{ data.levelBean }} 等级豆</a-descriptions-item
        >
      </a-descriptions>
      <a-divider orientation="left">会员权益</a-divider>
      <a-descriptions layout="horizontal">
        <a-descriptions-item
          v-for="(item, idx) in rightsListExceptId4"
          :key="idx"
          :label="item.rightsName"
          :span="3"
        >{{
            item.rightsValue +
            (item.id === 1 ? ' 折' : item.id === 2 ? ' 倍' : ' 积分')
          }}</a-descriptions-item
        >
      </a-descriptions>
      <a-descriptions
        v-if="data.rightsCouponList && data.rightsCouponList.length"
        layout="vertical"
      >
        <a-descriptions-item
          v-if="tableItem"
          :label="tableItem.rightsName"
          :span="3"
        >
          <i-table :options="page.options" :data="data.rightsCouponList">
            <template #typeCell="{ record }">
              {{ mallWelfareTypeHash[record.type] }}</template
            >
          </i-table>
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, Ref, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { cbdApiProjectMembersLevelDetailIdGet } from '@/api';
  import { mallWelfareTypeHash } from '@/utils/dic';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue', 'edit']);
  const visible: Ref = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
  const page = reactive<any>({
    options: {
      tableCard: false,
      pageShow: false,
      indexTitle: '序号',
      index: true,
      menu: false,
      columns: [
        {
          label: '优惠券名称',
          prop: 'name'
        },
        {
          label: '类型',
          prop: 'type'
        },
        {
          label: '使用门槛',
          prop: 'useThreshold'
        },
        {
          label: '赠送数量',
          prop: 'giveQuantity'
        }
      ]
    }
  });
  const data: Ref = ref({});
  const rightsListExceptId4: Ref = ref({});
  const tableItem: Ref = computed(() => {
    return data.value.levelRightList?.find((el: any) => el.id === 4);
  });
  function onEdit() {
    emits('edit');
  }
  const [getDetailData] = useFuncProxy(async () => {
    data.value = await cbdApiProjectMembersLevelDetailIdGet({
      id: String(props.id)
    });
    const checkList = data.value.levelRightList.filter((el: any) => el.checked);
    rightsListExceptId4.value = checkList.filter((el: any) => el.id !== 4);
  });
  onMounted(() => {
    if (props.id) {
      getDetailData();
    }
  });
</script>
<style scoped></style>
