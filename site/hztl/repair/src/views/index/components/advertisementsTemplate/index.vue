<template>
  <div class="advertisements-template" v-show="list.length">
    <template v-for="(item, index) in list">
      <a
        class="advertisement-item"
        target="_blank"
        v-if="item.url"
        :key="index"
        :href="item.url"
      >
        <img :src="item.pic" alt="配修社区" />
      </a>
      <span class="advertisement-item" v-else :key="index">
        <img :src="item.pic" alt="配修社区" />
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BannerModel } from "@/common/interface/commonInterface";

@Component({ name: "AdvertisementsTemplate" })
export default class AdvertisementsTemplate extends Vue {
  @Prop() protected list!: BannerModel[];
}
</script>

<style lang="scss" scoped>
.advertisements-template {
  width: 100%;
  height: 80px;
  overflow: hidden;
  display: flex;
  .advertisement-item {
    display: inline-block;
    flex: 1;
    height: 100%;
    margin-left: $margin-size-main;
    &:first-child {
      margin-left: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
