export default function field() {
  return [
    {
      type: 'input',
      field: 'field',
      value: '',
      title: '字段 ID',
      props: {
        placeholder: '请输入字段值'
      }
    },
    {
      type: 'input',
      field: 'title',
      value: '',
      title: '字段名称',
      props: {
        placeholder: '请输入字段值'
      }
    }
    // {
    //   type: 'input',
    //   field: 'info',
    //   value: '',
    //   title: '提示信息'
    // },
    // {
    //   type: 'Struct',
    //   field: '_control',
    //   value: [],
    //   title: '联动数据',
    //   props: {
    //     defaultValue: [],
    //     validate(val) {
    //       if (!Array.isArray(val)) return false;
    //       if (!val.length) return true;
    //       return !val.some(({ rule }) => {
    //         return !Array.isArray(rule);
    //       });
    //     }
    //   }
    // },
    // {
    //   type: 'col',
    //   props: {
    //     span: 24
    //   },
    //   children: [
    //     {
    //       type: 'button',
    //       props: {
    //         status: 'primary',
    //         size: 'small'
    //       },
    //       inject: true,
    //       on: {
    //         click({ $f }) {
    //           const rule = $f.activeRule;
    //           if (rule) {
    //             rule.__fc__.updateKey();
    //             rule.value = undefined;
    //             rule.__fc__.$api.sync(rule);
    //           }
    //         }
    //       },
    //       native: true,
    //       children: ['清空值']
    //     },
    //     {
    //       type: 'button',
    //       props: {
    //         status: 'success',
    //         size: 'small'
    //       },
    //       inject: true,
    //       on: {
    //         click({ $f }) {
    //           const rule = $f.activeRule;
    //           if (rule) {
    //             rule.__fc__.updateKey(true);
    //             rule.__fc__.$api.sync(rule);
    //           }
    //         }
    //       },
    //       native: true,
    //       children: ['刷新']
    //     }
    //   ]
    // }
  ];
}
