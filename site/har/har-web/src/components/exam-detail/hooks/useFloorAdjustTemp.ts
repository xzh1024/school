export function useFloorAdjustTemp(module: string, disabled: boolean) {
  return [
    {
      type: 'Row',
      children: [
        {
          label: '原铺位信息',
          type: 'Divider',
          text: '原铺位信息',
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
              prop: 'projectName',
              span: 6
            },
            {
              label: '铺位类型',
              prop: 'type',
              span: 6
            }
          ]
        }
      }
    },
    {
      type: 'Table',
      prop: 'oldBuildingList',
      attrs: {
        options: {
          menu: false,
          pageShow: false,
          columns: [
            {
              label: '楼宇',
              prop: 'building'
            },
            {
              label: '楼层',
              prop: 'floor'
            },
            {
              label: '铺位号',
              prop: 'code'
            },
            {
              label: '建筑面积（㎡）',
              prop: 'area'
            },
            {
              label: '使用面积（㎡）',
              prop: 'usedArea'
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
              label: '总建筑面积',
              prop: 'totalArea',
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
              label: '总使用面积',
              prop: 'totalUsedArea',
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
          type: 'Divider',
          text: '新铺位信息',
          attrs: {
            orientation: 'left'
          }
        }
      ]
    },
    {
      type: 'Table',
      prop: 'buildingList',
      attrs: {
        options: {
          menu: false,
          pageShow: false,
          columns: [
            {
              label: '楼宇',
              prop: 'building'
            },
            {
              label: '楼层',
              prop: 'floor'
            },
            {
              label: '铺位号',
              prop: 'code'
            },
            {
              label: '建筑面积（㎡）',
              prop: 'area'
            },
            {
              label: '使用面积（㎡）',
              prop: 'usedArea'
            }
          ]
        }
      }
    }
  ];
}
