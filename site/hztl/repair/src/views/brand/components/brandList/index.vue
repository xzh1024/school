<template>
  <div class="brand-template" v-loading="loading">
    <div class="brand-search">
      <span
        class="brand-radio-all"
        :class="{ 'is-active': !queryParams.firstMnemonic }"
        @click="handleMnemonic('')"
        >全部</span
      >
      <span
        class="brand-radio"
        v-for="mnemonic in mnemonics"
        :key="mnemonic"
        :class="{ 'is-active': mnemonic === queryParams.firstMnemonic }"
        @click="handleMnemonic(mnemonic)"
      >
        {{ mnemonic }}
      </span>
    </div>
    <div class="brand-list clearfix">
      <template v-if="list.length">
        <brand-item
          v-for="(item, index) in list"
          :key="index"
          :info="item"
        ></brand-item>
      </template>
      <div class="no-data" v-if="!list.length">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BrandItem from "@/views/brand/components/brandItem/index";
import { BrandParams, BrandModel } from "@/common/interface/brandInterface";
import { checkCh } from "@/common/utils/queryFirstMnemonic.js";
import { BrandService } from "@/common/services/brandService";
const brandService = new BrandService();

@Component({
  name: "BrandList",
  components: {
    BrandItem
  }
})
export default class BrandList extends Vue {
  private isAllMnemonic = true;
  private queryParams: BrandParams = {
    keyword: "",
    firstMnemonic: ""
  };

  private loading = false;

  private list: BrandModel[] = [];

  private mnemonics: string[] = [];

  private getBrandAll() {
    this.loading = true;
    const params = {
      ...this.queryParams
    };
    brandService
      .getBrandAll(params)
      .then((res: BrandModel[]) => {
        const list = res || [];
        if (this.isAllMnemonic) {
          const mnemonics: string[] = [];
          list.forEach(item => {
            if (item.name && item.name.length) {
              const keys = checkCh(item.name.charAt(0));
              for (const key of keys) {
                if (!mnemonics.includes(key)) {
                  mnemonics.push(key);
                }
              }
            }
          });
          this.mnemonics = mnemonics.sort();
          if (
            this.queryParams.firstMnemonic === "" &&
            this.queryParams.keyword === ""
          ) {
            this.isAllMnemonic = false;
          }
        }
        this.list = list;
        this.loading = false;
      })
      .catch(() => {
        this.list = [];
        this.loading = false;
      });
  }

  private handleMnemonic(mnemonic: string) {
    if (mnemonic !== this.queryParams.firstMnemonic) {
      this.queryParams.firstMnemonic = mnemonic;
      this.getBrandAll();
    }
  }

  created() {
    const { keyword } = this.$route.query;
    if (keyword) {
      this.queryParams.keyword = keyword as string;
    }

    this.getBrandAll();
  }
}
</script>

<style lang="scss" scoped>
.brand-template {
  .brand-search {
    min-height: 32px;
    padding: 16px;
    .brand-radio,
    .brand-radio-all {
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
      transition: all 0.2s ease;
      &.is-active {
        color: $color-white;
        background: $color-primary;
      }
    }
    .brand-radio-all {
      width: auto;
      padding: 0 10px;
      border-radius: 16px;
    }
  }
  .brand-list {
    min-height: 396px;
    box-sizing: border-box;
    width: 100%;
    .brand-item {
      float: left;
    }
    .no-data {
      color: $color-dim;
      width: 100%;
      height: 396px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
