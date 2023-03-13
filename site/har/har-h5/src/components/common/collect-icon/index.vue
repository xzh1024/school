<template>
  <image
    class="nav-image"
    :src="
      collect
        ? 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/collection-active.png'
        : 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/collection.png'
    "
    @tap="collectChange"
  ></image>
</template>

<script>
  export default {
    name: "CollectIcon"
  };
</script>
<script setup>
  import { cbdApiAppletCollectAddPost } from "@/api";

  const props = defineProps({
    collect: {
      type: Boolean,
      default: false
    },
    storeId: {
      //对应 活动id  商品id  店铺id
      type: Number
    },
    type: {
      //对应 活动type  商品type  店铺type
      type: Number,
      default: 2
    }
  });
  const emits = defineEmits(["change"]);
  async function collectChange() {
    try {
      const { storeId: id, collect } = props;
      await cbdApiAppletCollectAddPost({ type: props.type, objectId: id });
      emits("change", !collect);
      // if(props.collect){
      //   await cbdApiAppletCollectDeleteIdPost({id})
      //   emits('change',false)
      // }else{
      //   await cbdApiAppletCollectAddPost({type: props.type,objectId: id})
      //   emits('change',true)
      // }
    } catch (e) {
      console.error(e);
    }
  }
</script>

<style scoped lang="scss">
  .nav-image {
    width: 52rpx;
    height: 52rpx;
  }
</style>
