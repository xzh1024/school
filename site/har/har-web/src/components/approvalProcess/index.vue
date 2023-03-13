<template>
  <div>
    <!--    <a-divider orientation="left">审批流程</a-divider>-->
    <!--    <div class="process">-->
    <!--      <div class="start"> 开始 </div>-->
    <!--      <div-->
    <!--        class="arco-timeline-item arco-timeline-item-vertical-left arco-timeline-item-label-same"-->
    <!--        style="min-height: 48px"-->
    <!--      >-->
    <!--        <div class="arco-timeline-item-dot-wrapper">-->
    <!--          <div-->
    <!--            class="arco-timeline-item-dot-line arco-timeline-item-dot-line-is-vertical"-->
    <!--            style="border-left-style: solid; left: 3px; bottom: -5px"-->
    <!--          ></div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <a-timeline>-->
    <!--        <a-timeline-item v-for="(item, index) in process" :key="index">-->
    <!--          <div class="title">{{-->
    <!--            `${numToString(item.approvalLevel)}级审批`-->
    <!--          }}</div>-->
    <!--          <a-tag size="large" class="tag">{{-->
    <!--            `${item.departmentName}-${item.roleName}-${item.userName}`-->
    <!--          }}</a-tag>-->
    <!--        </a-timeline-item>-->
    <!--      </a-timeline>-->
    <!--      <div-->
    <!--        class="arco-timeline-item arco-timeline-item-vertical-left arco-timeline-item-label-same"-->
    <!--        style="top: -80px"-->
    <!--      >-->
    <!--        <div class="arco-timeline-item-dot-wrapper">-->
    <!--          <div-->
    <!--            class="arco-timeline-item-dot-line arco-timeline-item-dot-line-is-vertical"-->
    <!--            style="border-left-style: solid; left: 3px; bottom: -5px"-->
    <!--          ></div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="end"> 结束 </div>-->
    <!--    </div>-->
    <a-divider orientation="left">审批进度</a-divider>
    <div class="progress">
      <a-timeline>
        <a-timeline-item
          v-for="(item, index) in progress"
          :key="index"
          style="min-height: 100px"
        >
          <template #dot>
            <div v-if="item.result === 0" class="refuse">
              <icon-close style="color: #ff4747" />
            </div>
            <div v-if="item.result === 1" class="adopt">
              <icon-check />
            </div>
            <div v-if="item.result === 2" class="inProgress">
              {{ item.approvalLevel }}
            </div>
            <div v-if="item.result === 3" class="pendingApproval">
              {{ item.approvalLevel }}
            </div>
          </template>
          <div style="margin-left: 12px">
            <div
              :class="item.result !== 3 ? 'title' : 'pending'"
              :style="item.result === 2 ? 'color: #1a66ff' : ''"
            >
              {{
                `${numToString(item.approvalLevel)}级审批人: ${item.userName}`
              }}
              <a-tag
                v-if="item.result === 2"
                class="tip"
                style="color: #1a66ff"
                color="#E9F0FF"
              >
                审批中
              </a-tag>
              <a-tag
                v-else-if="item.result === 0"
                style="color: #ff4747"
                color="#FFEDED"
                class="tip"
              >
                审批拒绝
              </a-tag>
              <a-tag
                v-else-if="item.result === 1"
                style="color: #01a95b"
                color="#E6F7EF"
                class="tip"
              >
                审批通过
              </a-tag>
            </div>
            <div v-if="item.result !== 3">
              <div class="time">
                审批时间:
                {{
                  dayjs(item.createTime)
                    ? dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    : '--'
                }}
              </div>
              <div class="remark">
                备注: {{ item.opinion ? item.opinion : '无' }}
              </div>
            </div>
            <div v-else style="color: #666"> 待审批 </div>
          </div>
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ApprovalProgress'
  };
</script>

<script setup lang="ts">
  import { computed, ref, watch, PropType } from 'vue';
  import {
    cbdApiProjectApprovalProcessGetRecordPost,
    type CbdApiProjectApprovalProcessGetRecordPostResponse
  } from '@/api';
  import { numToString } from '@/utils';
  import dayjs from 'dayjs';
  type DataType =
    Required<CbdApiProjectApprovalProcessGetRecordPostResponse>['approvalProcessBusinessVos'];

  const props = defineProps({
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    data: {
      type: [] as PropType<DataType>,
      default: () => []
    }
  });

  interface Config {
    businessId: number;
    approvalProcessCode: string;
  }

  const config: any = computed(() => {
    return props.config || {};
  });
  console.log(config.value);

  // const process = ref<Array<any>>([]);
  const progress = ref<Array<any>>([]);

  // const progress = ref<any>();
  const getInfo = async () => {
    const res = await cbdApiProjectApprovalProcessGetRecordPost({
      ...(config.value as Config)
    });
    progress.value = res.approvalProcessBusinessVos!;
  };

  watch(
    config,
    (e) => {
      if (e?.businessId) {
        getInfo();
      }
    },
    {
      deep: true,
      immediate: true
    }
  );
  watch(
    () => props.data,
    (v) => {
      if (v) {
        progress.value = props.data;
      }
    },
    {
      deep: true,
      immediate: true
    }
  );
</script>

<style scoped lang="less">
  //.process {
  //  padding-left: 60px;
  //}
  .title {
    font-weight: bold;
    font-size: 16px;
  }

  .pending {
    color: #666;
    font-weight: bold;
    font-size: 16px;
  }
  //.start {
  //  height: 32px;
  //  width: 76px;
  //  border: 1px solid #e7e9eb;
  //  border-radius: 16px;
  //  line-height: 32px;
  //  text-align: center;
  //  position: relative;
  //  left: -35px;
  //  bottom: -17px;
  //}
  //.end {
  //  height: 32px;
  //  width: 76px;
  //  border: 1px solid #e7e9eb;
  //  border-radius: 16px;
  //  line-height: 32px;
  //  text-align: center;
  //  position: relative;
  //  left: -32px;
  //  bottom: 72px;
  //}
  // .tag {
  //   min-height: 36px;
  //   padding: 7px 16px;
  //   border-radius: 2px;
  //   font-size: 14px;
  //   font-weight: 400;
  // }
  .progress {
    margin-top: 40px;
    padding-left: 60px;

    .refuse {
      width: 32px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #ff4747;
      border-radius: 50%;
    }

    .adopt {
      width: 32px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #1a66ff;
      border-radius: 50%;
    }

    .inProgress {
      width: 32px;
      height: 32px;
      color: #fff;
      line-height: 32px;
      background-color: #1a66ff;
      border: 1px solid #1a66ff;
      border-radius: 50%;
    }

    .pendingApproval {
      width: 32px;
      height: 32px;
      color: #666;
      line-height: 32px;
      background-color: #e3e6eb;
      border: 1px solid #e3e6eb;
      border-radius: 50%;
    }

    .time {
      color: #666;
      font-size: 14px;
    }

    .remark {
      color: #666;
      font-size: 14px;
    }

    .tip {
      width: 60px;
      height: 24px;
      margin-top: -4px;
      margin-left: 12px;
      font-size: 12px;
      line-height: 22px;
      text-align: center;
      border-radius: 4px;
    }
  }
</style>
