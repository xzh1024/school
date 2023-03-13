<template>
  <div class="i-custom-upload">
    <i-upload
      v-model="fileList"
      :accept-suffix-name="acceptSuffixName"
      :is-ali-oss="true"
      :limit="limit || options.limit"
      :options="{
        accept: '*',
        responseUrlKey,
        listType: 'picture-card',
        ...options
      }"
      :on="{ ...on, preview: onPreview }"
      @before-remove="onBeforeRemove"
    >
      <template #image="{ fileItem }">
        <div
          v-if="isImage(fileItem[typeKey])"
          class="img-box"
          :style="options.imageStyle"
        >
          <img
            :src="fileItem[urlKey] || fileItem.url"
            :alt="fileItem[nameKey]"
          />
          <!--          <div class="shade"
            ><icon-eye class="icon" @click="onPreview(fileItem)"
          /></div>-->
        </div>
        <div v-else class="file-box">
          <img
            class="file-img"
            src="~@/assets/images/file-icon.png"
            alt="附件"
          />
          <!--          <div class="bg-box">{{ getFileName(fileItem.file) }}</div>-->
          <div class="bg-box">{{ fileItem[nameKey] }}</div>
          <div class="bg-box">{{
            formatSize(fileItem[sizeKey] || fileItem?.file?.size || 0)
          }}</div>
        </div>
      </template>
      <template v-if="$slots['uploadButton']" #uploadButton>
        <slot name="uploadButton"></slot>
      </template>
      <template v-if="$slots.fileName" #file-name="{ fileItem }">
        <slot name="fileName" :file-item="fileItem"></slot>
      </template>
      <template v-if="$slots.fileIcon" #fileIcon>
        <slot name="fileIcon"></slot>
      </template>
    </i-upload>
    <Image.Preview v-model:visible="visible" :src="src" />
    <a-modal
      v-model:visible="modelVisible"
      @ok="handleOk"
      @cancel="modelVisible = false"
    >
      <template #title> 提示 </template>
      <div>非图片类型文件，不支持预览，是否需要下载？</div>
    </a-modal>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ICustomUpload'
  };
</script>

<script lang="ts" setup>
  import { computed, ref, Ref } from 'vue';
  import IUpload from '@/components/i-upload/i-upload.vue';
  import { Image } from '@arco-design/web-vue';
  import { download } from '@/utils';
  import NP from 'number-precision';

  const visible: Ref<boolean> = ref(false);
  const modelVisible: Ref<boolean> = ref(false);
  const src: Ref<string> = ref('');
  const current: Ref = ref({});
  const props = defineProps({
    modelValue: {
      type: [String, Array, Object],
      default: () => [] as any[]
    },
    on: {
      type: Object,
      default: () => {
        return {};
      }
    },
    limit: {
      type: Number
    },
    /** 文件名 */
    nameKey: {
      type: String,
      default: 'name'
    },
    /** 预览url */
    urlKey: {
      type: String,
      default: 'url'
    },
    /** 文件大小 */
    sizeKey: {
      type: String,
      default: 'size'
    },
    /** 文件类型 */
    typeKey: {
      type: String,
      default: 'type'
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

  function isImage(fileType: string) {
    // console.log(fileType, 'fileType');
    const type = fileType?.split('/')?.[0];
    return type === 'image';
  }
  const emits = defineEmits([
    'update:modelValue',
    'preview',
    'before-remove',
    'finish'
  ]);
  const fileList: Ref<string | any[]> = computed({
    get() {
      const { modelValue, urlKey } = props;
      let val = modelValue;
      if (!val) {
        return [];
      }
      if (!Object.keys(val).length) return [];
      if (typeof val === 'string') return [{ url: val }];
      if (val.constructor === Object) {
        val = [val];
      }
      return val.map((i: any) => {
        return i[urlKey] ? { ...i, url: i[urlKey] } : i;
      });
    },
    set(v) {
      console.log(v);
      emits('finish', v);
      emits('update:modelValue', v);
    }
  });
  function onPreview(item: any) {
    console.log('预览----------------');
    console.log(item);
    emits('preview', item);
    const { file, type: fileType } = item;
    const type = fileType
      ? fileType?.split('/')?.[0]
      : file.type?.split('/')?.[0];
    console.log(props.urlKey, 'props.urlKey');
    if (isImage(type)) {
      src.value = item[props.urlKey];
      visible.value = true;
    } else {
      current.value = item;
      modelVisible.value = true;
    }
  }
  /*  function getFileName(file: File) {
  const { name } = file;
  const arr = name?.split('.');
  arr.splice(arr.length - 1, 1);
  return arr.join();
} */

  function responseUrlKey(file: any) {
    // console.log(file);
    // console.log(file?.response?.data?.url);
    const { data = {} } = file?.response || {};
    const { cdnUrl, key, dir } = data;
    const type = file.name.split('.')?.pop()?.toLowerCase();
    // console.log(cdnUrl);
    // console.log(`${cdnUrl}/${dir}${key}.${type}`);
    return `${cdnUrl}/${dir}${key}.${type}`;
  }
  function handleOk() {
    // 下载
    const { name, url } = current.value;
    download(url, name);
  }
  function onBeforeRemove() {
    emits('before-remove');
  }

  function formatSize(val: number) {
    let res: number | string = NP.divide(val, 1024);
    if (res > 1024) {
      res = NP.divide(res, 1024);
      res = res.toFixed(2) + 'MB';
    } else {
      res = res.toFixed(2) + 'KB';
    }
    return res;
  }
</script>

<style scoped lang="less">
  .img-box {
    position: relative;
    width: 120px;
    height: 120px;
    margin-right: 12px;

    &:hover {
      .shade {
        display: flex;
      }
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .shade {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: none;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);

    .icon {
      color: #fff;
      cursor: pointer;
    }
  }

  .file-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 100%;
    margin-right: 12px;
    background-color: #f2f2f2;

    .file-img {
      width: 40px;
      height: 40px;
    }

    .bg-box {
      box-sizing: border-box;
      width: 100%;
      padding: 0 8px;
      overflow: hidden;
      color: #666;
      font-size: 14px;
      line-height: 24px;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
    }
  }

  :deep(.arco-upload-list-picture),
  :deep(.arco-upload-picture-card) {
    width: 120px;
    height: 120px;
  }

  :deep(.arco-upload-list-picture-mask) {
    line-height: 120px;
  }
</style>
