import { computed, reactive, Ref, ref, watch } from 'vue';
import { IMergeFormData, ISplitFormData } from './types';

//todo 检查area  func 是否必填
type MergeOptionsType = {
  mergeVisible: Ref<boolean>;
  name: Ref<string>;
  splitData: Ref<ISplitFormData>;
  mergeFormData: Ref<IMergeFormData>;
  area?: number;
  func?: Function;
};

export function useContextMenu(
  modalVisible: Ref<boolean>,
  options: MergeOptionsType,
  isManage: Ref<boolean>
) {
  const contextMenuRef = ref();

  watch(
    () => isManage.value,
    () => {
      clearChecked();
    }
  );

  const mergeFormData = options.mergeFormData;

  const contextMenu = computed(() => {
    return [
      {
        text: '拆分',
        disabled: floorChecked.value.length !== 1,
        event: () => {
          const model = cacheFloorCheckedData.value[0];
          options.func &&
            options.func(
              options.splitData.value.doorPlate,
              options.splitData.value.acreage
            );
          modalVisible.value = true;
          console.log('model: ', model);
          options.splitData.value = {
            ...model,
            date: '',
            name: model?.name ?? '',
            splitList: [],
            splitNumber: 2
          };
        }
      },
      {
        text: '合并',
        disabled: floorChecked.value.length < 2,
        event: () => {
          const defaultName: string[] = [];
          let acreage = 0;
          let useAcreage = 0;
          const estateIds: number[] = [];
          cacheFloorCheckedData.value.forEach((item) => {
            defaultName.push(item.doorPlate);
            acreage += item.acreage;
            useAcreage += item.useAcreage;
            estateIds.push(item.estateId);
          });
          mergeFormData.value = {
            date: '',
            estateIds,
            acreage,
            useAcreage,
            name: defaultName.join('-').slice(0, 60)
          };
          console.log('合并数据: ', mergeFormData.value);
          options.mergeVisible.value = true;
        }
      }
    ];
  });

  const contextMenuStyle = reactive({
    top: -100,
    left: -9999
  });

  const floorChecked = ref<string[]>([]);

  type CheckBoxItemDataType = {
    name?: string;
    identity: string;
    estateId: number;
    doorPlate: string;
    acreage: number;
    useAcreage: number;
    categoryId: number;
    changeApplyCode?: string;
    changeApplyStatus?: number;
  };
  const cacheFloorCheckedData = ref<CheckBoxItemDataType[]>([]);
  function clearChecked() {
    floorChecked.value.length > 0 &&
      floorChecked.value.splice(0, floorChecked.value.length);
    cacheFloorCheckedData.value.length > 0 &&
      cacheFloorCheckedData.value.splice(0, cacheFloorCheckedData.value.length);
  }
  function handleCheck(data: CheckBoxItemDataType, disabled = false) {
    if (disabled) {
      return;
    }
    // const index = floorChecked.value.indexOf(data.estateId);
    const findIndex = cacheFloorCheckedData.value.findIndex(
      (it) => it.estateId === data.estateId
    );
    if (findIndex === -1) {
      cacheFloorCheckedData.value.push(data);
    } else {
      cacheFloorCheckedData.value.splice(findIndex, 1);
    }
  }

  function rightClick(e: any, item: any) {
    if (isManage.value) {
      contextMenuRef.value.visible = true;
      options.splitData.value = item;
      contextMenuStyle.top = e.pageY;
      contextMenuStyle.left = e.pageX;
    }

    e.preventDefault();
  }

  return {
    contextMenu,
    contextMenuRef,

    floorChecked,
    contextMenuStyle,
    cacheFloorCheckedData,
    clearChecked,
    handleCheck,
    rightClick
  };
}
