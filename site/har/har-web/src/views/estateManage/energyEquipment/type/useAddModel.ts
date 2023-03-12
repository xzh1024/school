import { number } from 'echarts';
import { ref } from 'vue';
type recordType = {
  id: string;
};
export type berthDataType = {
  estateSnapshotId?: number;
  buildingName?: string;
  buildingId?: number;
  buildingFloorName?: string;
  buildingFloorId?: number;
  estateSnapshotName?: string;
  estateSnapshotCode?: string;
  acreage?: number;
  useAcreage?: number;
};
export type EditForm = {
  id?: number;
  projectId?: number;
  buildingId?: number | undefined;
  floorIds?: number[];
  Berths?: number[];
  deviceType?: string | number;
  deviceCode?: string;
  deviceName?: string;
  isIntellectDevice?: number;
  costProjectId?: number;
  magnification?: number;
  maxReadNum?: number | undefined;
  LossRate?: number | undefined;
  lastDate?: string | Date;
  currentReadNum?: number | undefined;
  unitPrice?: number;
  isCludeRate?: string | number;
  taxRate?: number | undefined;
  hardwareCode?: string;
  brand?: string;
  ecRecordState?: number;
};
export function useAddModel() {
  const modelVisible = ref(false);
  const modelSource = ref('add');
  const modelTitle = ref('添加能耗设备');
  const rowId = ref('');
  // 编辑
  function handleEdit(record: recordType) {
    rowId.value = String(record.id);
    modelSource.value = 'edit';
    modelTitle.value = '修改能耗设备'
    modelVisible.value = true;
  }
  // 新增
  function handleAdd() {
    modelSource.value = 'add';
    modelTitle.value = '添加能耗设备'
    modelVisible.value = true;
    rowId.value = '';
  }

  return {
    modelVisible,
    modelSource,
    modelTitle,
    rowId,

    handleEdit,
    handleAdd
  };
}
