import Vue from 'vue'
import {
    Button,
    Container,
    Header,
    Menu,
    MenuItem,
    Tooltip,
    Main,
    Popover,
    Popconfirm,
    Drawer,
    Form,
    FormItem,
    Select,
    Option,
    Input,
    RadioGroup,
    Radio,
    MessageBox,
    Table,
    TableColumn,
    Pagination
} from 'element-ui'

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Tooltip);
Vue.use(Main);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(Drawer);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(RadioGroup);
Vue.use(Radio);
// Vue.use(MessageBox);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);

Vue.prototype.$confirm = MessageBox.confirm;
