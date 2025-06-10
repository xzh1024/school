import { makeAutoObservable, reaction } from 'mobx';
import storage from '@/utils/storage';

export default class ConfigStore {
  constructor() {
    makeAutoObservable(this);
    const localConfig = storage.get('ems-web-config') ? JSON.parse(storage.get('ems-web-config')) : undefined;
    if (localConfig) {
      Object.keys(localConfig).forEach((key) => {
        const value = localConfig[key];
        this[key] = value;
      });
    }
    reaction(() => ({ ...this }), (value) => {
      storage.set('ems-web-config', value);
    }, {
      fireImmediately: true
    });
  }

  // 是否暗色主题
  isDarkTheme = false;

  // 主题色
  primaryColor = '#1677ff';

  // 菜单模式  side|top|mix
  layoutType = 'mix';

  // 是否展示骨架屏
  loading = false;

  // 系统一般圆角
  borderRadius = 2;

  // 系统超大圆角
  borderRadiusLG = 2;

  // 系统小号圆角
  borderRadiusSM = 2;

  // menu Type  sub | group
  menuType = 'sub';

  // 固定header不移动
  headerFixed = false;

  // 设置抽屉栏是否打开
  isSettingDrawerOpen = false;

  // 主页内容是否需要padding
  needContentPadding = true;
}
