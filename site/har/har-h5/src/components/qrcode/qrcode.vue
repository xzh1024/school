<template>
  <u-qrcode
    ref="qrcode"
    canvas-id="qrcode"
    :value="value"
    :options="options"
    :size="size"
  ></u-qrcode>
  <!--  <canvas ref="node" class="qr-code"  canvas-id="qrcode" id="qrcode"></canvas>-->
</template>
<script setup>
  import { computed } from "vue";
  const props = defineProps({
    value: {
      type: String,
      required: true,
      default: ""
    },
    size: {
      type: Number,
      default: 300,
      validator: (s) => isNaN(Number(s)) !== true
    },
    level: {
      type: String,
      default: "L"
      // validator: l => ['L', 'M', 'Q', 'H'].indexOf(l) > -1
    },
    background: {
      type: String,
      default: "#fff"
    },
    foreground: {
      type: String,
      default: "#000"
    },
    image: {
      type: Object
    }
  });
  const options = computed(() => {
    return {
      errorCorrectLevel: props.level,
      background: {
        color: props.background
      },
      foreground: {
        color: props.foreground
        // image:props.image
      }
    };
  });
</script>
