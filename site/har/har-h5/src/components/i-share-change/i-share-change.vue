<template>
  <view v-if="visible">
    <view
      class="share-img-box"
      @touchmove.stop.prevent=""
      @click.stop.prevent="visible = false"
    >
      <view v-if="canvasVisible" class="share-center" @click.stop="">
        <i-canvas-plugin
          class="canvas"
          :canvas-config="config || canvasConfig"
          :canvas-image-url="canvasImage"
          @response-image-hanlde="responseImageHandle"
        ></i-canvas-plugin>
        <view class="canvas-img"><image :src="canvasImage"></image></view>
        <view class="share-btns">
          <!-- <button open-type="share" class="share-friend">分享好友</button> -->
          <button type="default" @click="saveImgHandle">保存图片</button>
        </view>
        <view
          class="close-icon text-xxl text-white"
          @click.stop.prevent="visible = false"
        >
          <image
            class="close"
            mode="widthFix"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/har-cbd/applet/share/cancel-circle.png"
          ></image>
        </view>
      </view>
      <view v-if="!canvasVisible" class="tab-change" @click.stop="">
        <view class="share-title-bar">
          <text>分享</text>
          <image
            class="close-btn"
            mode="widthFix"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/har-cbd/applet/share/close.png"
            @click="handleCancelShare"
          ></image>
        </view>
        <view class="flex flex-sub align-center justify-center text-lg">
          <button
            class="flex flex-direction align-center"
            open-type="share"
            @click="handleClick"
          >
            <image
              class="share-img-pic"
              mode="widthFix"
              src="https://har-cbd-cdn.huianrong.com/har-cbd/har-cbd/applet/share/in-weixin.png"
            ></image>
            <text class="text-gray flex justify-center align-center"
              >分享好友</text
            >
          </button>
          <button
            v-if="canvasConfig.byPic !== false"
            class="flex align-center flex-direction text-gray"
            @click="shareImgHandle"
          >
            <image
              class="share-img-pic"
              mode="widthFix"
              src="https://har-cbd-cdn.huianrong.com/har-cbd/har-cbd/applet/share/in-image.png"
            ></image>
            <text class="flex justify-center align-center">分享图片</text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { saveImage } from "@/utils/mixed";
  import { ref, computed } from "vue";
  import { cbdApiAppletWechatAppletWxaCodePost } from "@/api";

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    canvasConfig: {
      type: Object,
      default: () => {}
    }
  });

  const canvasImage = ref("");
  const canvasVisible = ref(false);
  const config = ref("");

  const emits = defineEmits(["update:modelValue", "canvasChang"]);
  const handleCancelShare = () => {
    emits("update:modelValue", false);
    canvasVisible.value = false;
  };
  function base64ToTemp(base64data) {
    return new Promise((resolve, reject) => {
      const fsm = uni.getFileSystemManager();
      const FILE_BASE_NAME = "tmp_base64src"; //自定义文件名
      const [, format, bodyData] =
        /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
      if (!format) {
        return new Error("ERROR_BASE64SRC_PARSE");
      }
      const filePath = `${uni.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
      const buffer = uni.base64ToArrayBuffer(bodyData);
      fsm.writeFile({
        filePath,
        data: buffer,
        encoding: "binary",
        success(r) {
          console.log(r, "r");
          console.log(filePath, "filePath");
          resolve(filePath);
        },
        fail(e) {
          reject(e);
          return new Error("ERROR_BASE64SRC_WRITE");
        }
      });
    });
  }
  async function shareImgHandle() {
    uni.showLoading({
      title: "加载中...."
    });
    try {
      const accountInfo = uni.getAccountInfoSync();
      const appid = accountInfo.miniProgram.appId;
      const { codeBase64 } = await cbdApiAppletWechatAppletWxaCodePost({
        appletAppid: appid,
        path: props.canvasConfig.path,
        width: 60,
        isHyaline: true
      });
      const temp = await base64ToTemp("data:image/jpeg;base64," + codeBase64);
      console.log(temp);
      config.value = {
        ...props.canvasConfig,
        minPicUrl: temp
      };
      canvasVisible.value = true;
    } catch (e) {
      //TODO handle the exception
      uni.hideLoading();
    }
  }
  // function sharePicHandle() {
  //   emits("canvasChang");
  // }
  function responseImageHandle(res) {
    canvasImage.value = res;
  }
  function saveImgHandle() {
    saveImage(canvasImage.value, false);
  }
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits("update:modelValue", v);
      canvasVisible.value = v;
    }
  });

  function handleClick() {
    handleCancelShare();
  }
</script>

<style lang="scss" scoped>
  .share-img-pic {
    width: 120rpx;
    height: 120rpx;
  }
  .tab-change {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    height: 436rpx;
    border-radius: 32rpx 32rpx 0 0;
    background-color: #f8f8f8;
    overflow: hidden;
    .share-title-bar {
      height: 100rpx;
      background: #f2f3f5;
      font-size: 36rpx;
      text-align: center;
      line-height: 100rpx;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #1d2129;
      .close-btn {
        position: absolute;
        top: 26rpx;
        right: 32rpx;
        width: 48rpx;
      }
    }
    .text-lg {
      width: 100%;
      padding-top: 80rpx;
    }
    button {
      border: none;
      padding: 0;
      margin: 0;
      width: 50%;
      font-size: 26rpx;
      flex-direction: column;
      &::after {
        content: unset;
      }
    }
  }
  .share-btns {
    padding: 30rpx 54rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      width: 320rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      background-color: #fe3432;
      padding: 0;
      text-align: center;
      font-size: 32rpx;
      color: #ffffff;
      font-weight: 500;
    }
    .share-friend {
      background-color: #e23126;
      color: #fff;
    }
  }
  .share-center {
    position: absolute;
    left: 50%;
    top: 53%;
    transform: translate(-50%, -50%);
  }
  .close-icon {
    position: absolute;
    right: 0;
    top: -65rpx;
    z-index: 1000;
    background-color: transparent;
    .close {
      width: 48rpx;
    }
  }
  .share-img-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: 100%;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    .canvas-img,
    .canvas {
      width: 600rpx;
      height: 800rpx;
      background: transparent;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .canvas {
      position: absolute;
      left: 0;
      top: 0;
      visibility: hidden;
    }
  }
  .show {
    display: none;
  }
</style>
