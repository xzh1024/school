import { Field } from '../../../interface';

export type FieldElement = {
  type: 'har-del-text';
  width: string;
  props: {
    dataset: {
      info: Field;
    };
  };
  children: [{ text: '' }];
};
