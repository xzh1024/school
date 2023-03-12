<template>
  <div>
    <i-card title="基本信息" class="margin-bottom">
      <a-descriptions :column="1">
        <descriptions-item label="小程序名称">
          <span>{{ info.name }}</span>
        </descriptions-item>
        <descriptions-item label="小程序头像">
          <a-avatar shape="circle" :size="120" class="margin-bottom-sm">
            <img :src="info.headImg" alt="avatar" />
          </a-avatar>
          <!--          <a-button type="outline" size="small" class="margin-left">
            <template #icon><icon-edit /></template>
            修改
          </a-button>-->
        </descriptions-item>
        <descriptions-item label="小程序二维码">
          <a-avatar shape="circle" :size="120" class="margin-bottom-sm">
            <img :src="info.headImg" alt="avatar" />
          </a-avatar>
          <a-button
            type="outline"
            class="margin-left"
            size="small"
            @click="downloadImg"
          >
            <template #icon><icon-download /></template>
            下载
          </a-button>
        </descriptions-item>
        <descriptions-item label="小程序介绍">
          <div class="flex align-start">
            <div class="content">{{ info.signature }}</div>
            <div>
              <a-button
                type="outline"
                size="small"
                class="margin-left"
                @click="setIVisible(true)"
              >
                <template #icon><icon-edit /></template>
                修改
              </a-button>
            </div>
          </div>
        </descriptions-item>
      </a-descriptions>
    </i-card>
    <i-card title="账号信息" class="margin-bottom">
      <div>APPID: {{ info.appId }}</div>
    </i-card>
    <i-card title="关联地产项目" class="margin-bottom">
      <div class="flex align-center">
        <div>项目： {{ info.businessNames }}</div>
        <div class="padding-left">
          <a-button type="outline" size="small" @click="setVisible(true)">
            <template #icon><icon-edit /></template>
            修改
          </a-button>
        </div>
      </div>
    </i-card>
    <union-project
      :id="info.id"
      v-model:visible="visible"
      :business-id-list="info.businessIdList"
      @get-data="getData"
    />
    <introduction
      :id="info.id"
      v-model:visible="IVisible"
      @get-data="getData"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Detail'
  };
</script>

<script setup lang="ts">
  import { onMounted, ref, Ref } from 'vue';
  import ICard from '@/components/i-card/i-card.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  // import { cbdApiClientWechatThirdAppletInfoIdPost } from '@/api';
  import { useRoute } from 'vue-router';
  import { useToggle } from '@har/use';
  import UnionProject from '@/views/mini-program/__components__/union-project.vue';
  import Introduction from '@/views/mini-program/__components__/introduction.vue';
  import { download } from '@/utils';
  import { DescriptionsItem } from '@arco-design/web-vue';

  const route = useRoute();

  const info: Ref<any> = ref({ id: -1, businessIdList: [], qrcodeUrl: '' });
  const currentId: any = ref('');
  const [visible, setVisible] = useToggle(false);
  const [IVisible, setIVisible] = useToggle(false);

  onMounted(() => {
    const { id = '' } = route.query;
    currentId.value = id;
    getData();
  });
  const [getData] = useFuncProxy(async () => {
    /* info.value = await cbdApiClientWechatThirdAppletInfoIdPost({
      id: val || currentId.value
    }); */
  });

  function downloadImg() {
    const { qrcodeUrl } = info.value;
    download(qrcodeUrl, `二维码${new Date().getTime()}`);
  }
</script>

<style scoped lang="less">
  .margin-bottom-sm {
    margin-bottom: 12px;
  }

  .margin-left {
    margin-left: 20px;
  }

  .padding-left {
    padding-left: 12px;
  }

  .content {
    width: 120px;
    //color: rgb(var(--color-text-2));
    line-height: 28px;
    word-break: break-all;
  }
</style>
