<template>
  <div class="footer-main">
    <div class="ht-container">
      <div class="footer-contnet">
        <!-- <p class="footer-otherlink">
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
          <a>地址：北京市大兴区金星路12号奥宇
科技英巢2号楼1508</a>
          <ht-divider :direction="direction" />
          <a>电话：010-7832593</a>
        </p>
        <p class="footer-text">
          <span>&copy;-2020</span>
          <span class="m-l-8"
            >地址：北京市大兴区金星路12号院2号楼12层1508室</span
          >
          <span class="m-l-8">电话：010-7832593</span>
        </p> -->
        <p class="footer-text">
          免责申明：鉴于尾货市场提供的信息发布服务属于电子公告牌（BBS）性质，尾货市场上的商家信息、商品描述等内容均由用户自行提供并上传，由用户对其提供并上传的信息承担相应法律责任。
        </p>
        <p class="footer-text">
          尾货市场转载的内容出于传递更多信息之目的，并不意味我们赞同其观点或已证实其内容的真实性。
        </p>
        <p class="footer-text">
          <span>北京东方思锐科技有限责任公司</span>
          <ht-divider :direction="direction" />
          <span>地址：北京市大兴区金星路12号奥宇科技英巢2号楼1508</span>
          <ht-divider :direction="direction" />
          <span>电话：010-60219478</span>
        </p>
        <p class="footer-text">
          &copy;北京东方思锐科技有限责任公司京ICP备05054864号
        </p>
      </div>
      <div class="footer-imgs">
        <a
          class="footer-img"
          target="_blank"
          href="http://hlwjg.beijing.gov.cn/bjqyxyxxdwcx/index.html"
        >
          <img src="../../assets/img/footer/national-emblem.png" />
        </a>
        <a
          class="footer-img"
          target="_blank"
          href="https://www.12377.cn/?spm=a21bo.2017.1997523009.51.5af911d9c7kIvZ"
          ><img src="../../assets/img/footer/report-12377.png"
        /></a>
        <a class="footer-img" target="_blank" href="https://jbts.mct.gov.cn"
          ><img src="../../assets/img/footer/report-12318.png"
        /></a>
        <a
          class="footer-img"
          target="_blank"
          href="http://www.shdf.gov.cn/shdf/channels/740.html?spm=a21bo.2017.1997523009.56.5af911
d9c7kIvZ"
          ><img src="../../assets/img/footer/report-anti-vice.png"
        /></a>
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
.footer-main {
  padding: 40px 0;
  background-color: $color-white;
  .m-l-8 {
    margin-left: 8px;
  }
  .footer-contnet {
    .footer-otherlink {
      margin-bottom: 16px;
      text-align: center;
      a {
        color: $color-dim;
      }
    }
    .footer-text {
      text-align: center;
      color: $color-gray;
      font-size: $font-size-12;
      // padding: 10px 0;
      margin-bottom: 16px;
      a {
        color: $color-gray;
      }
    }
  }
  .footer-imgs {
    height: 32px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    .footer-img {
      margin-left: 14px;
      img {
        display: inline-block;
        height: 32px;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
