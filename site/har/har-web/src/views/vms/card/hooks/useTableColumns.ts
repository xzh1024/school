import {
  groundPcApiCardBaseDropListGet,
  type GroundPcApiCardBaseDropListGetResponse
} from '@/api/ground-pc-api';
import useFuncProxy from '@/hooks/useFuncProxy';
import { useProjectOptions } from '@/views/vms/hooks/usePorject';
import { useStoreOptions } from '@/views/vms/hooks/useStore';
import { ref, type Ref } from 'vue';
import { useVenueOptions } from '../../hooks/useVenue';

type TableRowItemType = {
  projectName: string;
  storeName: string;
  shelfStatusName: string;
  saleStatusName: string;
  saleChannelName: string;
};

export const [getOptions] = useFuncProxy(
  async (ops: {
    [key: string]: Ref<GroundPcApiCardBaseDropListGetResponse>;
  }) => {
    const key = Object.keys(ops)[0];
    const list = Object.values(ops)[0];
    const d = await groundPcApiCardBaseDropListGet({ type: key });
    list.value = d;
  }
);

const { getProjectOptions, projectOptions } = useProjectOptions();
getProjectOptions();
const { getStoreOptions, storeOptions } = useStoreOptions();
getStoreOptions({ projectId: '' });
const { getVenueOptions, venueOptions } = useVenueOptions();
getVenueOptions({ projectId: '', storeId: '' });

export const SHELF_STATUS = ref<GroundPcApiCardBaseDropListGetResponse>([]);
getOptions({ SHELF_STATUS: SHELF_STATUS });

export const SALE_CHANNEL = ref<GroundPcApiCardBaseDropListGetResponse>([]);
getOptions({ SALE_CHANNEL: SALE_CHANNEL });

export const SALE_STATUS = ref<GroundPcApiCardBaseDropListGetResponse>([]);
getOptions({ SALE_STATUS: SALE_STATUS });

export default function useTableColumns(type: string) {
  const columns =
    type === 'once'
      ? [
          {
            label: '次卡名称',
            width: 100,
            prop: 'name'
          },
          {
            label: '次数',
            width: 100,
            prop: 'limitTimes'
          }
        ]
      : [
          {
            label: '限期卡名称',
            width: 120,
            prop: 'name'
          }
        ];

  return [
    {
      label: '项目名称',
      search: true,
      prop: 'projectId',
      type: 'select',
      dic: projectOptions,
      width: 100,
      formatter({ projectName }: TableRowItemType) {
        return projectName;
      },
      on: {
        change(v: string) {
          getStoreOptions({ projectId: v });
        }
      }
    },
    {
      label: '店铺名称',
      search: true,
      prop: 'storeId',
      type: 'select',
      width: 100,
      dic: storeOptions,
      formatter({ storeName }: TableRowItemType) {
        return storeName;
      }
    },
    ...columns,
    {
      label: '有效期(天)',
      width: 100,
      prop: 'expirationDate'
    },
    {
      label: '场馆范围',
      width: 100,
      search: true,
      type: 'select',
      prop: 'venuesArea',
      dic: venueOptions
    },
    {
      label: '售价(元)',
      prop: 'salePrice',
      width: 100
    },
    {
      label: '上架状态',
      search: true,
      prop: 'shelveStatus',
      type: 'select',
      width: 90,
      dic: SHELF_STATUS,
      formatter({ shelfStatusName }: TableRowItemType) {
        return shelfStatusName;
      }
    },
    {
      label: '发布渠道',
      prop: 'saleChannel',
      search: true,
      width: 90,
      type: 'select',
      dic: SALE_CHANNEL,
      formatter({ saleChannelName }: TableRowItemType) {
        return saleChannelName;
      }
    },
    {
      label: '售卖状态',
      prop: 'saleStatus',
      width: 90,
      dic: SALE_STATUS,
      formatter({ saleStatusName }: TableRowItemType) {
        return saleStatusName;
      }
    },
    {
      label: '是否可售',
      prop: 'saleStatus',
      search: true,
      width: 100,
      hide: true,
      type: 'select',
      dic: [
        { label: '可售', value: 1 },
        { label: '停售', value: 2 }
      ]
    }
  ];
}
