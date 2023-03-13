import type { VNodeData } from 'snabbdom';
import { genUUID } from '@/utils';

export class Field {
  label = '';
  field = '';
  content = '';
  children: Array<Field> = [];
  uid = genUUID();
  type = '';
  constructor(
    label = '',
    field = '',
    type = TPL.FIELD,
    children: Array<Field> = []
  ) {
    this.label = label;
    this.field = field;
    this.type = type;
    this.children = children;
  }
}

export enum TPL {
  FIELD = 'har-field',
  TABLE = 'har-table',
  TABLE_ROW = 'har-table-row',
  TABLE_CELL = 'har-table-cell'
}

export type EmptyText = {
  text: '';
};

export type ContractTemplateElement = VNodeData & {
  type: typeof TPL.FIELD;
  label: string;
  data: unknown;
  children: EmptyText[];
};
