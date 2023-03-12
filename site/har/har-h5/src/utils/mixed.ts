import { promisfiy } from "@/utils";
async function saveImageAuth() {
  try {
    const { authSetting } =
      await promisfiy<UniNamespace.GetSettingSuccessResult>(uni.getSetting, {
        withSubscriptions: true
      });
    console.log("authSetting", authSetting);
    if (!authSetting["scope.writePhotosAlbum"]) {
      const first = uni.getStorageSync("saveFirst");
      if (first === 1) {
        const s = await promisfiy(uni.authorize, {
          scope: "scope.writePhotosAlbum"
        });
        console.log(s);
      }
      uni.setStorageSync("saveFirst", 1);
    }
    return true;
  } catch (e) {
    console.error(e);
    uni.openSetting();
  }
}
async function downloadImage(url: string) {
  try {
    const { statusCode, tempFilePath } = await promisfiy(uni.downloadFile, {
      url,
      header: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    if (statusCode === 200) {
      return tempFilePath;
    } else {
      throw Error("返回异常");
    }
  } catch (e) {
    uni.showToast({
      title: "保存失败",
      icon: "none",
      duration: 2000
    });
  }
}
/**
 * @param {string } imgUrl  图片地址
 * @param {bool} download  是否下载
 *
 *
 * */
export async function saveImage(imgUrl: string, download?: boolean, fn?: any) {
  uni.showLoading({
    title: "保存中...",
    mask: true
  });
  const bool = await saveImageAuth();
  console.log(bool);
  let tempFilePath = imgUrl;
  if (!bool) {
    uni.showToast({
      title: "保存失败",
      icon: "none",
      duration: 2000
    });
  }
  if (download) {
    tempFilePath = await downloadImage(imgUrl);
  }
  await promisfiy(uni.saveImageToPhotosAlbum, {
    filePath: tempFilePath,
    success: () => {
      uni.showToast({
        title: "保存成功",
        icon: "success",
        duration: 2000
      });
    },
    fail: () => {
      uni.showToast({
        title: "保存失败",
        icon: "none",
        duration: 2000
      });
    }
  });
  fn && fn();
}
