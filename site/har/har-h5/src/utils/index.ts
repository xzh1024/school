import { getCurrentInstance } from "vue";
import dayjs from "dayjs";

export const PLATFORM = (function () {
  return uni.getDeviceInfo().platform;
})();
export function zero(i: any) {
  const t = parseFloat(i);
  if (t < 10 && t >= 0) {
    return "0" + t;
  } else {
    return t + "";
  }
}

// json对象转 键值对
export function querystring(obj: Record<string, any> = {}) {
  if (type(obj) !== "object") return "";
  const arr = Object.keys(obj).reduce((pre, currentValue) => {
    return pre.concat(`${currentValue}=${obj[currentValue]}`);
  }, [] as string[]);
  return arr.join("&");
}

function decode(input: string) {
  try {
    return decodeURIComponent(input.replace(/\+/g, " "));
  } catch (e) {
    return null;
  }
}
export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function encode(input: string) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}
export function parse(query: string) {
  const parser = /([^=?&]+)=?([^&]*)/g;
  const result: Record<string, string> = {};
  let part = null;
  while ((part = parser.exec(query))) {
    const key = decode(part[1]);
    const value = decode(part[2]);
    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }
  return result;
}

// 获取当前页面信息
export function getCurrentPage(index = 0) {
  const pages = getCurrentPages();
  const i = pages.length - 1 + index;
  if (i > -1) {
    return pages[i];
  }
  return null;
}
export function getQuery() {
  const curPage = getCurrentPage();
  if (!curPage) return null;
  // @ts-ignore
  const { options, $route } = curPage;
  if ($route) {
    return $route.query;
  }
  return options;
}

export function type(obj: any) {
  return {}.toString.call(obj).slice(8, -1).toLowerCase();
}

export function delay(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function getImageQuery(data: any) {
  return Object.keys(data).reduce((prev, key) => {
    let val = data[key];
    if (type(val) !== "array") {
      val = [val];
    }
    const current = [key, ...val].join(",");
    return [prev, current].join("/");
  }, "?x-oss-process=image");
}
/**
 * oss图片缩放文档 https://help.aliyun.com/document_detail/44688.html
 * 指定缩放的模式。
 * lfit（默认值）：等比缩放，缩放图限制为指定w与h的矩形内的最大图片。
 * mfit：等比缩放，缩放图为延伸出指定w与h的矩形框外的最小图片。
 * fill：将原图等比缩放为延伸出指定w与h的矩形框外的最小图片，然后将超出的部分进行居中裁剪。
 * pad：将原图缩放为指定w与h的矩形内的最大图片，然后使用指定颜色居中填充空白部分。
 * fixed：固定宽高，强制缩放。
 */
type ResizeMode = "lfit" | "mfit" | "fill" | "pad";
type FixType = {
  m?: ResizeMode;
  w?: number; // 指定目标缩放图的宽度。[1,16384]
  h?: number; // 指定目标缩放图的高度。[1,16384]
  l?: number; // 指定目标缩放图的最长边。[1,16384]
  s?: number; // 指定目标缩放图的最短边。[1,16384]
  limit?: 0 | 1; // 当目标图片分辨率大于原图分辨率时，是否进行缩放。1（默认值）：返回按照原图分辨率转换的图片（可能和原图的体积不一样）。0：按指定参数进行缩放。
  color?: string; // 当缩放模式选择为pad（缩放填充）时，可以设置填充的颜色。
  p?: number; // 按百分比缩放图片。
};
export function fixImage(val: string, opt: FixType) {
  if (!val) return val;
  const resize = (Object.keys(opt) as (keyof FixType)[]).map((item) => {
    return [item, opt[item]].join("_");
  });
  const query = getImageQuery({
    "auto-orient": 1, // 某些手机拍摄出来的照片可能带有旋转参数（存放在照片exif信息里面）。可以设置是否对这些图片进行旋转，默认进行自动旋转。
    "format": "jpg", // 格式转换
    "interlace": 1, // 渐进显示 0关闭
    "quality": "q_90", // 图片质量 q 相对质量, Q绝对质量 [1,100]
    resize
  });
  return val + query;
}
export function getRect(
  selector: string,
  all = false
): Promise<UniApp.NodeInfo> {
  return new Promise((resolve: (key: any) => void) => {
    const instance = getCurrentInstance();
    if (!instance) {
      throw new Error("仅允许在组件内使用");
    }
    uni
      .createSelectorQuery()
      .in(instance.proxy)
      [all ? "selectAll" : "select"](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect);
        }
        if (!all && rect) {
          resolve(rect);
        }
      })
      .exec();
  });
}

// 价格格式化
export function formatPrice(v: number | string) {
  return Number.parseFloat(String(v)).toFixed(2);
}

// 时间格式化
export const formatTime = (time: dayjs.ConfigType, rule: string) =>
  time ? dayjs(time).format(rule || "YYYY-MM-DD HH:mm:ss") : "-";

// 页面跳转的方法
export const navPageByUrl = (
  url: string,
  isTab = false,
  beforeNav: () => void
) => {
  beforeNav && beforeNav();
  isTab ? uni.switchTab({ url }) : uni.navigateTo({ url });
};

// 创建promise
export function promisfiy<T = any>(
  fn: any,
  { success, ...options }: { success?: (e: T) => void; [k: string]: any } = {}
) {
  return new Promise<T>((reslove, reject) => {
    fn({
      success(res: T) {
        success && success(res);
        reslove(res);
      },
      fail(res: any) {
        console.log(res);
        reject(res);
      },
      ...options
    });
  });
}

export function wxPay(
  info: Record<string, any>,
  sucCallback: any,
  errCallback: any,
  errToPath = "/pages/order/index"
) {
  const { serverRspNo, timestamp, noncestr, dataPackage, signType, paysign } =
    info;
  uni.requestPayment({
    provider: "wxpay",
    orderInfo: serverRspNo,
    nonceStr: noncestr,
    timeStamp: timestamp,
    package: dataPackage,
    signType,
    paySign: paysign,
    success: (res) => {
      console.log(res);
      sucCallback(res);
    },
    fail: (err) => {
      console.error(err);
      if (errCallback) {
        errCallback(err);
      } else {
        const title =
          err["errMsg"].indexOf("cancel") > -1
            ? "支付取消"
            : "支付失败，请前往订单中心查看";
        if (errToPath) {
          uni.redirectTo({
            url: errToPath,
            complete() {
              uni.showToast({
                title: title,
                icon: "none"
              });
            }
          });
        } else {
          uni.showToast({
            title: title,
            icon: "none"
          });
        }
      }
    }
  });
}
