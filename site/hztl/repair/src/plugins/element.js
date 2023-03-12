import Vue from "vue";
import {
  Button,
  Popover,
  Pagination,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Table,
  TableColumn,
  Dialog,
  Row,
  Col,
  Select,
  Option,
  Input,
  Cascader,
  Image,
  Divider,
  Loading,
  MessageBox
} from "element-ui";

Vue.use(Button);
Vue.use(Popover);
Vue.use(Pagination);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Cascader);
Vue.use(Image);
Vue.use(Divider);
Vue.use(Loading);

Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
