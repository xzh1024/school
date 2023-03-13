export function useContractTemp(module: string, disabled: boolean) {
  return [
    {
      type: 'Row',
      children: [
        {
          label: '合同摘要',
          type: 'Divider',
          text: '合同摘要',
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
              label: '合同号',
              prop: 'contractCode',
              span: 8
            },
            {
              label: '项目名称',
              prop: 'projectName',
              span: 8
            },
            {
              label: '承租方',
              prop: 'merchantName',
              span: 8
            },
            {
              label: '合同版本',
              prop: 'version',
              span: 8
            },
            {
              label: '合同说明',
              prop: 'contractRemark',
              type: 'textarea',
              span: 24
            }
          ]
        }
      }
    },
    {
      type: 'Row',
      children: [
        {
          label: '租赁用途',
          type: 'Divider',
          text: '租赁用途',
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
              label: '店铺',
              prop: 'storeName',
              span: 8
            },
            {
              label: '品牌',
              prop: 'brandName',
              span: 8
            },
            {
              label: '业态',
              prop: 'formatName',
              span: 8
            }
          ]
        }
      }
    },
    {
      type: 'Row',
      children: [
        {
          label: '租赁标的',
          type: 'Divider',
          text: '租赁标的',
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
          pageShow: false,
          disabled: disabled,
          columns: [
            {
              label: '楼层',
              prop: 'floorName',
              span: 8
            },
            {
              label: '铺位号',
              prop: 'estateName',
              span: 8
            },
            {
              label: '主营铺位号',
              prop: 'mainEstateName',
              span: 8
            },
            {
              label: '建筑面积',
              prop: 'estateFloorage',
              span: 8
            },
            {
              label: '使用面积',
              prop: 'estateUseArea',
              span: 8
            }
          ]
        }
      }
    },
    {
      type: 'Row',
      children: [
        {
          label: '租赁期限',
          type: 'Divider',
          text: '租赁期限',
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
              label: '签约日期',
              prop: 'signDate',
              span: 8
            },
            {
              label: '合同租赁开始时间',
              prop: 'leaseStartDate',
              span: 8
            },
            {
              label: '合同租赁结束时间',
              prop: 'leaseEndDate',
              span: 8
            }
          ]
        }
      }
    },
    {
      type: 'Row',
      children: [
        {
          label: '意向金/保证金',
          type: 'Divider',
          text: '意向金/保证金',
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
              label: '意向金/保证金',
              prop: 'intentionInfo',
              type: 'textarea',
              span: 24
            }
          ]
        }
      }
    },
    {
      type: 'Row',
      children: [
        {
          label: '返款信息',
          type: 'Divider',
          text: '返款信息',
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
              label: '返款信息',
              prop: 'refundInfo',
              type: 'textarea',
              span: 24
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
          text: '租金及费用',
          attrs: {
            orientation: 'left'
          }
        }
      ]
    },
    {
      type: 'Table',
      prop: 'expenseList',
      attrs: {
        options: {
          scroll: {
            x: '140%'
          },
          columns: [
            {
              label: '费用项目',
              width: 100,
              prop: 'expenseName'
            },
            {
              label: '费用阶段时间',
              width: 140,
              isSlot: true,
              prop: 'stageStart'
            },
            {
              label: '账单生成日',
              width: 100,
              prop: 'billGenDate'
            },
            {
              label: '是否含税',
              width: 80,
              isSlot: true,
              prop: 'taxFlag'
            },
            {
              label: '税率',
              isSlot: true,
              width: 80,
              prop: 'tax'
            },
            {
              label: '收款调整',
              width: 100,
              prop: 'paymentInfo'
            },
            {
              label: '结算条款',
              width: 250,
              prop: 'settlementInfo'
            },
            {
              label: '免租条款',
              width: 220,
              prop: 'rentFreeInfo'
            },
            {
              label: '滞纳金条款',
              width: 220,
              prop: 'lateFeeInfo'
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
          text: '附件',
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
              label: '',
              prop: 'resourceList',
              type: 'customUpload',
              options: {
                urlKey: 'previewAddress',
                options: {
                  showUploadButton: false
                }
              },
              span: 24
            }
          ]
        }
      }
    }
  ];
}
