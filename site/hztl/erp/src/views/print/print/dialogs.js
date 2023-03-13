export function showDialog(title, content, width) {
  const dialog = document.createElement("div");
  dialog.style =
    "position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,.5); z-index: 9999;";
  dialog.innerHTML = `
    <div onclick="event.stopPropagation();" style="width: ${width}; margin: 5% auto; background: white; color: #606266; border-radius: 3px; overflow: hidden;">
      <div style="position: relative; padding: 15px; background: #f6fafd;">
        <big>${title}</big>
        <span class="close-dialog" style="position: absolute; top: 5px; right: 20px; font-size: 30px; cursor: pointer;"> &times; </span>
      </div>
      <div class="body" style="padding: 10px 20px; font-size: 14px;">
      </div>
    </div>
  `;

  if (typeof content == "string") {
    dialog.querySelector(".body").innerHTML = content;
  } else {
    dialog.querySelector(".body").appendChild(content);
  }

  dialog.onclick = function() {
    this.dispatchEvent(new CustomEvent("close"));
  };
  dialog.querySelectorAll(".close-dialog").forEach(function(e) {
    e.onclick = function() {
      this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    };
  });
  document.body.appendChild(dialog);

  // eslint-disable-next-line
  return new Promise(async function(resolve, reject) {
    dialog.addEventListener("close", function(event) {
      this.remove();
      event.stopPropagation();
      resolve(event.detail);
    });
  });
}

async function showInstallDialog() {
  return await showDialog(
    "未检测到自适应打印软件",
    `
    <b>一、若您未安装，请先安装“自适应打印软件”，再进行"自适应打印"操作</b>
    <div style="margin-left: 1rem;">
    1. 点击下方“下载”按钮，下载“自适应打印软件”。<br>
    2. 将下载的<b>sirui-print.zip</b>解压到某个文件夹（文件夹所在的完整路径中不要包含任何中文字符）。<br>
    3. 进入解压出来的文件夹，右键单击<b>sirui-print.exe</b>，选择“以管理员身份运行”。<br>
    </div>

    <b>二、若您已安装，请先启动“自适应打印软件”，再进行"自适应打印"操作</b>
    <div style="margin-left: 1rem;">
    进入“自适应打印软件”所在的文件夹，右键单击<b>sirui-print.exe</b>，选择“以管理员身份运行”。<br>
    </div>

    <div style="margin-top: 1rem;"><b>可能遇到的情况：</b></div>
    <div style="margin-left: 1rem; margin-bottom: 1rem;">
    1. 如果遇到“Windows已保护你的电脑”的弹窗，请点击“更多信息”，然后点击“仍要运行”。<br>
    2. 如果遇到“用户账户权限控制”的弹窗，请点击“是”。<br>
    3. 如果遇到360安全卫士等安全软件拦截运行操作，请选择允许。<br>
    </div>

    <div style="display: flex; justify-content: center;">
      <a class="el-button el-button--primary el-button--mini" href="https://dl.hztl3.com/print/sirui-print.zip"
        style="text-decoration: none; margin-right: 2rem"> 下载 </a>
      <button class="close-dialog el-button el-button--primary el-button--mini is-plain"> 取消 </button>
    </div>
  `,
    "520px"
  );
}

export async function tryStartOrShowInstallDialog() {
  const a = document.createElement("a");
  a.href = "SiRuiPrint://";
  let started;
  window.onblur = function() {
    started = true;
  };
  a.click();

  await new Promise(function(resolve) {
    setTimeout(resolve, 10); // 如果启动成功，10毫秒应该足够触发blur事件了吧。
  });
  if (started) return;

  await showInstallDialog();
}

export async function showSelectPrinterDialog(printers) {
  if (printers === undefined) return;

  let options = "";
  for (const name in printers) {
    if (name === localStorage.adaptivePrintSelectedPrinter) {
      options += `<option selected>${name}</option>`;
    } else {
      options += `<option>${name}</option>`;
    }
  }
  const content = document.createElement("div");
  content.style = "display: flex; flex-flow: column; align-items: center;";
  content.innerHTML = `
    <div>
      <p>“自适应打印”不支持包含中文字符的打印机。</p>
      <select style="padding: 5px 15px; border: 1px solid gray; border-radius: 3px; min-width: 10rem;">
        ${options}
      </select>
      <div style="display: flex; align-items: center; margin: 1rem 0;">
        <input type="checkbox" checked id="dft-checkbox" /> <label for="dft-checkbox">设置为默认打印机</label>
      </div>
    </div>
    <div style="margin-top: 1rem;">
      <button class="select-and-print el-button el-button--primary el-button--mini"> 选择并打印 </button>
      <button class="close-dialog el-button el-button--primary el-button--mini is-plain"> 取消 </button>
    </div>
  `;
  content.querySelector(".select-and-print").onclick = function() {
    const value = content.querySelector("select").value;
    if (content.querySelector("input[type=checkbox]").checked) {
      localStorage.adaptivePrintSelectedPrinter = value;
    }
    this.dispatchEvent(
      new CustomEvent("close", { bubbles: true, detail: value })
    );
  };

  return await showDialog("打印机选择", content, "420px");
}
