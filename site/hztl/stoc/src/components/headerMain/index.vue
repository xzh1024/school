<template>
  <div class="header-main">
    <div class="header-top">
      <div class="ht-container">
        <div class="header-top-hint">
          卖不掉的积压库存，在这里帮你卖出去；需要的配件，在这里用超低价帮你买回来！
        </div>
        <div class="header-top-company">
          上海优士汽车零件部件有限公司
        </div>
        <div class="header-top-user">
          <i class="icon-user"></i>
          <span>潘金莲</span>
        </div>
        <ht-divider :direction="'vertical'"></ht-divider>
        <div class="header-top-btn">管理中心 <i class="icon-right"></i></div>
      </div>
    </div>
    <div class="header-content">
      <div class="ht-container">
        <div class="header-left">
          <div class="logo-wrap" @click="handlePath">
            <i class="logo-60"></i>
            <div class="strong">信息展馆</div>
          </div>
          <div class="address-wrap">
            <slot name="address"></slot>
          </div>
        </div>

        <search-bar></search-bar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchBar from "@/components/searchBar/index.vue";
import { HtDivider } from "@/components/hztl";

@Component({
  name: "HeaderMain",
  components: {
    SearchBar,
    HtDivider
  }
})
export default class HeaderMain extends Vue {
  protected handlePath() {
    if (this.$route.path !== "/") {
      this.$router.push({ path: "/" });
    }
  }
}
</script>

<style lang="scss" scoped>
$header-top-height: 40px;
$header-content-height: 116px;

.header-main {
  .header-top {
    background: $color-primary;
    color: $color-white;
    .ht-container {
      height: $header-top-height;
      display: flex;
      align-items: center;
      .header-top-hint {
        flex: 1;
        font-size: $font-size-12;
      }
      .header-top-user {
        display: flex;
        align-items: center;
        margin-left: 16px;
        .icon-user {
          margin-right: 4px;
        }
      }
      .ht-divider-vertical {
        margin: 0 16px;
      }
      .header-top-btn {
        padding: 3px 8px 3px 16px;
        background: $color-white;
        color: $color-primary;
        border-radius: 12px;
        font-size: 12px;
        line-height: 1;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }

  .header-content {
    background: $color-white;
    .ht-container {
      height: $header-content-height;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-left {
        display: flex;
        align-items: flex-end;
        .logo-wrap {
          display: flex;
          align-items: center;
          cursor: pointer;
          .strong {
            font-size: $font-size-20;
            color: $color-primary;
            margin-left: 5px;
          }
        }
        .address-wrap {
          margin-left: 24px;
        }
      }
    }
  }
}
</style>
