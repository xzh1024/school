<template>
  <div class="menu-container">
    <ul class="menu clearfix">
      <li
        v-for="item in menus"
        :key="item.path"
        :class="{ 'is-active': item.path === $route.path }"
        @click="$router.push({ path: item.path })"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="primary" v-if="baseInfo.companyId" @click="openBackStage">管理中心</div>
    <div class="primary" v-else @click="showEnterDialog">商家入驻</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";
const BaseStore = namespace("base");

@Component({ name: "Menu" })
export default class Menu extends Vue {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;

  private menus = [
    {
      name: "首页",
      path: "/"
    },
    {
      name: "找配件",
      path: "/goods"
    },
    {
      name: "找商家",
      path: "/company"
    }
    // {
    //   name: "找品牌",
    //   path: "/brand"
    // }
  ];

  protected showEnterDialog() {
    this.$emit("update:visible", true);
  }

  // 跳转到管理后台
  protected openBackStage() {
    if (sessionStorage.token) {
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url = "http://192.168.3.41:8080/?token=" + sessionStorage.token;
      } else {
        url = location.origin + "/back/";
      }
      window.open(url, "_self");
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  background: $color-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  .menu {
    display: inline-block;
    font-size: $font-size-16;
    font-weight: 500;
    color: $color-white;
    li {
      float: left;
      margin: 0 24px;
      padding: 15px 0 12px;
      line-height: 18px;
      border-bottom: 3px solid $color-primary;
      cursor: pointer;
      &.is-active {
        border-bottom-color: $color-white;
      }
    }
  }
  .primary {
    margin: 0 24px;
    height: 48px;
    line-height: 48px;
    font-size: $font-size-16;
    font-weight: 500;
    color: $color-white;
    cursor: pointer;
  }
}
</style>
