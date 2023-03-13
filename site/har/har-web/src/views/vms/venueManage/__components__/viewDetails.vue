<template>
  <drawer v-model="visible" title="查看场地" :options="{ width: '60vw' }">
    <template #footer>
      <a-button @click="visible = false">返回</a-button>
      <a-button type="primary" @click="onEdit"> 编辑 </a-button>
    </template>
    <div class="detail_box">
      <a-card :bordered="false">
        <div class="title">基本信息</div>
        <div class="info_ul">
          <div
            v-for="(item, index) in equipmentInfoData"
            :key="index"
            :style="{ width: item.width }"
            class="info_li"
          >
            <span>{{ item.label }}</span>
            <div>{{ item.value }}</div>
          </div>
        </div>
        <div class="img_title">场地封面图</div>
        <a-image
          width="210"
          height="210"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        ></a-image>
        <div class="img_title">场地详情图</div>
        <a-space wrap style="flex-wrap: wrap">
          <a-image
            v-for="(item, index) in 10"
            :key="index"
            width="210"
            height="140"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          ></a-image>
        </a-space>
      </a-card>
    </div>
    <div class="detail_box" style="margin-top: 16px; border-radius: 4px">
      <a-card :bordered="false">
        <div class="title">计费信息</div>
        <div class="max-width">
          <div class="flex align-center justify-between margin_bottom_16">
            <!-- <div v-if="rules.length > 0" class="tab_box">
                <div
                  v-for="(item, index) in rules"
                  :key="index"
                  class="tab_li"
                  :class="{ selected: activeIndex == index }"
                  @click="onSelect(index)"
                  >{{ item.title }}</div
                >
              </div> -->
            <!-- rules 为实际接口数据，替换 classifyRuleList -->
            <div class="tab_box">
              <div
                v-for="(item, index) in classifyRuleList"
                :key="index"
                class="tab_li"
                :class="{ selected: activeIndex == index }"
                @click="onSelect(index)"
                >{{ item.label }}</div
              >
            </div>
          </div>
          <i-table :options="options" :data="currentRuleData?.configs">
            <template #priceRulesCell="{ record }">
              <div>
                <div v-for="(j, jIndex) in record.priceRules" :key="jIndex">
                  <template v-if="currentRuleData?.rule === 1"
                    >每个人{{ j.price || 0 }}元</template
                  >
                  <template v-else-if="currentRuleData?.rule === 2">
                    时段{{ jIndex + 1 }}： {{ j.startTime }}点至
                    {{ j.endTime }}点,每小时{{ j.price }}元
                  </template>
                  <template v-else>
                    包场{{ jIndex + 1 }}： {{ j.startTime }}点至
                    {{ j.endTime }}点,每场{{ j.price }}元
                  </template>
                </div>
              </div>
            </template>
          </i-table>
        </div>
      </a-card>
    </div>
    <edit-specs
      :id="id"
      v-model="editVisible"
      :store-id="info.storeId"
      @refresh="onReloadDetail"
    />
  </drawer>
</template>

<script lang="ts">
  export default {
    name: 'ViewDetails'
  };
</script>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import EditSpecs from './editSpace.vue';
  import { computed, onMounted, ref } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet } from '@/api';
  import ITable from '@/components/i-table/index.vue';
  import { StatusListType, weekList, classifyRuleList } from '@/utils/dic';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  onMounted(() => {
    getInfo();
  });
  const rules = computed(() => {
    return info.value?.rules || [];
  });
  const info = ref<any>({});

  const [getInfo] = useFuncProxy(async () => {
    info.value = await cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet({
      id: `${props.id}`
    });
  });
  const editVisible = ref(false);
  function onEdit() {
    editVisible.value = true;
  }
  function onReloadDetail() {
    // todo: update
    console.log('刷新详情页面');
  }
  const equipmentInfoData = computed(() => {
    return [
      {
        label: '项目名称',
        value: info.value.projectName || '--',
        width: '25%'
      },
      {
        label: '店铺名称',
        value: info.value.buildingName || '--',
        width: '25%'
      },
      {
        label: '铺位号',
        value: info.value.buildingFloorName || '--',
        width: '25%'
      },
      {
        label: '场地名称',
        width: '25%',
        value: weekList.find((item) => item.value == info.value.deviceType)
          ?.label
      },
      {
        label: '场地分类',
        width: '25%',
        value: `${info.value.deviceName || '--'}(${
          info.value.deviceCode || '--'
        })`
      },
      {
        label: '场地编码',
        width: '25%',
        value: info.value.buildingFloorName || '--'
      },
      {
        label: '状态',
        width: '100%',
        value: weekList.find((item) => item.value == info.value.deviceType)
          ?.label
      }
    ];
  });

  const activeIndex = ref(0);
  const currentRuleData = ref<any>({});
  const onSelect = (index: number) => {
    activeIndex.value = index;
    currentRuleData.value = rules.value.find(
      (item: any, currentIndex: number) => index === currentIndex
    );
  };
  const options = ref({
    menu: false,
    tableCard: false,
    pageShow: false,
    columns: [
      {
        label: '星期',
        prop: 'week',
        formatter: (record: any) => {
          const { week = [] } = record;
          return week
            .map(
              (i: any) =>
                weekList.find((j: StatusListType) => j.value === i)?.label
            )
            ?.join();
        }
      },
      {
        label: '费用',
        prop: 'priceRules'
      }
    ]
  });
</script>

<style scoped lang="less">
  .detail_box {
    width: 100%;
    // height: 100%;
    border-radius: 4px;
    .tab_box {
      width: auto;
      height: 38px;
      background: #f7f7f7;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px;
      box-sizing: border-box;
      margin: 16px 0;
      cursor: pointer;
      .tab_li {
        width: 80px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333333;
      }
      .selected {
        background: #4c8af7;
        border-radius: 4px;
        color: #ffffff;
      }
      .tab_li:nth-child(2) {
        margin: 0 4rpx;
      }
    }
    .img_title {
      font-size: 14px;
      color: #333333;
      line-height: 22px;
      margin-bottom: 8px;
      margin-top: 16px;
    }
    .title {
      font-size: 16px;
      color: #333333;
      line-height: 24px;
    }
    .info_ul {
      display: flex;
      flex-wrap: wrap;

      .info_li {
        width: 25%;
        display: flex;
        flex-direction: column;
        margin-top: 16px;

        & > span {
          font-size: 14px;
          font-family: PingFang SC-Medium, PingFang SC;
          color: #999999;
          line-height: 22px;
          margin-bottom: 8px;
        }

        & > div {
          font-size: 14px;
          font-family: PingFang SC-Medium, PingFang SC;
          color: #333333;
          line-height: 22px;
          word-break: break-all;
          padding-right: 10px;
        }
      }

      .margin_top_0 {
        margin-top: 0;
      }
    }
  }
</style>
