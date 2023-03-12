<template>
  <view class="cascade-box">
    <scroll-view scroll-y class="list">
      <view
        v-for="(item, index) in treeFirst"
        :key="`one-${index}`"
        class="item-box"
        @click="onFirst(item, index)"
      >
        <text :class="item.checked ? 'i-active' : ''">{{ item.text }}</text>
      </view>
    </scroll-view>
    <scroll-view scroll-y class="list">
      <view
        v-for="(item, index) in treeSecond"
        :key="`two-${index}`"
        class="item-box"
        @click="onSecond(item, index)"
      >
        <text :class="item.checked ? 'i-active' : ''">{{ item.text }}</text>
      </view>
    </scroll-view>
    <scroll-view scroll-y class="list">
      <view
        v-for="(item, index) in treeThird"
        :key="`three-${index}`"
        class="item-box"
        @click="onThird(item, index)"
      >
        <text :class="item.checked ? 'i-active' : ''">{{ item.text }}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    name: "CascadeTree"
  };
</script>
<script setup>
  import { onMounted, ref } from "vue";
  import { cbdApiAppletFormatTreeGet } from "../../../api";
  const props = defineProps({
    parentId: {
      type: Number
    }
  });

  const emits = defineEmits(["onChoose"]);

  onMounted(() => {
    getCascadeTree();
  });

  const treeFirst = ref([]);
  const treeSecond = ref([]);
  const treeThird = ref([]);
  const chooseArr = ref([]);

  const getCascadeTree = async () => {
    try {
      const d = await cbdApiAppletFormatTreeGet({
        parentId: props.parentId
      });
      d.unshift({
        value: props.parentId,
        text: "全部分类",
        icon: "",
        isLeaf: true,
        children: []
      });
      treeFirst.value = d;
    } catch (e) {
      console.error(e);
    }
  };

  const onFirst = (item, index) => {
    treeSecond.value = [];
    treeThird.value = [];
    chooseArr.value = [];
    treeFirst.value = treeFirst.value.map((item, i) => {
      return {
        ...item,
        checked: i === index
      };
    });
    treeSecond.value = item.children;
    const { value, text } = item;
    chooseArr.value.push({ value, text });
    if (item.children.length < 1) {
      emits("onChoose", { allChoose: chooseArr.value, nowChoose: item });
    }
  };

  const onSecond = (item, index) => {
    treeSecond.value = treeSecond.value.map((item, i) => {
      return {
        ...item,
        checked: i === index
      };
    });
    treeThird.value = item.children;
    const { value, text } = item;
    chooseArr.value.splice(1, 1, { value, text });
    if (item.children.length < 1) {
      emits("onChoose", { allChoose: chooseArr.value, nowChoose: item });
    }
  };

  const onThird = (item, index) => {
    const { value, text } = item;
    chooseArr.value.splice(2, 1, { value, text });
    treeThird.value = treeThird.value.map((item, i) => {
      return {
        ...item,
        checked: i === index
      };
    });
    emits("onChoose", { allChoose: chooseArr.value, nowChoose: item });
  };
</script>

<style scoped lang="scss">
  .i-active {
    color: #fb5f05 !important;
  }
  .cascade-box {
    display: flex;
    width: 100%;
    height: 500rpx;
    .list {
      width: 33%;
      display: flex;
      flex-direction: column;
      border-right: 1rpx solid rgba(0, 0, 0, 0.05);
      overflow: hidden;
      .item-box {
        //margin-bottom: 24rpx;
        font-size: 28rpx;
        color: #999999;
        text-align: center;
        padding: 24rpx 0;
        //&:last-child {
        //  margin-bottom: 0;
        //}
      }
    }
  }
</style>
