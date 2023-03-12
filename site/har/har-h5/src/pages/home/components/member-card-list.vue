<template>
  <view class="card-list">
    <view class="list">
      <CardItem
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        card-name="储值卡"
        show-project-name
        class="card-item"
        @on-click="onClick"
      ></CardItem>

      <view v-if="!list.length" class="no-data-box">
        <image
          class="no-data-image"
          src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/shopCart/icon-noData.png"
        />
        <view>没有数据哦~</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "MemberCardList"
  };
</script>
<script setup>
  import { ref, onMounted, computed } from "vue";
  import { groundMpApiCardSaleGetMemberCardListPost } from "@/api/ground-mp-api";
  import CardItem from "@/components/card-item/index";
  import ls from "@/ls";

  onMounted(async () => {
    console.log("储值卡列表");
    console.log(projectId.value);
    getList();
  });

  const projectId = computed(() => {
    return ls.get("projectId");
  });

  const list = ref([]);
  const paging = ref(null);

  async function getList() {
    uni.showLoading({ title: "加载中..." });
    try {
      const res = await groundMpApiCardSaleGetMemberCardListPost({
        projectId: projectId.value
      });
      list.value = res || [];
    } catch (e) {
      console.error(e);
      list.value = [];
    } finally {
      uni.hideLoading();
    }
  }

  const onClick = (data) => {
    console.log(data);
    // uni.navigateTo({
    //   url: `/pages/card/cardPurchase/index?id=${data.id}`
    // });
  };

  function reload() {
    paging.value.reload();
  }
  defineExpose({ reload });
</script>

<style scoped lang="scss">
  .card-list {
    height: 100%;
    overflow-y: auto;
  }
  .list {
    padding: 32rpx;

    // overflow: hidden;
    .card-item {
      display: block;
      margin-bottom: 32rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .no-data-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: #333333;
    height: 100%;
    .no-data-image {
      height: 272rpx;
      width: 384rpx;
      margin-bottom: 22rpx;
    }
  }
</style>
