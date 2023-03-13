import { BEIMAI } from "@/constants/platform";

export interface FormData {
  dealerId: string | null; // 平台账号ID(驾安配/犇犇/开思)
  warehouse: string | null; // 选择的仓库(开思)
  phone: string; // 手机号(机汽人)
  smsCaptcha: string; // 短信验证码(机汽人)
  appKey?: string; // 北迈云 appKey
  appSecret?: string; // 北迈云 appSecret
}

export const HZTL_PLATFORM = "hztl"; // 合众通联
export const ZPLLM_PLATFORM = "zpllm"; // 中配联友
export const HEYOUZG_PLATFORM = "heyouzg"; // 赫友
export const ZERO07_PLATFORM = "007"; // 零零汽
export const JAP_PLATFORM = "jap"; // 驾安配（邦邦）
export const BB_PLATFORM = "bb"; // 犇犇
export const JQR_PLATFORM = "jqr"; // 机器人
export const KS_PLATFORM = "ks"; // 开思
export const BEIMAI_PLATFORM = BEIMAI; // 北迈云

export const PLATFORM_MAP = {
  [HZTL_PLATFORM]: "合众通联",
  [ZPLLM_PLATFORM]: "中配联友",
  [HEYOUZG_PLATFORM]: "赫友",
  [ZERO07_PLATFORM]: "零零汽",
  [JAP_PLATFORM]: "驾安配（邦邦）",
  [BB_PLATFORM]: "犇犇",
  [JQR_PLATFORM]: "机器人",
  [KS_PLATFORM]: "开思",
  [BEIMAI_PLATFORM]: "北迈云"
};

export const NEED_CLEAN_PLATFORMS = [
  HZTL_PLATFORM,
  ZPLLM_PLATFORM,
  HEYOUZG_PLATFORM
];

export const NO_CHECK_NO_ID_PLATFORMS = [BB_PLATFORM];

export const NO_CHECK_PLATFORMS = [JAP_PLATFORM];

export const ACCOUNT_WAREHOUSE_CHECK_PLATFORMS = [KS_PLATFORM];

export const PHONE_CAPTCHA_CHECK_PLATFORMS = [JQR_PLATFORM];

export const LOCAL_AUTH_PLAT_FORMS = [
  ...NO_CHECK_NO_ID_PLATFORMS,
  ...NO_CHECK_PLATFORMS,
  ...ACCOUNT_WAREHOUSE_CHECK_PLATFORMS,
  ...PHONE_CAPTCHA_CHECK_PLATFORMS,
  BEIMAI_PLATFORM
];
