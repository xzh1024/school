<template>
  <view class="top-popup-tabs-box">
    <view class="tabs-box">
      <view
        class="tabs-cell flex align-center"
        @click="onShowAndChange(1, true)"
      >
        <view>{{ classifyObj.name }}</view>
        <image class="icon-arrow" :src="icon_arrow" />
      </view>
      <view
        class="tabs-cell flex align-center"
        @click="onShowAndChange(2, true)"
      >
        <view>{{ sortObj.name }}</view>
        <image class="icon-arrow" :src="icon_arrow" />
      </view>
    </view>
    <uni-popup ref="popup" background-color="#fff" @change="popupChange">
      <view
        class="popup-container-box"
        :style="{ paddingTop: popupPaddingTop }"
      >
        <view class="popup-title-box">
          <view
            :class="tabIndex === 1 ? 'i-active' : ''"
            class="flex align-center"
            @click="onShowAndChange(1)"
          >
            <view>全部分类</view>
            <image class="icon-arrow" :src="icon_arrow" />
          </view>
          <view
            :class="tabIndex === 2 ? 'i-active' : ''"
            class="flex align-center"
            @click="onShowAndChange(2)"
          >
            <view>智能排序</view>
            <image class="icon-arrow" :src="icon_arrow" />
          </view>
        </view>
        <view class="popup-content-box">
          <view v-show="tabIndex === 1" class="classify-box">
            <cascade-tree :parent-id="parentId" @on-choose="onChooseTree" />
          </view>
          <view v-show="tabIndex === 2" class="sort-box">
            <view
              v-for="(item, index) in selectArr"
              :key="index"
              :class="sortObj.value === item.value ? 'i-active' : ''"
              class="select-cell"
              @click="onSelect(item)"
            >
              {{ item.name }}
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    name: "TopPopupTabs"
  };
</script>
<script setup>
  import { ref } from "vue";
  import UniPopup from "../../../uni_modules/uni-popup/components/uni-popup/uni-popup";
  import CascadeTree from "./cascade-tree";

  const icon_arrow =
    "https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_img/arrow_bottom_black.png";

  const selectArr = [
    {
      name: "智能排序",
      value: 0
    },
    {
      name: "热度最高",
      value: 1
    },
    {
      name: "销量优先",
      value: 2
    },
    {
      name: "最新开张",
      value: 3
    }
  ];

  const emits = defineEmits(["onSelectChange", "onPopupChange"]);

  const classifyObj = ref({
    name: "全部分类",
    value: ""
  });

  const sortObj = ref({
    name: "智能排序",
    value: 0
  });

  defineProps({
    parentId: {
      type: Number,
      default: null
    },
    popupPaddingTop: {
      type: [String, Number],
      default: ""
    }
  });

  const onChooseTree = (value) => {
    const { allChoose, nowChoose } = value;
    classifyObj.value = {
      name: allChoose.map((item) => item.text).join("/"),
      value: nowChoose.value || ""
    };
    popup.value.close();
    emits("onSelectChange", {
      classify: classifyObj.value,
      sort: sortObj.value
    });
  };

  const onSelect = (item) => {
    if (item.value === sortObj.value.value) return;
    sortObj.value = item;
    popup.value.close();
    emits("onSelectChange", {
      classify: classifyObj.value,
      sort: sortObj.value
    });
  };

  const popup = ref(null);
  const tabIndex = ref(0);
  const onShowAndChange = (value, isShow = false) => {
    tabIndex.value = value;
    if (isShow) {
      popup.value.open("top");
    }
  };

  const popupChange = (e) => {
    emits("onPopupChange", e.show);
  };
</script>

<style scoped lang="scss">
  .icon-arrow {
    height: 28rpx;
    width: 28rpx;
    margin-left: 8rpx;
  }
  .i-active {
    color: #fb5f05 !important;
  }
  .top-popup-tabs-box {
    background: #f7f7f7;
    font-size: 24rpx;
    width: 100%;
    .tabs-box {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .tabs-cell {
        padding: 32rpx 0;
      }
    }
    .popup-container-box {
      .popup-title-box {
        display: flex;
        justify-content: space-around;
        height: 84rpx;
        background: #ffffff;
        border-bottom: 1px solid #e6e6e6;
        font-size: 32rpx;
        color: #333333;
      }
      .popup-content-box {
        width: 100%;
        height: 400rpx;
        overflow: hidden;
        .sort-box {
          .select-cell {
            padding: 32rpx;
            color: #999999;
            font-size: 28rpx;
          }
        }
      }
    }
  }
</style>
