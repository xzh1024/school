<template>
  <div class="goods-component">
    <header-main></header-main>
    <div class="ht-container">
      <GoodsList></GoodsList>
    </div>
    <footer-main></footer-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderMain from "@/components/headerMain/index";
import FooterMain from "@/components/footerMain/index";
import GoodsList from "./components/goodsList/index.vue";

@Component({
  name: "Goods",
  components: {
    HeaderMain,
    FooterMain,
    GoodsList
  }
})
export default class Goods extends Vue {}
</script>
