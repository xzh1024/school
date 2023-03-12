<template>
  <div class="buildingConfig">
    <i-table
      v-model="search"
      v-model:refresh-now="refresh"
      :options="options"
      :api="cbdApiProjectBuildingPageGet"
    >
      <template #header>
        <a-button
          v-permission="['building:add']"
          type="primary"
          @click="buildingAdd($refs.editFormRef)"
          >新建楼宇</a-button
        >
      </template>
      <template #statusCell="{ record }">
        <a-switch
          v-model="record.status"
          :checked-value="1"
          :unchecked-value="2"
          :disabled="useSwitchPermission('building:update')"
          @change="statusChange(record.id, record.status)"
        />
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['building:update']"
          type="text"
          @click="buildingEdit(record.id)"
          >编辑</a-button
        >
        <a-button
          v-permission="['building:info']"
          type="text"
          @click="buildingView(record.id)"
          >查看</a-button
        >
      </template>
    </i-table>

    <a-modal
      v-model:visible="modalVisible"
      :mask-closable="false"
      :closable="false"
      width="800px"
      :title="`${modalTitle}楼宇`"
    >
      <div style="height: 70vh; overflow-y: scroll">
        <a-steps
          :current="currentStep"
          label-placement="vertical"
          style="width: 70%; margin: 0 auto"
        >
          <a-step>基本信息设置</a-step>
          <a-step>楼层信息设置</a-step>
        </a-steps>
        <a-form
          v-show="currentStep === 1"
          ref="editFormRef"
          :model="editForm"
          :rules="editRules"
          auto-label-width
          layout="vertical"
          style="width: 95%"
        >
          <a-divider orientation="left">基本信息</a-divider>
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item field="projectId" label="归属项目">
                <a-select
                  v-model="editForm.projectId"
                  placeholder="请选择项目"
                  disabled
                >
                  <a-option
                    v-for="item in projectList"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="status" label="状态">
                <a-radio-group v-model="editForm.status">
                  <a-radio
                    v-for="(item, index) in statusList"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item field="name" label="楼宇名称">
                <a-input v-model="editForm.name" placeholder="请输入楼宇名称" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="type" label="楼宇类型">
                <a-select v-model="editForm.type" placeholder="请选择类型">
                  <a-option
                    v-for="item in buildingTypeList"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="code" label="楼宇编号">
                <a-input v-model="editForm.code" placeholder="请输入楼宇编号" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="houseNumber" label="楼宇门牌号">
                <a-input
                  v-model="editForm.houseNumber"
                  placeholder="例如:金科南路369号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider orientation="left">楼层信息</a-divider>
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item field="groundFloorCount" label="地上楼层">
                <a-input-number
                  v-model="editForm.groundFloorCount"
                  placeholder="请输入地上楼层"
                  mode="button"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="undergroundFloorCount" label="地下楼层">
                <a-input-number
                  v-model="editForm.undergroundFloorCount"
                  placeholder="请输入地上楼层"
                  mode="button"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider orientation="left">楼层信息</a-divider>
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item field="areaCode" label="地址">
                <a-cascader
                  v-model="editForm.areaCode"
                  :options="addressOptions"
                  :path-mode="true"
                  placeholder="请选择省 / 市 / 区"
                  @change="areaChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="16">
              <a-form-item field="address" label="详细地址">
                <a-input
                  v-model="editForm.address"
                  placeholder="*****小区**栋**单元**楼**号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item field="attachmentList" label="附件">
                <i-custom-upload
                  v-model="editForm.attachmentList"
                  url-key="previewAddress"
                >
                </i-custom-upload>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div v-show="currentStep === 2">
          <a-divider orientation="left">楼层信息</a-divider>
          <a-table :columns="floorColumnsEdit" :data="floorDataEdit">
            <template #floorName="{ record }">
              <a-input
                v-model="record.floorName"
                :placeholder="`不填写默认为${record.facadeNumber}F`"
              />
            </template>
            <template #storyHeight="{ record }">
              <a-input
                v-model="record.storyHeight"
                placeholder="不填写默认为2.8m"
              />
            </template>
            <template #area="{ record }">
              <a-input v-model="record.area" placeholder="不填写默认为0㎡" />
            </template>
          </a-table>
        </div>
      </div>
      <template #footer>
        <div v-if="currentStep === 1">
          <a-button @click="editFormCancel($refs.editFormRef)">取 消</a-button>
          <a-button
            class="margin-left"
            type="primary"
            @click="nextStep($refs.editFormRef)"
            >下一步</a-button
          >
        </div>
        <div v-if="currentStep === 2">
          <a-button @click="lastStep">上一步</a-button>
          <a-button
            :loading="isLoading"
            class="margin-left"
            type="primary"
            @click="editFormSubmit"
            >确认创建</a-button
          >
        </div>
      </template>
    </a-modal>

    <a-drawer
      v-model:visible="drawerVisible"
      :title="`${drawerTitle}信息查询`"
      width="50vw"
    >
      <a-divider orientation="left">基本信息</a-divider>
      <a-descriptions :data="showBaseInfo" />
      <a-divider orientation="left">楼层信息</a-divider>
      <a-descriptions>
        <a-descriptions-item label="地上楼层"
          >{{ info.baseInfo.groundFloorCount }}层</a-descriptions-item
        >
        <a-descriptions-item label="地下楼层"
          >{{ info.baseInfo.undergroundFloorCount }}层</a-descriptions-item
        >
      </a-descriptions>
      <a-table :columns="floorColumnsView" :data="floorDataView" />
      <a-divider orientation="left">空间信息</a-divider>
      <a-descriptions>
        <a-descriptions-item label="资产总面积"
          >{{ totalArea }}㎡</a-descriptions-item
        >
      </a-descriptions>
      <a-descriptions :value-style="{ width: '150px' }" :data="spaceSizeInfo" />
      <a-descriptions :value-style="{ width: '150px' }" :data="spaceNumInfo" />

      <a-divider orientation="left">其他信息</a-divider>
      <a-descriptions>
        <a-descriptions-item
          v-for="(item, index) of infoConfig.otherInfo"
          :key="index"
          :label="item.label"
        >
          {{ areaInfo }}{{ info.otherInfo[item.value] }}
        </a-descriptions-item>
      </a-descriptions>
      <div>房产附件</div>
      <i-custom-upload
        v-model="fileLists"
        url-key="previewAddress"
        :options="{
          showUploadButton: false,
          showRemoveButton: false
        }"
      >
      </i-custom-upload>
      <template #footer>
        <a-button @click="buildingEdit('')">编 辑</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, nextTick, computed, inject } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import useSwitchPermission from '@/hooks/useSwitchPermission';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectBuildingPageGet,
    cbdApiProjectBuildingCheckCodeGet,
    cbdApiProjectBuildingInfoIdGet,
    cbdApiProjectBuildingAddPost,
    cbdApiProjectBuildingUpdatePost,
    cbdApiProjectBuildingUpdateInfoIdGet,
    cbdApiProjectBuildingDisableIdPost
  } from '@/api';
  import type {
    CbdApiProjectBuildingInfoIdGetResponse,
    CbdApiProjectCommonProjectSelectListGetResponse,
    CbdApiProjectBuildingPageGetResponse
  } from '@/api';
  import { statusList } from '@/utils/dic';
  import useDataDictionary from '@/hooks/useDataDictionary';
  import addressOptions from '@/utils/area.json';
  import { numToString } from '@/utils';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { cloneDeep } from 'lodash';
  import useAreaInfo from '@/hooks/useAreaInfo';
  import {
    deleteLocalForm,
    getLocalForm,
    setLocalForm
  } from '@/utils/localFormStore';
  import useGetCompanyData from '@/hooks/useGetCompanyData';
  import { getCookie } from '@/utils/cookies';
  import lsStore from '@/utils/ls-store';

  type BuildingItem = Required<CbdApiProjectBuildingPageGetResponse>['rows'][0];
  const refresh = ref(false);
  const search = ref({
    name: '',
    type: '',
    areaId: '',
    status: '',
    projectId: '',
    companyId: ''
  });
  const fileLists = ref<
    Array<{
      id?: string;
      name?: string;
      type?: string;
      size?: number;
      previewAddress?: string;
    }>
  >([]);

  const buildingPage = reactive({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
  const areaList = useDataDictionary('00002');
  const [companyList] = useGetCompanyData();
  const buildingTypeList = useDataDictionary('00004');

  function getProjectList() {
    cbdApiProjectCommonProjectSelectListGet({
      name: '',
      areaId: '',
      companyId: ''
    }).then((res: CbdApiProjectCommonProjectSelectListGetResponse) => {
      projectList.value = res;
    });
  }

  async function statusChange(id: number, status: number) {
    try {
      await cbdApiProjectBuildingDisableIdPost({ id: String(id) });
      Message.success('更改成功');
      refresh.value = true;
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  const options = {
    submitText: '搜索',
    tableCard: true,
    index: true,
    indexAlign: 'center',
    indexTitle: '序号',
    menuOtherOptions: {
      bordered: {
        // cell:true
      }
      // scroll: {
      //   x: 1500,
      //   y: 400
      // }
    },
    menuOptions: {
      width: 170,
      fixed: 'right'
    },
    menuSpan: 18,
    columns: [
      {
        label: '楼宇编号',
        prop: 'code',
      },
      {
        label: '楼宇名称',
        prop: 'name',
        search: true,
        placeholder: '请输入楼宇名称/编号/门牌号搜索'
      },
      {
        label: '楼宇类型',
        prop: 'type',
        search: true,
        type: 'select',
        dic: buildingTypeList,
        hide: true
      },
      {
        label: '楼宇类型',
        prop: 'typeName',
      },
      {
        label: '归属片区',
        prop: 'areaId',
        search: true,
        type: 'select',
        dic: areaList,
        hide: true
      },
      {
        label: '归属片区',
        prop: 'projectArea',
      },
      {
        label: '归属公司',
        prop: 'companyId',
        search: true,
        hide: true,
        type: 'treeSelect',
        dic: companyList.value,
        props: {
          key: 'value',
          title: 'label',
          children: 'children'
        }
      },
      {
        label: '归属公司',
        prop: 'projectCompany',
      },
      // {
      //   label: '归属项目',
      //   prop: 'projectId',
      //   search: true,
      //   type: 'select',
      //   dic: projectList,
      //   hide: true
      // },
      {
        label: '归属项目',
        prop: 'projectName',
      },
      {
        label: '状态',
        prop: 'status',
        type: 'select',
        search: true,
        dic: statusList,
      },
      {
        label: '地址',
        prop: 'address',
        ellipsis: true,
        tooltip: true,
        width: 300,
        formatter: (e: BuildingItem) => e.address || '--'
      }
    ]
  };

  const buildingTableData = ref<Array<BuildingItem>>([]);
  const currentId = ref<number>();
  const tableLoading = ref<boolean>(false);

  const modalVisible = ref<boolean>(false);
  const modalTitle = ref<string>('');

  interface EditForm {
    projectId: number | string;
    type:
      | string
      | number
      | Record<string, unknown>
      | (string | number | Record<string, unknown>)[];
    status: number;
    code: string;
    name: string;
    houseNumber: string;
    groundFloorCount: number;
    undergroundFloorCount: number;
    areaCode: Array<number>;
    areaName: {
      cityName: string;
      districtName: string;
      provinceName: string;
    };
    address: string;
    attachmentList: Array<string>;
    id?: number;
  }

  const editForm = ref<EditForm>({
    projectId: lsStore.getItem('projectId')
      ? Number(lsStore.getItem('projectId'))
      : '',
    status: 1,
    name: '',
    type: '',
    code: '',
    houseNumber: '',
    groundFloorCount: 0,
    undergroundFloorCount: 0,
    areaCode: [] as any,
    areaName: {
      cityName: '',
      districtName: '',
      provinceName: ''
    },
    address: '',
    attachmentList: []
  });
  const editRules = reactive({
    code: [
      { required: true, message: '请输入房源编号', trigger: 'blur' },
      {
        validator: async (value: string, callback: any) => {
          try {
            const res = await cbdApiProjectBuildingCheckCodeGet({
              id: modalTitle.value === '新建' ? '' : String(currentId.value),
              code: value,
              type: '1',
              projectId: String(editForm.value.projectId)
            });

            if (res.repeat) {
              callback('该房源编号重复');
            } else {
              callback();
            }
          } catch (e) {
            callback('该房源编号不可以用');
          }
        }
      }
    ],
    status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
    name: [
      { required: true, message: '请输入楼宇名称', trigger: 'blur' },
      {
        validator: async (value: string, callback: any) => {
          try {
            const res = await cbdApiProjectBuildingCheckCodeGet({
              id: modalTitle.value === '新建' ? '' : String(currentId.value),
              code: value,
              type: '2',
              projectId: String(editForm.value.projectId)
            });
            if (res.repeat) {
              callback('该楼宇名称重复');
            } else {
              callback();
            }
          } catch (e) {
            callback('该楼宇名称不可以用');
          }
        }
      }
    ],
    type: [{ required: true, message: '请选择楼宇类型', trigger: 'blur' }],
    houseNumber: [
      { required: true, message: '请输入楼宇门牌号', trigger: 'blur' },
      {
        validator: async (value: string, callback: any) => {
          try {
            const res = await cbdApiProjectBuildingCheckCodeGet({
              id: modalTitle.value === '新建' ? '' : String(currentId.value),
              code: value,
              type: '3',
              projectId: String(editForm.value.projectId)
            });
            if (res.repeat) {
              callback('该楼宇门牌号重复');
            } else {
              callback();
            }
          } catch (e) {
            callback('该楼宇门牌号不可以用');
          }
        }
      }
    ],
    groundFloorCount: [
      { required: true, message: '请输入地上楼层', trigger: 'blur' }
    ],
    undergroundFloorCount: [
      { required: true, message: '请输入地下楼层', trigger: 'blur' }
    ],
    areaCode: [{ required: true, message: '请选择地址', trigger: 'blur' }]
  });

  async function areaChange(e: any) {
    const { provinceName, cityName, countyName } = await useAreaInfo(
      String(e[0]),
      String(e[1]),
      String(e[2])
    );
    editForm.value.areaName = {
      provinceName,
      cityName,
      districtName: countyName
    };
  }

  const currentStep = ref<number>(1);

  const floorInfoCache = reactive({
    groundFloorCount: 0,
    undergroundFloorCount: 0
  });

  let floorListCache = [] as any;

  const floorColumnsEdit = [
    {
      title: '楼层',
      dataIndex: 'floor'
    },
    {
      title: '楼层名称',
      slotName: 'floorName'
    },
    {
      title: '层高(m)',
      slotName: 'storyHeight'
    },
    {
      title: '层面积(㎡)',
      slotName: 'area'
    }
  ];
  const floorDataEdit = ref<Array<any>>([]);

  function buildingAdd(element: any) {
    modalVisible.value = true;
    modalTitle.value = '新建';
    nextTick(async () => {
      element.resetFields();
      const t = (await getLocalForm('buildingConfigForm')) as string;
      const res = JSON.parse(t || '{}');
      if (res) {
        const { floorData, ...cache } = res as any;
        editForm.value = cache as EditForm;
        editForm.value.projectId = Number(lsStore.getItem('projectId'));
        floorDataEdit.value = floorData;
      }
    });
  }
  async function buildingEdit(id?: any) {
    try {
      const params = id || currentId.value;
      console.log(params);
      const res = await cbdApiProjectBuildingUpdateInfoIdGet({
        id: params
      });
      const {
        provinceCode,
        cityCode,
        districtCode,
        floorList,
        provinceName,
        cityName,
        districtName,
        ...data
      } = res;
      // todo 异常推导
      editForm.value = data as EditForm;
      editForm.value.projectId = Number(lsStore.getItem('projectId'));
      editForm.value.areaCode = [
        Number(provinceCode),
        Number(cityCode),
        Number(districtCode)
      ];
      editForm.value.areaName = {
        provinceName: provinceName!,
        cityName: cityName!,
        districtName: districtName!
      };

      floorDataEdit.value = floorList!;
      floorListCache = floorList;
      drawerTitle.value = res.name!;
      floorInfoCache.groundFloorCount = res.groundFloorCount!;
      floorInfoCache.undergroundFloorCount = res.undergroundFloorCount!;
      modalTitle.value = '编辑';
      currentId.value = params;
      currentStep.value = 1;
      modalVisible.value = true;
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  async function editFormCancel(element: any) {
    const cache = {
      ...editForm.value,
      floorList: floorDataEdit.value
    };
    try {
      await setLocalForm('buildingConfigForm', JSON.stringify(cache));
      element.resetFields();
      modalVisible.value = false;
    } catch (e) {}
  }

  function nextStep(element: any) {
    element.validate((valid: boolean) => {
      if (!valid) {
        if (modalTitle.value === '新建') {
          floorDataEdit.value = [];
          for (let i = 0; i < editForm.value.groundFloorCount; i++) {
            floorDataEdit.value.unshift({
              floor: `${numToString(i + 1)}楼`,
              floorName: `${i + 1}F`,
              facadeNumber: i + 1,
              storyHeight: '',
              area: ''
            });
          }
          for (let i = 0; i < editForm.value.undergroundFloorCount; i++) {
            floorDataEdit.value.push({
              floor: `负${numToString(i + 1)}楼`,
              floorName: `-${i + 1}F`,
              facadeNumber: -(i + 1),
              storyHeight: '',
              area: ''
            });
          }
          // floorDataEdit.value = groundFloor.concat(underGroundFloor)
        } else if (modalTitle.value === '编辑') {
          floorDataEdit.value = cloneDeep(floorListCache);
          if (
            editForm.value.groundFloorCount !== floorInfoCache.groundFloorCount
          ) {
            const startFloor = floorInfoCache.groundFloorCount + 1;
            const count =
              editForm.value.groundFloorCount - floorInfoCache.groundFloorCount;
            if (count > 0) {
              const newFloorNum =
                startFloor === 1 ? count : editForm.value.groundFloorCount;
              for (let i = startFloor; i <= newFloorNum; i++) {
                floorDataEdit.value.unshift({
                  floor: `${numToString(i)}楼`,
                  floorName: '',
                  facadeNumber: i,
                  storyHeight: '',
                  area: ''
                });
              }
            } else if (count < 0) {
              const num = -count;
              for (let i = 1; i <= num; i++) {
                floorDataEdit.value.shift();
              }
            }
          }

          if (
            editForm.value.undergroundFloorCount !==
            floorInfoCache.undergroundFloorCount
          ) {
            const startFloor = floorInfoCache.undergroundFloorCount + 1;
            const count =
              editForm.value.undergroundFloorCount -
              floorInfoCache.undergroundFloorCount;

            if (count > 0) {
              const newFloorNum =
                startFloor === 1 ? count : editForm.value.undergroundFloorCount;
              for (let i = startFloor; i <= newFloorNum; i++) {
                floorDataEdit.value.push({
                  floor: `负${numToString(i)}楼`,
                  floorName: '',
                  facadeNumber: -i,
                  storyHeight: '',
                  area: ''
                });
              }
            } else if (count < 0) {
              const num = -count;
              for (let i = 1; i <= num; i++) {
                floorDataEdit.value.pop();
              }
            }
          }
        }
        currentStep.value = 2;
      }
    });
  }

  function lastStep() {
    currentStep.value = 1;
  }

  const isLoading = ref(false);
  async function editFormSubmit(currentelement: any) {
    const {
      areaName,
      areaCode,
      projectId,
      type,
      status = 1,
      attachmentList = [],
      ...params
    } = editForm.value;
    const fileLists = ref<
      {
        id?: string;
        name?: string;
        type?: string;
        size?: number;
        previewAddress?: string;
      }[]
    >([]);
    console.log(attachmentList);
    attachmentList.forEach((item: any) => {
      if (modalTitle.value === '新建') {
        fileLists.value.push({ id: item?.response?.data?.key });
      } else if (modalTitle.value === '编辑') {
        if (item?.response) {
          fileLists.value.push({ id: item?.response?.data?.key });
        } else {
          fileLists.value.push({ id: item.id! });
        }
      }
    });

    try {
      isLoading.value = true;
      if (modalTitle.value === '新建') {
        await cbdApiProjectBuildingAddPost({
          ...params,
          projectId: projectId as number,
          type: type as number,
          status: status as number,
          provinceCode: String(areaCode[0]),
          cityCode: String(areaCode[1]),
          districtCode: String(areaCode[2]),
          provinceName: areaName.provinceName,
          cityName: areaName.cityName,
          districtName: areaName.districtName,
          floorList: floorDataEdit.value,
          attachmentList: fileLists.value.map((item) => item.id!)
        });
      } else if (modalTitle.value === '编辑') {
        const { id, ...data } = params;
        await cbdApiProjectBuildingUpdatePost({
          ...data,
          id: id as number,
          projectId: projectId as number,
          type: type as number,
          status: status as number,
          provinceCode: String(areaCode[0]),
          cityCode: String(areaCode[1]),
          districtCode: String(areaCode[2]),
          provinceName: areaName.provinceName,
          cityName: areaName.cityName,
          districtName: areaName.districtName,
          floorList: floorDataEdit.value,
          attachmentList: fileLists.value.map((item) => item.id!)
        });
      }
      Message.success(`${modalTitle.value}成功`);
      await deleteLocalForm('buildingConfigForm');
      refresh.value = true;
      if (drawerVisible.value) {
        await buildingView(currentId.value as number);
      }
      modalVisible.value = false;
    } catch (e) {
    } finally {
      isLoading.value = false;
    }
  }

  const drawerVisible = ref<boolean>(false);
  const drawerTitle = ref<string>('');

  type BaseInfo = Required<CbdApiProjectBuildingInfoIdGetResponse>['baseInfo'];
  type OtherInfo = {
    address?: string;
  };
  const info = reactive<{
    baseInfo: BaseInfo;
    spaceSizeInfo: string[];
    spaceNumInfo: string[];
    otherInfo: OtherInfo;
  }>({
    baseInfo: {},
    spaceSizeInfo: [],
    spaceNumInfo: [],
    otherInfo: {}
  });

  const infoConfig: {
    baseInfo: { value: keyof BaseInfo; label: string }[];
    spaceSizeInfo: string[];
    spaceNumInfo: string[];
    otherInfo: { value: 'address'; label: string }[];
  } = {
    baseInfo: [
      {
        value: 'projectName',
        label: '归属项目'
      },
      {
        value: 'status',
        label: '状态'
      },
      {
        value: 'name',
        label: '楼宇名称'
      },
      {
        value: 'code',
        label: '楼宇编号'
      },
      {
        value: 'houseNumber',
        label: '楼宇门牌号'
      },
      {
        value: 'projectCompany',
        label: '归属公司'
      },
      {
        value: 'projectArea',
        label: '归属片区'
      }
    ],
    spaceSizeInfo: [],
    spaceNumInfo: [],
    otherInfo: [
      {
        value: 'address',
        label: '地址'
      }
    ]
  };
  // 基本信息显示
  const showBaseInfo = computed(() => {
    return infoConfig.baseInfo.map(({ label, value }) => {
      let d = info.baseInfo[value] || '';
      if (value === 'status') {
        d = d === 1 ? '启用' : '禁用';
      }
      return {
        label,
        value: d as string
      };
    });
  });
  type DescData = {
    label: string;
    value: string;
    span?: number;
  };
  const spaceSizeInfo = ref<DescData[]>([]);
  const spaceNumInfo = ref<DescData[]>([]);

  const totalArea = ref<number>();
  const areaInfo = ref<string>();

  const floorColumnsView = [
    {
      title: '楼层',
      dataIndex: 'floor'
    },
    {
      title: '楼层名称',
      dataIndex: 'floorName'
    },
    {
      title: '层高(m)',
      dataIndex: 'storyHeight'
    },
    {
      title: '层面积(㎡)',
      dataIndex: 'area'
    }
  ];
  const floorDataView = ref<Array<any>>([]);

  async function buildingView(id: number) {
    try {
      const res = await cbdApiProjectBuildingInfoIdGet({ id: id + '' });
      spaceSizeInfo.value = [];
      spaceNumInfo.value = [];
      const { attachmentList, provinceName, cityName, districtName, ...data } =
        res.otherInfo!;
      floorDataView.value = res.floorList!;
      info.baseInfo = res.baseInfo!;
      if (Object.keys(res.areaInfo!.estateArea!).length) {
        const data = res.areaInfo!.estateArea!;
        totalArea.value = data.totalArea!;
        data.statistics!.forEach((item) => {
          spaceSizeInfo.value.push({
            label: `${item.categoryName}面积`,
            value: `${item.acreage}㎡`
          });
          spaceNumInfo.value.push({
            label: `${item.categoryName}数目`,
            value: `${item.count}${item.countUnit}`
          });
          // infoConfig.spaceSizeInfo.push(`${item.categoryName}面积`);
          // info.spaceSizeInfo.push(`${item.acreage}㎡`);
          // infoConfig.spaceNumInfo.push(`${item.categoryName}数目`);
          // info.spaceNumInfo.push(`${item.count}${item.countUnit}`);
        });
      }
      areaInfo.value = `${provinceName!}-${cityName!}-${districtName!}`;
      info.otherInfo = data;
      fileLists.value = attachmentList!;
      currentId.value = id;
      drawerVisible.value = true;
      drawerTitle.value = res.baseInfo?.name || '';
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  onMounted(() => {
    getProjectList();
  });
</script>

<script lang="ts">
  export default {
    name: 'Building'
  };
</script>
