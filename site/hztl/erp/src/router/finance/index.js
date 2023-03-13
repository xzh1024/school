export default [
  {
    path: "financials",
    name: "Financials-next",
    icon: "icon-img-workbench-cashier-white",
    icons: "icon-img-workbench-cashier-white",
    meta: {
      title: "出纳管理",
      perm: "financials"
    },
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "结算中心",
        title: "结算中心",
        isTitle: true,
        list: ["结算中心", "佣金管理", "出纳记账", "预收/预付"]
      },
      {
        path: "/SettleCenter",
        name: "SettleCenterPage",
        meta: {
          title: "结算中心",
          type: "settle",
          perm: "financials.settlements",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/settleCenter"
          )
      },
      {
        path: "/CommissionManage",
        name: "CommissionManage",
        meta: {
          title: "佣金管理",
          perm: "financials.commission",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/CommissionManage"
          )
      },
      {
        path: "/ManualBill",
        name: "ManualBill",
        meta: {
          title: "出纳记账",
          type: "charge",
          perm: "financials.manuls",
          hasBelongs: true
        },
        component: () =>
          import(/* webpackChunkName: "finance" */ "@/views/finance/manualBill")
      },
      {
        path: "/Prepayment",
        name: "PrepaymentPage",
        meta: {
          title: "预收/预付",
          perm: "financials.prevFund",
          hasBelongs: true
        },
        component: () =>
          import(/* webpackChunkName: "finance" */ "@/views/finance/prepayment")
      },
      {
        path: "",
        name: "对账业务",
        title: "对账业务",
        isTitle: true,
        list: ["应收付对账", "调拨对账", "物流代收对账", "收票管理", "开票管理"]
      },
      {
        path: "/PaymentStatement",
        name: "PaymentStatement",
        meta: {
          title: "应收付对账",
          perm: "financials.rBStatements",
          hasBelongs: true,
          type: "statement"
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/payment-statement"
          )
      },
      {
        path: "/TransferStatement",
        name: "TransferStatement",
        meta: {
          title: "调拨对账",
          perm: "financials.alloc",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/transfer-statement"
          )
      },
      {
        path: "/CollectionStatement",
        name: "CollectionStatement",
        meta: {
          title: "物流代收对账",
          perm: "financials.lGStatements",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/collection-statement"
          )
      },
      {
        path: "/ticketManage",
        name: "ticketManage",
        meta: {
          title: "收票管理",
          perm: "financials.invoiceIn",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/ticketManage"
          )
      },
      {
        path: "/invoiceManage",
        name: "invoiceManage",
        meta: {
          title: "开票管理",
          perm: "financials.invoiceIn",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/invoiceManage"
          )
      },
      // {
      //   path: "fees",
      //   name: "fees",
      //   meta: {
      //     title: "费用管理",
      //     perm: "financials.feeMgt",
      //     hasBelongs: true
      //   },
      //   component: () =>
      //     import(/* webpackChunkName: "finance" */ "@/views/finance/Fees")
      // },
      {
        path: "",
        name: "查询业务",
        title: "查询业务",
        isTitle: true,
        list: ["应收应付汇总查询", "物流代收汇总查询", "出纳记账汇总查询"]
      },
      {
        path: "/finance/cash-summary",
        name: "CashSummary",
        meta: {
          title: "应收应付汇总查询",
          perm: "financials.rBSummary",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/cash-summary"
          )
      },
      {
        path: "/finance/collect-summary",
        name: "CollectSummary",
        meta: {
          title: "物流代收汇总查询",
          perm: "financials.lGSummary",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/collect-summary"
          )
      },
      {
        path: "/finance/log",
        name: "ManulSum",
        meta: {
          title: "出纳记账汇总查询",
          perm: "financials.manulsSummary",
          hasBelongs: true
        },
        component: () =>
          import(/* webpackChunkName: "finance" */ "@/views/finance/log")
      },
      {
        path: "",
        name: "出纳设置",
        title: "出纳设置",
        isTitle: true,
        list: ["资金账户设置", "收支类目管理", "财务核算公司设置"]
      },
      {
        path: "/CompanyFundAccounts",
        name: "CompanyFundAccounts",
        meta: {
          title: "资金账户设置",
          perm: "financials.companyFundAccounts",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/company-fund-accounts"
          )
      },
      {
        path: "/FundCategory",
        name: "FundCategory",
        meta: {
          title: "收支类目管理",
          perm: "financials.fundCategory.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/fund-category"
          )
      },
      {
        path: "/CompanySettings",
        name: "CompanySettings",
        meta: {
          title: "财务核算公司设置",
          perm: "financials.companySettings",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "finance" */ "@/views/finance/basicSetting/CompanySettings"
          )
      }
    ]
  }
];
