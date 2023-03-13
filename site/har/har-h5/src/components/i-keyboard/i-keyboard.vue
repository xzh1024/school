<template>
  <view class="keyboard-container">
    <view class="box-title">
      <text>其他金额</text>
      <uni-icons type="closeempty" color="#ddd" size="20" @tap="onCancel" />
    </view>
    <view class="container">
      <view class="keyboard-input" :class="{ empty: !keyboardValue }">
        {{ keyboardValue || "请输入" }}
      </view>
      <view class="fix-area">
        <view class="left-area">
          <view
            v-for="(item, index) in leftArr"
            :key="index"
            class="i-cell"
            @tap="onChoose(item.value)"
          >
            {{ item.name }}
          </view>
        </view>
        <view class="right-area">
          <view class="i-cell" @tap="onDel">删除</view>
          <view class="i-cell" @tap="onClear">清空</view>
          <view class="i-cell height-108" @tap="onConfirm">确认</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";

  const leftArr = [
    {
      name: "1",
      value: "1"
    },
    {
      name: "2",
      value: "2"
    },
    {
      name: "3",
      value: "3"
    },
    {
      name: "4",
      value: "4"
    },
    {
      name: "5",
      value: "5"
    },
    {
      name: "6",
      value: "6"
    },
    {
      name: "7",
      value: "7"
    },
    {
      name: "8",
      value: "8"
    },
    {
      name: "9",
      value: "9"
    },
    {
      name: "00",
      value: "00"
    },
    {
      name: "0",
      value: "0"
    },
    {
      name: ".",
      value: "."
    }
  ];

  const keyboardValue = ref("");
  const emits = defineEmits(["onConfirm", "cancel"]);
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: ""
    },
    valueType: {
      type: String,
      default: "text"
    },
    max: {
      type: Number,
      default: 99999.99
    }
  });

  const onChoose = (value: string) => {
    if (value === "0" && keyboardValue.value.startsWith("0")) return;
    const tempArr = `${keyboardValue.value}${value}`.split(".");
    if (["price", "number"].includes(keyboardValue.value)) {
      if (
        tempArr[0] &&
        Number([...tempArr[0]][0]) === 0 &&
        Number([...tempArr[0]][1]) > -1
      )
        return; //开始只能有一个0并且0后不能跟其他数字
    }
    if (props.valueType === "price") {
      if (keyboardValue.value === "" && value === ".") return;
      if (value === "." && keyboardValue.value.includes(value)) return; //只能输入一个.
      if (tempArr[1] && tempArr[1].length > 2) return; //只能输入两位小数
    }
    if (props.valueType === "number") {
      if (value === ".") return; //不能输入小数点
    }
    if (+tempArr > props.max) return;
    keyboardValue.value = `${keyboardValue.value}${value}`;
  };
  // 删除
  const onDel = () => {
    const value = keyboardValue.value.slice(0, keyboardValue.value.length - 1);
    keyboardValue.value = value;
  };

  // 清空
  const onClear = () => {
    keyboardValue.value = "";
  };

  const price_reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
  const number_reg = /^[1-9]\d*$/;

  const onConfirm = () => {
    if (props.valueType === "price") {
      if (!price_reg.test(keyboardValue.value)) {
        return uni.showToast({
          title: "请输入金额",
          icon: "none"
        });
      }
    }
    if (props.valueType === "number") {
      if (!number_reg.test(keyboardValue.value)) {
        return uni.showToast({
          title: "请输入正整数",
          icon: "none"
        });
      }
    }
    emits("onConfirm", keyboardValue.value);
  };

  // 关闭
  function onCancel() {
    emits("cancel");
  }

  function reset() {
    keyboardValue.value = `${props.modelValue}`;
  }

  defineExpose({
    reset
  });

  onLoad(() => {
    reset();
  });
</script>

<style scoped lang="scss">
  .keyboard-container {
    width: 100%;
    .fix-area {
      width: 100%;
      display: flex;
      .height-108 {
        height: 210rpx;
        background-color: #ff811a;
        color: #fff;
      }

      .left-area {
        display: flex;
        flex-wrap: wrap;
      }
      .right-area {
        .i-cell {
          margin-right: 0;
        }
      }
    }
  }

  .i-cell {
    width: 166rpx;
    height: 100rpx;
    background-color: #f0f0f0;
    border-radius: 8rpx;
    font-size: 36rpx;
    font-weight: 500;
    color: #383840;
    margin-bottom: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10rpx;
    &:nth-child(3n) {
      margin-right: 0;
    }

    &:active {
      background-color: #e1e1e1;
    }
  }

  .box-title {
    width: 100%;
    height: 96rpx;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    border-radius: 24rpx 24rpx 0 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32rpx;
    font-weight: 500;
    color: #383840;
    line-height: 48rpx;
    border-bottom: 2rpx solid #f0f0f0;
  }

  .keyboard-input {
    width: 100%;
    height: 112rpx;
    border-radius: 8rpx;
    border: 2rpx solid #e1e1e1;
    font-size: 48rpx;
    font-weight: 400;
    line-height: 64rpx;
    color: #070a16;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 120rpx;

    &.empty {
      font-size: 44rpx;
      color: #9c9ca0;
    }
  }
</style>
