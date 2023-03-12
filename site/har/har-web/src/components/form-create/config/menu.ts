import uniqueId from '@form-create/utils/lib/unique';
import radio from './rule/radio';
import checkbox from './rule/checkbox';
import input from './rule/input';
import number from './rule/number';
import select from './rule/select';
import _switch from './rule/switch';
// import slider from './rule/slider';
import time from './rule/time';
import date from './rule/date';
import rate from './rule/rate';
// import color from './color';
import row from './rule/row';
import divider from './rule/divider';
import cascader from './rule/cascader';
import upload from './rule/upload';
// import transfer from './rule/transfer';
// import tree from './rule/tree';
// import alert from './rule/alert';
import span from './rule/span';
// import space from './rule/space';
// import button from './rule/button';
// import editor from './rule/editor';
// import tab from './rule/tab';
import table from './rule/table';
import floor from './registry/floor';
import shopType from './registry/shop-type';
import shop from './registry/shop';
import merchant from './registry/merchant';
import contractNo from './registry/contract-no';
import brand from './registry/brand';
import business from './registry/business';
import store from './registry/store';

// import project from './registry/project';

export default function createMenu() {
  return [
    {
      name: 'main',
      title: '表单组件',
      list: [
        // color,
        input,
        number,
        radio,
        checkbox,
        select,
        _switch,
        time,
        date,
        // slider,
        rate,
        cascader,
        upload,
        table
        // transfer,
        // tree
        // editor,
      ]
    },
    {
      name: 'system',
      title: '系统组件',
      list: [
        // project
        floor,
        shopType,
        shop,
        store,
        merchant,
        contractNo,
        brand,
        business
      ]
    },
    {
      name: 'aide',
      title: '辅助组件',
      list: [
        // alert,
        // button,
        span,
        divider
      ]
    },
    {
      name: 'layout',
      title: '布局组件',
      list: [
        row
        // space
      ]
    }
  ];
}
