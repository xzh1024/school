<template>
  <div id="guide" @click.prevent.stop="handleGuide">
    <el-icon :size="20"><Promotion /></el-icon>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { steps } from './steps';

let driver;
onMounted(() => {
  driver = new Driver({
    // className: 'scoped-class', //包裹driver.js弹窗的类名 className to wrap driver.js popover
    animate: true, // 高亮元素改变时是否显示动画 Animate while changing highlighted element
    opacity: 0.75, //背景透明度(0 表示只有弹窗并且没有遮罩) Background opacity (0 means only popovers and without overlay)
    padding: 10, //  元素与边缘的距离 Distance of element from around the edges
    allowClose: true, // 是否允许点击遮罩时关闭 Whether clicking on overlay should close or not
    overlayClickNext: false, //是否允许点击遮罩时移到到下一步 Should it move to next step on overlay click
    doneBtnText: 'Done', // 最终按钮上的文本 Text on the final button
    closeBtnText: 'Close', // 当前步骤关闭按钮上的文本 Text on the close button for this step
    nextBtnText: 'Next', //当前步骤下一步按钮上的文本 Next button text for this step
    prevBtnText: 'Previous' // 当前步骤上一步按钮上的文本 Previous button text for this step
    // showButtons: false, //是否在底部显示控制按钮 Do not show control buttons in footer
    // keyboardControl: true, // 是否允许通告键盘控制(escape关闭，箭头键用于移动)Allow controlling through keyboard (escape to close, arrow keys to move)
    // scrollIntoViewOptions: {} //  `scrollIntoView()` 方法的选项 We use `scrollIntoView()` when possible, pass here the options for it if you want any
    // onHighlightStarted: (Element) {}, // 元素开将要高亮时调用Called when element is about to be highlighted
    // onHighlighted: (Element) {}, // 元素开完全高亮时调用Called when element is fully highlighted
    // onDeselected: (Element) {}, // 取消选择时调用 Called when element has been deselected
    // onReset: (Element) {},        // 遮罩将要关闭时调用 Called when overlay is about to be cleared
    // onNext: (Element) => {},      // 任何步骤中移到到下一步时调用Called when moving to next step on any step
    // onPrevious: (Element) => {},  // 任何步骤中移到到上一步时调用Called when moving to next step on any step
  });
});

const handleGuide = () => {
  driver.defineSteps(steps);
  driver.start();
};
</script>

<style lang="scss" scoped>
#guide {
  cursor: pointer;
}
</style>
