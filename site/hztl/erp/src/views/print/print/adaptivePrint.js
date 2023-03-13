import axios from "axios";
import md5 from "md5";
import {
  showDialog,
  tryStartOrShowInstallDialog,
  showSelectPrinterDialog
} from "./dialogs.js";

function agentAddr() {
  return localStorage.adaptivePrintAgentAddr || "http://127.0.0.1:19999";
}

// 单位转换关系：1in = 2.54cm = 25.4mm = 72pt = 96px

// 单页连续纸标准宽度、高度（单位pt）
const stdPageWidth = Math.ceil(21 * (72 / 2.54)); // 21厘米
// const stdPageHeight = 11 * 72; // 11英寸

// EPSON打印机支持的最大页高（单位pt）
const maxPageHeight = 22 * 72; // 22英寸
// 页边距（单位pt）
const pageMargin = 12;
// 单页最大内容高度
const maxPageContentHeight = maxPageHeight - 2 * pageMargin; // 22英寸

function calcPageHeight(heightPx) {
  const heightPt = Math.ceil(heightPx * (72 / 96)); // px转换为pt
  // 将页高增加10个点，防止末尾增加一页。
  return (
    Math.ceil(heightPt / Math.ceil(heightPt / maxPageContentHeight)) +
    2 * pageMargin +
    10
  );
}

function getHtmlToPrint(heightPt) {
  document.head.querySelector("base").href = location.origin + "/";

  document.querySelectorAll("script,link[rel='icon']").forEach(function(e) {
    e.remove();
  });

  const style = document.createElement("style");
  style.innerText = `@page { size: ${stdPageWidth}pt ${heightPt}pt; margin: ${pageMargin}pt 0 !important; }`;
  document.head.append(style);

  const html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
  if (!localStorage.adaptivePrintDebug) style.remove();
  return html;
}

async function getPrinterNamesMap() {
  const timeout = 3000;
  try {
    const resp = await axios({
      method: "get",
      url: agentAddr() + "/printers",
      timeout: timeout
    });
    const result = {};
    for (let i = 0; i < resp.data.data.length; i++) {
      result[resp.data.data[i].name] = 1;
    }
    return result;
  } catch (error) {
    if (error.response) {
      alert("获取打印机列表出错。");
    } else {
      await tryStartOrShowInstallDialog();
    }
    throw error;
  }
}

async function getSelectedPrinter() {
  const printerNames = await getPrinterNamesMap();
  if (!printerNames) return;

  if (
    localStorage.adaptivePrintSelectedPrinter &&
    printerNames[localStorage.adaptivePrintSelectedPrinter]
  ) {
    return localStorage.adaptivePrintSelectedPrinter;
  }
  return await showSelectPrinterDialog(printerNames);
}

// 自适应打印
// 参数title:   打印任务名称（在windows的打印队列窗口里可以看到）。
// 参数heightPx:  打印高度，需要打印的内容的总高度（单位为像素）。
export async function adaptivePrint(title, heightPx, getAuth, printer) {
  const heightPt = calcPageHeight(heightPx);
  const html = getHtmlToPrint(heightPt);

  if (!printer) {
    printer = await getSelectedPrinter();
    if (!printer) return;
  }
  const auth = await getAuth(md5(html));

  const timeout = 30000;
  try {
    const resp = await axios({
      method: "post",
      url: agentAddr() + "/print",
      data: {
        printerName: printer,
        title: title,
        html: html,
        height: heightPt,
        auth: auth
      },
      timeout: timeout
    });
    if (resp.data.code == "ok") {
      return true;
    } else {
      throw resp.data;
    }
  } catch (error) {
    if (error.response) {
      await showDialog(
        "打印出错",
        "<p>请确保打印机所连接的电脑已开机。</p>",
        "30rem"
      );
    } else {
      await tryStartOrShowInstallDialog();
    }
    throw error;
  }
}

export async function selectPrinter(title, heightPx, getAuth) {
  const printer = await showSelectPrinterDialog(await getPrinterNamesMap());
  if (printer) {
    return await adaptivePrint(title, heightPx, getAuth, printer);
  }
}
