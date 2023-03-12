/* eslint-disable no-undef */

importScripts("xlsx.js");
postMessage({ t: "ready" });
onmessage = function(evt) {
  let v;
  try {
    v = XLSX.read(evt.data.d, evt.data.b);
  } catch (e) {
    postMessage({ t: "e", d: e.stack });
    close();
  }
  postMessage({ t: evt.data.t, d: JSON.stringify(v) });
  close();
};
