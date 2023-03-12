import { create } from '../utils';
import timeCardOrder from './sales-order/time-card-order';
import countCardOrder from './sales-order/count-card-order';
import goodsOrder from './sales-order/goods-order';
import loginApi from './login/index';
import memberManage from './memberManage/memberManage';
import memberLabel from './memberLabel/memberLabel';
import venueManage from './venueManage/venueManage';
import siteType from './venueManage/siteType';
import serviceApi from './service-conuter';
import goodsManage from './goods/goods';
import stockManage from './goods/stock';
import shop from './shop';
import commonApi from './common/index';

export default create([
  ...timeCardOrder(),
  ...countCardOrder(),
  ...loginApi(),
  ...memberManage(),
  ...memberLabel(),
  ...venueManage(),
  ...siteType(),
  ...serviceApi(),
  ...goodsManage(),
  ...stockManage(),
  ...goodsOrder(),
  ...serviceApi(),
  ...commonApi(),
  ...shop()
]);
