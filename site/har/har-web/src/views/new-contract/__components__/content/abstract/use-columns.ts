import { computed, h } from 'vue';
import { Columns } from './interface';
import { useContractStore } from '@/store/project/contract';

export function useColumns() {
  const { contractInfo } = useContractStore();
  const columns = computed(() => {
    let columns: Columns = [];
    // 1意向合同 2正式合同
    switch (contractInfo.contractType) {
      case 1:
        columns = [
          { label: '费用项目', prop: 'expenseName' },
          {
            label: '阶段期间',
            render({ record }) {
              const text = [];
              record.stageStart != null && text.push(record.stageStart);
              record.stageEnd != null && text.push(record.stageEnd);
              return h('span', [text.join(' ~ ')]);
            }
          },
          { label: '账单生成日', prop: 'billGenDate' },
          {
            label: '是否含税（税率）',
            prop: 'taxFlag',
            render({ record }) {
              let text = '';
              if (record.taxFlag != null) {
                text = record.taxFlag === 1 ? '含税' : '不含税';
                text += `（${record.tax}%）`;
              }
              return h('span', [text]);
            }
          },
          { label: '收款调整', prop: 'paymentInfo' },
          { label: '结算条款', prop: 'settlementInfo' },
          { label: '免租条款', prop: 'rentFreeInfo' },
          { label: '滞纳金条款', prop: 'lateFeeInfo' }
        ];
        break;
      case 2:
        columns = [
          { label: '费用项目', prop: 'expenseName' },
          { label: '账单生成日', prop: 'billGenDate' },
          {
            label: '是否含税（税率）',
            prop: 'taxFlag',
            render({ record }) {
              let text = '';
              if (record.taxFlag != null) {
                text = record.taxFlag === 1 ? '含税' : '不含税';
                text += `（${record.tax}%）`;
              }
              return h('span', [text]);
            }
          },
          {
            label: '租期',
            render({ record }) {
              const text = [];
              record.stageStart != null && text.push(record.stageStart);
              record.stageEnd != null && text.push(record.stageEnd);
              return h('span', [text.join(' ~ ')]);
            }
          },
          { label: '收款调整', prop: 'paymentInfo' },
          { label: '结算条款', prop: 'settlementInfo' },
          { label: '免租条款', prop: 'rentFreeInfo' },
          { label: '滞纳金条款', prop: 'lateFeeInfo' }
        ];
        break;
    }

    return columns;
  });
  return {
    columns
  };
}
