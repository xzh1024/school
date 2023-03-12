<template>
  <drawer
    v-model="visible"
    :title="title"
    :width="1200"
    :options="{
      onBeforeCancel,
      maskClosable: false
    }"
  >
    <div v-if="loading">
      <a-skeleton animation>
        <a-space direction="vertical" size="large" class="width-max">
          <a-skeleton-line :rows="6" :line-height="32" />
        </a-space>
      </a-skeleton>
    </div>
    <div v-else>
      <i-form ref="refForm" v-model="form" :options="options">
        <template #filesForm>
          <i-custom-upload
            v-model="form.files"
            url-key="previewAddress"
            :options="{
              accept: 'image/*'
            }"
          ></i-custom-upload>
        </template>
        <template #merchantInfoForm>
          <a-form-item field="merchantId" hide-label>
            <div class="text-left">
              <a-space>
                <a-button type="primary" @click="choice">选择商户</a-button>
                <a-button type="primary" @click="merchantVisible = true"
                  >新增商户</a-button
                >
              </a-space>
            </div>
          </a-form-item>
        </template>
        <template #periodForm>
          <a-range-picker
            v-model="form.period"
            :disabled-date="disabledDate"
            @change="dateRange"
            @popup-visible-change="dates = []"
            @select="onSelect"
          />
        </template>
        <template #ascriptionCompanyIdForm>
          <a-tree-select
            ref="selectCompany"
            v-model="form.ascriptionCompanyId"
            placeholder="请选择合同甲方"
            :data="companyList"
            :field-names="{
              key: 'value',
              title: 'label',
              children: 'children'
            }"
          >
            <!--            <a-option-->
            <!--              v-for="(item, index) in companyList"-->
            <!--              :key="index"-->
            <!--              :value="item.value"-->
            <!--              >{{ item.label }}</a-option-->
            <!--            >-->
          </a-tree-select>
        </template>
        <template #contractAssetsForm>
          <a-cascader
            ref="refCascader"
            v-model="form.contractAssets"
            :options="contractAssetsList"
            :fallback="fallbackRes"
            placeholder="请选择资产"
            :load-more="loadMore"
            multiple
            @change="cascaderChange"
          />
        </template>
        <template #merchantShopForm>
          <div class="margin-top-t">
            <a-descriptions
              v-if="
                merchantInfo.name ||
                merchantInfo.legalPerson ||
                merchantInfo.companyName
              "
            >
              <Descriptions-item label="商户/企业名称" :span="1">{{
                merchantInfo.name || merchantInfo.merchantName
              }}</Descriptions-item>
              <Descriptions-item label="地址" :span="2">{{
                merchantInfo.address
              }}</Descriptions-item>
              <Descriptions-item label="承租人/负责人姓名" :span="1">{{
                merchantInfo.principal
              }}</Descriptions-item>
              <Descriptions-item label="身份证号码" :span="1">{{
                merchantInfo.principalId
              }}</Descriptions-item>
              <Descriptions-item label=" 户籍地址" :span="1">{{
                merchantInfo.principalRegisterAddress
              }}</Descriptions-item>
              <Descriptions-item label="公司名称" :span="1">{{
                merchantInfo.companyName
              }}</Descriptions-item>
              <Descriptions-item label="法人代表" :span="1">{{
                merchantInfo.legalPerson
              }}</Descriptions-item>
              <Descriptions-item label="社会统一信用代码" :span="1">{{
                merchantInfo.uscCode
              }}</Descriptions-item>
            </a-descriptions>
          </div>
        </template>
        <template #customTabForm>
          <a-tabs :default-active-key="0" justify>
            <a-tab-pane
              v-for="(item, index) in form.costTypeList"
              :key="index"
              :title="item.costTypeName"
            >
              <tab-item
                v-model="form.costTypeList[index]"
                :validate-func="validateForm"
                :month="form.month"
                :is-house-rental="form.isHouseRental"
                :contract-date="form.period"
                :area-arr="assetAreaArr"
                @calc-change="calcChange"
                @date-change="dateChange"
              />
            </a-tab-pane>
          </a-tabs>
        </template>
        <template #customTotalTableForm>
          <total-table v-model="form" @calc-change="calcChange"></total-table>
        </template>
      </i-form>
      <i-modal
        v-model="choiceVisible"
        title="选择商户"
        :options="{ footer: false, width: 800 }"
      >
        <choice-list v-if="choiceVisible" @change="choiceChange"></choice-list>
      </i-modal>
      <create-merchant
        v-if="merchantVisible"
        v-model:modalVisible="merchantVisible"
        @confirm="merchantConfirm"
      />
    </div>
    <template #footer>
      <a-button @click="cancel">取消</a-button>
      <a-button type="outline" @click="submit(0)">存草稿</a-button>
      <a-button type="primary" @click="submit(1)">提交</a-button>
    </template>
  </drawer>
</template>

<script lang="ts">
  export default {
    name: 'Edit'
  };
</script>

<script lang="ts" setup>
  import IForm from '@/components/i-form/index.vue';
  import { computed, onMounted, Ref, ref, toRaw, watch } from 'vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import IModal from '@/components/i-modal/index.vue';
  import ChoiceList from '@/views/contract/__components__/choice-list.vue';
  import { DescriptionsItem, Message } from '@arco-design/web-vue';
  // import { costTypeList } from '@/utils/dic';
  import TabItem from '@/views/contract/__components__/tab-item.vue';
  import TotalTable from '@/views/contract/__components__/total-table.vue';
  import dayjs from 'dayjs';
  import {
    cbdApiProjectCommonAssetsSelectListGet,
    cbdApiProjectCommonGetDictDataCodeGet,
    cbdApiProjectContractCheckEstateRentIsLeasePost,
    cbdApiProjectContractInfoIdGet,
    cbdApiProjectContractSavePost,
    cbdApiProjectContractUpdatePut
  } from '@/api';
  import CreateMerchant from '@/components/createMerchant/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useGetCompanyData from '@/hooks/useGetCompanyData';
  import NP from 'number-precision';
  import {
    deleteLocalForm,
    getLocalForm,
    setLocalForm
  } from '@/utils/localFormStore';
  import { debounce } from '@/utils';
  const selectCompany = ref<any>(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number]
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
  const costTypeListDic: Ref = ref([]);
  const [getCostTypeListDic] = useFuncProxy(async () => {
    costTypeListDic.value = await cbdApiProjectCommonGetDictDataCodeGet(
      { code: '00011' },
      { cache: true, cacheKey: '00011' }
    );
  });
  const loading = ref<boolean>(false);
  const [getContractInfo] = useFuncProxy(
    async () => {
      loading.value = true;
      const res = await cbdApiProjectContractInfoIdGet({ id: `${props.id}` });
      const { periodEnd, periodStart, costTypeList = [], tree = [] } = res;
      const { contractEstateList = [], merchantInfo = {} } = res;
      const newList: any = [];
      const assetsList: any = [];
      const contract: any = [];
      // 处理所需值
      contractEstateList.forEach((i: any) => {
        const { manageId = '', estatePayPlanList = [] } = i;
        let receivableAmount = 0;
        estatePayPlanList.forEach((j: any) => {
          const { payPlan = [] } = j;
          payPlan.forEach((k: any) => {
            const price = k?.receivableAmount || 0;
            receivableAmount = NP.plus(receivableAmount, price);
          });
        });
        const manageIdArr = manageId.split(',').map((i: string) => Number(i));

        // 资产ID  数组
        assetsList.push(i.estateId);
        const b = { ...i };
        delete b.estatePayPlanList;
        // 本地计算所需资产内容
        contract.push({
          ...b,
          estateName: i.estateName,
          estateId: i.estateId,
          manageId: manageIdArr
        });

        // 资产
        newList.push({
          ...i,
          receivableAmount,
          manageId: manageIdArr
        });
      });
      // 处理时间区间
      const period = [periodStart, periodEnd];

      const month = dayjs(periodEnd).diff(dayjs(periodStart), 'month');
      // console.log(filterList(tree));
      // contractAssetsList.value = filterList(tree);
      console.log(res);
      form.value = {
        ...res,
        period,
        month,
        contractAssets: assetsList,
        contract,
        merchantInfo: {
          ...merchantInfo,
          // 商户信息回显id
          sceneIds: newList?.[0].sceneIds || [],
          purposeId: newList?.[0].leasePurposeId || ''
        },
        costType: costTypeList.map((i) => i.costTypeId),
        contractEstateList: newList
      };
      loading.value = false;
    },
    () => {
      loading.value = false;
    }
  );
  const dates = ref<(Date | undefined)[]>([]);

  onMounted(() => {
    // console.log("onMounted")
    if (props.id) {
      getContractInfo();
    } else {
      getLocal();
    }
    getAssetsList();
    getCostTypeListDic();
  });

  const refCascader: Ref = ref(null);
  const [companyList] = useGetCompanyData();
  const contractAssetsList: Ref = ref([]);
  const merchantVisible: Ref<boolean> = ref(false);
  const refForm: Ref = ref(null);
  const choiceVisible: Ref<boolean> = ref(false);
  const form: Ref = ref({
    period: [],
    periodRange: [],
    contract: [],
    bond: 0
  });

  const setHistory = debounce(() => {
    // console.log(JSON.parse(JSON.stringify(form.value)))
    setLocalForm('contractEditForm', JSON.parse(JSON.stringify(form.value)));
  }, 2000);
  watch(
    form,
    () => {
      if (!props.id && visible.value) {
        setHistory();
      }
    },
    { deep: true }
  );
  const [getAssetsList] = useFuncProxy(async () => {
    contractAssetsList.value = await cbdApiProjectCommonAssetsSelectListGet({
      level: `1`
    });
  });

  // 获取本地存储
  async function getLocal() {
    try {
      const res = await getLocalForm('contractEditForm');
      console.log(res);
      form.value = res || {};
    } catch (e) {
      console.error(e);
    }
  }

  // 远程加载内容
  async function loadMore(option: any, done: any) {
    // console.log(option, done);
    const { level, value } = option;
    try {
      const res = await cbdApiProjectCommonAssetsSelectListGet({
        level: level + 1,
        parentValue: value
      });
      if (level === 3) {
        done(
          res.map((i: any) => {
            return { ...i, ...i.extra, isLeaf: true };
          })
        );
      } else {
        done(res);
      }
    } catch (e) {
      console.error(e);
    }
  }
  const options = computed<any>(() => {
    return {
      span: 8,
      autoLabelWidth: true,
      layout: 'vertical',
      menuForm: false,
      columns: [
        {
          label: '合同基本信息',
          type: 'groupTitle',
          prop: ''
        },
        {
          label: '合同甲方',
          prop: 'ascriptionCompanyId',
          type: 'treeSelect',
          props: {
            key: 'value',
            title: 'label',
            children: 'children'
          },
          rules: [{ required: true, message: '请选择合同甲方' }]
        },
        {
          label: '合同编号',
          prop: 'code'
          // rules: [{ required: true, message: '请填写合同编号' }]
        },
        {
          label: '甲方地址',
          prop: 'address',
          rules: [{ required: true, message: '请填写甲方地址' }]
        },
        {
          label: '方案号',
          prop: 'schemeCode'
        },
        {
          label: '合同开始日',
          prop: 'period',
          // type: 'date',
          rules: [{ required: true, message: '请选择合同开始日' }]
        },
        /*{
          label: '合同结束月',
          prop: 'periodRange',
          type: 'month',
          rules: [{ required: true, message: '请选择合同期限' }],
          on: {
            change(v = []) {
              const [start, end] = v;
              if (start && end) {
                const month = dayjs(end).diff(dayjs(start), 'month');
                // console.log(month);
                form.value.month = month;
              }
            }
          }
        },*/
        {
          label: '备注',
          prop: 'remark',
          type: 'textarea',
          span: 24,
          options: {
            showWordLimit: true,
            maxLength: 200
          }
        },
        {
          label: '合同文件',
          prop: 'files',
          span: 24
        },
        {
          label: '商户信息',
          prop: 'merchantId',
          type: 'groupTitle'
        },
        {
          label: '商户信息',
          prop: 'merchantInfo',
          span: 24,
          rules: [{ required: true, message: '请选择商户信息' }],
          options: {
            noStyle: true,
            wrapperColStyle: {
              marginBottom: 0
            }
          }
        },
        {
          type: 'groupTitle',
          prop: 'merchantShop'
        },
        {
          label: '合同信息',
          type: 'groupTitle'
        },
        {
          label: '合同资产',
          prop: 'contractAssets',
          // type: 'cascader',
          span: 12,
          rules: [{ required: true, message: '请选择合同资产' }],
          /* dicRequest: () => {
            return cbdApiProjectCommonAssetsSelectListGet({ level: `1` });
          }, */
          options: {
            pathMode: true,
            multiple: true,
            loadMore
          },
          on: {
            /*  change(v = []) {
              console.log(v);
              const ids = v.map((i) => i?.[3]);
              const {contract = []} = form.value
               ids.filter(i=> !contract.some(j=> j.estateId === i))
            } */
          }
        },
        {
          label: '保证金',
          prop: 'bond',
          type: 'inputNumber',
          rules: [
            { required: true, message: '请填写保证金' },
            { pattern: /^\d+$/, message: '请填写正确的保证金' }
          ]
        },
        {
          label: '费用类型',
          type: 'select',
          prop: 'costType',
          rules: [{ required: true, message: '请选择费用类型' }],
          dic: costTypeListDic.value,
          /*  dicRequest: () => {
            return cbdApiProjectCommonGetDictDataCodeGet({ code: `00011` });
          }, */
          options: {
            multiple: true,
            fieldNames: {
              value: 'id',
              label: 'dataName'
            }
          },
          on: {
            change(a: Array<number>) {
              let list = form.value?.costTypeList || [];
              // console.log(a, list, 'test test');
              if (list.length > a.length) {
                const arr: any[] = [];
                list.forEach((j: any) => {
                  if (a.some((i: number) => i === j.costTypeId)) {
                    arr.push(j);
                  }
                });
                list = arr;
              } else {
                a.forEach((i) => {
                  if (!list.some((s: any) => s.costTypeId === i)) {
                    const item = costTypeListDic.value.find(
                      (c: any) => c.id === i
                    );
                    // console.log(item, 'item');
                    if (item)
                      list.push({
                        costTypeId: item.id,
                        costTypeCode: item.dataCode,
                        costTypeName: item.dataName
                      });
                  }
                });
              }
              // console.log(list);
              const r = a.length ? list : [];
              form.value.costTypeList = r;
              if (r.length) {
                const bool = r.some((i: any) => {
                  const { chargingRule = {} } = i;
                  return chargingRule.type;
                });
                if (bool) {
                  calcChange();
                }
              } else {
                form.value.contractEstateList = [];
              }

              // calcChange()
            }
          }
        },
        {
          prop: 'customTab',
          type: 'groupTitle',
          span: 24
        },
        {
          // prop: 'customTotalTable',
          label: '资产租赁情况',
          type: 'groupTitle',
          span: 24
        },
        {
          prop: 'customTotalTable',
          type: 'groupTitle',
          span: 24
        }
      ]
    };
  });
  const title: Ref<string> = computed(() => {
    return props.id ? '编辑合同' : '新建合同';
  });
  function choice() {
    choiceVisible.value = true;
  }
  // 选择商户回调
  function choiceChange(res: any) {
    form.value.merchantInfo = res;
    choiceVisible.value = false;
    refForm.value.submit();
  }
  // 商户信息
  const merchantInfo: Ref = computed(() => {
    let res = {};
    if (form.value?.merchantInfo?.basicInfo?.name) {
      // 本地选择来源
      const {
        name = '',
        provinceName = '',
        cityName = '',
        districtName = '',
        address = '',
        sceneIds = [],
        purposeId = '',
        purposeName = '',
        sceneName = ''
      } = form.value?.merchantInfo?.basicInfo || {};
      const r = form.value?.merchantInfo?.businessInfo || {};
      res = {
        ...r,
        name,
        sceneIds,
        purposeId,
        purposeName,
        sceneName: sceneName.replace(/,/g, '/'),
        address: provinceName + cityName + districtName + address
      };
    } else {
      // 远程回显来源
      const r = form.value?.merchantInfo || {};
      res = {
        ...r,
        address: r.provinceName + r.cityName + r.districtName + r.address
      };
    }
    return res;
  });
  function validateForm() {
    return refForm.value.submit();
  }
  // 区域
  const assetAreaArr = computed(() => {
    // 后续根据 contractAssets选择来处理
    const { contract = [] } = form.value;
    return contract.map((i: any) => i.acreage);
  });
  const assetAreaTotal = computed(() => {
    return assetAreaArr.value.reduce((prev: number, next: number) => {
      return NP.plus(prev, next);
    }, 0);
  });

  // 资产list计算
  function calcChange() {
    console.log('整体计算');
    const { costTypeList = [], contract = [], month = 0 } = form.value;
    const {
      sceneIds = [],
      purposeId,
      purposeName,
      sceneName
    } = merchantInfo.value;
    let currentArea = assetAreaTotal.value;
    form.value.contractEstateList = contract.map((k: any, index: number) => {
      const assetList: any[] = [];
      let receivableAmount = 0;
      const { acreage } = k;
      let hasCommission = false;
      // 多类型处理
      costTypeList.forEach((i: any) => {
        const { payPlan = [], chargingRule = {} } = i;
        const newPayPlan: any[] = [];
        const { type = 1, isGuarantee, method, amount = 0 } = chargingRule;
        // 计划价格
        if (type === 1) {
          payPlan.forEach((j: any, jIndex: number) => {
            // 每平价格 均摊
            const res =
              Math.floor(
                NP.divide(j.receivableAmount, assetAreaTotal.value) * 100
              ) / 100;
            // 每平优惠 均摊
            const resDiscount =
              Math.floor(
                NP.divide(j.discountAmount, assetAreaTotal.value) * 100
              ) / 100;

            let newPrice = 0;
            let newDiscountPrice = 0;

            // 是否是最后一个
            if (Number(currentArea) === Number(acreage)) {
              const prevArea = NP.minus(assetAreaTotal.value, currentArea);
              const totalPrice = NP.times(prevArea, res);
              const totalDiscountPrice = NP.times(prevArea, resDiscount);
              newPrice = NP.minus(j.receivableAmount, totalPrice);
              newDiscountPrice = NP.minus(j.discountAmount, totalDiscountPrice);
            } else {
              newDiscountPrice = NP.times(acreage, resDiscount);
              newPrice = NP.times(acreage, res);
            }
            // 累加所有应收
            receivableAmount = NP.plus(receivableAmount, newPrice);
            newPayPlan.push({
              ...j,
              estateId: k?.estateId,
              payPlanCode: j.code,
              receivableAmount: newPrice,
              discountAmount: newDiscountPrice,
              totalAmount: NP.plus(newPrice, newDiscountPrice)
            });
          });
        } else {
          if (isGuarantee) {
            if (method === 1) {
              receivableAmount = NP.plus(
                receivableAmount,
                NP.times(acreage, amount, month)
              );
            } else {
              const squareMeterPrice =
                Math.floor(NP.divide(amount, assetAreaTotal.value) * 100) / 100;
              if (Number(currentArea) === Number(acreage)) {
                const prevArea = NP.minus(assetAreaTotal.value, acreage);
                const totalMeterPrice = NP.times(prevArea, squareMeterPrice);
                receivableAmount = NP.plus(
                  receivableAmount,
                  NP.times(NP.minus(amount, totalMeterPrice), month)
                );
              } else {
                console.log(acreage, 'acreage');
                receivableAmount = NP.plus(
                  receivableAmount,
                  NP.times(acreage, squareMeterPrice, month)
                );
              }
            }
          }
          hasCommission = true;
        }

        assetList.push({
          ...i,
          deductionSort: index,
          // squarePlan,
          leasePurposeId: k.leasePurposeId ? k.leasePurposeId : purposeId,
          leasePurposeName: k.leasePurposeName
            ? k.leasePurposeName
            : purposeName,
          manageId: k.manageId ? k.manageId : sceneIds,
          manageName: k.manageName ? k.manageName : sceneName,
          estateId: k?.estateId,
          payPlan: newPayPlan
        });
      });
      // 减去当前面积
      currentArea = NP.minus(currentArea, acreage);
      return {
        ...k,
        hasCommission,
        leasePurposeId: k.leasePurposeId || purposeId,
        leasePurposeName: k.leasePurposeName || purposeName,
        manageId: k.manageId || sceneIds,
        manageName: k.manageName || sceneName,
        estateName: k.name || k.estateName,
        receivableAmount,
        estatePayPlanList: assetList,
        deductionSort: index
      };
    });
  }
  async function submit(type: number) {
    try {
      const r = await validateForm();
      const { month } = form.value;
      let { contractEstateList = [], files = [] } = form.value;
      if (!contractEstateList.length) return Message.error('请选择缴费方案 ');
      if (r) return;
      // console.log(form.value);
      const {
        period = [],
        merchantInfo: { basicInfo = {} },
        merchantId: merchantIdOuter
      } = form.value;

      /*costTypeList = costTypeList.map((i: any) => {
        let { chargingRule = {} } = i;
        chargingRule = {
          ...chargingRule,
          isGuarantee: chargingRule.isGuarantee ? 1 : 0
        };
        return { ...i, chargingRule };
      });*/
      // manageId转字符串

      contractEstateList = contractEstateList.map((i: any) => {
        const manageId = i.manageId?.join(',');
        return {
          ...i,
          manageId,
          estateId: i.estateId,
          leasePurposeId: i.leasePurposeId,
          leasePurposeName: i.leasePurposeName,
          manageName: i.manageName,
          area: i.acreage,
          totalAmount: i.receivableAmount,
          deductionSort: i.deductionSort
        };
      });

      // 取文件内容
      files = files.map((i: any) => {
        return i?.response?.data?.key || i?.id;
      });
      console.log(files);
      const [periodStart, periodEnd] = period;
      const merchantId = basicInfo.id || merchantIdOuter;
      const params = {
        ...form.value,
        ascriptionCompanyName: selectCompany.value?.selectedValue[0].label,
        files,
        submitMethod: type,
        periodStart,
        periodEnd,
        merchantId,
        contractEstateList
      };
      if (props.id) {
        await cbdApiProjectContractUpdatePut(params);
      } else {
        await cbdApiProjectContractSavePost(params);
        await deleteLocalForm('contractEditForm');
      }
      // console.log(r);
      resetForm();
      Message.success('保存成功');

      emits('refresh');
      visible.value = false;
    } catch (e) {
      console.error(e);
    }
  }

  function resetForm() {
    form.value = {
      period: [],
      periodRange: [],
      contract: [],
      bond: 0
    };
  }

  // 资产级联更改 取选中级联原始数据
  async function cascaderChange(v: any = []) {
    console.log(v);
    // const timer = setTimeout(async () => {
    try {
      const { filteredLeafOptions } = refCascader.value || {};
      const newArr: any = [];
      console.log(filteredLeafOptions);
      const checkedList = filteredLeafOptions.filter((i: any) =>
        v.some((j: number) => j === i.value)
      );
      const {
        period = [],
        month = 0,
        contractAssets,
        contract = []
      } = form.value;
      const [periodStart, periodEnd] = period;
      if (v.length) {
        await cbdApiProjectContractCheckEstateRentIsLeasePost({
          estateIds: v,
          periodStart,
          periodEnd
        });
      }
      // 处理原始数据
      const newContract = contract.filter((i: any) =>
        contractAssets.some((j: number) => j === i.estateId)
      );
      // 处理选中内容数据
      const newCheckList = checkedList.map((i: any) => {
        const name = i?.path?.map((i: any) => i.label) || [];
        // 回显展示
        const { projectName, buildingName, floorName, doorPlate } = i.raw || {};
        const estateName = `${projectName}/${buildingName}/${floorName}/${doorPlate}`;
        return {
          ...(i?.raw || {}),
          name: name.join(''),
          estateId: i.raw.value,
          estateName
        };
      });
      // 去重
      const hash: any = {};

      newContract.concat(newCheckList).forEach((i: any) => {
        if (!hash[i.estateId]) {
          newArr.push(i);
          hash[i.estateId] = i.estateId;
        }
      });
      form.value = {
        ...form.value,
        contract: newArr,
        costTypeList: [],
        contractEstateList: [],
        costType: [],
        isHouseRental: false
      };
      // clearTimeout(timer);
    } catch (e) {
      form.value = {
        ...form.value,
        contract: [],
        costTypeList: [],
        contractEstateList: [],
        costType: [],
        isHouseRental: true
      };
      console.error(e);
    }
    // }, 0);
  }

  function dateChange(item: any) {
    const { code, payStartDate } = item;
    let { contractEstateList = [] } = form.value;
    contractEstateList = contractEstateList.map((k: any) => {
      let { estatePayPlanList = [] } = k;
      estatePayPlanList = estatePayPlanList.map((i: any) => {
        let { payPlan = [] } = i;
        payPlan = payPlan.map((j: any) => {
          if (j.code === code) {
            j.date = payStartDate;
            j.payStartDate = payStartDate;
            j.payEndDate = payStartDate;
          }
          return j;
        });
        return { ...i, payPlan };
      });
      return { ...k, estatePayPlanList };
    });
    form.value.contractEstateList = contractEstateList;
  }

  // 新增商户回调
  function merchantConfirm(item: any) {
    form.value.merchantInfo = item;
  }

  //
  function fallbackRes(item: any) {
    const { contract = [] } = form.value;
    return contract.find((i: any) => i.estateId === item)?.estateName;
  }

  // 取消事件
  function cancel() {
    if (!props.id) setLocalForm('contractEditForm', toRaw(form.value));
    visible.value = false;
  }
  function onBeforeCancel() {
    if (!props.id) setLocalForm('contractEditForm', toRaw(form.value));
    return true;
  }

  function disabledDate(current?: Date) {
    const [start, end] = dates.value;
    const c = dayjs(current).date();
    const lastDay = dayjs(current).endOf('month').date();
    if (start) {
      const s = dayjs(start).date();
      if (s > lastDay) {
        return lastDay !== c;
      }
      return c !== s;
    }
    if (end) {
      const e = dayjs(end).date();
      if (e > lastDay) {
        return lastDay !== c;
      }
      return e !== c;
    }
    return false;
  }
  function onSelect(
    valueString: (Date | string | number | undefined)[],
    value: (Date | undefined)[]
  ) {
    dates.value = value;
  }
  function dateRange(v: (Date | string | number | undefined)[] | undefined) {
    const [s, e] = v || [];
    const month = dayjs(e).diff(dayjs(s), 'month');
    form.value.month = month;
  }
</script>

<style scoped lang="less">
  .width-max {
    width: 100%;
  }

  .margin-top-t {
    margin-top: -30px;
  }

  .text-left {
    text-align: left;
  }

  :deep(.arco-tabs) {
    width: 100%;
  }

  :deep(.arco-tabs-nav-tab-list) {
    display: flex;
    flex: 1;
  }

  :deep(.arco-tabs-nav-type-line .arco-tabs-tab) {
    flex: 1;
    justify-content: center;
  }

  :deep(.arco-tabs-nav-ink) {
    display: none;
  }

  :deep(.arco-tabs-tab) {
    border-bottom: 2px solid transparent;
  }

  :deep(.arco-tabs-tab-active) {
    border-bottom: 1px solid rgb(var(--primary-6));
  }
</style>
