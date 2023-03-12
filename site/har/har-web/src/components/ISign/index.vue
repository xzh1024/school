<template>
  <div class="i-sign">
    <canvas
      ref="canvas"
      class="i-sign__canvas"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>
<script setup lang="ts" name="i-sign">
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useEventListener, useToggle } from '@har/use';
  const props = withDefaults(
    defineProps<{
      width?: number;
      height?: number;
      url?: string;
    }>(),
    {
      width: 600,
      height: 400
    }
  );

  const canvas = ref<HTMLCanvasElement>();

  function submit() {
    return canvas.value?.toDataURL('i/png');
  }
  function clear() {
    context.value?.clearRect(0, 0, props.width, props.height);
    line.splice(0, line.length);
    linen.splice(0, linen.length);
  }
  defineExpose({ submit, clear });
  const context = computed(() => canvas.value?.getContext('2d'));
  type EventType = TouchEvent | MouseEvent;
  function getCanvasPos(canvas: HTMLCanvasElement, e: EventType) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if ('targetTouches' in e) {
      x = e.targetTouches[0].clientX;
      y = e.targetTouches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    return {
      x: (x - rect.left) * (canvas.width / rect.width),
      y: (y - rect.top) * (canvas.height / rect.height)
    };
  }
  const line = reactive<[number, number][]>([]);
  const linen = reactive<number[]>([]);
  const lastLine = reactive<[number, number]>([0, 30]);
  const [downStatus, toggle] = useToggle(false);
  function move(e: EventType) {
    if (!canvas.value || !context.value) return;
    const { x, y } = getCanvasPos(canvas.value, e);
    if (downStatus.value) {
      // 开始画点
      line.push([x, y]);
      linen.push(1);
      context.value.save();
      context.value.translate(canvas.value.width / 2, canvas.value.height / 2);
      context.value.translate(
        -canvas.value.width / 2,
        -canvas.value.height / 2
      );
      context.value.beginPath();
      context.value.lineWidth = 2;
      for (let i = 1; i < line.length; i++) {
        lastLine[0] = line[i][0];
        lastLine[1] = line[i][1];
        if (linen[i] === 0) {
          context.value.moveTo(lastLine[0], lastLine[1]);
        } else {
          context.value.lineTo(lastLine[0], lastLine[1]);
        }
      }
      context.value.shadowBlur = 10;
      context.value.stroke();
      context.value.restore();
    }
    e.preventDefault();
  }
  function down(e: EventType) {
    if (!canvas.value) return;
    const { x, y } = getCanvasPos(canvas.value, e);
    toggle(true);
    line.push([x, y]);
    linen.push(0);
  }
  function up(e: EventType) {
    toggle(false);
  }
  function image2canvas() {
    if (!props.url) return;
    const img = new Image();
    img.src = props.url;
    img.setAttribute('crossOrigin', 'Anonymous');
    img.onload = function () {
      context.value?.drawImage(img, 0, 0, props.width, props.height);
    };
  }
  onMounted(() => {
    image2canvas();
    // 注册监听事件
    if (typeof document.ontouchstart === 'undefined') {
      useEventListener<MouseEvent>('mousemove', move, {
        target: canvas
      });
      useEventListener<MouseEvent>('mousedown', down, {
        target: canvas
      });
      useEventListener<MouseEvent>('mouseup', up, {
        target: canvas
      });
      useEventListener<MouseEvent>('mouseleave', up, {
        target: canvas
      });
    } else {
      useEventListener<TouchEvent>('touchmove', move, {
        target: canvas
      });
      useEventListener<TouchEvent>('touchstart', down, {
        target: canvas
      });
      useEventListener<TouchEvent>('touchend', up, {
        target: canvas
      });
    }
  });
</script>
<style scoped lang="less">
  .i-sign {
    &__canvas {
      border: 1px solid #ccc;
    }
  }
</style>
