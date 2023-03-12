<template>
  <ht-dialog
    v-bind="$attrs"
    title="主题设置"
    width="350px"
    v-on="$listeners"
    @closed="closed"
  >
    <ht-select v-model="theme" :clearable="false" :options="themes"></ht-select>
    <div style="margin-top: 10px;" class="dialog-footer-align">
      <el-button type="primary" size="mini" plain @click="handleSure">
        确 定
      </el-button>
      <el-button type="primary" size="mini" plain @click="handleCancel">
        取 消
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { ORIGINAL_THEME, THEMES } from "../constant";
import CHALK from "../constant/themeChalk";

// const version = require("element-ui/package.json").version; // element-ui version from node_modules

export default {
  data() {
    return {
      chalk: CHALK, // content of theme-chalk css
      theme: "",
      themes: THEMES
    };
  },
  computed: {
    ...mapState("admin/themeStyle", {
      themeColor: state => state.themeColor
    })
  },
  watch: {
    themeColor: {
      handler: function(val) {
        const theme = val || ORIGINAL_THEME;
        this.theme = theme;
        this.handleTheme(theme);
      }
    }
  },
  methods: {
    ...mapActions("admin/themeStyle", ["updateThemeColor"]),
    handleSure() {
      this.updateThemeColor(this.theme);
      this.handleCancel();
    },
    handleCancel() {
      this.$emit("update:visible", false);
    },
    closed() {
      this.theme = this.themeColor || ORIGINAL_THEME;
    },
    async handleTheme(val) {
      const oldVal = this.chalk ? this.theme : ORIGINAL_THEME;
      if (typeof val !== "string") return;
      const themeCluster = this.getThemeCluster(val.replace("#", ""));
      const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
      // const $message = this.$message({
      //   message: "  Compiling the theme",
      //   customClass: "theme-message",
      //   type: "success",
      //   duration: 0,
      //   iconClass: "el-icon-loading",
      //   offset: 200
      // });
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace("#", "")
          );
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          );
          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", id);
            document.head.appendChild(styleTag);
          }
          styleTag.innerText = newStyle;
        };
      };
      // if (!this.chalk) {
      //   const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
      //   await this.getCSSString(url, "chalk");
      // }
      const chalkHandler = getHandler("chalk", "chalk-style");
      chalkHandler();
      const styles = [].slice
        .call(document.querySelectorAll("style"))
        .filter(style => {
          const text = style.innerText;
          return (
            new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
          );
        });
      styles.forEach(style => {
        const { innerText } = style;
        if (typeof innerText !== "string") return;
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        );
      });
      this.$emit("change", val);
      this.setTheme();
      // $message.close();
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },
    // getCSSString(url, variable) {
    //   return new Promise(resolve => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onreadystatechange = () => {
    //       if (xhr.readyState === 4 && xhr.status === 200) {
    //         this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
    //         resolve();
    //       }
    //     };
    //     xhr.open("GET", url);
    //     xhr.send();
    //   });
    // },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));
          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);
          return `#${red}${green}${blue}`;
        }
      };
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);
        return `#${red}${green}${blue}`;
      };
      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    },
    setTheme() {
      this.themes.some(item => {
        const result = item.id === this.theme;
        if (result) {
          document.body.setAttribute("data-theme", item.theme);
        }
        return result;
      });
    }
  }
};
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}
.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
<style lang="scss" scoped>
::v-deep .theme-option {
  height: 34px;
}
</style>
