<template>
  <div class="state-box">
    <i class="state-icon" />
    <div class="state-text">
      {{ state }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="stylus" scoped>
.state-box {
    position: absolute;
    top: 4px;
    right: 0;
    overflow: hidden;
    z-index: 100;

    .state-icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        z-index: 10;
        border: 15px solid #fff;
        border-color: transparent transparent transparent #fff;
    }

    .state-text {
        position: relative;
        padding: 4px 10px 4px 25px;
        color: #fff;
        background: #3aa7ff;
    }
}
</style>
