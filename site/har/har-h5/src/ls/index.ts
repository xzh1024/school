import { createStorage } from "@/uni_modules/suixin-uni-local-storage";
let version = "";
// #ifdef MP-WEIXIN
const { miniProgram } = uni.getAccountInfoSync();
version = miniProgram.version;
// #endif
export default createStorage({
  version: version || "0.0.0"
});
