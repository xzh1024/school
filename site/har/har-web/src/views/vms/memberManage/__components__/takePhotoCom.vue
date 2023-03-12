<template>
  <a-modal
    v-model:visible="cameraVisible"
    :on-before-ok="onBeforeOk"
    width="592px"
    @open="onOpen"
    @cancel="onHandleCancel"
  >
    <template #title> 拍照 </template>
    <!-- <div id="my_camera"></div> -->
    <div class="camera_box" style="margin-bottom: 16px">
      <div class="flex align-center">
        <video
          id="video"
          style="width: 304px; height: 230px !important; margin-right: 16px"
        ></video>
        <a-image width="230" height="230" :src="data_url"></a-image>
      </div>
      <a-row style="display: flex; justify-content: center">
        <a-button style="margin-top: 16px" type="primary" @click="takepicture"
          >拍照</a-button
        >
      </a-row>
    </div>
    <canvas id="canvas" style="display: none"></canvas>
  </a-modal>
</template>
<script lang="ts" setup>
  import { ref, computed, Ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import axios from 'axios';
  import { useAliUpload } from '@/hooks/useAliUpload';
  import lsStore from '@/utils/ls-store';
  import { useUserStore } from '@/store';
  const emits = defineEmits(['takePhotoSuccess', 'update:modelValue']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  const cameraVisible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const width = 320; // We will scale the photo width to this
  let height = 0; // This will be computed based on the input stream
  let streaming = false;
  let video: any = null;
  let canvas: any = null;
  //   const constrains = { video: true, audio: false };
  //   function success(stream: any) {
  //     video.srcObject = stream;
  //     video.play();
  //   }
  //   function error(err: any) {
  //     console.log('An error occurred: ' + err);
  //     Message.warning(`An error occurred: ${err}`);
  //   }
  const data_url = ref('');
  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    // if (navigator?.mediaDevices?.getUserMedia) {
    //   //最新标准API
    //   navigator?.mediaDevices
    //     ?.getUserMedia(constrains)
    //     .then(success)
    //     .catch(error);
    // } else if (navigator?.webkitGetUserMedia) {
    //   //webkit内核浏览器

    //   navigator.webkitGetUserMedia(constrains).then(success).catch(error);
    // } else if (navigator.mozGetUserMedia) {
    //   //Firefox浏览器

    //   navagator.mozGetUserMedia(constrains).then(success).catch(error);
    // } else if (navigator.getUserMedia) {
    //   //旧版API

    //   navigator.getUserMedia(constrains).then(success).catch(error);
    // }
    /*
        这里介绍新的方法:H5新媒体接口 navigator.mediaDevices.getUserMedia()
        这个方法会提示用户是否允许媒体输入,(媒体输入主要包括相机,视频采集设备,屏幕共享服务,麦克风,A/D转换器等)
        返回的是一个Promise对象。
        如果用户同意使用权限,则会将 MediaStream对象作为resolve()的参数传给then()
        如果用户拒绝使用权限,或者请求的媒体资源不可用,则会将 PermissionDeniedError作为reject()的参数传给catch()
        */
    window.navigator?.mediaDevices
      ?.getUserMedia({ video: true, audio: false })
      .then(function (stream: any) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err: any) {
        console.log('An error occurred: ' + err);
        const errStr = String(err);
        if (errStr.indexOf('NotAllowedError') != -1) {
          return Message.warning(`请在浏览器设置-隐私设置中打开摄像头权限`);
        }
        if (errStr.indexOf('NotFoundError') != -1) {
          return Message.warning(`未找到摄像头硬件设备~`);
        }
        Message.warning(`错误提示: ${err}`);
      });

    video.addEventListener(
      'canplay',
      function () {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      },
      false
    );
    clearphoto();
  }

  function clearphoto() {
    data_url.value = '';
  }

  function takepicture() {
    const context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL('image/png');
      data_url.value = data;
      getSign();
    } else {
      clearphoto();
    }
  }
  function onOpen() {
    startup();
  }
  function base64toFile(data: string, fileName: string) {
    const dataArr = data.split(',');
    const byteString = atob(dataArr[1]);
    const options: any = {
      type: 'image/jpeg',
      endings: 'native'
    };
    const u8Arr = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      u8Arr[i] = byteString.charCodeAt(i);
    }
    return new File([u8Arr], fileName + '.jpg', options); //返回文件流
  }
  const userStore = useUserStore();
  const uploadOptions: Ref = computed(() => {
    return {
      headers: {
        Authorization: lsStore.getItem('token') || '',
        clientId: `${userStore.user?.clientId}`
      },
      action: '/cbd-api-project/common/upload'
    };
  });
  const paramsData = computed(() => {
    const { data = {} } = uploadOptions.value;
    const { key, policy, accessid, signature, dir, callback } = params.value;
    return {
      ...data,
      key: dir + key,
      policy,
      OSSAccessKeyId: accessid,
      success_action_status: '200',
      signature,
      callback
    };
  });
  const { getSign, params } = useAliUpload();
  const onBeforeOk: any = async () => {
    // video.srcObject.stop();
    if (!data_url.value) {
      Message.warning(`请拍照~`);
      return false;
    }
    const data: any = paramsData.value;
    const fileItem = base64toFile(data_url.value, 'face'); //base64图片格式转文件流
    console.log(fileItem);
    console.log(data);
    console.log(params.value, params.value.host);
    // return false;
    const formData = new FormData();
    const type = fileItem?.name?.split('.')?.pop()?.toLowerCase();
    if (data) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(data)) {
        if (data[key]) {
          formData.append(
            key,
            key === 'key' ? `${data[key]}.${type}` : data[key]
          );
        }
      }
    }
    formData.append('x:filename', fileItem.name);
    formData.append('file', fileItem);
    formData.append('name', fileItem.name);
    const flag = await new Promise((resolve) => {
      axios({
        url: params.value.host,
        method: 'post',
        data: formData
      })
        .then(() => {
          video.srcObject.getTracks().forEach(function (track: any) {
            track.stop();
          });
          const { cdnUrl } = params.value;
          const url = `${cdnUrl}/${data.key}.jpg`;
          emits('takePhotoSuccess', url);
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          resolve(false);
        });
    });
    return flag;
  };
  function onHandleCancel() {
    video.srcObject?.getTracks()?.forEach(function (track: any) {
      track.stop();
    });
  }
</script>
