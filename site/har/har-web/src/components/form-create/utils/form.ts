import formCreate from '@form-create/arco-design';
// import formCreate from '@form-create/element-ui';
// import ruleList from '../config/rule';
// console.log(formCreate.prototype);

// formCreate.create([], {
//   global: {
//     '*': {
//       col: {
//         span: 24
//       }
//     }
//   }
// });

const designerForm = formCreate.factory();

export default formCreate;

export { designerForm };

export const formConfig = {
  'label-col-props': {
    span: 24
  },
  'wrapper-col-props': {
    span: 24
  },
  'layout': 'vertical',
  'size': 'small'
};
