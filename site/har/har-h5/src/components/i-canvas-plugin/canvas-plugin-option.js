// 全局配置
const CanvasGlobalOption = {
  width: 600, //1
  height: 800,
  backgroundColor: "#fff", //默认背景颜色
  dom: "canvas-pic", //默认dom
  borderRadius: 20, //画布圆角
  borderRadiusFillColor: "rgba(0,0,0,.6)", //默认圆角填充色
  mainPic: {
    //默认主图参数
    width: 600,
    height: 600,
    x: 0,
    y: 0,
    url: "" //主图url
  },
  minPic: {
    //默认小程序码参数
    width: 160,
    height: 160,
    x: 414,
    y: 615,
    url: ""
  },
  blocks: [
    //默认画块参数
    {
      width: 690,
      height: 808,
      x: 30,
      y: 183,
      borderWidth: 2,
      borderColor: "#f0c2a0",
      borderRadius: 20
    },
    {
      width: 634,
      height: 74,
      x: 59,
      y: 770,
      backgroundColor: "#fff",
      opacity: 0.5,
      zIndex: 100
    }
  ],
  title: {
    x: 30,
    y: 666,
    fontSize: 16,
    baseLine: "middle",
    text: "",
    width: 380,
    lineHeight: 22,
    maxLine: 2,
    lineNum: 1,
    color: "#333",
    zIndex: 200
  },
  price: {
    x: 30,
    y: 770,
    fontSize: 18,
    baseLine: "middle",
    text: "100~200",
    width: 300,
    lineHeight: 22,
    maxLine: 1,
    lineNum: 1,
    color: "#e54d42",
    zIndex: 200
  },
  texts: [
    {
      x: 30,
      y: 770,
      fontSize: 14,
      baseLine: "middle",
      text: "￥",
      width: 10,
      lineHeight: 22,
      maxLine: 1,
      lineNum: 1,
      color: "#e54d42",
      zIndex: 200
    }
  ]
};
export default CanvasGlobalOption;
