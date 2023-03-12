<template>
  <drawer
    v-model="visible"
    title="电子卡首页详情"
    :footer="false"
    :show-log="true"
    :options="{ okLoading: isLoading }"
    :log-options="{
      modeId: props.detailId,
      mode: 'card_home_config'
    }"
  >
    <div class="warp">
      <div class="left-item">
        <a-divider orientation="left">广告设置</a-divider>
        <a-descriptions
          v-for="(items, index) in info.advertList"
          :key="index"
          layout="vertical"
          :label-style="{ 'margin-bottom': '20px' }"
          :column="2"
          :value-style="listItemStyle"
        >
          <a-descriptions-item label="类型：">
            <span v-if="items.type === 2">活动</span>
            <span v-else>图片</span>
          </a-descriptions-item>
          <a-descriptions-item :label="items.type === 1 ? '链接：' : '活动'">{{
            items.type === 1 ? items.content : items.activityName
          }}</a-descriptions-item>
          <a-descriptions-item label="活动图片：" :span="2">
            <i-custom-upload
              v-model="items.pic"
              url-key="previewAddress"
              :options="{
                showUploadButton: false,
                showRemoveButton: false
              }"
            >
            </i-custom-upload>
          </a-descriptions-item>
        </a-descriptions>
        <a-divider orientation="left">其他设置</a-divider>
        <a-descriptions
          layout="vertical"
          :label-style="{ 'margin-bottom': '20px' }"
          :column="3"
          :value-style="listItemStyle"
        >
          <a-descriptions-item label="帮助信息：" :span="3">{{
            info.helpInfo || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="使用指引：" :span="3">{{
            info.applyGuide || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="创建人：">{{
            info.createBy || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="创建时间：">{{
            info.createTime || '--'
          }}</a-descriptions-item>

          <a-descriptions-item label="更新人：">{{
            info.updateBy || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="更新时间：">{{
            info.updateTime || '--'
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="right-item">
        <div class="bg">
          <iframe
            id="basicIframe"
            ref="homeIframeRefs"
            :src="`${H5Url}/pages/card/tabbar/home`"
            frameborder="0"
            class="content"
            @load="iframeOnload"
          ></iframe>
        </div>
      </div>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, Ref, nextTick } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { listItemStyle } from '@/utils/dic';
  import {
    svcWebCardHomeDetailIdGet,
    SvcWebCardHomeDetailIdGetResponse
  } from '@/api/svc-web';
  import Messenger from '@har/messenger';
  import { H5Url } from '@/utils/h5Url';
  import debounce from 'lodash/debounce';

  const messenger = new Messenger('homeIframeRefs', 'card');
  const homeIframeRefs: Ref = ref(null);
  const isLoading: Ref = ref(false);
  const emits = defineEmits(['update:modelValue']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    detailId: {
      type: Number,
      required: true
    }
  });
  const info = ref<Partial<SvcWebCardHomeDetailIdGetResponse>>({});
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  //获取详情
  const [getDetails] = useFuncProxy(async () => {
    try {
      info.value = await svcWebCardHomeDetailIdGet({
        id: String(props.detailId)
      });
      await iframeOnload();
      sendData(info.value.advertList);
    } catch (error: any) {
      Message.error(error);
    }
  });

  let ready: () => void;
  const readyFn = new Promise<void>((resolve) => (ready = resolve));
  //iframe 加载完成渲染h5
  const iframeOnload = () => {
    ready();
  };
  const sendData = debounce(function (data: any) {
    readyFn.then(() => {
      messenger.targets['card'].send(
        data.map((item: any) => {
          return {
            ...item,
            picUrl:
              item.pic !== null
                ? item.pic?.previewAddress || item.pic[0]?.url
                : []
          };
        })
      );
    });
  }, 500);

  getDetails();

  onMounted(() => {
    nextTick(async () => {
      await messenger.addTarget(homeIframeRefs.value.contentWindow, 'card');
    });
  });
</script>
<style scoped lang="less">
  .warp {
    display: flex;
    width: 100%;
    overflow: auto;
    height: 100%;

    .left-item {
      width: 50vw;
      background: #fff;
      padding: 16px;
      height: 100%;
      overflow: auto;
      border-radius: 4px;
      margin-right: 16px;
    }
    .right-item {
      height: 100%;
      width: 30vw;
      background: #fff;
      padding: 16px;
      border-radius: 4px;
      display: flex;
      justify-content: center;

      .bg {
        width: 416px;
        height: 840px;
        background: url(@/assets/images/svc/phone-bg.png);
        background-color: #fff;
        position: relative;
        .content {
          width: 370px;
          height: 568px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eee;
          position: absolute;
          left: 22px;
          top: 100px;
        }
      }
    }
  }
</style>
