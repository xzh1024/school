import { ref } from 'vue';
import {
  CbdApiProjectCommonMisTreeExpenseGetResponse,
  CbdApiProjectCommonMisPayMethodSelectContractGetResponse
} from '@/api';

export type PayMethodList = Array<
  {
    disabled?: boolean;
  } & CbdApiProjectCommonMisPayMethodSelectContractGetResponse[number]
>;

export function useOptions<T>(defaultOptions?: T) {
  const optionsConfig = {
    intoTaxIncluded: [] as CbdApiProjectCommonMisTreeExpenseGetResponse,
    periodUnit: [
      { label: '月', value: 1 },
      { label: '日', value: 2 }
    ],
    booleanUnit: [
      { label: '是', value: 1 },
      { label: '否', value: 0 }
    ],
    backUnitTwo: [
      { label: '月', value: 1 },
      { label: '自然日', value: 2 },
      { label: '工作日', value: 3 }
    ],
    backUnitOne: [
      { label: '延后', value: 1 },
      { label: '提前', value: 2 }
    ],
    payMethod: [] as PayMethodList,
    ...defaultOptions
  };

  type OptionsConfig = typeof optionsConfig & T;

  const options = ref<OptionsConfig>(optionsConfig as OptionsConfig);

  return { options };
}
