import { Field } from '../../../interface';

export type FieldElement = {
  type: 'har-field';
  width: string;
  props: {
    dataset: {
      info: Field;
    };
  };
  children: [{ text: '' }];
};
