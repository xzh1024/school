<template>
  <div id="promote_goods_managment" :class="$store.state.paddingLeft">
    
    推广商品管理
  </div>
</template>
<script>

export default {
  components: {
    
  },
  name: "promote_goods_managment",
  data() {
    return {
      activeName: "first",
      theme: ""
    };
  },
  created() {
    this.theme = window.theme;
  },
  methods: {
    // handleClick(tab, event) {}
  }
};
</script>
<style lang="less" scoped>
#promote_goods_managment {
  padding-right: 20px;
  text-align: left;
  background: #ffffff;
  overflow: auto;
}

</style>


