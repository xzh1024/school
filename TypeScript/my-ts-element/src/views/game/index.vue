<template>
  <div class="p-test">
    <div class="child-routes">
      <util-nav-menu
        :routerList="routerList"
        :activePath="activePath"
      ></util-nav-menu>
    </div>
    <div class="test-content">
      <keep-alive>
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import utilNavMenu from '@/bussiness-components/nav-menu/util-nav-menu.vue';
import SearchVidComponent from './search-vid.vue';

import {IRouterConfig} from '@/router/interface/router.type';
import routerService from '@/router/router.service';
import {RouterNameEnum} from '@/router/enum/RouterNameEnum';

@Component({
  components: {
    utilNavMenu,
  },
})
export default class GameComponent extends Vue {
  public routerList: IRouterConfig[] = [];

  get activePath() {
    return this.$route.matched[2].path;
  }

  private created() {
      this.routerList = routerService.getModuleItems(RouterNameEnum.Game);
  }

  private mounted() {
  }
}
</script>

<style lang="scss">
@import '../../styles/var.scss';
.p-test {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: $light-color;
  padding: $padding-md;
  .child-routes {
    width: $nav-width;
    height: 100%;
    border: 1px solid $border-color;
    background: $active-color;
  }
  .test-content {
    position: absolute;
    left: $nav-width + ($padding-md * 2);
    top: $padding-md;
    right: $padding-md;
    bottom: $padding-md;
  }
}
</style>
