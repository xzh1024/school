<template>
  <a v-if="phone" :href="'tel:'+phone" class="iconfont icon-home_phone phone"></a>
</template>

<script>
import request from "@/request";

export default {
  data(){
    return {
      phone: ""
    }
  },
  created(){
    this.getDefaultPhone();
  },
  methods: {
    getDefaultPhone() {
      request({
        url: "/open/stores/info"
      }).then((res)=>{
          this.phone=res.phone;
          this.$store.commit("getStoreTel", this.phone)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.phone {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-image: linear-gradient(224deg, #ffb12d 0%, #ff6e4c 100%);
  line-height: 48px;
  font-size: 32px;
  color: #ffffff;
}
</style>