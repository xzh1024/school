<template>
  <drawer v-model="visible" title="新增线下活动" :mask-close="false">
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="onSubmit">确定</a-button>
    </template>
    <a-divider orientation="left">基本信息</a-divider>
    <a-form ref="refForm" :model="form" :rules="page.rules" layout="vertical">
      <a-row>
        <a-col :span="6">
          <a-form-item field="name" label="活动名称">
            <a-input
              v-model="form.name"
              placeholder="请输入活动名称"
              maxlength="50"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6" :offset="2">
          <a-form-item field="maxSignupNum" label="人数限制（人）">
            <a-input
              v-model="form.maxSignupNum"
              placeholder="请输入活动人数上限"
              maxlength="5"
              @input="
                form.maxSignupNum = form.maxSignupNum.replace(/[^\d]/g, '')
              "
            />
          </a-form-item>
        </a-col>
        <a-col :span="6" :offset="2">
          <a-form-item field="activityTypeId" label="活动类型">
            <a-select
              v-model="form.activityTypeId"
              placeholder="请选择活动类型"
            >
              <a-option
                v-for="item in page.activityType"
                :key="item.id"
                :value="item.id"
                >{{ item.name }}</a-option
              >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item field="payType" label="支付方式">
        <a-radio-group
          v-model="form.payType"
          style="width: 40%"
          direction="vertical"
          @change="onChangePayType"
        >
          <a-row>
            <a-col :span="8"><a-radio value="1">现金支付</a-radio></a-col>
            <a-col v-if="form.payType === '1'" :span="14" :offset="2">
              <a-input
                v-model="form.signupFee"
                max-length="18"
                @input="
                  form.signupFee = form.signupFee.replace(
                    /^\D*(\d*(?:\.\d{0,2})?).*$/g,
                    '$1'
                  )
                "
              >
                <template #append>元</template></a-input
              ></a-col
            >
          </a-row>
          <a-row style="margin: 15px 0">
            <a-col :span="8"><a-radio value="2">积分支付</a-radio></a-col>
            <a-col v-if="form.payType === '2'" :span="14" :offset="2">
              <a-input
                v-model="form.signupFee"
                @input="
                  form.signupFee = form.signupFee.replace(/^\D*(\d+).*$/g, '$1')
                "
              >
                <template #append>分</template></a-input
              ></a-col
            >
          </a-row>
          <a-radio value="3">免费参与</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-checkbox
        v-model="page.needWarm"
        style="width: 100px; margin-bottom: 20px"
        >需要预热</a-checkbox
      >
      <a-form-item v-if="page.needWarm" field="warmUpDate" label="预热时间">
        <a-range-picker
          show-time
          allow-clear
          :time-picker-props="{
            step: {
              minute: 30
            },
            defaultValue: '00:00:00'
          }"
          format="YYYY-MM-DD HH:mm"
          :style="{ width: '80%' }"
          @change="onWarmDateChange"
        />
      </a-form-item>
      <a-form-item field="signupDate" label="报名时间">
        <a-range-picker
          show-time
          :style="{ width: '80%' }"
          format="YYYY-MM-DD HH:mm"
          :time-picker-props="{
            step: {
              minute: 30
            },
            defaultValue: '00:00:00'
          }"
          @change="onSignUpDateChange"
        />
      </a-form-item>
      <a-form-item field="activityDate" label="活动时间">
        <a-range-picker
          show-time
          :time-picker-props="{
            step: {
              minute: 30
            },
            defaultValue: '00:00:00'
          }"
          format="YYYY-MM-DD HH:mm"
          :style="{ width: '80%' }"
          @change="onActivityDateChange"
        />
      </a-form-item>
      <a-row>
        <a-col :span="4">
          <a-form-item field="coverPic" label="活动封面">
            <i-custom-upload
              v-model="form.coverPic"
              :options="{ limit: 1, accept: 'image/*' }"
            ></i-custom-upload>
          </a-form-item>
        </a-col>
        <a-col :span="18" :offset="1">
          <a-form-item field="activityPic" label="活动照片">
            <i-custom-upload
              v-model="form.activityPic"
              :options="{ accept: 'image/*' }"
            ></i-custom-upload>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item field="storeId" label="举办单位（门店）">
        <a-row style="width: 100%">
          <a-button type="text" @click="showChooseShop">选择举办单位</a-button>
          <a-col :span="24">
            <i-table :options="page.options" :data="page.shopInfo">
              <template #_areaCell="{ record }">
                {{
                  record.provinceName
                    ? record.provinceName +
                      '/' +
                      record.cityName +
                      '/' +
                      record.districtName
                    : '--'
                }}
              </template>
              <template #menu>
                <a-button type="text" @click="onDeleteShop">删除</a-button>
              </template>
            </i-table>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item field="isMember" label="参与人限制">
        <a-radio-group
          v-model="form.isMember"
          style="width: 100%"
          direction="vertical"
        >
          <a-radio value="1">不限制，所有人可参与</a-radio>
          <a-row style="width: 100%; margin: 15px 0">
            <a-col :span="5">
              <a-radio value="2"> 指定会员等级可参与</a-radio>
            </a-col>
            <a-col v-if="form.isMember === '2'" :span="8">
              <a-select
                multiple
                placeholder="选择会员等级"
                @change="onSelectMemberLevel"
              >
                <a-option
                  v-for="item in memberLevelList"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</a-option
                >
              </a-select>
            </a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <a-row>
        <a-col :span="12">
          <!--          <div class="location">定位：{{ addressObj.addressFormat || '' }}</div>-->
          <a-col :span="10">
            <a-form-item field="areaCode" label="所属区域" style="width: 350px">
              <a-cascader
                v-model="form.areaCode"
                :options="addressOptions"
                :path-mode="true"
                placeholder="请选择省 / 市 / 区"
                @change="areaChange"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item field="address" label="详细地址">
              <a-input
                v-model="form.address"
                placeholder="请填写详细地址，以便买家联系（勿重复填写省市区）"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-col>
      </a-row>
      <a-form-item field="detail" label="活动介绍">
        <i-editor v-model="form.detail" />
      </a-form-item>
    </a-form>
    <choose-item
      v-model="page.showChooseShop"
      v-model:select-keys="selectShopsKeys"
      :search="page.search"
      title="选择店铺"
      :options="chooseShopOptions"
      :api="cbdApiProjectCommonStoreSelectPageGet"
      @reset="page.search = { type: 1, projectId }"
      @submit="handleSelectShop"
    ></choose-item>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, Ref, computed } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ITable from '@/components/i-table/index.vue';
  import addressOptions from '@/utils/area.json';
  // import ShopMap from '@/views/mall/shopManage/shop/__components__/map.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import IEditor from '@/components/i-editor/index.vue';
  import ChooseItem from '@/components/choose-item/index.vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectActivityAddPost,
    CbdApiProjectActivityAddPostRequest,
    cbdApiProjectCommonFormatSelectListGet,
    cbdApiProjectCommonMembersLevelSelectGet,
    // cbdApiProjectStoreListGet,
    cbdApiProjectCommonStoreSelectPageGet,
    cbdApiProjectActivityTypeListGet
  } from '@/api';
  import useAreaInfo from '@/hooks/useAreaInfo';
  import type {
    CbdApiProjectCommonMembersLevelSelectGetResponse,
    CbdApiProjectCommonStoreSelectPageGetResponse,
    CbdApiProjectCommonFormatSelectListGetResponse,
    CbdApiProjectActivityTypeListGetResponse
  } from '@/api';
  type ShopItemData =
    Required<CbdApiProjectCommonStoreSelectPageGetResponse>['rows'][0];
  type MemberLevelItem = CbdApiProjectCommonMembersLevelSelectGetResponse[0];
  type IndustryListItem = CbdApiProjectCommonFormatSelectListGetResponse[0];
  type ActivityTypeListItem = CbdApiProjectActivityTypeListGetResponse[0];
  interface AddressItemType {
    label: string;
    value: string;
    children?: any;
  }
  interface PageConfig {
    search: {
      type: number;
      projectId: string;
      provinceCode?: string;
      cityCode?: string;
      districtCode?: string;
    };
    needWarm: boolean;
    showChooseShop: boolean;
    shopInfo: Array<ShopItemData | undefined>;
    activityType: Array<ActivityTypeListItem>;
    rules: { [key: string]: any };
    options: any;
  }
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const refForm: Ref = ref(null);
  const industryList = ref<Array<IndustryListItem>>([]);
  // const data = reactive<any>({
  //   info: {
  //     status: '',
  //     payType: '',
  //     activityStore: []
  //   },
  //   run: {
  //     signupInfo: {},
  //     pieChart: [],
  //     barData: {}
  //   }
  // });
  const form = reactive<any>({
    name: '',
    provinceCode: '',
    cityCode: '',
    districtCode: '',
    provinceName: '',
    cityName: '',
    districtName: '',
    address: '',
    maxSignupNum: '',
    memberLevel: '',
    payType: '',
    signupFee: '',
    warmUpDate: '',
    signupDate: '',
    activityDate: '',
    coverPic: [],
    activityPic: [],
    detail: ''
  });
  const selectShopsKeys = ref<Array<number>>([]);
  const page = reactive<PageConfig>({
    search: {
      type: 2,
      projectId: props.projectId
    },
    needWarm: false,
    showChooseShop: false,
    shopInfo: [],
    activityType: [],
    rules: {
      name: [{ required: true, message: '请输入活动名称' }],
      maxSignupNum: [{ required: true, message: '请输入活动人数上限' }],
      activityTypeId: [{ required: true, message: '请选择活动类型' }],
      payType: [{ required: true, message: '请选择支付类型' }],
      warmUpDate: [{ required: true, message: '请选择预热时间' }],
      signupDate: [{ required: true, message: '请选择报名时间' }],
      activityDate: [{ required: true, message: '请选择活动时间' }],
      coverPic: [{ required: true, message: '请上传活动封面图片' }],
      activityPic: [{ required: true, message: '请上传活动图片' }],
      storeId: [{ required: true, message: '请选择举办单位' }],
      isMember: [{ required: true, message: '请勾选参与人限制' }],
      // longitude: [{ required: true, message: '请完善地点定位信息' }],
      areaCode: [{ required: true, message: '请完善所属区域信息' }],
      address: [{ required: true, message: '请输入详细地址' }],
      detail: [{ required: true, message: '请输入活动介绍' }]
    },
    options: {
      tableCard: false,
      indexTitle: '序号',
      index: true,
      pageShow: false,
      columns: [
        {
          label: '店铺名称',
          prop: 'storeName'
        },
        {
          label: '经营业态',
          prop: 'manageName'
        },
        {
          label: '所属区域',
          prop: '_area'
        },
        {
          label: '联系人',
          prop: 'contacts'
        },
        {
          label: '联系电话',
          prop: 'contactsPhone'
        }
      ]
    }
  });
  const chooseShopOptions = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'radio'
        },
        onSelect: (e: number[]) => {
          selectShopsKeys.value = e;
        }
      },
      columns: [
        {
          label: '店铺名称',
          prop: 'key',
          search: true,
          hide: true
        },
        {
          label: '店铺名称',
          prop: 'storeName'
        },
        {
          label: '经营业态',
          prop: 'sceneId',
          type: 'cascader',
          search: true,
          hide: true,
          options: {
            'check-strictly': true,
            'fieldNames': {
              value: 'id',
              label: 'formatData'
            }
          },
          dic: industryList.value
        },
        {
          label: '经营业态',
          prop: 'manageName'
        },
        {
          label: '所属区域',
          prop: '_area',
          type: 'cascader',
          search: true,
          options: {
            pathMode: true
          },
          on: {
            change: (e: any) => {
              page.search.provinceCode = e[0];
              page.search.cityCode = e[1];
              page.search.districtCode = e[2];
            }
          },
          dic: addressOptions
        },
        {
          label: '联系人',
          prop: 'contacts'
        },
        {
          label: '联系电话',
          prop: 'contactsPhone'
        }
      ]
    };
  });

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
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
  const addressTemp = JSON.parse(JSON.stringify(addressOptions));
  const areaChange = async (e: any) => {
    const { provinceName, cityName, countyName } = await useAreaInfo(
      String(e[0]),
      String(e[1]),
      String(e[2])
    );
    form.areaCodeAll = {
      provinceCode: String(e[0]),
      cityCode: String(e[1]),
      districtCode: String(e[2])
    };
    form.areaName = {
      provinceName,
      cityName,
      districtName: countyName
    };
  };
  async function onSubmit() {
    const res = await refForm.value?.validate();
    if (!res) {
      const pics: string[] = [];
      form.activityPic.forEach((el: any) => {
        pics.push(el.key);
      });
      await cbdApiProjectActivityAddPost({
        ...form,
        ...form.areaName,
        ...form.areaCodeAll,
        coverPic: form.coverPic.map((el: any) => el.key),
        activityPic: pics,
        projectId: props.projectId
      } as CbdApiProjectActivityAddPostRequest);
      Message.success('操作成功!');
      visible.value = false;
      emits('refresh');
    }
  }
  function onWarmDateChange(
    e: (Date | string | number | undefined)[] | undefined = []
  ) {
    form.warmUpDate = e;
    form.warmUpStartDate = e[0] ? e[0] + ':00' : '';
    form.warmUpEndDate = e[1] ? e[1] + ':00' : '';
  }
  function onSignUpDateChange(
    e: (Date | string | number | undefined)[] | undefined = []
  ) {
    form.signupDate = e;
    form.signupStartDate = e[0] ? e[0] + ':00' : '';
    form.signupEndDate = e[1] ? e[1] + ':00' : '';
  }
  function onActivityDateChange(
    e: (Date | string | number | undefined)[] | undefined = []
  ) {
    form.activityDate = e;
    form.activityStartDate = e[0] ? e[0] + ':00' : '';
    form.activityEndDate = e[1] ? e[1] + ':00' : '';
  }
  function showChooseShop() {
    page.showChooseShop = true;
  }
  function onChangePayType() {
    form.signupFee = '';
  }
  function onSelectMemberLevel(
    e:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any>)[]
  ) {
    if (Array.isArray(e)) {
      form.memberLevel = e.join(',');
    }
  }
  function handleSelectShop(v: { data: Array<ShopItemData> }) {
    const item = (v.data || []).find((el: ShopItemData) =>
      selectShopsKeys.value.includes(el.id)
    );
    page.shopInfo = [item];
    form.storeId = item!.id;
    page.showChooseShop = false;
  }
  function onDeleteShop() {
    selectShopsKeys.value = [];
    page.shopInfo = [];
  }
  const memberLevelList = ref<Array<MemberLevelItem>>([]);
  const [getMembersData] = useFuncProxy(async () => {
    memberLevelList.value = await cbdApiProjectCommonMembersLevelSelectGet({});
  });
  const [getIndustryList] = useFuncProxy(async () => {
    industryList.value = await cbdApiProjectCommonFormatSelectListGet({});
  });
  const [getActivityTypeList] = useFuncProxy(async () => {
    page.activityType = await cbdApiProjectActivityTypeListGet({
      projectId: props.projectId
    });
  });
  flatArr(addressTemp);
  onMounted(() => {
    if (props.projectId) {
      getActivityTypeList();
    }
    getMembersData();
    getIndustryList();
  });
</script>
<style scoped>
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
</style>
