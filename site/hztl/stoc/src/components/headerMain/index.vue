<template>
  <div class="header-main">
    <div class="header-top">
      <div class="ht-container">
        <div class="header-top-hint">
          卖不掉的积压库存，在这里帮你卖出去；需要的配件，在这里用超低价帮你买回来！
        </div>
        <template v-if="baseInfo.companyId">
          <div class="header-top-company">
            {{ baseInfo.companyName }}
          </div>
          <ht-divider :direction="'vertical'"></ht-divider>
          <div class="header-top-btn" @click="openBackStage">
            管理中心 <i class="icon-right"></i>
          </div>
        </template>
      </div>
    </div>
    <div class="header-content">
      <div class="ht-container">
        <div class="header-left">
          <div class="logo-main" @click="handlePath"></div>
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
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";
const BaseStore = namespace("base");

@Component({
  name: "HeaderMain",
  components: {
    SearchBar,
    HtDivider
  }
})
export default class HeaderMain extends Vue {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;

  protected handlePath() {
    if (this.$route.path !== "/") {
      this.$router.push({ path: "/" });
    }
  }

  protected openBackStage() {
    if (sessionStorage.token) {
      // const url = "http://localhost:8080/?token=" + sessionStorage.token;
      const url = "http://192.168.3.50:8080/?token=" + sessionStorage.token;
      window.open(url);
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
        .logo-main {
          cursor: pointer;
        }
        .address-wrap {
          margin-left: 24px;
        }
      }
    }
  }
}
</style>
