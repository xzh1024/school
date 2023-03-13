<template>
  <drawer v-model="visible" title="查看用户" :footer="false">
    <div class="white-detail-box">
      <a-divider orientation="left">用户信息</a-divider>
      <a-descriptions :label-style="{ marginBottom: '10px' }">
        <a-descriptions-item label="用户编号：">
          {{ data.info.code }}</a-descriptions-item
        >
        <a-descriptions-item label="用户昵称：">
          {{ data.info.nickName }}</a-descriptions-item
        >
        <a-descriptions-item label="会员等级：">
          {{ data.info.levelName }}</a-descriptions-item
        >
        <a-descriptions-item label="用户电话：">
          {{ data.info.phone }}</a-descriptions-item
        >
        <a-descriptions-item label="注册时间：" :span="2">
          {{ data.info.createTime }}</a-descriptions-item
        >
        <a-descriptions-item label="用户头像：">
          <a-image :src="data.info.avatarUrl" width="80"></a-image>
        </a-descriptions-item>
      </a-descriptions>
      <a-divider orientation="left">会员信息</a-divider>
      <div class="flex align-center">
        <div style="margin-right: 15px">会员权益</div>
        <div class="flex">
          <div
            v-for="(item, idx) in data.info.rights"
            :key="idx"
            class="right-box"
          >
            <a-image :src="item.icon.previewAddress" width="60"></a-image>
            <div style="padding-top: 10px">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <a-tabs default-active-key="0" @change="changeTab">
        <a-tab-pane key="0" title="会员等级">
          <div style="text-align: center">
            <a-space>
              <p>{{ data.memberInfo.name }}</p>
              <a-tag color="#b71de8">{{ data.memberInfo.defaultName }}</a-tag>
            </a-space>
          </div>
          <div style="margin-bottom: 5px; text-align: center"
          >{{ data.memberInfo.haveLevelBean }}/{{
              data.memberInfo.nextLevelBean || '--'
            }}</div
          >
          <div v-if="maxProgress" class="bar-box">
            <a-slider
              :style="{ width: '100%' }"
              :model-value="currentBean"
              show-ticks
              :max="maxProgress"
              :marks="progressData"
            />
            <p
            >距下一级还需
              <span style="font-weight: bold">{{
                  data.memberInfo.nextLevelBean
                    ? data.memberInfo.nextLevelBean - data.memberInfo.haveLevelBean
                    : 0
                }}</span>
              等级豆</p
            >
          </div>

          <a-divider orientation="left">等级豆明细</a-divider>
          <i-table
            v-model="page.search"
            :options="page.levelOptions"
            :api="cbdApiProjectMembersLevelBeanListGet"
          >
            <template #typeCell="{ record }">
              {{
                record.levelBean > 0
                  ? '增加'
                  : record.levelBean === 0
                    ? '--'
                    : '减少'
              }}
            </template>
            <template #wayCell="{ record }">
              {{ typeHash[record.type] }}
            </template>
          </i-table>
        </a-tab-pane>
        <a-tab-pane key="1" title="会员积分">
          <div class="total-integral">
            总积分：<b>{{ data.integralData.totalIntegral }}</b>
          </div>
          <a-divider orientation="left">积分明细</a-divider>
          <i-table
            :options="page.integralOptions"
            :data="data.integralData.integralList.rows"
            :page="integralPage"
            @page-size-change="onIntegralPageSizeChange"
            @page-change="onIntegralPageChange"
          >
            <template #typeCell="{ record }">
              {{
                record.integral > 0
                  ? '增加'
                  : record.integral === 0
                    ? '--'
                    : '减少'
              }}
            </template>
            <template #wayCell="{ record }">
              {{ integralTypeHash[record.type] }}
            </template>
          </i-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { reactive, onMounted, Ref, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import {
    cbdApiProjectMembersDetailIdGet,
    cbdApiProjectMembersLevelIdGet,
    cbdApiProjectMembersLevelBeanListGet,
    cbdApiProjectMembersIntegralListGet
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';

  const typeHash: { [index: number]: string } = {
    1: '购买',
    2: '退款'
  };
  const integralTypeHash: { [index: number]: string } = {
    1: '消费',
    2: '赠送',
    3: '退款',
    4: '过期',
    5: '签到'
  };
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
  const data = reactive<any>({
    info: {},
    memberInfo: {
      levelList: []
    },
    integralData: {
      totalIntegral: 0,
      integralList: {
        total: 0,
        rows: []
      }
    }
  });
  const progressData: Ref = computed(() => {
    const arrTemp: { [index: number]: string } = {};
    data.memberInfo.levelList.forEach((el: any) => {
      arrTemp[el.levelBean] = el.defaultName;
    });
    return arrTemp;
  });
  const maxProgress: Ref = computed(() => {
    return data.memberInfo.levelList[data.memberInfo.levelList.length - 1]
      ?.levelBean;
  });
  const integralPage = computed(() => {
    return {
      pageSize: 10,
      pageNum: 1,
      total: data.integralData.integralList.total
    };
  });
  const currentBean = computed<number>(() => {
    return data.memberInfo.haveLevelBean;
  });
  const page = reactive<any>({
    search: {
      id: props.id
    },
    integralOptions: {
      tableCard: false,
      menu: false,
      indexTitle: '序号',
      index: true,
      columns: [
        {
          label: '类型',
          prop: 'type'
        },
        {
          label: '方式',
          prop: 'way'
        },
        {
          label: '明细',
          prop: 'integral'
        },
        {
          label: '时间',
          prop: 'createTime'
        },
        {
          label: '源订单编号',
          prop: 'orderNo',
          formatter: (el: any) => el.orderNo || '--'
        },
        {
          label: '执行前积分',
          prop: 'oldIntegral'
        },
        {
          label: '过期时间',
          prop: 'validTime',
          formatter: (el: any) => el.validTime || '--'
        }
      ]
    },
    levelOptions: {
      tableCard: false,
      menu: false,
      indexTitle: '序号',
      index: true,
      columns: [
        {
          label: '类型',
          prop: 'type'
        },
        {
          label: '方式',
          prop: 'way'
        },
        {
          label: '明细',
          prop: 'levelBean'
        },
        {
          label: '时间',
          prop: 'createTime'
        },
        {
          label: '源订单编号',
          prop: 'orderNo'
        },
        {
          label: '执行前等级',
          prop: 'oldLevelName'
        }
      ]
    }
  });
  const changeTab = async (v: string | number) => {
    if (v === '1' && !data.info.id) {
      getIntegralData();
    }
  };
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });

  function onIntegralPageSizeChange(ps: number) {
    integralPage.value.pageSize = ps;
    getIntegralData();
  }
  function onIntegralPageChange(p: number) {
    integralPage.value.pageNum = p;
    getIntegralData();
  }
  const [getIntegralData] = useFuncProxy(async () => {
    data.integralData = await cbdApiProjectMembersIntegralListGet({
      id: props.id,
      pageNum: String(integralPage.value.pageNum),
      pageSize: String(integralPage.value.pageSize)
    });
  });
  const [getCommonData] = useFuncProxy(async () => {
    data.info = await cbdApiProjectMembersDetailIdGet({
      id: props.id
    });
  });
  const [getMemberLevel] = useFuncProxy(async () => {
    data.memberInfo = await cbdApiProjectMembersLevelIdGet({
      id: props.id
    });
  });
  onMounted(() => {
    if (props.id) {
      getCommonData();
      getMemberLevel();
    }
  });
</script>
<style scoped lang="less">
  .right-box {
    margin-right: 15px;
    padding-top: 15px;
    text-align: center;
  }

  .bar-box {
    width: 100%;

    :deep(.arco-slider-bar) {
      height: 8px;
      background-color: rgb(22, 93, 255);
    }
  }

  .total-integral {
    width: 100%;
    font-size: 20px;
    text-align: center;
  }
</style>
