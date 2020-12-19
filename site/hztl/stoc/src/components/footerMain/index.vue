<template>
  <div class="footer-main">
    <div class="ht-container">
      <div class="footer-contnet">
        <p class="footer-otherlink">
          <a>关于我们</a>
          <ht-divider :direction="direction"></ht-divider>
          <a>联系我们</a>
          <ht-divider :direction="direction"></ht-divider>
          <a>招贤纳士</a>
          <ht-divider :direction="direction"></ht-divider>
          <a>免责申明</a>
        </p>
        <p class="footer-text">
          <a>北京东方思锐科技有限责任公司</a>
          <ht-divider :direction="direction" />
          <a>地址：北京市大兴区金星路12号院2号楼12层1508室</a>
          <ht-divider :direction="direction" />
          <a>电话：010-7832593</a>
        </p>
        <p class="footer-text">
          <span>&copy;-2020</span>
          <span class="m-l-8"
            >地址：北京市大兴区金星路12号院2号楼12层1508室</span
          >
          <span class="m-l-8">电话：010-7832593</span>
        </p>
      </div>
      <div class="footer-imgs">
        <img class="footer-img" src="" alt="" />
        <img class="footer-img" src="" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HtDivider } from "@/components/hztl";

@Component({
  name: "FooterMain",
  components: { HtDivider }
})
export default class FooterMain extends Vue {
  protected direction = "vertical";
}
</script>

<style lang="scss" scoped>
$footer-height: 158px;

.footer-main {
  height: $footer-height;
  background-color: $color-white;
  .m-l-8 {
    margin-left: 8px;
  }
  .footer-contnet {
    padding-top: 16px;

    .footer-otherlink {
      padding: 10px 0;
      text-align: center;
      a {
        color: $color-dim;
      }
    }
    .footer-text {
      text-align: center;
      color: $color-gray;
      font-size: $font-size-12;
      padding: 10px 0;
      a {
        color: $color-gray;
      }
    }
  }
  .footer-imgs {
    height: 32px;
    overflow: hidden;
    .footer-img {
      display: inline-block;
      width: 114px;
      height: 32px;
      margin-right: 14px;
    }
  }
}
</style>
