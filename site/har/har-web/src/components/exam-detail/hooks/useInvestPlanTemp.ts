
import {calculationList } from '@/utils/dic';
import {
  CbdApiProjectCommonMerchantBrandListGetResponse,
  CbdApiProjectCommonMerchantListGetResponse
} from '@/api';
import { computed, ref } from 'vue';
const merchantDropList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
const brandDropList = ref<CbdApiProjectCommonMerchantBrandListGetResponse>([]);
const projectId = ref('');
const dateRangeList = computed(() => {
  const arr = [];
  for (let i = 1; i <= 31; i++) {
    arr.push({ label: `${i}`, value: i });
  }
  return [...arr, { label: '自然月底', value: -1 }];
});
export function useInvestPlanTemp(
  module: string,
  disabled: boolean,
  id?: string
) {
  projectId.value = id || '';
  return [
    {
      type: 'Row',
      children: [
        {
          label: '基本信息',
          type: 'Divider',
          text: '基本信息',
          span: '',
          attrs: {
            orientation: 'left'
          }
        }
      ]
    },
    {
      type: 'Form',
      prop: module === 'process' ? 'base' : '',
      attrs: {
        options: {
          menuForm: false,
          formCard: false,
          disabled: true,
          columns: [
            {
              label: '归属项目',
              prop: 'projectName',
              span: 6
            },
            {
              label: '编号',
              prop: 'code',
              span: 6
            },
            {
              label: '计划名称',
              prop: 'planName',
              span: 6
            },
            {
              label: '铺位类型',
              prop: module === 'process' ? 'type' : 'estateType',
              type: 'select',
              dic: module === 'process' ? [] : [],
              span: 6
            }
          ]
        }
      }
    },
    {
      type: 'Table',
      prop: module === 'process' ? 'base.buildingList' : 'floorList',
      attrs: {
        options: {
          menu: false,
          pageShow: false,
          columns: [
            {
              label: '楼宇',
              prop: module === 'process' ? 'building' : 'buildingName'
            },
            {
              label: '楼层',
              prop: module === 'process' ? 'floor' : 'floorName'
            },
            {
              label: '铺位号',
              prop: module === 'process' ? 'code' : 'estateName'
            },
            {
              label: '建筑面积（㎡）',
              prop: module === 'process' ? 'area' : 'acreage'
            },
            {
              label: '使用面积（㎡）',
              prop: module === 'process' ? 'usedArea' : 'useAcreage'
            }
          ]
        }
      }
    },
    {
      type: 'Form',
      prop: module === 'process' ? 'base' : '',
      attrs: {
        options: {
          menuForm: false,
          formCard: false,
          disabled: disabled,
          columns: [
            {
              label: '目标商户',
              prop: module === 'process' ? 'merchant' : 'merchantId',
              span: 6,
              type: 'select',
              options: {
                multiple: true
              },
              dic: module === 'process' ? [] : merchantDropList.value
            },
            {
              label: '目标品牌',
              prop: module === 'process' ? 'brand' : 'brandId',
              span: 6,
              type: 'select',
              options: {
                multiple: true
              },
              dic: module === 'process' ? [] : brandDropList.value
            },
            {
              label: '渠道',
              prop: module === 'process' ? 'channel' : 'channelName',
              span: 6
            },
            {
              label: '开始时间',
              prop: module === 'process' ? 'startTime' : 'startDate',
              span: 6
            },
            {
              label: '结束时间',
              prop: module === 'process' ? 'endTime' : 'endDate',
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
          text: '佣金政策',
          attrs: {
            orientation: 'left'
          }
        }
      ]
    },
    {
      type: 'Form',
      prop: module === 'process' ? 'commissionPolicy' : '',
      attrs: {
        options: {
          menuForm: false,
          formCard: false,
          disabled: disabled,
          columns: [
            {
              label: '奖励措施',
              prop: module === 'process' ? 'incentives' : 'settleMode',
              type: 'select',
              dic: module === 'process' ? [] : calculationList,
              span: 6
            },
            {
              label: '比例',
              prop: module === 'process' ? 'percent' : 'showRadio',
              span: 6
            },
            {
              label: '账单生成日期',
              prop: 'billGenDate',
              type: 'select',
              dic: module === 'process' ? [] : dateRangeList.value,
              span: 6
            },
            {
              label: '是否含税',
              prop: module === 'process' ? 'hasTax' : 'taxIncluded',
              span: 6,
              type: 'select',
              dic: [
                { label: '是', value: 1 },
                { label: '否', value: 2 }
              ]
            },
            {
              label: '税率',
              prop: module === 'process' ? 'taxPercent' : 'taxFee',
              span: 6
            },
            {
              label: '备注',
              prop: 'remark',
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
          text: '渠道人员',
          attrs: {
            orientation: 'left'
          }
        }
      ]
    },
    {
      type: 'Table',
      prop: module === 'process' ? 'channelUserList' : 'personnelList',
      attrs: {
        options: {
          menu: false,
          pageShow: false,
          columns: [
            {
              label: '姓名',
              prop: 'name'
            },
            {
              label: '电话',
              prop: 'phone'
            },
            {
              label: '等级',
              prop: 'level'
            }
          ]
        }
      }
    }
  ];
}
