import { App } from 'vue';
import {
  Form,
  FormItem,
  Row,
  Col,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Switch,
  TimePicker,
  DatePicker,
  Rate,
  Cascader,
  Upload,
  Table,
  Divider,
  Modal
} from '@arco-design/web-vue';
const components = [
  Form,
  FormItem,
  Row,
  Col,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Switch,
  TimePicker,
  DatePicker,
  Rate,
  Cascader,
  Upload,
  Table,
  Divider,
  Modal
];

export default function install(Vue: App) {
  components.forEach((component) => {
    Vue.component(`a${component.name}`, component);
    Vue.component(`A${component.name}`, component);
  });
}
