import { VNode } from 'vue';
import { CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse } from '@/api';

export type ExpenseList =
  Required<CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse>['expenseList'];

export type Columns = Array<{
  prop?: string;
  label?: string;
  render?(row: { record: ExpenseList[number]; rowIndex: number }): VNode;
  form?: string;
}>;
