/**
 * Created by Admin on 2019/2/15.
 */

export default {
  install(Vue, options){
    const deviceType = Vue.prototype.config.system;
    Vue.prototype.config = {
      system: (function() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid?1:2;
      })(),
      channel: 1,//渠道ID
      key: 'dafb9c0f015a603381c3f574531b53b0'
    },
    Vue.prototype.app = {
      //关闭用户中心
      closeUserCenter(){
        if(deviceType === 1){
          window.Android.finish();
        } else if(deviceType === 2){
          window.webkit.messageHandlers.wz_callOC.postMessage({method : 'wz_close_user_center'});
        }
      },
      //打开游戏盒子
      openBox(){
        if(deviceType === 1){
          window.Android.openBox();
        } else if(deviceType === 2){
          window.webkit.messageHandlers.wz_callOC.postMessage({method : 'wz_open_box'});
        }
      },
      //进入申请返利
      openRebate(){
        if(deviceType === 1){
          window.Android.applyForRebate();
        } else if(deviceType === 2){
          window.webkit.messageHandlers.wz_callOC.postMessage({method : 'wz_show_rebate_view'});
        }
      },
      //隐藏悬浮球
      hideFloat(){
        if(deviceType === 1){
          window.Android.hideBall();
        } else if(deviceType === 2){
          window.webkit.messageHandlers.wz_callOC.postMessage({method : 'wz_close_float'});
        }
      },
      //设置悬浮球文字
      showFloatLabel(message){
        message = message || '';
        if(deviceType === 1){
          window.Android.showHideBallDialog(message);
        } else if(deviceType === 2){
          window.webkit.messageHandlers.wz_callOC.postMessage({method : 'wz_set_float_label_text'});
        }
      },
      //退出登录
      logout(){
        if(deviceType === 1){
          window.Android.logout();
        } else if(deviceType === 2){
          window.webkit.messageHandlers.wz_callOC.postMessage({method : 'wz_logout'});
        }
      },
      //复制礼包码
      copy(content){
        content = content || '';
        if(deviceType === 1){
          window.Android.copyToClipboard(content);
        } else if(deviceType === 2){
          // window.webkit.messageHandlers.wz_callOC.postMessage({method : 'wz_logout'});
        }
      }
    }
  }
}











