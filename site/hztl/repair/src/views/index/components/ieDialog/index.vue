<template>
  <el-dialog
    title="提示"
    width="600px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :lock-scroll="false"
    :show-close="false"
  >
    <p>
      配修社区在当前浏览器暂时不兼容，页面样式无法正常显示，请使用其他浏览器打开！
    </p>
    <p>
      当前支持兼容的浏览器有：Google
      Chrome浏览器、360浏览器、火狐浏览器、搜狗浏览器、UC浏览器、QQ浏览器
    </p>
    <p>
      我们更推荐使用Google Chrome浏览器，点击链接下载：
      <a target="_blank" :href="chromeUrl" class="link">
        {{ this.chromeUrl }}
      </a>
    </p>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button type="text" size="mini" @click="hide">
        我知道了
      </el-button>
      <el-button type="primary" size="mini" @click="download">
        去下载
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "IeDialog" })
export default class IeDialog extends Vue {
  private visible = false;

  private chromeUrl = "https://www.google.cn/chrome/";

  private show() {
    this.visible = true;
  }

  private hide() {
    this.visible = false;
  }

  private download() {
    const ent = document.createElement("a");
    ent.href = this.chromeUrl;
    ent.style.display = "none";
    ent.target = "_blank";
    document.body.appendChild(ent);
    ent.click();
    document.body.removeChild(ent);
  }

  created() {
    const userAgent = navigator.userAgent;
    const isIE =
      userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    // const isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    const isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE || isIE11) {
      this.show();
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: $color-blue;
}
</style>
