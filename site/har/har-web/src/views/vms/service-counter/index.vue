<template>
  <div class="service-warp">
    <div class="service-top">
      <div class="left">综合服务台</div>
      <div class="right">
        <a-input placeholder="会员信息手机号/会员号/姓名 "></a-input>
      </div>
    </div>
    <div class="service-content">
      <div
        v-for="(i, index) in iconList"
        :key="index"
        class="items"
        @click="moudleClick(i)"
      >
        <img :src="getAssetURL(i.imgUrl)" />
        <div class="names">{{ i.name }}</div>
      </div>
    </div>
    <!-- 顾客到访 -->
    <vist-moudle v-model="vistVisible"></vist-moudle>
    <!-- 会员注册 -->
    <member-add v-model="memberAddVisible" title="会员注册"></member-add>
    <!-- 次卡/限期卡 签单 -->
    <sign-card v-model="cardVisible" :type="cardType" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import VistMoudle from './__components__/visit-moudle.vue';
  import MemberAdd from '@/views/vms/memberManage/__components__/addMember.vue';
  import { groundPcApiAuthGetUserInfoGet } from '@/api/ground-pc-api';
  import SignCard from './__components__/sign-card.vue';

  const cardVisible = ref(false);
  const cardType = ref(1);

  const memberAddVisible = ref(false);
  const iconList = ref([
    {
      id: 1,
      name: '顾客到访',
      imgUrl: 'Frame1.png',
      action: () => {
        vistVisible.value = true;
      }
    },
    {
      id: 2,
      name: '会员注册',
      imgUrl: 'Frame2.png',
      action: () => {
        memberAddVisible.value = true;
      }
    },
    {
      id: 3,
      name: '限期卡签单',
      imgUrl: 'Frame3.png',
      action: () => {
        cardType.value = 1;
        cardVisible.value = true;
      }
    },
    {
      id: 4,
      name: '次卡签单',
      imgUrl: 'Frame4.png',
      action: () => {
        cardType.value = 2;
        cardVisible.value = true;
      }
    },
    {
      id: 5,
      name: '场地代预约',
      imgUrl: 'Frame5.png'
    },
    {
      id: 6,
      name: '储值卡签单',
      imgUrl: 'Frame6.png'
    },
    {
      id: 7,
      name: '锁场',
      imgUrl: 'Frame7.png'
    },
    {
      id: 8,
      name: '私教签单',
      imgUrl: 'Frame8.png'
    },
    {
      id: 9,
      name: '体培签单',
      imgUrl: 'Frame9.png'
    },
    {
      id: 10,
      name: '预约核销',
      imgUrl: 'Frame10.png'
    }
  ]);

  const getAssetURL = (image: string) => {
    return new URL(`../../../assets/images/vms/${image}`, import.meta.url).href;
  };

  const vistVisible = ref(false);
  const moudleClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      vistVisible.value = true;
    }
  };

  const getList = async () => {
    await groundPcApiAuthGetUserInfoGet();
  };
  getList();
</script>
<style lang="less" scoped>
  .service-warp {
    .service-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      .right {
        width: 224px;
      }
    }
    .service-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .items {
        width: calc((100% - 80px) / 5);
        height: 178px;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        margin-left: 20px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:nth-child(5n + 1) {
          margin-left: 0px;
        }
        image {
          width: 110px;
          height: 70px;
        }
        .names {
          margin-top: 16px;
        }
      }
    }
  }
</style>
