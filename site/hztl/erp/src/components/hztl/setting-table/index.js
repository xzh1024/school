import SettingTable from "../table/src/setting-table";

SettingTable.install = function(Vue) {
  Vue.component(SettingTable.name, SettingTable);
};

export { SettingTable };
