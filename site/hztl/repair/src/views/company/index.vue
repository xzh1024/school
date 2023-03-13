<template>
  <div class="company-container">
    <header-main></header-main>
    <div class="ht-container">
      <CompanyList></CompanyList>
    </div>
    <footer-main></footer-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderMain from "@/components/headerMain/index";
import FooterMain from "@/components/footerMain/index";
import CompanyList from "./components/companyList/index.vue";

@Component({
  name: "Company",
  components: {
    HeaderMain,
    FooterMain,
    CompanyList
  }
})
export default class Company extends Vue {}
</script>
