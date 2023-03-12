<template>
  <a-upload
    v-model:file-list="fileList"
    :default-file-list="fileList"
    :list-type="listTypes"
    :limit="limit"
    v-bind="uploadOptions"
    :data="paramsData"
    :action="action"
    :on-before-remove="onBeforeRemove"
    :on-before-upload="onBeforeUpload"
    :custom-request="customRequest"
    v-on="on"
    @success="onSuccess"
  >
    <template v-if="$slots.image" #image="{ fileItem }">
      <slot name="image" :file-item="fileItem"></slot>
    </template>
    <template v-if="$slots.uploadItem" #upload-item="{ fileItem }">
      <slot name="uploadItem" :file-item="fileItem"></slot>
    </template>
    <template v-if="$slots.uploadButton" #upload-button>
      <slot name="uploadButton"></slot>
    </template>
  </a-upload>
</template>

<script lang="ts">
  export default {
    name: 'IUpload'
  };
</script>

<script setup lang="ts">
  import { computed, ref, Ref, toRaw } from 'vue';
  import { getCookie } from '@/utils/cookies';
  import { useUserStore } from '@/store';
  import { RequestOption } from '@/components/i-upload/i-upload';
  import axios from 'axios';
  import { useAliUpload } from '@/hooks/useAliUpload';
  import { Message } from '@arco-design/web-vue';
  import lsStore from '@/utils/ls-store';
  const props = defineProps({
    modelValue: {
      type: [Array, String],
      default: ''
    },
    limit: {
      type: Number
    },
    resType: {
      type: String,
      default: 'array'
    },
    listType: {
      type: String
      /*     validate: (e: string) => {
      return ['text', 'picture', 'picture-card'].includes(e);
    } */
    },
    isAliOss: {
      type: Boolean,
      default: false
    },
    on: {
      type: Object,
      default: () => {
        return {};
      }
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 是否启用基于文件后缀名进行判定文件类型
    acceptSuffixName: Boolean
  });
  console.log(props.isAliOss);

  const listTypes: Ref = computed(() => {
    return props.listType || 'text';
  });
  const userStore = useUserStore();
  const emits = defineEmits(['update:modelValue', 'before-remove', 'success']);
  const uploadOptions: Ref = computed(() => {
    return {
      headers: {
        Authorization: lsStore.getItem('token') || '',
        clientId: `${userStore.user?.clientId}`
      },
      action: '/cbd-api-project/common/upload',
      ...props.options
    };
  });
  const action = computed(() => {
    return (
      params.value?.host ||
      props.options?.value ||
      '/cbd-api-project/common/upload'
    );
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
  /*  const fileList: Ref = ref([]);
watch(
  () => props.modelValue,
  (e) => {
    console.log('更改', e);
    let val: any = e;
    if (!val) val = [];
    if (typeof val === 'string') val = val.split(',');
    console.log('更改11111');
    fileList.value = val.map((i: any) => {
      if (i === 'string') return { url: i };
      return i;
    });
  },
  {
    deep: true,
    immediate: true
  }
);*/
  const fileList: Ref = computed({
    get() {
      let val: any = props.modelValue;
      if (!val) return [];
      if (typeof val === 'string') val = val.split(',');
      return val.map((i: any) => {
        return typeof i === 'string' ? { url: i } : i;
      });
    },
    set(v = []) {
      // console.log(v, 'i-upload');
      const arr = v.map((i: any) => i.url);
      // eslint-disable-next-line no-unused-expressions
      props.resType === 'array'
        ? emits(
            'update:modelValue',
            v.map((i: any) => {
              const { response = {} } = i;
              const { data = {} } = response;
              return {
                ...data,
                ...i,
                type: i.type || i?.file?.type
              };
            })
          )
        : emits('update:modelValue', arr.join());
    }
  });
  function onSuccess(file: any) {
    console.log('成功回调', toRaw(file));
    const item = {
      ...toRaw(file),
      ...(file?.response?.data || {}),
      id: file.response.data.key,
      url: file.url,
      size: file?.file?.size || file?.size
    };
    // console.log(item);
    // fileList.value.push(item);
    const index = fileList.value.findIndex((i: any) => i.uid === item.uid);
    if (index > -1) {
      fileList.value[index] = item;
    } else {
      fileList.value = [...fileList.value, item];
    }

    emits('success', item);
  }

  function onBeforeRemove(file: any): Promise<boolean> {
    /*const item = {
    ...file,
    ...(file?.response?.data || {})
  };
  const index = fileList.value.findIndex((i: string) => {
    return i === item.url;
  });
  const arr = [...fileList.value];
  arr.splice(index, 1);
  fileList.value = arr;*/
    emits('before-remove');
    return Promise.resolve(true);
  }
  const { getSign, params } = useAliUpload();
  async function onBeforeUpload(file: any) {
    console.log(props);
    const { accept = '' } = props.options;
    if (accept !== '*' && !accept.includes('*')) {
      //自主限制的文件格式(文件、图片...)
      const acceptFileTypeMainArr = Array.from(
        new Set(
          accept.split(',').map((item: string) => {
            if (props.acceptSuffixName) {
              if (item.startsWith('.')) {
                item = item.slice(1);
              }
            }
            return item.split('/')[0];
          })
        )
      );
      console.log(acceptFileTypeMainArr, '--1--');

      //自主限制的文件格式(word、excel、pdf、png...)
      const acceptFileTypeSubArr = accept
        .split(',')
        .map((item: string) => item.split('/')[1]);
      console.log(acceptFileTypeSubArr, '--2--');

      //用户上传文件的格式
      const [fileType, type] = file.type?.split('/');
      const fileSuffixName = file.name.includes('.')
        ? file.name.split('.').pop()
        : null;

      if (props.acceptSuffixName && fileSuffixName) {
        if (!acceptFileTypeMainArr.includes(fileSuffixName)) {
          Message.error({
            content: `仅支持${acceptFileTypeMainArr.join(',')}类型的文件`
          });
          return false;
        }
      } else {
        if (!acceptFileTypeMainArr.includes(fileType)) {
          Message.error({
            content: `仅支持${acceptFileTypeMainArr.join(',')}类型的文件`
          });
          return false;
        }
        if (!acceptFileTypeSubArr.includes(type)) {
          Message.error({
            content: `仅支持${acceptFileTypeSubArr.join(',')}格式的文件`
          });
          return false;
        }
      }
      /*const [acceptFileType, acceptType] = accept.split('/');
    // 'png,jpg,gif'
    if (!Array.isArray(accept)) accept = accept.split(',');
    const [fileType, type] = file.type?.split('/');
    // console.log(acceptFileType, acceptType, fileType);
    console.log(accept, '---accept---');
    console.log(acceptFileType, '---acceptFileType---');

    console.log(fileType, '---fileType---');
    console.log(type, '---type---');
    if (acceptFileType !== fileType) {
      Message.error({
        // content: '请选择正确的文件格式上传'
        content: `仅支持${acceptFileType}类型的文件`
      });
      return false;
    }
    if (
      acceptType !== '*' &&
      accept.every((item: string) => !item.includes(type))
    ) {
      Message.error({
        // content: '请选择正确的文件格式上传'
        content: `仅支持${accept.join('、')}格式的文件`
      });
      return false;
    }*/
    }
    if (props.isAliOss) await getSign();
    return true;
  }
  /* 自定义上传函数 */
  function customRequest(option: RequestOption) {
    const data: any = paramsData.value;
    const { fileItem, onSuccess: onSuccesss, onError } = option;
    const formData = new FormData();
    if (fileItem.file) formData.append('name', fileItem.file.name);
    const { file } = fileItem || {};
    const type = file?.name?.split('.')?.pop()?.toLowerCase();
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
    if (fileItem.file) {
      formData.append('x:filename', fileItem.file.name);
      formData.append('file', fileItem.file);
    }
    axios({
      url: option.action,
      method: 'post',
      data: formData
    })
      .then((res) => {
        // console.log(res);
        const { cdnUrl } = params.value;
        const url = `${cdnUrl}/${data.key}`;
        onSuccesss({
          data: { ...params.value, url }
        });
      })
      .catch((err) => {
        onError(err);
      });
  }
</script>
