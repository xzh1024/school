import EditField from './EditField';
import InsertField from './InsertField';
import InsertAfterText from './InsertAfterText';
import InsertBeforeText from './InsertBeforeText';

export const insertFieldMenuConf = {
  key: 'insertHarField',
  factory() {
    return new InsertField();
  }
};

export const InsertAfterTextMenuConf = {
  key: 'insertAfterText',
  factory() {
    return new InsertAfterText();
  }
};

export const InsertBeforeTextMenuConf = {
  key: 'insertBeforeText',
  factory() {
    return new InsertBeforeText();
  }
};


export const FieldEditMenuConf = {
  key: 'fieldEdit',
  factory() {
    return new EditField();
  }
};
