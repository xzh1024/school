import HztlUi, { install } from "hztl-ui";

import Card from "./card";
import { Pagination, Table } from "./table";
import Tree from "./tree";
import { SettingTable } from "./setting-table";
import SelectGroup from "./select-group";
import PercentInput from "./percent-input";
import FormatNumber from "./format-number";
import MessageBox from "./message-box";
import List from "./list";
import Tabs from "./tabs";
import Dialog from "./dialog";
import Select from "./select";
import Input from "./input";
import Autocomplete from "./autocomplete";
import AutoSelect from "./autoselect";
const components = [
  Table,
  Tree,
  SettingTable,
  Pagination,
  Card,
  SelectGroup,
  FormatNumber,
  PercentInput,
  List,
  Tabs,
  Dialog,
  Input,
  Select,
  Autocomplete,
  AutoSelect
];

const hztlInstall = function(Vue) {
  Vue.use(install);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
};

export default {
  ...HztlUi,
  ...components,
  install: hztlInstall,
  MessageBox
};
