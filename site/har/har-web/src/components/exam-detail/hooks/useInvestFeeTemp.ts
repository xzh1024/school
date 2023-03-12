export function useInvestFeeTemp(module: string, disabled: boolean) {
  return [
    {
      type: 'Row',
      children: [
        {
          label: '基础信息',
          type: 'Divider',
          text: '基础信息',
          span: '',
          attrs: {
            orientation: 'left'
          }
        }
      ]
    },
    {
      type: 'Form',
      prop: '',
      attrs: {
        options: {
          menuForm: false,
          formCard: false,
          disabled: disabled,
          columns: [
            {
              label: '归属项目',
              key: 'type',
              span: 6
            },
            {
              label: '计划名称',
              key: 'projectName',
              span: 6
            },
            {
              label: '渠道名称',
              key: 'projectName',
              span: 6
            },
            {
              label: '奖励措施',
              key: 'remark',
              span: 6
            }
          ]
        }
      }
    },
    {
      type: 'Form',
      prop: '',
      attrs: {
        options: {
          menuForm: false,
          formCard: false,
          disabled: disabled,
          columns: [
            {
              label: '比例',
              key: 'shopName',
              span: 6
            },
            {
              label: '账单生成日期',
              key: 'brandName',
              span: 6
            },
            {
              label: '合同号',
              key: 'format',
              span: 6
            }
          ]
        }
      }
    },
    {
      type: 'Row',
      children: [
        {
          label: '原始账单',
          type: 'Divider',
          text: '原始账单',
          span: '',
          attrs: {
            orientation: 'left'
          }
        }
      ]
    },
    {
      type: 'Form',
      prop: '',
      attrs: {
        options: {
          menuForm: false,
          formCard: false,
          disabled: disabled,
          columns: [
            {
              label: '费用项目',
              key: 'buildingName',
              span: 4
            },
            {
              label: '计算方式',
              key: 'doorPlate',
              span: 4
            },
            {
              label: '比例',
              key: 'mainDoorPlate',
              span: 4
            },
            {
              label: '账单生成日期',
              key: 'mainDoorPlate',
              span: 4
            },
            {
              label: '账期',
              key: 'mainDoorPlate',
              span: 4
            }
          ]
        }
      }
    },
    {
      type: 'Form',
      prop: '',
      attrs: {
        options: {
          menuForm: false,
          formCard: false,
          disabled: disabled,
          columns: [
            {
              label: '金额',
              key: 'acreage',
              span: 4
            },
            {
              label: '税率',
              key: 'useAcreage',
              span: 4
            },
            {
              label: '不含税金额',
              key: 'useAcreage',
              span: 4
            },
            {
              label: '税额',
              key: 'useAcreage',
              span: 4
            },
            {
              label: '总金额',
              key: 'useAcreage',
              span: 4
            }
          ]
        }
      }
    },

    {
      type: 'Row',
      children: [
        {
          type: 'Divider',
          text: '账单调整',
          attrs: {
            orientation: 'left'
          }
        }
      ]
    },
    {
      type: 'Table',
      prop: '',
      attrs: {
        options: {
          menu: false,
          pageShow: false,
          columns: [
            {
              label: '费用项目',
              prop: 'building'
            },
            {
              label: '可调整金额',
              prop: 'floor'
            },
            {
              label: '调整后金额',
              prop: 'code'
            },
            {
              label: '调整金额',
              prop: 'area'
            },
            {
              label: '税额',
              prop: 'useArea'
            },
            {
              label: '总金额',
              prop: 'useArea'
            },
            {
              label: '备注',
              prop: 'useArea'
            }
          ]
        }
      }
    }
  ];
}
