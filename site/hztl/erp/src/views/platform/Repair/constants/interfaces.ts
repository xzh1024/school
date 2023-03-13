export interface HasWhscModel {
  has: boolean;
  loginUrl: string;
}

export interface BindWhscModel {
  needForceUpdate: boolean; // 是否需要二次确认
  loginUrl: string; // 绑定后的登录地址
}

export interface BindWhscParams {
  forceUpdate: boolean; // 强制更新
}
