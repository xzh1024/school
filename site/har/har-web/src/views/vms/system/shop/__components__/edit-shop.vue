<template>
  <drawer v-model="visible" :title="title">
    <div class="content-box">
      <i-form v-model="form" :options="options">
        <template #featuresForm>
          <a-checkbox-group v-model="form.features">
            <a-checkbox
              v-for="i in featuresList"
              :key="i.value"
              :value="i.value"
              >{{ i.label }}</a-checkbox
            >
          </a-checkbox-group>
        </template>
        <template #storeLogoAttachmentForm>
          <div>
            <p class="tip">支持jpg、png、bmp格式，大小不超过2M</p>
            <i-custom-upload
              v-model="form.storeLogoAttachmentList"
              :options="{
                limit: 1,
                accept: 'image/*'
              }"
            ></i-custom-upload>
          </div>
        </template>
        <template #storePhotosTempForm>
          <div>
            <p class="tip">支持jpg、png、bmp格式，大小不超过2M</p>
            <i-custom-upload
              v-model="form.storePhotosTemp"
              :options="{
                limit: 9,
                accept: 'image/*'
              }"
            ></i-custom-upload>
          </div>
        </template>
        <template #scopesForm>
          <i-table
            ref="scopeTable"
            v-model:selectedKeys="form.selectedKeys"
            style="width: 100%"
            :options="scopeOptions"
            :data="scopes"
          >
            <template #titleCell="{ record }">
              <a-input v-model="record.title"></a-input>
            </template>
            <template #menu="row">
              <a-button
                v-if="row.rowIndex > 0"
                @click="handleUp(row.record, row.rowIndex)"
                >上移</a-button
              >
              <a-button
                v-if="row.rowIndex < scopes.length - 1"
                @click="handleDown(row.record, row.rowIndex)"
                >下移</a-button
              >
            </template>
          </i-table>
        </template>
        <template #line1Form>
          <div class="split-line"></div>
        </template>
        <template #operatingStatusForm>
          <a-radio-group v-model="form.operatingStatus">
            <a-radio :value="0">试营业</a-radio>
            <a-radio :value="1">营业中</a-radio>
            <a-radio :value="2">暂停营业</a-radio>
          </a-radio-group>
        </template>
        <template #openTimeTempForm>
          <div style="width: 100%">
            <a-table
              :columns="equityColumns"
              :data="form.openTimeTemp"
              :pagination="false"
              style="width: 100%"
            >
              <template #columns>
                <a-table-column
                  v-for="(item, index) in equityColumns"
                  :key="index"
                  :title="item.title"
                  :data-index="item.dataIndex"
                  :width="item.width"
                >
                  <template #cell="{ record, column, rowIndex }">
                    <div v-if="column.dataIndex === 'timeRange'">
                      <time-process v-model="record.timeRange" />
                    </div>
                    <div v-else-if="column.dataIndex === 'detail'">
                      <a-dropdown @select="onCopy($event, rowIndex)">
                        <a-button type="text">复制到</a-button>
                        <template #content>
                          <a-doption
                            v-for="(it, i) in form.openTimeTemp"
                            :key="it.date"
                            class="dropdown-item"
                            :value="i"
                          >
                            {{ it.date }}
                          </a-doption>
                        </template>
                      </a-dropdown>
                    </div>
                    <span v-else>{{ record[column.dataIndex] }}</span>
                  </template>
                  <template v-if="item.title === '时间'" #title>
                    <div class="table-head-row">
                      <div>00:00</div>
                      <div>06:00</div>
                      <div>12:00</div>
                      <div>18:00</div>
                      <div>24:00</div>
                    </div>
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </div>
        </template>
      </i-form>
    </div>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" :loading="isLoading" @click="handleOk"
        >确认</a-button
      >
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, watch, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import IForm from '@/components/i-form/index.vue';
  import TimeProcess from '@/views/vms/card/_components_/time-process.vue';
  import { Message } from '@arco-design/web-vue';
  import { weekDic } from '@/utils/dic';
  import { useRequest } from '@har/use';
  import {
    groundPcApiCommonStoreFeatureSelectGet,
    GroundPcApiCommonStoreFeatureSelectGetResponse,
    type GroundPcApiFileDirectUploadSignTestGetResponse,
    groundPcApiStoreOperationInfoIdGet,
    type GroundPcApiStoreOperationInfoIdGetResponse,
    groundPcApiStoreOperationUpdateIdPut
  } from '@/api/ground-pc-api';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    shopId: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);

  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  type ImageType = GroundPcApiFileDirectUploadSignTestGetResponse &
    GroundPcApiStoreOperationInfoIdGetResponse['storeLogoAttachment'];
  type TimeType = { week: number; startTime: string; endTime: string };
  type TimeTempType = { date: string; timeRange: number[]; week: number };
  type FormType = {
    customerServiceTel: string;
    features: number[];
    openTimes: TimeType[];
    storeLogoAttachment: string;
    storeLogoAttachmentList: ImageType[];
    address: string;
    storePhotosTemp: ImageType[];
    storePhotos: string[];
    operatingStatus: number;
    openTimeTemp: TimeTempType[];
    projectId?: number;
    id: string;
    projectName?: string;
    name?: string;
    selectedKeys: number[];
  };
  const form = ref<FormType>({
    id: props.shopId,
    customerServiceTel: '',
    address: '',
    features: [],
    openTimes: [],
    storeLogoAttachment: '',
    storeLogoAttachmentList: [],
    storePhotosTemp: [],
    storePhotos: [],
    operatingStatus: 0,
    openTimeTemp: [
      { date: '周一', week: 1, timeRange: [8, 22] },
      { date: '周二', week: 2, timeRange: [8, 22] },
      { date: '周三', week: 3, timeRange: [8, 22] },
      { date: '周四', week: 4, timeRange: [8, 22] },
      { date: '周五', week: 5, timeRange: [8, 22] },
      { date: '周六', week: 6, timeRange: [8, 22] },
      { date: '周日', week: 7, timeRange: [8, 22] }
    ],
    selectedKeys: []
  });
  const options = computed<Recordable>(() => {
    return {
      formCard: true,
      menuForm: false,
      maskClosable: false,
      layout: 'vertical',
      size: 'medium',
      columns: [
        {
          label: '项目名称',
          prop: 'projectName',
          options: {
            disabled: true
          },
          rules: [{ required: true, message: '项目名称不能为空' }]
        },
        {
          label: '店铺名称',
          prop: 'name',
          options: {
            disabled: true
          },
          rules: [{ required: true, message: '店铺名称不能为空' }]
        },
        {
          label: '客服电话',
          prop: 'customerServiceTel',
          rules: [
            { required: true, message: '客服电话不能为空' },
            {
              validator(
                v: string | undefined,
                callback: (error?: string) => void
              ) {
                if (v && v.length > 12) callback('最多可输入12位数字');
                if (!/^\d+$|\d+-\d+$/.test(v!))
                  callback('电话输入有误,请重新输入');
                callback();
              }
            }
          ]
        },
        {
          label: '门店地址',
          prop: 'address',
          type: 'textarea',
          options: {
            maxLength: 100
          },
          rules: [{ required: true, message: '门店地址不能为空' }],
          span: 24
        },
        {
          label: '服务设施',
          prop: 'features',
          rules: [{ required: true, message: '服务设施必选' }],
          span: 24
        },
        {
          label: '店招',
          prop: 'storeLogoAttachment',
          type: 'customUpload',
          rules: [{ required: true, message: '店招不能为空' }],
          span: 24
        },
        {
          label: '其他图片',
          prop: 'storePhotosTemp',
          type: 'customUpload',
          rules: [{ required: true, message: '其他图片不能为空' }],
          span: 24
        },
        // {
        //   label: '经营方向',
        //   prop: 'scopes',
        //   rules: [{ required: true, message: '经营方向不能为空' }],
        //   span: 24
        // },
        {
          label: '',
          prop: 'line1',
          type: 'groupTitle'
        },
        {
          label: '营业状态',
          prop: 'operatingStatus',
          rules: [{ required: true, message: '营业状态不能为空' }],
          span: 24
        },
        {
          label: '营业时间',
          prop: 'openTimeTemp',
          rules: [{ required: true, message: '营业时间不能为空' }],
          span: 24
        }
      ]
    };
  });
  const equityColumns = [
    { title: '日期', dataIndex: 'date', width: 82 },
    { title: '时间', dataIndex: 'timeRange' },
    { title: '详情', dataIndex: 'detail', width: 82 }
  ];
  const isLoading = ref(false);
  const onCopy = (
    targetIdx: string | number | Record<string, any> | undefined,
    currentIdx: number
  ) => {
    const t = Number(targetIdx);
    form.value.openTimeTemp[t].timeRange =
      form.value.openTimeTemp[currentIdx].timeRange;
  };
  const { run: updateShop } = useRequest(groundPcApiStoreOperationUpdateIdPut, {
    manual: true,
    onSuccess() {
      Message.success('保存成功');
      visible.value = false;
      emits('refresh');
    }
  });
  const handleOk = () => {
    const {
      storeLogoAttachmentList = [],
      storePhotosTemp,
      openTimeTemp
    } = form.value;
    form.value.openTimes = openTimeTemp.map((e: TimeTempType) => {
      return {
        week: e.week,
        startTime: e.timeRange[0] + ': 00',
        endTime: e.timeRange[1] + ': 00'
      };
    });
    form.value.storePhotos = storePhotosTemp.map(
      (e: ImageType) => e.key || e.id!
    );
    form.value.storeLogoAttachment =
      storeLogoAttachmentList[0]?.key || storeLogoAttachmentList[0]?.id || '';
    updateShop({
      ...form.value
    });
  };
  const featuresList = ref<GroundPcApiCommonStoreFeatureSelectGetResponse>([]);
  const { run: getFeatures } = useRequest(
    groundPcApiCommonStoreFeatureSelectGet,
    {
      manual: true,
      onSuccess(res) {
        featuresList.value = res;
      }
    }
  );
  const { run: getShopInfo } = useRequest(groundPcApiStoreOperationInfoIdGet, {
    manual: true,
    onSuccess(res) {
      const temp = form.value.openTimeTemp;
      form.value = {
        ...res,
        storeLogoAttachmentList: [res.storeLogoAttachment],
        storePhotosTemp: res.storePhotoAttachments || [],
        openTimeTemp: temp
      } as unknown as FormType;
      res.openTimes.forEach(
        (el: { week: number; startTime: string; endTime: string }) => {
          form.value.openTimeTemp.forEach((a: TimeTempType) => {
            if (el.week === a.week) {
              a.date = '星期' + weekDic[el.week];
              a.timeRange = [
                Number(el.startTime?.split(':')[0]) || 0,
                Number(el.endTime?.split(':')[0]) || 0
              ];
            }
          });
        }
      );
      // 经营方向回显
      // if (res.scopes?.length) {
      //   const arr: any[] = [];
      //   (res.scopes || []).forEach((el: ScopeItemType) => {
      //     if (el.type === 1) {
      //       el.desc = '用于商品销售，主要售卖商品sku';
      //     } else if (el.type === 2) {
      //       el.desc = '用于场地预约，主要售卖场地时段';
      //     } else if (el.type === 3) {
      //       el.desc = '当前店铺或者商圈组织的优惠券或优惠活动将在当前模块内';
      //     } else if (el.type === 4) {
      //       el.desc = '当前店铺或者商圈组织的活动将在当前模块内';
      //     }
      //     arr.push(el);
      //   });
      //   scopes.value = arr;
      // } else {
      //   scopes.value = [
      //     {
      //       title: '零售',
      //       type: 1,
      //       enable: false,
      //       orderNum: 0,
      //       desc: '用于商品销售，主要售卖商品sku'
      //     },
      //     {
      //       title: '场馆预约',
      //       type: 2,
      //       enable: false,
      //       orderNum: 1,
      //       desc: '用于场地预约，主要售卖场地时段'
      //     },
      //     {
      //       title: '优惠',
      //       type: 3,
      //       enable: false,
      //       orderNum: 2,
      //       desc: '当前店铺或者商圈组织的优惠券或优惠活动将在当前模块内'
      //     },
      //     {
      //       title: '活动',
      //       type: 4,
      //       enable: false,
      //       orderNum: 3,
      //       desc: '当前店铺或者商圈组织的活动将在当前模块内'
      //     }
      //   ];
      // }
    }
  });
  // 经营方向
  const scopeOptions = ref({
    index: true,
    tableCard: false,
    pageShow: false,
    menuOtherOptions: {
      'row-key': 'type',
      'rowSelection': {
        type: 'checkbox',
        showCheckedAll: true
      },
      'onSelect': (e: number[]) => {
        form.value.selectedKeys = e;
      }
    },
    columns: [
      {
        label: '经营方式',
        prop: 'title'
      },
      {
        label: '说明',
        prop: 'desc'
      }
    ]
  });
  type ScopeItemType = {
    type?: number;
    title?: string;
    desc?: string;
    enable?: boolean;
    orderNum?: number;
  };
  const scopes = ref<Array<ScopeItemType>>([]);
  const handleUp = (e: any, rdx: number) => {
    e.orderNum -= 1;
    scopes.value[rdx - 1].orderNum! += 1;
    scopes.value = scopes.value.sort(
      (a: any, b: any) => a.orderNum - b.orderNum
    );
  };
  const handleDown = (e: any, rdx: number) => {
    e.orderNum += 1;
    scopes.value[rdx + 1].orderNum! -= 1;
    scopes.value = scopes.value.sort(
      (a: any, b: any) => a.orderNum - b.orderNum
    );
  };
  onMounted(() => {
    getShopInfo({
      id: props.shopId
    });
    getFeatures();
  });
</script>

<style scoped lang="less">
  .content-box {
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    .tip {
      font-size: 14px;
      font-weight: 500;
      color: #666666;
      padding-bottom: 10px;
      margin: 0;
    }

    .dropdown-item {
      width: 80px;
    }

    .table-head-row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  :deep(.arco-slider-track::before) {
    background-color: #f7f7f7;
  }
</style>
