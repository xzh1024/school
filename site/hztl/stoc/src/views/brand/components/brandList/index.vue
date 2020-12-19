<template>
  <div class="brand-template">
    <div class="brand-search">
      <div
        class="mnemonic"
        v-for="mnemonic in mnemonics"
        :key="mnemonic"
        :class="{ 'is-active': mnemonic === firstMnemonic }"
        @click="handleMnemonic(mnemonic)"
      >
        {{ mnemonic }}
      </div>
    </div>
    <div class="brand-list clearfix">
      <template v-for="item in list">
        <brand-item :key="item.swPartId" :info="item"></brand-item>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BrandItem from "@/views/brand/components/brandItem/index";
import { BrandModel } from "@/common/interface/brandInterface";
import { BrandService } from "@/common/services/brandService";
import { checkCh } from "@/common/utils/queryFirstMnemonic.js";
const brandService = new BrandService();

@Component({
  name: "BrandList",
  components: {
    BrandItem
  }
})
export default class BrandList extends Vue {
  protected list: BrandModel[] = [];

  protected mnemonics: string[] = [];
  protected firstMnemonic = "";

  protected getBrandAll() {
    const params = {
      firstMnemonic: this.firstMnemonic
    };
    brandService
      .getBrandAll(params)
      .then((res: BrandModel[]) => {
        console.log(res);
        const list = res || [];
        const mnemonics: string[] = [];
        list.forEach(item => {
          if (item.name && item.name.length) {
            if (item.name.charAt(0)) {
              const mnemonic = checkCh(item.name.charAt(0));
              if (!mnemonics.includes(mnemonic)) {
                mnemonics.push(mnemonic);
              }
            }
          }
        });
        this.mnemonics = mnemonics.sort();
        this.list = list;
        console.log(this.mnemonics);
      })
      .catch(() => (this.list = []));
  }

  protected handleMnemonic(mnemonic: string) {
    if (mnemonic === this.firstMnemonic) {
      this.firstMnemonic = "";
    } else {
      this.firstMnemonic = mnemonic;
    }
    this.getBrandAll();
  }

  created() {
    this.getBrandAll();
  }
}
</script>

<style lang="scss" scoped>
.brand-template {
  .brand-search {
    min-height: 32px;
    padding: 16px;
    .mnemonic {
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: $font-size-16;
      font-weight: 500;
      color: $color-gray;
      border-radius: 50% 50%;
      cursor: pointer;
      @extend .user-select-none;
      transition: all 0.5s ease;
    }
    .mnemonic.is-active {
      color: $color-white;
      background: blue;
    }
  }
  .brand-list {
    min-height: 396px;
    box-sizing: border-box;
    width: 100%;
    .brand-item,
    .brand-double {
      float: left;
    }
  }
}
</style>
