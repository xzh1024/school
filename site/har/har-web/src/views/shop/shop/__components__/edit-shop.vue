<template>
  <drawer v-model="visible" :title="title">
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="handleOk">确认</a-button>
    </template>
    <div class="white-detail-box">
      <a-divider orientation="left">店铺信息</a-divider>
      <a-form :model="form" :rules="rules" layout="vertical">
        <p class="required"
          >店铺名称: <span>{{ form.name }}</span></p
        >
        <a-row style="align-items: center">
          <a-col :span="6">
            <a-form-item field="customerServiceTel" label="客服电话：">
              <a-input
                v-model="form.customerServiceTel"
                placeholder="请输入客服电话"
              />
            </a-form-item>
          </a-col>
          <a-col :span="16" :offset="2">
            <a-form-item field="relationStoreIds" label="门店关联：">
              <a-select
                v-model="form.relationStoreIds"
                :options="searchShopList"
                :style="{ width: '320px' }"
                placeholder="请输入关键字并选择门店"
                multiple
                @search="handleSearch"
              />
            </a-form-item>
            <!--            <a-tag-->
            <!--              v-for="(it, idx) in showStoreList"-->
            <!--              :key="idx"-->
            <!--              class="tag-class"-->
            <!--              closable-->
            <!--              @close="onClose(it)"-->
            <!--              >{{ it.label }}</a-tag-->
            <!--            >-->
          </a-col>
        </a-row>
        <a-form-item field="feature" label="特色服务">
          <a-textarea
            v-model="form.feature"
            placeholder="如：免费WiFi，免费停车，接送服务等，多个特色服务请使用逗号隔开"
            allow-clear
          />
        </a-form-item>
        <a-row>
          <!--          todo 定位相关功能暂时不上-->
          <!--          暂时隐藏地图,请勿删除-->
          <!--          <a-col :span="10">-->
          <!--            <a-form-item field="longitude" label="门店定位">-->
          <!--              <div v-if="form.name" class="map-box">-->
          <!--                <shop-map-->
          <!--                  :shop-location="[form.longitude, form.latitude]"-->
          <!--                  @address="getAddress"-->
          <!--                />-->
          <!--              </div>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          12 offset 1-->
          <a-row style="width: 100%">
            <!--          暂时隐藏,请勿删除-->
            <!--            <div class="location"-->
            <!--              >定位：{{ addressObj.addressFormat || '' }}</div-->
            <!--            >-->
            <a-col :span="6">
              <a-form-item
                field="areaCode"
                label="所属区域"
                style="width: 300px"
              >
                <a-cascader
                  v-model="form.areaCode"
                  :options="addressOptions"
                  :path-mode="true"
                  placeholder="请选择省 / 市 / 区"
                  @change="areaChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="10" :offset="2">
              <a-form-item field="address" label="详细地址">
                <a-input
                  v-model="form.address"
                  placeholder="请填写详细地址，以便买家联系（勿重复填写省市区）"
                ></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-row>
        <a-form-item field="selectedKeys" label="经营方向">
          <i-table
            ref="scopeTable"
            v-model:selectedKeys="form.selectedKeys"
            :options="options"
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
        </a-form-item>
        <a-row>
          <a-col :span="24">
            <a-form-item
              field="openTimeModel"
              label="营业时间"
              style="margin-bottom: 0; padding-top: 15px"
            >
              <a-radio-group
                v-model="form.openTimeType"
                @change="handleTypeChange($event)"
              >
                <a-radio value="1">全天</a-radio>
                <a-radio value="0">自定义</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="20" :offset="2" style="margin-bottom: 15px">
            <a-radio-group
              v-if="form.openTimeType === '0'"
              v-model="openTimeTarget.type"
              direction="vertical"
              @change="handleModelChange"
            >
              <a-radio value="2" style="width: 100px">每天重复</a-radio>
              <a-row v-if="openTimeTarget.type === '2'">
                <a-col
                  v-for="(item, idx) in openTimeTarget.durations[0].times"
                  :key="idx + Date.now()"
                  :offset="2"
                >
                  <a-time-picker
                    v-model="item.time"
                    style="margin: 10px auto"
                    type="time-range"
                    disable-confirm
                    format="HH:mm"
                  />
                  <a-button type="text" @click="deleteDateRange(idx)"
                    >删除</a-button
                  >
                </a-col>
                <a-col :offset="2">
                  <a-button
                    type="text"
                    style="padding-left: 0"
                    @click="addDateRange"
                    >添加时段</a-button
                  >
                </a-col>
              </a-row>
              <a-radio value="3" style="width: 100px">每周重复</a-radio>
              <div v-if="openTimeTarget.type === '3'">
                <a-row
                  v-for="(obj, weekIdx) in openTimeTarget.durations"
                  :key="weekIdx + Date.now()"
                >
                  <a-col>
                    <a-space>
                      <a-tag
                        v-for="(it, d) in obj.week"
                        :key="d + Date.now()"
                        closable
                        @close="onRemoveWeek(weekIdx, it)"
                        >{{ weekHash[it] }}</a-tag
                      >
                    </a-space>
                    <a-space>
                      <a-button type="text" @click="onShowEditWeek(weekIdx)"
                        >选择星期</a-button
                      >
                    </a-space>
                  </a-col>
                  <a-col
                    v-for="(item, idx) in obj.times"
                    :key="idx + Date.now()"
                    :offset="2"
                  >
                    <a-time-picker
                      v-model="item.time"
                      style="margin: 10px auto"
                      type="time-range"
                      disable-confirm
                      format="HH:mm"
                    />
                    <a-button
                      type="text"
                      @click="deleteWeekDateRange(weekIdx, idx)"
                      >删除</a-button
                    >
                  </a-col>
                  <a-col :offset="2">
                    <a-button
                      type="text"
                      style="padding-left: 0"
                      @click="addWeekDateRange(weekIdx)"
                      >添加时段</a-button
                    >
                  </a-col>
                </a-row>
                <a-button type="text" @click="addDateWeek">添加星期</a-button>
              </div>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-form-item
          field="storeLogoAttachment"
          label="店铺logo（或门头照片均可）"
        >
          <i-custom-upload
            v-model="form.storeLogoAttachment"
            url-key="previewAddress"
            :options="{
              limit: 1,
              listType: 'picture-card',
              accept: 'image/*'
            }"
          ></i-custom-upload>
        </a-form-item>

        <a-form-item field="storePhotos" label="店铺图片">
          <div style="width: 30vw">
            <a-row v-for="(item, idx) in shopPictures" :key="idx">
              <a-col :span="18">
                <a-input
                  v-model="item.type"
                  style="width: 250px"
                  placeholder="请输入店铺图片类型，如：环境、特色商品等"
                ></a-input>
              </a-col>
              <a-button
                type="primary"
                style="margin: 0 10px 15px"
                shape="circle"
                @click="addPictureType"
              >
                <icon-plus />
              </a-button>
              <a-button
                type="primary"
                shape="circle"
                @click="deletePictureType(idx)"
              >
                <icon-minus />
              </a-button>
              <a-col :span="24" style="margin-bottom: 15px">
                <i-custom-upload
                  v-model="item.storePhotoAttachments"
                  :options="{
                    listType: 'picture-card',
                    accept: 'image/*',
                    onSuccess: onUploadSuccess
                  }"
                  url-key="previewAddress"
                ></i-custom-upload>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
      </a-form>
      <a-modal
        :visible="showEditWeek"
        title="选择星期"
        width="200px"
        @cancel="showEditWeek = false"
        @ok="onSelectFinish"
      >
        <a-checkbox-group v-model="selectedWeeks" direction="vertical">
          <a-checkbox v-for="(li, ix) in weeksList" :key="ix" :value="li">{{
            weekHash[li]
          }}</a-checkbox>
        </a-checkbox-group>
      </a-modal>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, computed, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import addressOptions from '@/utils/area.json';
  import { Message } from '@arco-design/web-vue';
  import Bus from '../../refresh';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectStoreExtraUpdateInitIdGet,
    cbdApiProjectStoreExtraUpdateIdPut,
    cbdApiProjectCommonStoreSelectGet,
    type CbdApiProjectCommonStoreSelectGetRequest,
    type CbdApiProjectCommonStoreSelectGetResponse
  } from '@/api';
  import useAreaInfo from '@/hooks/useAreaInfo';
  import { weekHash } from '@/utils/dic';

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
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const rules = reactive<any>({
    longitude: [{ required: true, message: '门店定位信息不能为空' }],
    openTimeModel: [{ required: true, message: '请选择营业时间' }],
    storeLogoAttachment: [{ required: true, message: '请上传店铺logo' }],
    storePhotos: [
      { required: true, message: '请上传店铺图片', trigger: 'change' }
    ],
    areaCode: [{ required: true, message: '请上传店铺图片' }],
    address: [{ required: true, message: '请填写详细地址' }]
  });
  interface FormType {
    [key: string]: any;
    name?: string;
    assets?: string;
    openTime?: any;
    openTimeModel?: string;
    openTimeType?: string;
    relationStoreIds: number[];
    storePhotos: any[];
    storeLogoAttachment: any;
    areaName: any;
    areaCode: any;
    areaCodeAll?: any;
    selectedKeys: number[];
  }
  const form = ref<FormType>({
    name: '',
    openTime: {},
    openTimeModel: '',
    openTimeType: '',
    assets: '',
    areaName: {},
    areaCodeAll: {},
    areaCode: '',
    relationStoreIds: [],
    storeLogoAttachment: [],
    storePhotos: [{ type: '' }],
    longitude: '',
    latitude: '',
    selectedKeys: []
  });

  const weekTemplate: number[] = [1, 2, 3, 4, 5, 6, 7];
  const weeksList: Ref = computed(() => {
    return weekTemplate.filter((el: any) => {
      return !usedWeekList.value.includes(el);
    });
  });
  const showEditWeek: Ref = ref(false);
  const selectedWeeks: Ref = ref([]);
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
  const searchShopList = ref<CbdApiProjectCommonStoreSelectGetResponse>([]);
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const areaChange = async (e: any) => {
    const { provinceName, cityName, countyName } = await useAreaInfo(
      String(e[0]),
      String(e[1]),
      String(e[2])
    );
    form.value.areaCodeAll = {
      provinceCode: String(e[0]),
      cityCode: String(e[1]),
      districtCode: String(e[2])
    };
    form.value.areaName = {
      provinceName,
      cityName,
      districtName: countyName
    };
  };
  const options = reactive({
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
  const openTimeTarget = ref<any>({
    type: '',
    durations: [
      {
        week: [],
        times: [
          {
            startTime: '',
            endTime: ''
          }
        ]
      }
    ]
  });
  const activeIndex: Ref = ref(0);
  const usedWeekList: Ref = ref([]);
  function onRemoveWeek(weekIdx: number, it: number) {
    openTimeTarget.value.durations[weekIdx].week.splice(
      openTimeTarget.value.durations[weekIdx].week.indexOf(it),
      1
    );
  }
  function onShowEditWeek(idx: number) {
    showEditWeek.value = true;
    activeIndex.value = idx;
  }
  function onSelectFinish() {
    openTimeTarget.value.durations[activeIndex.value].week.push(
      ...selectedWeeks.value
    );
    showEditWeek.value = false;
    selectedWeeks.value = [];
  }
  function addDateWeek() {
    if (usedWeekList.value.length < 7) {
      openTimeTarget.value.durations.push({
        week: [],
        times: [{ startTime: '', endTime: '' }]
      });
    } else {
      Message.error('无法继续添加');
    }
  }
  const addDateRange = (): void => {
    if (openTimeTarget.value.durations[0].times.length < 3) {
      openTimeTarget.value.durations[0].times.push({
        startTime: '',
        endTime: ''
      });
    } else {
      Message.error('最多添加三个时间段');
    }
  };
  const addWeekDateRange = (weekIdx: number): void => {
    if (openTimeTarget.value.durations[weekIdx].times.length < 3) {
      openTimeTarget.value.durations[weekIdx].times.push({
        startTime: '',
        endTime: ''
      });
    } else {
      Message.error('最多添加三个时间段');
    }
  };
  const deleteDateRange = (index: number): void => {
    openTimeTarget.value.durations[0].times.splice(index, 1);
  };
  const deleteWeekDateRange = (weekIdx: number, index: number): void => {
    openTimeTarget.value.durations[weekIdx].times.splice(index, 1);
  };
  const addressTemp = JSON.parse(JSON.stringify(addressOptions));
  interface AddressItemType {
    label: string;
    value: string;
    children?: any;
  }

  const flatAddress: AddressItemType[] = [];
  const flatArr = (arr: AddressItemType[]) => {
    arr.forEach((el: AddressItemType) => {
      flatAddress.push({ label: el.label, value: el.value });
      if (el.children) {
        flatArr(el.children);
      }
    });
  };

  // const addressObj: Ref = ref({});
  // const getAddress = (e: { [key: string]: string }) => {
  //   form.value.longitude = e.longitude;
  //   form.value.latitude = e.latitude;
  //   form.value.provinceName = e.provinceName;
  //   form.value.provinceCode = getCodeByName(e.provinceName);
  //   form.value.cityName = e.cityName;
  //   form.value.cityCode = getCodeByName(e.cityName);
  //   form.value.districtName = e.districtName;
  //   form.value.districtCode = getCodeByName(e.districtName);
  //   addressObj.value.addressFormat = e.addressFormat;
  //   form.value.areaCode = e.areaCode;
  //   form.value.locationAddress = e.addressFormat;
  // };
  const handleSearch = async (e: string) => {
    searchShopList.value = await cbdApiProjectCommonStoreSelectGet({
      storeStatus: '2',
      searchKey: e,
      excludeStoreId: props.shopId || undefined
    } as CbdApiProjectCommonStoreSelectGetRequest);
  };
  const handleTypeChange = (v: string | number | boolean) => {
    form.value.openTimeModel = String(v);
    if (v === '1') {
      openTimeTarget.value.type = '1';
    }
  };
  const handleModelChange = (v: string | number | boolean) => {
    openTimeTarget.value.type = v;
    usedWeekList.value = [];
    openTimeTarget.value.durations = [
      {
        week: [],
        times: [
          {
            startTime: '',
            endTime: ''
          }
        ]
      }
    ];
  };
  const shopPictures = ref<Array<any>>([{}]);
  const addPictureType = (): void => {
    shopPictures.value.push({});
  };
  const deletePictureType = (idx: number): void => {
    if (shopPictures.value.length <= 1) {
      Message.error('不能删除最后一条');
    } else {
      shopPictures.value.splice(idx, 1);
    }
  };
  const onUploadSuccess = () => {
    form.value.storePhotos = shopPictures.value;
  };
  const [getSHopDetail] = useFuncProxy(async () => {
    const res = await cbdApiProjectStoreExtraUpdateInitIdGet({
      id: String(props.shopId!)
    });
    form.value = res as unknown as FormType;
    // 店铺logo回显
    form.value.storeLogoAttachment = form.value.storeLogoAttachment.id
      ? [form.value.storeLogoAttachment]
      : [];
    form.value.relationStoreIds = Array.from(new Set(res.relationStoreIds));
    shopPictures.value = res.storePhotos.length ? res.storePhotos : [{}];
    // 营业时间回显
    form.value.openTimeType = res.openTime.type
      ? String(res.openTime.type === 1 ? '1' : '0')
      : '';
    form.value.openTimeModel = form.value.openTimeType;
    openTimeTarget.value = res.openTime.type
      ? res.openTime
      : {
          type: '',
          durations: [
            {
              week: [],
              times: [
                {
                  startTime: '',
                  endTime: ''
                }
              ]
            }
          ]
        };
    openTimeTarget.value.type = String(openTimeTarget.value.type);
    if (openTimeTarget.value.type === '2') {
      openTimeTarget.value.durations[0].times.forEach((el: any) => {
        el.time = [el.startTime, el.endTime];
      });
    }
    if (openTimeTarget.value.type === '3') {
      const temp: number[] = [];
      openTimeTarget.value.durations.forEach((el: any) => {
        temp.push(...el.week);
        usedWeekList.value = Array.from(new Set(temp));
        el.times.forEach((it: any) => {
          it.time = [it.startTime, it.endTime];
        });
      });
    }
    // 经营方向回显
    if (res.scopes.length) {
      const arr: any[] = [];
      res.scopes.forEach((el: ScopeItemType) => {
        if (el.type === 1) {
          el.desc = '用于商品销售，主要售卖商品sku';
        } else if (el.type === 2) {
          el.desc = '用于场地预约，主要售卖场地时段';
        } else if (el.type === 3) {
          el.desc = '当前店铺或者商圈组织的优惠券或优惠活动将在当前模块内';
        } else if (el.type === 4) {
          el.desc = '当前店铺或者商圈组织的活动将在当前模块内';
        }
        arr.push(el);
      });
      scopes.value = arr;
    } else {
      scopes.value = [
        {
          title: '零售',
          type: 1,
          enable: false,
          orderNum: 0,
          desc: '用于商品销售，主要售卖商品sku'
        },
        {
          title: '场馆预约',
          type: 2,
          enable: false,
          orderNum: 1,
          desc: '用于场地预约，主要售卖场地时段'
        },
        {
          title: '优惠',
          type: 3,
          enable: false,
          orderNum: 2,
          desc: '当前店铺或者商圈组织的优惠券或优惠活动将在当前模块内'
        },
        {
          title: '活动',
          type: 4,
          enable: false,
          orderNum: 3,
          desc: '当前店铺或者商圈组织的活动将在当前模块内'
        }
      ];
    }
    form.value.selectedKeys = [];
    res.scopes.forEach((el: any) => {
      if (el.enable) {
        form.value.selectedKeys.push(el.type);
      }
    });
    form.value.areaCode = res.provinceCode
      ? [res.provinceCode, res.cityCode, res.districtCode]
      : [];
    form.value.longitude = res.longitude || '';
    form.value.latitude = res.latitude || '';
    form.value.locationAddress = res.locationAddress || '';
    // 为了解决关联了店铺,然后店铺没了,回显关联店铺时显示id(没显示店铺名)的问题
    const allShopIds = searchShopList.value.map((el: any) => el.value);
    // 得到被删掉的店铺的ids
    const deletedShopIds = form.value.relationStoreIds.filter((el: any) => {
      return !allShopIds.includes(el);
    });
    // 根据返回的数据 relationStoreIds 找到删掉的店铺的index 根据index找到name,放回下拉列表
    deletedShopIds.forEach((el: any) => {
      searchShopList.value.push({
        value: el,
        label:
          form.value.relationStoreNames[
            form.value.relationStoreIds.findIndex((a: any) => a === el)
          ]
      });
    });
  });
  const [updateStoreData] = useFuncProxy(async () => {
    if (!form.value.openTimeModel) {
      Message.error('请选择时间段');
      throw new Error('请选择时间段');
    }
    // 深度拷贝，避免操作时显示的图片错误
    const tempList = JSON.parse(JSON.stringify(shopPictures.value));
    tempList.forEach((el: any) => {
      const arrTemp: string[] = [];
      if (
        !el.storePhotoAttachments?.length ||
        el.storePhotoAttachments.some(
          (a: any) => !a || a === 'undefined' || a === 'null'
        )
      ) {
        Message.error(`请上传${el.type || '图片'}`);
        throw new Error(`请上传${el.type}分类的图片`);
      }
      // 处理接口需要的key  新增的只有key没有id，回显的id字段值就是key
      el.storePhotoAttachments.forEach((it: any) => {
        arrTemp.push(it.id ? it.id : it.key);
      });
      el.storePhotoAttachments = arrTemp;
    });
    const selectScopes: Array<ScopeItemType> = JSON.parse(
      JSON.stringify(scopes.value)
    );
    selectScopes.map((el: ScopeItemType) => {
      el.enable = form.value.selectedKeys.indexOf(el.type!) > -1;
    });
    if (openTimeTarget.value.type !== '1') {
      (openTimeTarget.value.durations || []).forEach((el: any) => {
        (el.times || []).forEach((it: any) => {
          it.startTime = it.time[0];
          it.endTime = it.time[1];
        });
      });
    }

    await cbdApiProjectStoreExtraUpdateIdPut({
      id: props.shopId,
      ...form.value,
      ...form.value.areaName,
      ...form.value.areaCodeAll,
      openTime: openTimeTarget.value,
      scopes: selectScopes,
      locationType: 3,
      storeLogoAttachment:
        form.value.storeLogoAttachment[0]?.key ||
        form.value.storeLogoAttachment[0]?.id,
      relationStoreIds: Array.from(new Set(form.value.relationStoreIds)),
      storePhotos: tempList
    });
    Message.success('操作成功！');
    visible.value = false;
    emits('refresh');
    Bus.$emit('refresh');
  });
  const handleOk = () => {
    if (form.value.openTimeType === '1') {
      form.value.openTime.type = form.value.openTimeType;
      delete openTimeTarget.value.durations;
    }
    updateStoreData();
  };
  flatArr(addressTemp);
  watch(
    () => openTimeTarget.value,
    () => {
      if (openTimeTarget.value.type === '3') {
        const temp: number[] = [];
        openTimeTarget.value.durations.forEach((el: any) => {
          temp.push(...el.week);
        });
        usedWeekList.value = Array.from(new Set(temp));
      }
    },
    { deep: true }
  );
  watch(
    () => props.shopId,
    (v) => {
      if (v) {
        getSHopDetail();
        handleSearch('');
      }
    },
    { immediate: true }
  );
</script>

<style scoped lang="less">
  .required {
    position: relative;
    padding-left: 10px;
    font-weight: bold;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      color: inherit;
      transform: translateY(-50%);
      content: '*';
    }
  }

  .tag-class {
    justify-content: flex-start;
    height: 32px;
    margin: 10px auto 0;
    line-height: 32px;
  }

  .map-box {
    width: 500px;
    height: 260px;
    border: 1px solid #eee;
  }

  .location {
    margin-bottom: 10px;
    padding-top: 60px;
    font-weight: bold;
  }

  :deep(.arco-form-item-content) {
    width: 100%;

    .i-table {
      width: 100%;
    }
  }
</style>
