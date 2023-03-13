<template>
  <div ref="qrcode" class="code-canvas custom-qrcode" />
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  name: "CustomQrcode",
  props: {
    value: {
      type: String,
      required: true
    },
    configure: {
      type: Object,
      default: () => ({
        width: 200,
        height: 200
      })
    }
  },
  data() {
    return {
      qrcode: null
    };
  },
  mounted() {
    if (this.value) {
      this.makeQrcode();
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.makeQrcode();
      }
    }
  },
  methods: {
    makeQrcode() {
      if (this.qrcode) {
        this.qrcode.clear();
        this.qrcode.makeCode(this.value);
      } else {
        this.qrcode = new QRCode(this.$refs.qrcode, {
          ...this.configure,
          text: this.value
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-qrcode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
