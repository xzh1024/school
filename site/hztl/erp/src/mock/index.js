import Mock from "mockjs";
import urls from "@/config/baseUrl";

import mockMoudles from "./moudles";

const mockList = [];
Object.keys(mockMoudles).forEach(key => {
  mockList.push(...mockMoudles[key]);
});
for (const unit of mockList) {
  if (unit.open === true) {
    const base = urls[unit.module] || urls["accounts"];
    const urlRegExp = new RegExp((base + unit.url).replace(/\//g, "\\/"));
    Mock.mock(urlRegExp, unit.method || "get", function(req) {
      console.log(req);
      console.log(unit.data);
      return unit.data;
    });
  }
}
Mock.XHR.prototype.withCredentials = true;
