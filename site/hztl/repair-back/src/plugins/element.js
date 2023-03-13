import Vue from "vue";
import {
  Button,
  Row,
  Col,
  Menu,
  MenuItem,
  Container,
  Aside,
  Header,
  Main,
  Submenu,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Card,
  Upload,
  Dialog,
  Tag,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Cascader,
  Message,
  MessageBox,
  Tree,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Pagination,
  Loading
} from "element-ui";

Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Submenu);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Card);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(CheckboxButton);
Vue.use(Cascader);
Vue.use(Tree);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Loading);

Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
