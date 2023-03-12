<template>
  <div class="progress-cell-box">
    <div class="info-container flex align-center">
      <div class="line-box">
        <div
          class="i-line flex-1"
          :style="{
            background: roundColor,
            visibility: !firstShow ? 'hidden' : 'visible'
          }"
        ></div>
        <div
          class="i-round"
          :style="{ background: newStatus(item.type) }"
        ></div>
        <div
          class="i-line flex-1"
          :style="{
            background: roundColor,
            visibility: !lastShow ? 'hidden' : 'visible'
          }"
        ></div>
      </div>
      <div class="avatar">
        <a-image
          v-if="item.avatar"
          :src="item.avatar"
          fit="cover"
          width="40"
          height="40"
        />
        <a-avatar v-else :size="40" style="overflow: hidden">
          <IconUser />
        </a-avatar>
      </div>
      <div class="info-box">
        <div class="flex align-center">
          <div class="text-333 font-16 margin-right-8">
            {{ item.username || item.userName }}
          </div>
          <div class="text-999 font-14">{{ item.userRole }}</div>
        </div>
        <div class="text-999 font-14 margin-tb8">{{ item.auditTime }}</div>
        <div class="flex align-center text-999 font-14">
          <div
            v-if="item.activityName"
            class="margin-right-8"
            :style="{ color: newStatus(item.type) }"
            >{{ item.activityName }}</div
          >
          <div>{{ `备注：${item.remarks || '无'}` }}</div>
        </div>
      </div>
    </div>
    <div class="sign-name">
      <a-image
        v-if="item.signatureUrl"
        :src="item.signatureUrl"
        fit="cover"
        width="68"
        height="60"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';
  import { IconUser } from '@arco-design/web-vue/es/icon';

  const props = defineProps({
    item: {
      type: Object as PropType<any>,
      default: () => {}
    },
    roundColor: {
      type: String,
      default: '#e6e6e6'
    },
    firstShow: {
      type: Boolean,
      default: true
    },
    lastShow: {
      type: Boolean,
      default: true
    }
  });

  const status_arr = [
    {
      label: '发起流程',
      value: 1,
      color: '#E6E6E6'
    },
    {
      label: '审批',
      value: 2,
      color: '#E6E6E6'
    },
    {
      label: '加签',
      value: 3,
      color: '#69AF0F'
    },
    {
      label: '审批中',
      value: 4,
      color: '#69AF0F'
    },
    {
      label: '抄送',
      value: 5,
      color: '#4C8AF7'
    }
  ];

  const newStatus = computed(() => (val: number) => {
    return status_arr.find((item) => item.value === val)?.color || '#E6E6E6';
  });
</script>

<style scoped lang="less">
  .text-333 {
    color: #333;
  }
  .text-999 {
    color: #999;
  }
  .font-14 {
    font-size: 14px;
  }
  .font-16 {
    font-size: 16px;
  }
  .margin-right-8 {
    margin-right: 8px;
  }
  .margin-tb8 {
    margin: 8px 0;
  }
  .progress-cell-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-container {
      height: 100%;
    }
    .line-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 82px;
      .i-line {
        width: 1px;
        height: 10px;
      }
      .i-round {
        width: 7px;
        height: 7px;
        border-radius: 50%;
      }
    }
    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 8px;
      margin-left: 15px;
      overflow: hidden;
      background: #d9d9d9;
      border-radius: 50%;
    }
    .info-box {
      line-height: 1;
    }
    .sign-name {
      width: 68px;
      height: 60px;
      margin-right: 172px;
      overflow: hidden;
      background: #eaeaea;
    }
  }
</style>
