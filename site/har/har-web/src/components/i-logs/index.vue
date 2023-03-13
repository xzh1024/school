<template>
  <div
    class="i-logs"
    :style="{
      transform: `translateX(${visible ? 0 : 300}px)`
    }"
  >
    <span class="fixed-btn">操作记录</span>
    <div class="i-logs-filter">
      <a-month-picker
        v-model="logDate"
        style="width: 100%"
        :allow-clear="false"
        :disabled-date="validDate"
        @change="timeChange"
      />
      <div class="i-logs-filter-tag">
        <a-checkbox-group
          v-model="formTags"
          :options="logTypeList"
          @change="checkboxChange"
        />
      </div>
    </div>
    <div class="i-logs-list">
      <div v-for="item in logListArr.rows" :key="item" class="i-logs-list-item">
        <div class="log-row">
          <img class="i-logs-document" src="./imgs/Frame@2x.png" />
          <span>{{
            item.businessType === 1
              ? '新增'
              : item.businessType === 2
              ? '修改'
              : '其它'
          }}</span>
        </div>
        <div class="log-row log-info">{{ item.describe || '--' }}</div>
        <div class="log-row i-logs-list-item_foot">
          <a-avatar
            :style="{ backgroundColor: '#E6E6E6', marginRight: '6px' }"
            :size="20"
          >
          </a-avatar>
          <span style="margin-right: 12px">{{ item.optUser || '--' }}</span>
          <span>{{ formatTime(item.optTime) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Ref, ref, watch } from 'vue';
  import dayjs from 'dayjs';
  import { logTypeList } from '@/utils/dic';
  import { formatTime } from '@/utils';
  import { svcWebSysOptPageOptListPost } from '@/api/svc-web';
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });
  const logDate: Ref = ref(dayjs(new Date()).format('YYYY-MM-DD'));
  function validDate(date: string) {
    return dayjs(date).isAfter(dayjs());
  }

  const logListArr: Ref = ref([]);

  const formTags: Ref = ref([1, 2, 3, 4]);
  const timeChange = (i: Date) => {
    logDate.value = i;
    getLogList();
  };

  const getLogList = async () => {
    try {
      if (!props.options.modeId || !props.options.mode) {
        return;
      }
      const url = props.options.logUrl
        ? props.options.logUrl
        : svcWebSysOptPageOptListPost;
      logListArr.value = await url({
        modeId: props.options.modeId,
        businessType: formTags.value,
        mode: props.options.mode,
        optTime: logDate.value as string
      });
    } catch (error) {
      console.log(error);
    }
  };

  function checkboxChange(v: any) {
    formTags.value = v;
    getLogList();
  }
  // getLogList();
  watch(
    () => props.options,
    () => {
      getLogList();
    },
    { immediate: true }
  );
</script>

<style lang="less" scoped>
  .fixed-btn {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    color: #333333;
    padding-left: 0;
    padding-right: 0;
    width: auto;

    &:hover,
    &:active {
      color: #333333;
      background-color: transparent;
    }
  }
  .i-logs {
    width: 300px;
    height: 100%;
    flex-shrink: 0;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    padding: 12px 16px;
    box-sizing: border-box;
    box-shadow: -3px 3px 6px 1px rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border-radius: 0px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 300ms ease-in-out;

    &-filter {
      margin-top: 16px;

      &-tag {
        margin-top: 16px;
      }
    }

    &-list {
      margin-top: 16px;
      overflow-y: auto;

      &-item {
        background-color: #f6f5f5;
        padding: 12px 16px;
        border-radius: 4px;

        & + .i-logs-list-item {
          margin-top: 16px;
        }

        .i-logs-document {
          width: 24px;
          margin-right: 4px;
        }

        & > div {
          &:first-child {
            font-size: 12px;
            font-weight: 400;
            color: #000000;
          }

          &:last-child {
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            line-height: 22px;
            margin-top: 6px;
          }
        }
      }
    }

    :deep(.arco-checkbox-group) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .arco-checkbox {
        padding: 0;
        margin: 0;
      }
    }
  }

  .log-row {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333333;
  }

  .log-info {
    padding-left: 28px;
    word-break: break-all;
  }
</style>
