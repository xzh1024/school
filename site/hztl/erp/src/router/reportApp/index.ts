// 系统管理路由
export default [
  {
    name: "Basics-next",
    path: "/report",
    icon: "icon-img-workbench-report-white",
    icons: "icon-img-workbench-report-white",
    redirect: "/basics/definition",
    meta: {
      title: "统计",
      perm: "reports"
    },
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "业务报表",
        title: "业务报表",
        isTitle: true,
        list: ["采购报表", "销售报表", "仓储报表", "财务报表", "日经营报表"]
      },
      {
        path: "purchaseReportPanel",
        name: "purchaseReportPanel",
        meta: {
          title: "采购报表",
          perm: "reports.purchase",
          tags: [
            "dataOverviewBoard",
            "purchaseDetailReports",
            "supplierSupplyReports"
          ],
          defaultTag: "dataOverviewBoard",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/purchaseReport/reportPanel"
          )
      },
      {
        path: "purchaseReportList",
        name: "purchaseReportList",
        hidden: true,
        meta: {
          title: "采购明细报表",
          perm: "reports.purchase.purchaseDetailReports",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/purchaseReport/reportList"
          )
      },
      {
        path: "supplierReportList",
        name: "supplierReportList",
        hidden: true,
        meta: {
          title: "供应商供货报表",
          perm: "reports.purchase.supplierSupplyReports",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/supplierReport/reportList"
          )
      },
      {
        path: "salesReportPanel",
        name: "salesReportPanel",
        meta: {
          title: "销售报表",
          perm: "reports.sale",
          tags: [
            "dataOverviewBoard",
            "saleDetailReports",
            "customerSalesGrowthReport"
          ],
          defaultTag: "dataOverviewBoard",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/salesReport/reportPanel"
          )
      },
      {
        path: "salesReportList",
        name: "salesReportList",
        hidden: true,
        meta: {
          title: "销售明细报表",
          perm: "reports.sale.saleDetailReports",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/salesReport/reportList"
          )
      },
      {
        path: "customerAmpList",
        name: "customerAmpList",
        hidden: true,
        meta: {
          title: "客户增幅报表",
          perm: "reports.sale.customerSalesGrowthReport",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/customerAmp/reportList"
          )
      },
      {
        path: "storeReportPanel",
        name: "storeReportPanel",
        meta: {
          title: "仓储报表",
          perm: "reports.storage",
          tags: [
            "dataOverviewBoard",
            "stockInOutDetailReports",
            "overstockedGoodsReports",
            "unsalableGoodsReports"
          ],
          defaultTag: "dataOverviewBoard",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/storeReport/reportPanel"
          )
      },
      {
        path: "storeReportList",
        name: "storeReportList",
        hidden: true,
        meta: {
          title: "出入库明细报表",
          perm: "reports.storage.stockInOutDetailReports",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/storeReport/reportList"
          )
      },
      {
        path: "overstockReportList",
        name: "overstockReportList",
        hidden: true,
        meta: {
          title: "超储商品报表",
          perm: "reports.storage.overstockedGoodsReports",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/overstockReportList/reportList"
          )
      },
      {
        path: "unsalableList",
        name: "unsalableList",
        hidden: true,
        meta: {
          title: "滞销商品报表",
          perm: "reports.storage.unsalableGoodsReports",
          hasBelongs: true,
          exchangeBelongs: {
            currentBelongs: ["byOur"],
            newBelongs: "rests"
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/unsalableList/reportList"
          )
      },
      {
        path: "financeReportPanel",
        name: "financeReportPanel",
        meta: {
          title: "财务报表",
          perm: "reports.finalcial",
          tags: ["dataOverviewBoard", "salesCollectionRateReports"],
          defaultTag: "dataOverviewBoard",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/financeReport/reportPanel"
          )
      },
      {
        path: "financeReportList",
        name: "financeReportList",
        hidden: true,
        meta: {
          title: "销售回款率报表",
          perm: "reports.finalcial.salesCollectionRateReports",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/financeReport/reportList"
          )
      },
      {
        path: "dailyManageReport",
        name: "dailyManageReport",
        meta: {
          title: "日经营报表",
          perm: "reports.business",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "main" */ "@/views/report/dailyManageReport/index"
          )
      }
    ]
  }
];
