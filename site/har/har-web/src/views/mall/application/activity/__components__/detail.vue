<template>
  <drawer
    v-model="visible"
    title="查看线下活动"
    :footer="[1, 3].includes(data.info.status)"
  >
    <template #footer>
      <a-button type="primary" @click="onInvalid">作废</a-button>
    </template>
    <a-tabs default-active-key="0" @change="changeTab">
      <a-tab-pane key="0" title="运营信息">
        <a-row flex style="width: 60vw">
          <a-col :span="10">
            <div style="width: 100%; height: 250px">
              <pie-chart :data="data.run.pieChart"></pie-chart>
            </div>
          </a-col>
          <a-col :span="12" :offset="1">
            <div style="width: 100%; height: 250px">
              <bar-chart :data="data.run.barData"></bar-chart>
            </div>
          </a-col>
        </a-row>
        <a-divider orientation="left">报名用户</a-divider>
        <a-descriptions>
          <a-descriptions-item label="活动名称：">
            {{ data.run.signupInfo.name }}</a-descriptions-item
          >
          <a-descriptions-item label="人数限制（人）：">
            {{ data.run.signupInfo.maxSignupNum }}</a-descriptions-item
          >
          <a-descriptions-item label="状态：">{{
            activityStatusHash[data.run.signupInfo.status] || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="参与人数">{{
            data.run.signupInfo.signupNum || 0
          }}</a-descriptions-item>
          <a-descriptions-item label="剩余名额：">{{
            data.run.signupInfo.maxSignupNum - data.run.signupInfo.signupNum ||
            0
          }}</a-descriptions-item>
          <a-descriptions-item label="核销人数：">{{
            data.run.signupInfo.verificationNum || 0
          }}</a-descriptions-item>
        </a-descriptions>
        <i-table
          v-model="page.search"
          :options="page.runOptions"
          :api="cbdApiProjectActivitySignupListGet"
        >
          <template #payTypeCell="{ record }">
            {{ activityPayTypeHash[record.payType] || '--' }}
          </template>
          <template #signupFeeCell="{ record }">
            {{ record.signupFee || 0 + '元' }}
          </template>
          <template #cardStatusCell="{ record }">
            {{ checkStatusHash[record.cardStatus] || '--' }}
          </template>
        </i-table>
      </a-tab-pane>
      <a-tab-pane key="1" title="活动信息">
        <div v-if="!loading">
          <a-divider orientation="left">活动信息</a-divider>
          <a-descriptions>
            <a-descriptions-item label="活动名称：">
              {{ data.info.name }}</a-descriptions-item
            >
            <a-descriptions-item label="人数限制（人）：">
              {{ data.info.maxSignupNum }}</a-descriptions-item
            >
            <a-descriptions-item label="状态：">{{
              activityStatusHash[data.info.status] || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="活动类型：" :span="3">
              {{ data.info.activityType }}</a-descriptions-item
            >
            <a-descriptions-item
              v-if="data.info.warmUpStartDate"
              label="预热时间："
              :span="3"
            >
              {{ data.info.warmUpStartDate }} 至
              {{ data.info.warmUpEndDate }}</a-descriptions-item
            >
            <a-descriptions-item label="报名时间：" :span="3">
              {{ data.info.signupStartDate }} 至
              {{ data.info.signupEndDate }}</a-descriptions-item
            >
            <a-descriptions-item label="活动时间：" :span="3">
              {{ data.info.activityStartDate }} 至
              {{ data.info.activityEndDate }}</a-descriptions-item
            >
            <a-descriptions-item label="支付方式：" :span="3">
              {{
                activityPayTypeHash[data.info.payType] || '--'
              }}</a-descriptions-item
            >
          </a-descriptions>
          <a-descriptions layout="vertical">
            <a-descriptions-item label="活动封面：">
              <a-image
                height="100"
                :src="
                  data.info.coverPic &&
                  data.info.coverPic[0] &&
                  data.info.coverPic[0].previewAddress
                "
              ></a-image>
            </a-descriptions-item>
            <a-descriptions-item label="活动照片：">
              <a-image
                v-for="item in data.info.activityPic"
                :key="item.id"
                height="100"
                style="margin-right: 15px"
                :src="item.previewAddress"
              ></a-image
            ></a-descriptions-item>
          </a-descriptions>
          <a-descriptions>
            <a-descriptions-item label="指定会员可参与：" :span="3">
              {{ data.info.memberLevel }}</a-descriptions-item
            >
            <a-descriptions-item label="活动地址：" :span="3">
              {{ data.info.address }}</a-descriptions-item
            >
          </a-descriptions>
          <a-descriptions layout="vertical">
            <a-descriptions-item label="举办单位：" :span="3">
              <i-table
                :options="page.activityOptions"
                :data="[data.info.activityStore]"
              >
                <template #areaCell="{ record }">
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
              </i-table>
            </a-descriptions-item>
            <a-descriptions-item label="活动介绍：" :span="3">
              <div v-html="data.info.detail"></div
            ></a-descriptions-item>
          </a-descriptions>
        </div>
        <div
          v-else
          class="flex align-center justify-center"
          style="height: 50vh"
        >
          <a-spin />
        </div>
      </a-tab-pane>
    </a-tabs>
  </drawer>
</template>

<script setup lang="ts">
  import { reactive, onMounted, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import PieChart from '@/components/pie-chart/index.vue';
  import BarChart from '@/components/bar-chart/index.vue';
  import { Modal } from '@arco-design/web-vue';
  import {
    activityStatusHash,
    activityPayTypeHash,
    checkStatusHash
  } from '@/utils/dic';
  import {
    cbdApiProjectActivityCancelIdPost,
    cbdApiProjectActivityInfoIdGet,
    cbdApiProjectActivitySignupListGet,
    cbdApiProjectActivityOperationInfoIdGet
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import type { CbdApiProjectActivityOperationInfoIdGetResponse } from '@/api';
  type PieChartDataItem = Required<
    Required<CbdApiProjectActivityOperationInfoIdGetResponse>['pieChart']
  >['pieCharDataList'][0];
  // 柱状图数据item
  type BarGraphDataItem = Required<
    Required<CbdApiProjectActivityOperationInfoIdGetResponse>['barGraph']
  >['barGraphDataList'][0];
  // 折线图数据类型
  type LineChartDataItem = Required<
    Required<CbdApiProjectActivityOperationInfoIdGetResponse>['barGraph']
  >['lineChartDataList'][0];
  interface PageConfig {
    search: { activityId: string };
    activityOptions: Record<string, any>;
    runOptions: Record<string, any>;
  }

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const data = reactive<Record<string, any>>({
    info: {
      status: '',
      payType: '',
      activityStore: []
    },
    run: {
      signupInfo: {},
      pieChart: [],
      barData: {}
    }
  });
  const page = reactive<PageConfig>({
    search: {
      activityId: props.id
    },
    activityOptions: {
      tableCard: false,
      pageShow: false,
      menu: false,
      indexTitle: '序号',
      index: true,
      columns: [
        {
          label: '店铺名称',
          prop: 'name'
        },
        {
          label: '经营业态',
          prop: 'format'
        },
        {
          label: '所属区域',
          prop: 'area'
        },
        {
          label: '联系人',
          prop: 'linkman'
        },
        {
          label: '联系电话',
          prop: 'linkTel'
        }
      ]
    },
    runOptions: {
      tableCard: false,
      menu: false,
      indexTitle: '序号',
      index: true,
      columns: [
        {
          label: '用户搜索',
          prop: 'key',
          placeholder: '请输入用户编号/昵称/电话搜索',
          search: true,
          hide: true,
          span: 8
        },
        {
          label: '用户编号',
          prop: 'memberCode'
        },
        {
          label: '用户昵称',
          prop: 'userName'
        },
        {
          label: '会员等级',
          prop: 'userLevel'
        },
        {
          label: '用户电话',
          prop: 'userPhone'
        },
        {
          label: '支付方式',
          prop: 'payType'
        },
        {
          label: '支付明细',
          prop: 'signupFee'
        },
        {
          label: '核销状态',
          prop: 'cardStatus'
        },
        {
          label: '核销时间',
          prop: 'verificationTime'
        }
      ]
    }
  });
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
  const [getInfoData, loading] = useFuncProxy(async () => {
    data.info = await cbdApiProjectActivityInfoIdGet({
      id: props.id
    });
  });
  const [getRunData] = useFuncProxy(async () => {
    const res = await cbdApiProjectActivityOperationInfoIdGet({
      id: props.id
    });
    const tempData = res.pieChart?.pieCharDataList || [];
    data.run.pieChart = [];
    data.run.signupInfo = res.signupInfo;
    tempData.forEach((el: PieChartDataItem) => {
      data.run.pieChart.push({
        name: el.levelName,
        value: el.num
      });
    });
    data.run.barData = {
      payType: res.barGraph?.payType,
      xData: res.barGraph?.dateList,
      amountData: res.barGraph?.barGraphDataList?.map(
        (el: BarGraphDataItem) => el.amount
      ),
      signData: res.barGraph?.lineChartDataList?.map(
        (el: LineChartDataItem) => el.signupNum
      )
    };
  });
  function onInvalid() {
    Modal.open({
      title: '活动作废',
      content: '请确认是否作废当前活动，作废后用户将不能参加。',
      onOk: async () => {
        await cbdApiProjectActivityCancelIdPost({
          id: props.id
        });
        getInfoData();
        getRunData();
        emits('refresh');
      }
    });
  }
  function changeTab(e: string | number | boolean) {
    console.log(e);
    if (e === '1') {
      getInfoData();
    }
  }
  onMounted(() => {
    if (props.id) {
      getRunData();
    }
  });
</script>
<style scoped></style>
