import { number } from 'echarts';
import { ref } from 'vue';
type recordType = {
  id: string;
};
// export type berthDataType = {
//   estateSnapshotId?: number;
//   buildingName?: string;
//   buildingId?: number;
//   buildingFloorName?: string;
//   buildingFloorId?: number;
//   estateSnapshotName?: string;
//   estateSnapshotCode?: string;
//   acreage?: number;
//   useAcreage?: number;
// };
export type EditForm = {
  id?: number;
  projectId?: number;
  avatarUrl?: string;
  name?: string;
  phone?: string | undefined;
  identityNo?: string;
  remark?: string;
  personType?: number | undefined; // 0-未成年,1-成年人
  sourceType?: number | undefined; // 会员来源
  labelIds?: number[]; // 会员标签
  gender?: number | undefined; // 性别
  brithDay?: string; // 生日
  height?: number | undefined; // 身高
  weight?: number | undefined; // 体重
  fitnessLevel?: string | undefined; // 健身等级
  fitnessGoal?: string; // 健身目标
};
export function useAddModel() {
  const modelVisible = ref(false);
  const modelSource = ref('add');
  const modelTitle = ref('添加会员');
  const rowId = ref('');
  // 编辑
  function handleEdit(record: recordType) {
    rowId.value = String(record.id);
    modelSource.value = 'edit';
    modelTitle.value = '修改会员';
    modelVisible.value = true;
  }
  // 新增
  function handleAdd() {
    modelSource.value = 'add';
    modelTitle.value = '添加会员';
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
