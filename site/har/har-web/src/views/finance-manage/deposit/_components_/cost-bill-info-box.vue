<template>
  <div class="cost-box">
    <div class="cost-info-box">
      <div>
        <a-descriptions
          table-layout="fixed"
          title="费用信息"
          layout="inline-vertical"
          :column="{ xs: 1, md: 3, lg: 4 }"
        >
          <a-descriptions-item label="归属项目">{{
            costInfo?.projectName
          }}</a-descriptions-item>
          <a-descriptions-item label="商户名称">{{
            costInfo?.merchantName
          }}</a-descriptions-item>
          <a-descriptions-item label="店铺名称">{{
            costInfo?.storeName
          }}</a-descriptions-item>
          <a-descriptions-item label="合同号">{{
            costInfo?.contractCode
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="detail-box">
        <div class="title flex align-center justify-between">
          <div>费用详情</div>
          <a-button v-if="needEdit" type="primary" @click="onChooseCostProject"
            >选择费用</a-button
          >
        </div>
        <i-table :data="constProjectList" :options="options">
          <template #optionalCell="{ record }">
            <a-space v-if="needEdit">
              <div class="s-btn" @click="onDel(record)">删除</div>
            </a-space>
          </template>
        </i-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, watch } from 'vue';
  import { useDepositStore } from '@/store/project/deposit';
  import { modalConfirm } from '@/utils';
  import { Message } from '@arco-design/web-vue';

  const emits = defineEmits(['showProjectChoose']);

  const props = defineProps({
    needEdit: {
      type: Boolean,
      default: true
    },
    relationList: {
      type: Array,
      default: () => {}
    },
    constInfoObj: {
      type: Object,
      default: () => {}
    }
  });

  const depositStore = useDepositStore();
  const costInfo = computed(() => {
    return props.constInfoObj?.constInfo || depositStore.costInfo;
  });
  const constProjectList = computed(() => {
    return (
      props.constInfoObj?.constProjectList ||
      depositStore.costInfo.constProjectList
    );
  });

  //选择费用项目
  const onChooseCostProject = () => {
    emits('showProjectChoose');
  };

  const onDel = (record: any) => {
    console.log(record);
    const relationArr = props.relationList?.map(
      (item: any) => item.expenseItemId
    );
    if (relationArr.includes(record.expenseItemId))
      return Message.error({
        content: '不能删除已存在归还/转移记录的费用项目'
      });
    modalConfirm('确认删除？', () => {
      depositStore.delChooseCostProject(record.expenseItemId);
    });
  };

  const options = reactive({
    menu: false,
    menuSpan: 24,
    pageShow: false,
    tableCard: false,
    columns: [
      {
        label: '费用项目',
        prop: 'expenseItemName'
      },
      {
        label: '费用期间',
        prop: 'contractRangeDate'
      },
      {
        label: '已收',
        prop: 'receivedAmount'
      },
      {
        label: '已处理金额',
        prop: 'processedAmount'
      },
      {
        label: '可处理金额',
        prop: 'availableAmount'
      },
      {
        label: '操作',
        prop: 'optional',
        width: 100,
        hide: !props.needEdit
      }
    ]
  });
</script>
<style scoped lang="less">
  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
  .cost-box {
    padding: 16px 0;
    .cost-info-box {
      padding: 16px;
      background: #fff;
      .detail-box {
        margin-top: 16px;
        .title {
          color: rgb(29, 33, 41);
          font-size: 16px;
          margin-bottom: 16px;
        }
      }
    }
  }
</style>
