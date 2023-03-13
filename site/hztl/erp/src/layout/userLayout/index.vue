<template>
  <!-- 电装的登录样式 -->
  <el-container class="bodys" v-if="uiConfig && uiConfig.logoText">
    <el-main height="600px">
      <div class="logo-text-wrap">
        <div class="logo-text-container-denso logo-text-denso" />
        <!-- {{ uiConfig.logoText }} -->
      </div>
      <div class="stars">
        <div
          v-for="(item, index) in starsCount"
          :key="index"
          class="star"
          ref="star"
        ></div>
      </div>
      <div class="form-container">
        <div class="pic">
          <p>云诊车门店管家</p>
          <p>打破传统，专注于解决门店痛点</p>
        </div>
        <div class="form-group">
          <router-view />
        </div>
      </div>
      <CopyrightLine class="copyright-container" />
    </el-main>
  </el-container>

  <section v-else class="layout-container">
    <div class="logo-text-container logo-text" />
    <div class="form-container">
      <div class="form-group">
        <router-view />
      </div>
    </div>
    <CopyrightLine class="copyright-container" />
  </section>
</template>

<script>
import CopyrightLine from "./components/CopyrightLine";
import { uiConfig } from "envConfigPath";

export default {
  name: "UserLayout",
  components: {
    CopyrightLine
  },
  data() {
    return {
      uiConfig,
      starsCount: 900, //星星数量
      distance: 1000, //间距
      indexSrc: require("@/assets/images/entrance-bg.png")
    };
  },
  mounted() {
    if (uiConfig) {
      const starArr = this.$refs.star;
      starArr.forEach(item => {
        const speed = 0.2 + Math.random() * 1;
        const thisDistance = this.distance + Math.random() * 300;
        item.style.transformOrigin = `0 0 ${thisDistance}px`;
        item.style.transform = `translate3d(0,0,-${thisDistance}px) 
								rotateY(${Math.random() * 360}deg)
								rotateX(${Math.random() * -50}deg) 
								scale(${speed},${speed})`;
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/var";

.layout-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  min-height: 700px;
  overflow: visible;
  background-image: url("~@/assets/images/entrance-bg.png");
  background-size: 1920px;
  background-position: center;
  background-repeat: no-repeat;
}

.copyright-container {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
}

.logo-text-container {
  position: absolute;
  top: 20px;
  left: 50px;
  width: 200px;
  height: 50px;
}

.logo-text-container-denso {
  top: 20px;
  left: 50px;
  width: 200px;
  height: 100px;
}

.form-container {
  display: flex;
  align-items: center;
  margin: auto;
  width: 1200px;
  overflow: visible;

  .form-group {
    flex: none;
    width: 400px;
    margin-left: 800px;
    overflow: visible;
  }
}

.main-contaner {
  width: 100%;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
}

.h-title-text {
  margin: 0;
}

.demo-ruleForm {
  margin: 30px 0 0 0;

  .el-form-item__content {
    line-height: 40px;
  }

  .el-cascader__label {
    line-height: 40px !important;
  }

  .el-input__inner {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
  }

  .el-icon-view {
    cursor: pointer;
  }

  .sr-button-big {
    position: relative;
    display: inline-block;
    top: -1.38px;
    width: 100px;
    height: 40px;
    vertical-align: middle;
  }
}

.button-block {
  display: block;
  width: 100%;
  margin: 40px 0 0 0;
  .el-input-group {
    width: auto;
  }
}

.isLogin-bottom {
  font-size: 12px;
  color: #6891fc;
  @include font_color("color-primary");
  margin: 20px 0 0 0;

  span {
    cursor: pointer;
  }

  .link {
    cursor: pointer;
    font-size: 12px;
    color: #6891fc;
    @include font_color("color-primary");
    margin: 20px 0;
    text-decoration: none;
  }
}

.textRight {
  text-align: right;
}

.code-button {
  background: #f6f9ff;
  border: 1px solid #9db8ff;
  border-radius: 4px;
  width: 118px;
  height: 40px;
  font-size: 14px;
  color: #6891fc;
  line-height: 40px;
  cursor: pointer;
}

.changeText {
  text-decoration: line-through;
}
/* 电装的login样式 */
.bodys {
  height: 100%;
  width: 100%;
  background: radial-gradient(
    200% 100% at bottom center,
    #f7f7b6,
    #e96f92,
    #1b2947
  );
  background: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 60%,
    #f7f7b6
  );
  background-attachment: fixed;
  overflow: hidden;
  .logo-text-wrap {
    width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
  }
  .el-main {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
  }
  .form-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: auto;
    width: 1200px;
    overflow: visible;
    .pic {
      width: 400px;
      color: #fff;
      :nth-child(1) {
        font-size: 36px;
      }
    }
    .form-group {
      flex: none;
      width: 400px;
      margin-left: 40px;
      overflow: visible;
    }
  }
}
//动画
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}
.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
  bottom: 200px;
  z-index: 99999999;
}
.star {
  width: 2px;
  height: 2px;
  background: #f7f7b8;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}
</style>
