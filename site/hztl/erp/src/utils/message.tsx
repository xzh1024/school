import eventBus from "@/event";
import { MessageBox } from "hztl-ui";
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import { uiConfig } from "envConfigPath";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export function gotoRenewal(e?: MouseEvent) {
  e?.stopPropagation();

  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:8093/products-erp";
  } else {
    url = `https://${window.location.hostname.replace(
      "erp",
      "www"
    )}/products-erp`;
  }
  window.open(url, "www");
}

export function dueMessage() {
  return (
    <div class="due-message">
      <div class="title">账套服务已到期</div>

      <div class="text">
        <div class="text-title">哦哟，小锐助手发现您的账套服务已到期啦～</div>
        <div class="text-content">
          尊敬的用户，您好！
          <br />
          <span class="text-content-item">
            您的账套服务已经到期，续费前暂时无法继续使用哦～
          </span>
          <br />
          <span class="text-content-item">
            近期我们又上新了好多亮点特色功能，可以帮助您更科学的管理门
            <br />
            店和拓展销售渠道。
          </span>
          <br />
          <span class="text-content-item">
            目前正在疯狂折价优惠中，每个站点每年仅需
            <span class="text-price">299元</span>
            ，加量不加价，
            <br />
            海量功能等待您的探索～
          </span>
          <br />
          <span class="text-content-item">
            您的所有数据我们都妥善保管着的，马上联系我们客服开通体验吧！
          </span>
        </div>
        <div class="text-contact">
          <div class="text-phone">
            客服热线：
            <br />
            18519302596
            <br />
            13436706925
            <br />
            13436706923
          </div>
          <div class="text-wechat-container">
            微信公众号
            <div class="text-wechat" />
          </div>
        </div>
        <div class="text-tips">
          扫码关注即可实时咨询开通，小锐助手在这里等你哟～
        </div>
      </div>

      <div class="button" onClick={gotoRenewal}>
        在线续费
      </div>
    </div>
  );
}

/* 部署给电装的帐套到期提醒 */
export function dueMessageForYZC() {
  return (
    <div class="due-message due-message-denso">
      <div class="title">账套服务已到期</div>

      <div class="text">
        <div class="text-title">
          哦哟，云诊车管家助手发现您的账套服务已到期啦~
        </div>
        <div class="text-content">
          尊敬的用户，您好！
          <br />
          <span class="text-content-item">
            您的账套服务已经到期，续费前暂时无法继续使用哦～
          </span>
          <br />
          <span class="text-content-item">
            目前云诊车门店管家的续费是需要在您绑定的诊断仪进行的，若您的账号还没有进行诊断仪绑定请您联系我们进行绑定处理哦。
          </span>
          <br />
          <span class="text-content-item">
            若您之前已经绑定过诊断仪，请您在诊断仪上对云诊车服务进行续费哦~
          </span>
          <br />
        </div>
        <div class="text-contact">
          <div class="text-phone">
            客服热线：
            <br />
            4006010010
          </div>
          <div class="text-wechat-container">
            微信公众号
            <div class="text-wechat-denso" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function dueMessageBox() {
  MessageBox({
    title: "",
    customClass: "due-message-box",
    message:
      uiConfig && uiConfig.uiTheme == "denso"
        ? dueMessageForYZC()
        : dueMessage(),
    center: true,
    showConfirmButton: false,
    showCancelButton: false,
    closeOnClickModal: false,
    closeOnPressEscape: false
  });
}
