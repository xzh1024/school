<template>
  <div :ref="'qrcode' + index" class="code-canvas" />
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "CustromQrCodes",
  // components: { QRCode },
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  mounted() {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    setTimeout(() => {
      this.test();
    }, 200);
  },
  methods: {
    //  生成二维码
    qrcode(item, index) {
      const qrcode = new QRCode(this.$refs[`qrcode${index}`], {
        width: 124,
        height: 124,
        text: item.address,
        background: "#3aa7ff",
        foreground: "#3aa7ff"
      });
      return qrcode;
    },
    test() {
      this.$nextTick(() => {
        this.qrcode(this.item, this.index);
      });
    }
  }
};
</script>
