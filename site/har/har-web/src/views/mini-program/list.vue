<template>
  <i-card title="小程序管理">
    <div class="list">
      <a-row :gutter="20">
        <template v-if="data.length">
          <a-col v-for="(item, index) in data" :key="index" :span="6">
            <div class="card">
              <div class="flex align-start card-top">
                <div class="image">
                  <a-avatar :size="64">
                    <img alt="avatar" :src="item.headImg" />
                  </a-avatar>
                </div>
                <div class="flex-1">
                  <div class="mini-title">{{ item.nickName }}</div>
                  <div class="mini-desc">{{ item.signature }}</div>
                </div>
              </div>
              <div class="footer" @click="toPath(item)">查看详情</div>
            </div>
          </a-col>
        </template>
        <a-col :span="6">
          <div class="card">
            <div class="flex align-start card-top">
              <div class="image">
                <a-avatar :size="64"></a-avatar>
              </div>
              <div class="flex-1">
                <div class="mini-title">小程序绑定授权</div>
                <div class="mini-desc"
                  >将小程序绑定并授权给汇安融，由汇安融进行代运营、代开发的服务。</div
                >
              </div>
            </div>
            <div class="footer footer-hover" @click="getAuth">授权</div>
          </div>
        </a-col>
      </a-row>
    </div>
  </i-card>
</template>

<script lang="ts">
  export default {
    name: 'List'
  };
</script>

<script setup lang="ts">
  import ICard from '@/components/i-card/i-card.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  /*  import {
    cbdApiClientWechatThirdAppletBindUrlPost,
    cbdApiClientWechatThirdAppletListPost,
    CbdApiClientWechatThirdAppletListPostResponse
  } from '@/api'; */
  import { onMounted, Ref, ref } from 'vue';
  import { useRouter } from 'vue-router';

  onMounted(() => {
    getData();
  });

  const router = useRouter();
  const data: Ref = ref([]);
  const [getData] = useFuncProxy(async () => {
    /* const res = await cbdApiClientWechatThirdAppletListPost();
    data.value = res; */
  });
  const [getAuth] = useFuncProxy(async () => {
    /* const res = await cbdApiClientWechatThirdAppletBindUrlPost();
    window.location.href = res.url; */
  });

  // 查看详情
  function toPath(item: any) {
    router.push({
      path: '/mini-program/detail',
      query: {
        id: item.id
      }
    });
  }
</script>

<style lang="less" scoped>
  .list {
    .card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 192px;
      margin-bottom: 20px;
      border: 1px solid rgb(var(--primary-6));

      .card-top {
        padding: 40px 20px 0;
      }

      .image {
        width: 64px;
        height: 64px;
        margin-right: 20px;
      }
    }

    .mini-title {
      color: rbg(var(--color-text-1));
      font-weight: bold;
      font-size: 18px;
    }

    .mini-desc {
      padding-top: 8px;
      color: rgb(var(--color-text-2));
      font-size: 14px;
      line-height: 24px;
    }
  }

  .footer {
    width: 100%;
    height: 48px;
    color: rgb(var(--primary-6));
    line-height: 48px;
    text-align: center;
    background: rgb(var(--primary-1));
    cursor: pointer;
  }

  .footer-hover {
    &:hover {
      color: #fff;
      background-color: rgb(var(--primary-6));
    }
  }
</style>
