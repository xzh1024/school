/**
 *
 * 注意
 *      el-form查询、重置按钮放在form外或者添加stop避免焦点切换
 *      在默认快捷键区域中但无快捷键的区域添加class ignore-hotkeys
 *      有内部快捷键内部单独设置scope 并添加click事件绑定scope 非特定区域添加class ht-hotkey-block
 *      弹框单独设置区域的添加class ignore-top-hotkeys屏蔽页面快捷键
 *
 *      默认快捷键区域可用class  autofocus 改变 table中使用属性autofocus
 *          若快捷键区域为el-form
 *              默认第一个可用input获取焦点，给输入框添加属性autofocus改变默认焦点
 **/
import { Component, Vue } from "vue-property-decorator";

import TopHotkeys from "./TopHotkeys";

const topHotkeys = new TopHotkeys();
@Component
export default class HotkeyMixin extends Vue {
  activated() {
    topHotkeys.bindHotkeys(this.$el as HTMLElement);
  }
  deactivated() {
    topHotkeys.unbindHotkeys(this.$el as HTMLElement);
  }
  setDefaultHotkey() {
    topHotkeys.setDefaultHotkey();
  }
}
