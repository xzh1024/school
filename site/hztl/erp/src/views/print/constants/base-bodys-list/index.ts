import { orderPlan } from "./orderPlan";
import { orderArrival } from "./orderArrival";
import { dispatchArrival } from "./dispatchArrival";
import { orderReturn } from "./orderReturn";
import { customerOrder } from "./customerOrder";
import { saleOut } from "./saleOut";
import { saleReturn } from "./saleReturn";
import { storeTake } from "./storeTake";
import { storeMove } from "./storeMove";
import { storeRegisterIn } from "./storeRegisterIn";
import { storeRegisterOut } from "./storeRegisterOut";
import { stetementList } from "./stetementList";
import { collectionStetementList } from "./collectionStetementList";
import { transferApply } from "./transferApply";
import { transferOut } from "./transferOut";
import { transferOutReturn } from "./transferOutReturn";
import { transferStorage } from "./transferStorage";
import { transferStorageReturn } from "./transferStorageReturn";
import { transferList } from "./transferList";
import { insurance } from "./insurance";
import { billConfirm } from "./billConfirm";
import { billSettle } from "./billSettle";
import { pick } from "./pick";
import { returnPart } from "./returnPart";
import { partLabel } from "./partLabel";
import { shippingLabel } from "./shippingLabel";

export const BASE_BODYS_LIST = {
  orderPlan: orderPlan,
  orderArrival: orderArrival,
  dispatchArrival: dispatchArrival,
  orderReturn: orderReturn,
  customerOrder: customerOrder,
  saleOut: saleOut,
  saleReturn: saleReturn,
  storeTake: storeTake,
  storeMove: storeMove,
  storeRegisterIn: storeRegisterIn,
  storeRegisterOut: storeRegisterOut,
  stetementList: stetementList,
  collectionStetementList: collectionStetementList,
  transferApply: transferApply,
  transferOut: transferOut,
  transferOutReturn: transferOutReturn,
  transferStorage: transferStorage,
  transferStorageReturn: transferStorageReturn,
  transferList: transferList,
  insurance: insurance,
  billConfirm: billConfirm,
  billSettle: billSettle,
  pick: pick,
  returnPart: returnPart,
  partLabel: partLabel,
  partLabelLate: partLabel,
  shippingLabel: shippingLabel
};
