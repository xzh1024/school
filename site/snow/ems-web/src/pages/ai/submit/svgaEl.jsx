import React, { useEffect } from 'react';
import { Parser, Player } from 'svga';

export default function svgaEl(pages) {
  const {
    elid = true,
    svgaImg,
    width,
    height,
    loop = 0,
    startFrame = 0,
    fillMode = 'forwards',
    playMode = 'forwards',
    loopStartFrame = 10,
    isCacheFrames = true,
    isUseIntersectionObserver = true,
    isOpenNoExecutionDelay = false,
  } = pages;

  const startSvga = async () => {
    try {
      const parser = new Parser();
      const svga = await parser.load(svgaImg);
      const doc = document.getElementById(elid);
      const player = new Player({
        // 播放动画的 Canvas 元素
        container: doc,

        // 循环次数，默认值 0（无限循环）
        loop: loop,

        // 最后停留的目标模式，默认值 forwards
        // 类似于 https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
        fillMode: fillMode,

        // 播放模式，默认值 forwards
        playMode: playMode,

        // 开始播放的帧数，默认值 0
        startFrame: startFrame,

        // 结束播放的帧数，默认值 0
        // endFrame: 30,

        // 循环播放开始的帧数，可设置每次循环从中间开始。默认值 0，每次播放到 endFrame 后，跳转到此帧开始循环，若此值小于 startFrame 则不生效
        // 类似于 https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopStart
        loopStartFrame: loopStartFrame,

        // 是否开启缓存已播放过的帧数据，默认值 false
        // 开启后对已绘制的帧进行缓存，提升重复播放动画性能
        isCacheFrames: isCacheFrames,

        // 是否开启动画容器视窗检测，默认值 false
        // 开启后利用 Intersection Observer API 检测动画容器是否处于视窗内，若处于视窗外，停止描绘渲染帧避免造成资源消耗
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
        isUseIntersectionObserver: isUseIntersectionObserver,

        // 是否使用避免执行延迟，默认值 false
        // 开启后使用 `WebWorker` 确保动画按时执行（避免个别情况下浏览器延迟或停止执行动画任务）
        // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Policies_in_place_to_aid_background_page_performance
        isOpenNoExecutionDelay: isOpenNoExecutionDelay,
      });
      await player.mount(svga);
      player.onStart = () => {};
      // player.onProcess = () => console.log('onProcess', player.progress)
      // player.onEnd = () => console.log('onEnd')
      // 开始播放动画
      player.start();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    startSvga();
  }, []);

  return (
    <canvas
      id={elid}
      className="canvas"
      style={{
        width,
        height,
      }}
    ></canvas>
  );
}
