<script>
import {
  addPrintCountByType,
  loadPrintDataByType,
  loadPrintTems
} from "@/api/print";
import { getPrintAuth, baseDictionary } from "@/api/base";
import hotkeys from "hotkeys-js";
import { dateFormat } from "@/utils/date";
import { add } from "@/utils/numberAPI";
import { PRINT_LABEL_COMPLETED } from "@/constants";
import { adaptivePrint, selectPrinter } from "./adaptivePrint";
import JsPDF from "jspdf";
import { uiConfig } from "envConfigPath";

import {
  BASE_FILES_LIST,
  DEFAULT_PRINT_TEMS,
  INVOICE_TYPE_EMUN
} from "../constants";

import printSearch from "./search";

/**
 *
 * 根据type值配置，一种单据一个type值，
 * type 需要映射
 *      1、单据名称映射 INVOICE_TYPE_EMUN
 *      2、后端数据接口 loadPrintDataByType
 *      3、默认模版 DEFAULT_PRINT_TEMS
 *      4、备选字段 BASE_FILES_LIST
 *      5、路由
 *
 */
import { selectCooperators } from "@/api/communion/communion";
import { validPhone } from "@/utils/validate";
import { PRINT_LABEL_MAX_EX } from "@/constants";
import { AreaSelect } from "@/components/select";
const defaultFormData = {
  receiver: "",
  receiverName: "",
  receiverPhone: "",
  receiverAreaId: null,
  receiverAreaNames: [],
  receiverAddress: "",
  sender: "",
  senderName: "",
  senderPhone: "",
  senderAreaId: null,
  senderAreaNames: [],
  senderAddress: "",
  name: "", // 商品名称
  pieceQty: 1, // 发货件数
  qty: 1, // 合计数量
  billAmount: 0, // 合计金额
  isCollection: false, // 是否物流代收
  freightPayer: "", // 运费付款方
  logisticsCompanyId: 0, // 物流公司Id
  logisticsCompanyName: "", // 物流公司名称
  freightNo: "",
  remark: ""
};

const formRules = {
  receiver: [{ required: true, message: "请输入单位名称", trigger: "change" }],
  receiverName: [
    { required: true, message: "请输入收货人", trigger: "change" }
  ],
  receiverPhone: [
    { required: true, message: "请输入收货电话", trigger: "change" },
    { validator: validPhone, trigger: "blur" }
  ],
  receiverAreaId: [
    { required: true, message: "请选择收货区域", trigger: "blur" }
  ],
  receiverAddress: [
    { required: true, message: "请输入收货详细地址", trigger: "change" }
  ],
  sender: [{ required: true, message: "请输入单位名称", trigger: "change" }]
};

export default {
  components: { printSearch, AreaSelect },
  data() {
    return {
      uiConfig,
      keyScope: Symbol("print"),
      printType: localStorage.printType || "normal",
      pageLoading: false,
      loading: false,
      adaptivePrintLoading: false,
      selectPrinterLoading: false,
      exportLoading: false,
      selectedRow: null,
      baseFiles: {},
      temsList: [],
      invoiceData: null,
      signPicUrl: "",
      invoiceDataArr: [],
      sort1: {
        key: "",
        type: "asc"
      },
      sort2: {
        key: "",
        type: "asc"
      },
      sort3: {
        key: "",
        type: "asc"
      },
      sortKeyOptions: [],
      sortTypes: [
        {
          id: "asc",
          name: "升序"
        },
        {
          id: "desc",
          name: "降序"
        }
      ],
      formData: { ...defaultFormData },
      transportType: [],
      logisticsOptions: [],
      qrCodeUrl: ""
    };
  },
  computed: {
    temData() {
      if (!this.selectedRow || !this.temsList.length) {
        return {
          type: this.type
        };
      }
      const curSelected = this.temsList.find(
        item => item.id === this.selectedRow.id
      );
      if (this.qrCodeUrl != "") {
        const content = JSON.parse(
          JSON.parse(JSON.stringify(curSelected.content))
        );
        content.invoiceLogo.images?.forEach(item => {
          if (item.type == "barcode") {
            item.path = this.qrCodeUrl;
          }
        });
        curSelected.content = JSON.stringify(content);
      }
      return {
        ...curSelected,
        content: curSelected.content
      };
    },
    invoiceWarpRef() {
      return this.$refs.invoiceWarp;
    },
    formRef() {
      return this.$refs.printForm;
    }
  },
  watch: {
    printType: function(newVal) {
      localStorage.printType = newVal;
    },
    formData: {
      handler(value) {
        value.receiverAreaName =
          value.receiverAreaNames?.length > 0
            ? value.receiverAreaNames.join(" ")
            : "";
        value.senderAreaName =
          value.senderAreaNames?.length > 0
            ? value.senderAreaNames.join(" ")
            : "";
        value.isCollectionStr = value.isCollection ? "是" : "否";
        value.collectionAmount = value.isCollection
          ? value.collectionAmount
          : "";
        this.invoiceDataArr = [];
        const printObj = {};
        if (!parseInt(value.pieceQty) || parseInt(value.pieceQty) == 1) {
          const item = JSON.parse(JSON.stringify(value));
          item.countIndex = 1;
          printObj[0] = item;
        }
        if (parseInt(value.pieceQty) > 1) {
          for (let i = 0; i < parseInt(value.pieceQty); i++) {
            const item = JSON.parse(JSON.stringify(value));
            item.countIndex = `${i + 1}/${item.pieceQty}`;
            printObj[i] = item;
          }
        }
        for (const key in printObj) {
          this.invoiceDataArr.push(printObj[key]);
        }
      },
      deep: true
    }
  },
  created() {
    if (window.printData.type === "shippingLabel") {
      this.getShippingLabelInit();
    }
  },
  mounted() {
    window.addEventListener("afterprint", this.onAfterprint);
    this.bindKeyboard();
    hotkeys.setScope(this.keyScope);
    this.getBaseFiles();
    this.loadTemsList();
  },
  destroyed() {
    window.removeEventListener("afterprint", this.onAfterprint);
  },
  methods: {
    getShippingLabelInit() {
      // 物流公司
      selectCooperators({ type: "logistics" }).then(res => {
        const options = res || [];
        const arr = options.map(item => ({
          ...item,
          value: item.name,
          id: item.name
        }));
        this.logisticsOptions = arr || [];
      });
      //  运输方式
      baseDictionary({
        type: "transportType"
      }).then(res => {
        const options = res.options || [];
        const arr = options.map(item => ({
          ...item,
          value: item.name,
          id: item.name
        }));
        this.transportType = arr || [];
      });
    },
    adaptivePrint() {
      this.adaptivePrintLoading = true;
      adaptivePrint(
        window.printData.name,
        document.querySelector(".invoice-warp").offsetHeight,
        getPrintAuth
      )
        .then(this.addPrintCount)
        .finally(() => {
          this.adaptivePrintLoading = false;
        });
    },
    selectPrinter() {
      this.selectPrinterLoading = true;
      selectPrinter(
        window.printData.name,
        document.querySelector(".invoice-warp").offsetHeight,
        getPrintAuth
      )
        .then(this.addPrintCount)
        .finally(() => {
          this.selectPrinterLoading = false;
        });
    },
    addPrintCount(printed) {
      if (printed) {
        addPrintCountByType(window.printData.type, window.printData.id).then(
          () => {
            this.invoiceData.header.printCount++;
          }
        );
        window.open("about:blank", "_self").close();
      }
    },
    print() {
      let sl = false;
      if (window.printData.type == "shippingLabel") {
        this.formRef.validate(valid => {
          if (valid) {
            sl = false;
          } else {
            this.$message({
              showClose: true,
              message: "请检查必填项！",
              type: "error",
              customClass: "no-print"
            });
            sl = true;
          }
        });
      }
      if (this.loading || sl) {
        return;
      }
      this.loading = true;
      this.setPrintView();
      addPrintCountByType(window.printData.type, window.printData.id)
        .then(res => {
          if (!["partLabel", "partLabelLate", "shippingLabel"].includes(res)) {
            this.invoiceData.header.printCount++;
          }
          this.$nextTick(() => {
            window.print();
            if (this.isLabel() && !this.isLabelLate()) {
              return;
            }
            window.open("about:blank", "_self").close();
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    exportPng() {
      if (this.loading || this.exportLoading) {
        return;
      }
      this.exportLoading = true;
      this.$html2canvas(
        this.invoiceWarpRef.querySelector(".ht-invoice-tem-warp"),
        {
          scale: 2,
          dpi: 144
        }
      )
        .then(canvas => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL();
          link.setAttribute(
            "download",
            `${this.invoiceData.header.companyName}${
              INVOICE_TYPE_EMUN[window.printData.type]
            }${dateFormat(new Date())}`
          );
          link.style.display = "none";
          link.click();
        })
        .catch(() => {})
        .finally(() => {
          this.exportLoading = false;
        });
    },
    exportPDF() {
      if (this.loading || this.exportLoading) {
        return;
      }
      this.exportLoading = true;
      this.$html2canvas(
        this.invoiceWarpRef.querySelector(".ht-invoice-tem-warp"),
        {
          scale: 2,
          dpi: 144
        }
      )
        .then(canvas => {
          const contentWidth = canvas.width;
          const contentHeight = canvas.height;
          //一页pdf显示html页面生成的canvas高度;
          const pageHeight = (contentWidth / 592.28) * 841.89; // 这样写的目的在于保持宽高比例一致 pageHeight/canvas.width = a4纸高度/a4纸宽度// 宽度和canvas.width保持一致
          //未生成pdf的html页面高度
          let leftHeight = contentHeight;
          //页面偏移
          let position = 0;
          //a4纸的尺寸[595.28,841.89],单位像素，html页面生成的canvas在pdf中图片的宽高
          const imgWidth = 595.28;
          const imgHeight = (595.28 / contentWidth) * contentHeight;
          const pageData = canvas.toDataURL("image/jpeg", 1.0);
          const pdf = new JsPDF("", "pt", "a4");
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            pdf.addImage(pageData, "JPEG", 5, 0, imgWidth, imgHeight);
            // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
          } else {
            // 分页
            while (leftHeight > 0) {
              pdf.addImage(pageData, "JPEG", 5, position, imgWidth, imgHeight);
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          pdf.save(
            `${this.invoiceData.header.companyName}${
              INVOICE_TYPE_EMUN[window.printData.type]
            }${dateFormat(new Date())}` + ".pdf"
          );
        })
        .catch(() => {})
        .finally(() => {
          this.exportLoading = false;
        });
    },
    bindKeyboard() {
      hotkeys("f11,up,down,esc", { scope: this.keyScope }, (e, handler) => {
        switch (handler.key) {
          case "f11":
            if (this.printType == "adaptive") this.adaptivePrint();
            else this.print();
            break;
          case "esc":
            window.open("about:blank", "_self").close();
            break;
          case "up":
          case "down":
            e.preventDefault();
            this.changeSelected(handler.key);
            break;
          default:
        }
      });
    },
    changeSelected(type) {
      if (this.selectedRow) {
        let selectedIndex = this.temsList.findIndex(
          item => item === this.selectedRow
        );
        if (type === "up") {
          selectedIndex--;
        } else {
          selectedIndex++;
        }
        if (selectedIndex < 0) {
          selectedIndex = this.temsList.length - 1;
        } else if (selectedIndex >= this.temsList.length) {
          selectedIndex = 0;
        }
        this.selectedRow = this.temsList[selectedIndex];
      } else if (this.temsList.length) {
        this.selectedRow = this.temsList[0];
      }
    },
    getBaseFiles() {
      this.baseFiles =
        BASE_FILES_LIST.find(item => item.type == window.printData.type) || {};
    },
    loadTemsList() {
      this.loading = true;
      let type = window.printData.type;
      if (type === "partLabelLate") {
        type = "partLabel";
      }
      loadPrintTems({ type })
        .then(res => {
          // 拼接内置数据，默认项如果不是后端存储数据则为本地内置数据
          const hasDefault = !!res.find(item => item.isDefault);
          const defaultTem = DEFAULT_PRINT_TEMS.find(
            item => item.type === window.printData.type
          );
          // console.log(defaultTem);
          this.temsList = [
            {
              ...defaultTem,
              isDefault: !hasDefault
            },
            ...res
          ];

          // 设置默认选中项，默认从上次的选项中判断id，如果无，则选中默认项
          if (this.selectedRow) {
            this.selectedRow = this.temsList.find(
              item => item.id === this.selectedRow.id
            );
          }
          if (!this.selectedRow) {
            this.selectedRow = this.temsList.find(item => item.isDefault);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handlerSelectedChange(data) {
      this.selectedRow = data;
    },
    loadData(sort = "", neg = false) {
      // console.log(window.printData);
      this.pageLoading = true;
      if (window.printData.type === "shippingLabel") {
        sort = window.printData.params; // 发货单 sort字段代表发货单的类型
      }
      loadPrintDataByType(window.printData.type, window.printData.id, sort, neg)
        .then(res => {
          // console.log(res);
          this.invoiceDataArr = [];
          this.invoiceData = null;
          if (this.isLabel() && !this.isShippingLabel()) {
            const printObj = {};
            if (this.isLabelLate()) {
              const printLabelLateInfo = this.getPrintLabelLateInfo();
              const totalIndex = printLabelLateInfo?.totalIndex || 0;
              const startIndex = printLabelLateInfo?.startIndex || 0;
              const printCount = printLabelLateInfo?.printCount || 0;
              for (let i = 0; i < printCount; i++) {
                if (printObj[0]?.length) {
                  printObj[0].push({
                    ...res,
                    countIndex: `${i + startIndex}/${totalIndex}`
                  });
                } else {
                  printObj[0] = [
                    {
                      ...res,
                      countIndex: `${i + startIndex}/${totalIndex}`
                    }
                  ];
                }
              }
            } else {
              if (res?.length) {
                res.forEach((part, index) => {
                  const printLabelCountMap = this.getPrintLabelCountMap();
                  const totalIndex = Number(part.qty || 0);
                  const startIndex = add(part.labelPrintCount, 1);
                  const printCount =
                    printLabelCountMap && printLabelCountMap[part.id]
                      ? printLabelCountMap[part.id]
                      : 0;
                  for (let i = 0; i < printCount; i++) {
                    if (printObj[index]?.length) {
                      printObj[index].push({
                        ...part,
                        countIndex: `${i + startIndex}/${totalIndex}`
                      });
                    } else {
                      printObj[index] = [
                        {
                          ...part,
                          countIndex: `${i + startIndex}/${totalIndex}`
                        }
                      ];
                    }
                  }
                });
              }
            }
            for (const key in printObj) {
              this.invoiceDataArr.push(...printObj[key]);
            }
          } else {
            this.qrCodeUrl = "";
            switch (window.printData.type) {
              case "insurance":
                this.invoiceData = {
                  header: {
                    ...res.cooperatorInfo,
                    ...res.insuranceInfo,
                    ...res.vehicleInfo,
                    deductionRateLabel: res.insuranceInfo.deductionRate
                      ? `${res.insuranceInfo.deductionRate * 100}%`
                      : ""
                  },
                  item: res.item ? [...res.item] : [],
                  parts: res.parts ? [...res.parts] : []
                };
                break;
              case "billConfirm":
                this.invoiceData = this.formatterBillData(res, true);
                break;
              case "billSettle":
                this.invoiceData = this.formatterBillData(res, false);
                break;
              case "pick":
                this.invoiceData = {
                  header: { ...res },
                  details: res.details
                };
                break;
              case "returnPart":
                this.invoiceData = {
                  header: { ...res },
                  details: res.details
                };
                break;
              case "shippingLabel":
                res.companyName = res.senderName || "";
                this.formData = { ...res } || { ...defaultFormData };
                break;
              case "saleOut":
                this.qrCodeUrl = res.qrCodeUrl;
                this.invoiceData = res;
                break;
              default:
                this.invoiceData = res;
                break;
            }
          }
        })
        .finally(() => {
          this.pageLoading = false;
        });
    },
    onAreaChange(areaId, areas, type) {
      switch (type) {
        case "receiver":
          this.formData.receiverAreaNames = areas.map(item => item.label || "");
          break;
        case "sender":
          this.formData.senderAreaNames = areas.map(item => item.label || "");
          break;
        default:
          break;
      }
    },
    onSendPackagesBlur() {
      if (!this.formData.nums) {
        this.formData.nums = 1;
      }
    },
    formatterBillData(data, isQueto) {
      let header = {
        ...data.bill,
        ...data.bill.vehicle,
        mileageLabel: data.bill.mileage + "km",
        totalAmount: data.billConfirm.totalAmount,
        amount: data.billConfirm.amount
      };
      const {
        memberDiscountName,
        memberDiscountPart,
        memberDiscountItem,
        memberDiscountSet
      } = data.bill;
      if (isQueto) {
        if (data.bill && data.bill.hasCustomerOffer) {
          this.signPicUrl = data.bill.customerOfferUrl.zysc;
        }
      } else {
        if (data.bill && data.bill.customerSettleUrl) {
          this.signPicUrl = data.bill.customerSettleUrl.zysc;
        }
      }
      if (memberDiscountName != "") {
        const discountFullLabel = `${memberDiscountName}${
          memberDiscountItem
            ? "（服务项目" + Number(memberDiscountItem * 10).toFixed(2) + "折）"
            : ""
        }${
          memberDiscountSet
            ? "（服务套餐" + Number(memberDiscountSet * 10).toFixed(2) + "折）"
            : ""
        }${
          memberDiscountPart
            ? "（配件" + Number(memberDiscountPart * 10).toFixed(2) + "折）"
            : ""
        }`;
        header = {
          ...header,
          discountFullLabel
        };
      }
      const item = data.billConfirm.item.rows ? data.billConfirm.item.rows : [];
      const part = data.billConfirm.part.rows ? data.billConfirm.part.rows : [];
      const extraFee = data.billConfirm.extraFee.rows
        ? data.billConfirm.extraFee.rows
        : [];
      return {
        header,
        item,
        part,
        extraFee
      };
    },
    isLabel() {
      return ["partLabel", "partLabelLate", "shippingLabel"].includes(
        window.printData.type
      );
    },
    isShippingLabel() {
      return window.printData.type === "shippingLabel";
    },
    isLabelLate() {
      return window.printData.type === "partLabelLate";
    },
    getPrintLabelCountMap() {
      let printLabelCountMap = null;
      try {
        if (localStorage.printLabelCountMap) {
          printLabelCountMap = JSON.parse(
            localStorage.getItem("printLabelCountMap")
          );
        }
      } catch (e) {
        console.log(e);
      }
      return printLabelCountMap;
    },
    getPrintLabelLateInfo() {
      let printLabelLateInfo = null;
      try {
        if (localStorage.printLabelLateInfo) {
          printLabelLateInfo = JSON.parse(
            localStorage.getItem("printLabelLateInfo")
          );
        }
      } catch (e) {
        console.log(e);
      }
      return printLabelLateInfo;
    },
    onAfterprint() {
      if (this.isLabel() || this.isShippingLabel()) {
        if (!this.isLabelLate()) {
          this.$msgbox({
            title: "打印结果确认",
            message:
              "由于系统需要记录标签已打印数量，\n 请您确认打印机是否正常打印？",
            showCancelButton: true,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            showClose: false,
            confirmButtonText: "正常",
            cancelButtonText: "未打印"
          })
            .then(() => {
              this.onPostMessage();
              window.open("about:blank", "_self").close();
            })
            .catch(() => {
              window.open("about:blank", "_self").close();
            });
        } else {
          window.open("about:blank", "_self").close();
        }
      }
    },
    onPostMessage() {
      const targetWindow = window.opener;
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:8091";
      } else {
        url = `https://${window.location.host}`;
      }
      targetWindow.postMessage(PRINT_LABEL_COMPLETED, url);
    },
    setPrintView() {
      const style = document.createElement("style");
      if (this.isLabel() || this.isShippingLabel()) {
        const isMac = navigator.platform.includes("Mac");
        const warp = document.getElementsByClassName(
          "ht-invoice-warp-is-lable"
        )[0];
        const clientHeight = warp?.clientHeight || 0;
        const htInvoiceWarpIsLable = `{ height: calc(${clientHeight}px - ${
          isMac ? 2 : 0
        }px) !important; }`;
        style.innerText = `@media print { @page { margin: 0; } .ht-invoice-warp-is-lable ${htInvoiceWarpIsLable} }`;
      } else {
        style.innerText = "@media print { @page { margin: 12pt 0; } }";
      }
      document.head.append(style);
    }
  },
  render() {
    return (
      <div id="app" class="print-container" v-loading={this.pageLoading}>
        {this.isShippingLabel() ? (
          <div class="no-print shipping-form-box">
            <div class="flex-block-bg flex-block-padding auto-block flex-container column-flex print-content-block">
              <div class="ht-page-title page-title-divider">打印内容设置</div>
              <div class="auto-block">
                <el-form
                  ref="printForm"
                  attrs={{
                    model: this.formData,
                    rules: formRules,
                    "show-message": false
                  }}
                  label-position="left"
                  label-width="85px"
                  size="mini"
                  class="shipping-form"
                >
                  <div class="item-title">收件人信息</div>
                  <el-form-item label="单位名称" prop="receiver">
                    <ht-input
                      v-model={this.formData.receiver}
                      placeholder={formRules.receiver[0].message}
                    />
                  </el-form-item>
                  <el-row gutter={10}>
                    <el-col span={12}>
                      <el-form-item label="收货人" prop="receiverName">
                        <ht-input
                          v-model={this.formData.receiverName}
                          placeholder={formRules.receiverName[0].message}
                        />
                      </el-form-item>
                    </el-col>
                    <el-col span={12}>
                      <el-form-item label="收货电话" prop="receiverPhone">
                        <ht-input
                          v-model={this.formData.receiverPhone}
                          placeholder={formRules.receiverPhone[0].message}
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="收货地址" prop="receiverAreaId">
                    <AreaSelect
                      style="width: 100%"
                      v-model={this.formData.receiverAreaId}
                      placeholder={formRules.receiverAreaId[0].message}
                      on-change={(areaId, areas) =>
                        this.onAreaChange(areaId, areas, "receiver")
                      }
                    />
                  </el-form-item>
                  <el-form-item label="" prop="receiverAddress">
                    <ht-input
                      v-model={this.formData.receiverAddress}
                      placeholder={formRules.receiverAddress[0].message}
                    />
                  </el-form-item>

                  <div class="item-title">寄件人信息</div>
                  <el-form-item label="单位名称" prop="sender">
                    <ht-input
                      v-model={this.formData.sender}
                      placeholder={formRules.sender[0].message}
                    />
                  </el-form-item>
                  <el-row gutter={10}>
                    <el-col span={12}>
                      <el-form-item label="发货人">
                        <ht-input
                          v-model={this.formData.senderName}
                          placeholder="请输入发货人"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col span={12}>
                      <el-form-item label="发货电话">
                        <ht-input
                          v-model={this.formData.senderPhone}
                          placeholder="请输入发货电话"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="发货地址">
                    <AreaSelect
                      style="width: 100%"
                      v-model={this.formData.senderAreaId}
                      clearable
                      placeholder="请输入发货区域"
                      on-change={(areaId, areas) =>
                        this.onAreaChange(areaId, areas, "sender")
                      }
                    />
                  </el-form-item>
                  <el-form-item label="">
                    <ht-input
                      v-model={this.formData.senderAddress}
                      placeholder="请输入发货详细地址"
                    />
                  </el-form-item>

                  <div class="item-title">发货商品及物流信息</div>
                  <el-form-item label="商品名称">
                    <ht-input
                      v-model={this.formData.name}
                      placeholder="请输入商品名称"
                    />
                  </el-form-item>
                  <el-row gutter={10}>
                    <el-col span={12}>
                      <el-form-item label="发货件数">
                        <HtFormatNumber
                          v-model={this.formData.pieceQty}
                          min={1}
                          max={PRINT_LABEL_MAX_EX}
                          placeholder="请输入发货件数"
                          on-blur={this.onSendPackagesBlur}
                        />
                      </el-form-item>
                    </el-col>
                    <el-col span={12}>
                      <el-form-item label="合计数量">
                        <HtFormatNumber
                          v-model={this.formData.qty}
                          min={1}
                          precision-type="qty"
                          placeholder="请输入合计数量"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row gutter={10}>
                    <el-col span={12}>
                      <el-form-item label="合计金额">
                        <HtFormatNumber
                          v-model={this.formData.billAmount}
                          min={0}
                          precision-type="money"
                          placeholder="请输入合计金额"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col span={8}>
                      <el-form-item label="代收金额">
                        <HtFormatNumber
                          v-model={this.formData.collectionAmount}
                          min={0}
                          precision-type="money"
                          placeholder="请输入代收金额"
                          disabled={!this.formData.isCollection}
                        />
                      </el-form-item>
                    </el-col>
                    <el-col span={4}>
                      <el-checkbox
                        style="margin-top:6px"
                        v-model={this.formData.isCollection}
                      >
                        代收
                      </el-checkbox>
                    </el-col>
                  </el-row>
                  <el-form-item label="运费付款方">
                    <el-radio-group
                      v-model={this.formData.freightPayer}
                      size="mini"
                    >
                      <el-radio border label="对付"></el-radio>
                      <el-radio border label="自付"></el-radio>
                      <el-radio border label="垫付"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="运输方式">
                    <ht-select
                      v-model={this.formData.transportMethod}
                      options={this.transportType}
                      filterable
                      placeholder="请选择"
                      style="width: 100%;"
                    />
                  </el-form-item>
                  <el-form-item label="物流公司">
                    <ht-select
                      v-model={this.formData.logisticsCompanyName}
                      options={this.logisticsOptions}
                      filterable
                      placeholder="请选择"
                      style="width: 100%;"
                    />
                  </el-form-item>
                  <el-form-item label="货运单号">
                    <ht-input
                      v-model={this.formData.freightNo}
                      placeholder="请输入货运单号"
                    />
                  </el-form-item>
                  <div class="item-title">备注信息</div>
                  <el-form-item label="备注">
                    <ht-input
                      v-model={this.formData.remark}
                      placeholder="请输入备注"
                    />
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        ) : null}
        <div
          class={
            this.isLabel()
              ? this.isShippingLabel()
                ? "invoice-warp-label invoice-warp-shipping-label"
                : "invoice-warp-label"
              : "invoice-warp"
          }
          ref="invoiceWarp"
        >
          <printSearch
            class="no-print"
            template={this.selectedRow}
            onLoadData={this.loadData}
            billType={window.printData.type}
            isLabel={this.isLabel()}
          ></printSearch>
          {this.isLabel() ? (
            this.isShippingLabel() ? (
              this.invoiceDataArr.map(item => (
                <div>
                  <HtTemInvoice
                    class="invoice-container-label invoice-container-shipping-label tem-box"
                    invoiceData={{ header: item }}
                    typeEmun={INVOICE_TYPE_EMUN}
                    temData={this.temData}
                    baseFiles={this.baseFiles}
                    isLabel
                    isShippingLabel
                  />
                  <div class="no-print" style="width:100%;height:2mm"></div>
                </div>
              ))
            ) : (
              this.invoiceDataArr.map(item => (
                <HtTemInvoice
                  class="invoice-container-label tem-box"
                  invoiceData={{ header: item }}
                  typeEmun={INVOICE_TYPE_EMUN}
                  temData={this.temData}
                  baseFiles={this.baseFiles}
                  isLabel
                />
              ))
            )
          ) : (
            <HtTemInvoice
              class="invoice-container tem-box"
              invoiceData={this.invoiceData}
              signPicUrl={this.signPicUrl}
              customerFooter={this.uiConfig ? this.uiConfig.appName : null}
              typeEmun={INVOICE_TYPE_EMUN}
              temData={this.temData}
              baseFiles={this.baseFiles}
            />
          )}
        </div>
        <div class="tem-control-box">
          <div class="tem-control" v-loading={this.loading}>
            <div class="tem-list-box">
              <div class="title">选择打印模板</div>
              <ul class="tem-list">
                {this.temsList.map(item => (
                  <li
                    class={this.selectedRow === item ? "active" : ""}
                    on-click={() => this.handlerSelectedChange(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div class="btn-group">
              <div style="width: 165px;">
                <div style="margin-bottom: 15px; height: 28px; line-height: 28px;">
                  {this.isLabel() || (
                    <el-radio
                      v-model={this.printType}
                      label="adaptive"
                      style="margin-right: 5px;"
                    >
                      自适应打印
                    </el-radio>
                  )}
                  {this.isLabel() || (
                    <el-radio v-model={this.printType} label="normal">
                      普通打印
                    </el-radio>
                  )}
                </div>
                {this.printType == "adaptive" ? (
                  <div>
                    <el-button
                      on-click={() => this.adaptivePrint()}
                      loading={this.adaptivePrintLoading}
                      size="mini"
                      type="primary"
                      style="width: 130px; border-radius: 6px 0 0 6px;"
                    >
                      打印（F11）
                    </el-button>
                    <el-button
                      on-click={this.selectPrinter}
                      loading={this.selectPrinterLoading}
                      size="mini"
                      type="primary"
                      style="width: 30px; border-radius: 0 6px 6px 0; margin-left: 1px; padding: 7px 0;"
                    >
                      <i class="el-icon-setting"></i>
                    </el-button>
                  </div>
                ) : (
                  <el-button
                    on-click={() => this.print()}
                    loading={this.loading}
                    size="mini"
                    type="primary"
                    style="width: 160px;"
                  >
                    打印（F11）
                  </el-button>
                )}
              </div>

              <div style="width: 100px;">
                {this.isLabel() || (
                  <el-button
                    on-click={this.exportPDF}
                    loading={this.loading || this.exportLoading}
                    size="mini"
                    type="primary"
                    style="width: 100px; margin-bottom: 15px;"
                  >
                    导出PDF
                  </el-button>
                )}
                {this.isLabel() || (
                  <el-button
                    on-click={this.exportPng}
                    loading={this.loading || this.exportLoading}
                    size="mini"
                    type="primary"
                    style="width: 100px; margin-bottom: 15px;"
                  >
                    导出图片
                  </el-button>
                )}
                <el-button
                  on-click={window.close}
                  size="mini"
                  type="primary"
                  style="width: 100px"
                >
                  退出（Esc）
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
</script>
<style lang="scss">
@import "@/assets/css/var";

#qimo_chatpup,
#chatBtn,
#qimo_showNewMsg,
#qimo_inviteBox,
#qimo_screenpop,
#qimo_videopup {
  display: none !important;
}

// 原生打印功能样式处理
@media print {
  #app {
    height: auto !important;
  }

  .print-container,
  .invoice-warp-label,
  .invoice-container-label,
  .invoice-warp-shipping-label,
  .ht-invoice-warp-is-lable {
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden !important;
    overflow-y: hidden !important;
  }

  .invoice-warp,
  .invoice-warp-label {
    width: 100% !important;
    float: static;
  }
  .invoice-warp-shipping-label {
    width: 100% !important;
    float: static;
    background: #fff !important;
  }
  .tem-control {
    display: none !important;
  }

  .ht-invoice-warp-is-lable {
    margin-left: 2mm !important;
  }
  .invoice-container-shipping-label {
    // margin-bottom: 0mm !important;
  }
  .tem-control-box {
    display: none !important;
  }

  .no-print {
    display: none;
  }
}

.print-container {
  padding: 5px;
  min-height: 100%;
  background-color: #fff;
  overflow-x: auto;
  border: none;

  .print-img {
    display: block;
    margin: auto;
  }
  .ht-invoice-logo .invoice-img {
    border: 0;
  }
}

.invoice-warp,
.invoice-warp-label {
  float: left;
  width: calc(100% - 345px);
  background-color: #fff;
  overflow-x: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.invoice-warp-shipping-label {
  float: left;
  width: 500px;
  // height: calc(100vh - 10px);
  min-height: calc(100vh - 10px);
  margin-left: calc(100% - 845px);
  padding: 10px 0;
  background: rgb(51, 51, 51);
}
.invoice-container-shipping-label {
  // margin-bottom: 2mm !important;
}
.shipping-form-box {
  position: fixed;
  left: 0;
  top: 0;
  width: calc(100% - 845px);
  height: 100vh;
  padding: 20px 40px;
  overflow-y: auto;
  .shipping-form {
    .el-form-item--mini.el-form-item {
      margin-bottom: 3px;
    }
    .item-title {
      margin-top: 10px;
    }
    .el-radio {
      margin-right: 0;
    }
  }
}

.invoice-container,
.invoice-container-label {
  padding-bottom: 0;
}
.invoice-container table tr,
.invoice-container table tr td,
.invoice-container table tr th {
  page-break-inside: avoid;
}

.tem-control-box {
  width: 345px;
  height: 100%;
}

.tem-control {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  box-sizing: border-box;
  width: 345px;
  padding: 10px;
  background-color: #e8ebee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .tem-list-box {
    height: calc(100% - 80px);
    overflow: auto;

    .tem-list {
      background-color: #fff;
      border: 1px solid $border-color-light;
      padding: 0;

      li {
        cursor: pointer;
        padding: 0 5px;
        list-style: none;
      }

      li.active {
        background-color: $color-bg-primary;
        @include background_color("color-bg-primary");
        color: #fff;
      }
    }
  }

  .btn-group {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    align-content: space-evenly;
  }
  .btn-group button {
    margin: 0;
  }
  .el-radio__label {
    padding-left: 2px;
  }
}
</style>
