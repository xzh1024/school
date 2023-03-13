<template>
  <div class="brand-container">
    <header-main></header-main>
    <div class="ht-container">
      <brand-list></brand-list>
    </div>
    <div class="divider-end">
      <ht-divider>END</ht-divider>
    </div>
    <footer-main></footer-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderMain from "@/components/headerMain/index";
import FooterMain from "@/components/footerMain/index";
import BrandList from "./components/brandList/index.vue";
import { HtDivider } from "@/components/hztl";

@Component({
  name: "Brand",
  components: {
    HeaderMain,
    FooterMain,
    BrandList,
    HtDivider
  }
})
export default class Brand extends Vue {}
</script>

<style lang="scss" scoped>
.brand-container {
  .ht-container {
    margin-top: 8px;
    // min-height: calc(100% - 363px);
    background-color: $color-white;
  }
}
</style>
