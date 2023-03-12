import { getReciveDetail } from "@/api/purchase/purchaseReceive";
import { precisionsFixed } from "@/mixins";
import { add } from "@/utils/numberAPI";

const receiveBillTypeMap = {
  0: "RO",
  1: "RS",
  2: "RA"
};
const deliverBillTypeMap = {
  0: "SO",
  1: "SS",
  2: "SA"
};
export default {
  watch: {},
  mixins: [precisionsFixed],
  data() {
    return {
      settleDialogVisible: false,
      isLogistics: false,
      hasBillInfo: false,
      canSettle: true,
      settleData: {},
      settleList: []
    };
  },
  methods: {
    getRegisterDetail(query) {
      // 查询登记单详情，是否可结算是根据登记单的status !== 4来决定的
      getReciveDetail(query).then(res => {
        // 存在登记单，直接走结算
        // && res.payer == 1
        if (res.id) {
          this.registerId = res.id;
          this.isLogistics = true;
          this.hasBillInfo = true;
          this.settleData = {
            ...res.bill,
            billType: this.isReceive
              ? receiveBillTypeMap[res.bill.payer]
              : deliverBillTypeMap[res.bill.payer],
            billNo: res.bill.freightNo,
            amount: this.precisionFormat(
              add(
                res.bill.freight,
                add(
                  res.bill.packCharges,
                  add(res.bill.insuredCharges, res.bill.otherCharges)
                )
              ),
              "money"
            )
          };
          this.settleList = [
            {
              name: "单号",
              content: res.bill.freightNo
            },
            {
              type: "billType"
            },
            {
              name: "业务公司",
              content: res.bill.companyName || "--"
            },
            {
              name: "往来单位",
              content: res.bill.cooperatorName
            },
            {
              name: "物流公司",
              content: res.bill.logisticsCompanyName
            },
            {
              type: "amount"
            },
            {
              type: "settledAmount"
            },
            // {
            //   type: "discountAmount"
            // },
            {
              type: "unSettledAmount"
            }
          ];
          this.canSettle = res.bill.status === 1;
          this.ruleData = {
            ...res.bill,
            tableData: res.details
          };
          this.showHandleRigisterBox = true;
        } else {
          this.registerId = "";
          this.canSettle = true;
          this.isLogistics = false;
          this.hasBillInfo = false;
          console.log(this.header);
          this.ruleData = {
            ...this.header,
            tableData: [this.header]
          };
          this.showHandleRigisterBox = true;
        }
      });
    },
    settle(query) {
      getReciveDetail(query).then(res => {
        if (res.id) {
          this.registerId = res.id;
          this.isLogistics = true;
          this.hasBillInfo = true;
          this.settleData = {
            ...res.bill,
            billType: this.isReceive
              ? receiveBillTypeMap[res.bill.payer]
              : deliverBillTypeMap[res.bill.payer],
            billNo: res.bill.freightNo,
            amount: this.precisionFormat(
              add(
                res.bill.freight,
                add(
                  res.bill.packCharges,
                  add(res.bill.insuredCharges, res.bill.otherCharges)
                )
              ),
              "money"
            )
          };
          this.settleList = [
            {
              name: "单号",
              content: res.bill.freightNo
            },
            {
              type: "billType"
            },
            {
              name: "业务公司",
              content: res.bill.companyName || "--"
            },
            {
              name: "往来单位",
              content: res.bill.cooperatorName
            },
            {
              name: "物流公司",
              content: res.bill.logisticsCompanyName
            },
            {
              type: "amount"
            },
            {
              type: "settledAmount"
            },
            // {
            //   type: "discountAmount"
            // },
            {
              type: "unSettledAmount"
            }
          ];
          this.settleDialogVisible = true;
        } else {
          this.registerId = res.id;
          this.isLogistics = false;
          this.hasBillInfo = false;
        }
      });
    },
    settleComplete() {
      this.billInfoInit();
    }
  }
};
