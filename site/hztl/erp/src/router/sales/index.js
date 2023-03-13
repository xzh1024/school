export default [
  {
    path: "sales",
    name: "销售管理",
    meta: {
      perm: "sales"
    },
    icon: "icon-img-workbench-sales-white",
    icons: "icon-img-workbench-sales-white",
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "销售业务",
        title: "销售业务",
        isTitle: true,
        list: ["快速报价", "客户订单", "销售开单", "销售退货"]
      },
      {
        path: "/SalesQuotationPrice",
        name: "SalesQuotationPrice",
        meta: {
          perm: "sales.quotation.read",
          title: "快速报价",
          tagName: "快速报价"
        },
        component: () =>
          import(/* webpackChunkName: "sales" */ "@/views/sales/quotationPrice")
      },
      {
        path: "/SalesList",
        name: "SalesList",
        meta: {
          perm: "sales.orders",
          hasBelongs: true,
          title: "客户订单",
          tagName: "客户订单列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "sales" */ "@/views/sales/salesList/SalesList"
          )
      },
      {
        path: "/SalesBilling",
        hidden: true,
        name: "SelesBilling",
        meta: {
          selectedPath: "/SalesList",
          perm: "sales.orders",
          hasBelongs: true,
          title: "客户订货开单"
        },
        component: () =>
          import(
            /* webpackChunkName: "sales" */ "@/views/sales/salesList/SalesBilling"
          )
      },
      {
        path: "/SalesOutList",
        name: "SalesOutList",
        meta: {
          perm: "sales.sales",
          hasBelongs: true,
          title: "销售开单",
          tagName: "销售列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "sales" */ "@/views/sales/salesOut/SalesOutList"
          )
      },
      {
        path: "/SalesOutBilling",
        name: "SalesOutBilling",
        hidden: true,
        meta: {
          selectedPath: "/SalesOutList",
          title: "销售开单",
          perm: "sales.sales",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "sales" */ "@/views/sales/salesOut/SalesOutBilling"
          )
      },
      {
        path: "/SalesReturnList",
        name: "SalesReturnList",
        meta: {
          perm: "sales.returns",
          hasBelongs: true,
          title: "销售退货",
          tagName: "销售退货列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "sales" */ "@/views/sales/salesReturn/SalesReturnList"
          )
      },
      {
        path: "/SalesReturnBilling",
        name: "SalesReturnBilling",
        hidden: true,
        meta: {
          title: "销售退货开单",
          selectedPath: "/SalesReturnList",
          perm: "sales.returns",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "sales" */ "@/views/sales/salesReturn/SalesReturnBilling"
          )
      },
      {
        path: "",
        name: "查询业务",
        title: "查询业务",
        isTitle: true,
        list: ["销售查询"]
      },
      {
        path: "/SalesReturnSearch",
        name: "SalesReturnSearch",
        meta: {
          title: "销售查询",
          perm: "sales.salesSearch",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "sales" */ "@/views/sales/sales-return-search"
          )
      },
      {
        path: "",
        name: "价格业务",
        title: "价格业务",
        isTitle: true,
        list: ["售价优先级"],
        meta: {
          perm: "sales.salePriceSettings"
        }
      },
      {
        path: "/SalePriceSettings",
        name: "SalePriceSettings",
        meta: {
          title: "售价优先级",
          perm: "sales.salePriceSettings",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "sales" */ "@/views/sales/sales-price/Sort"
          )
      }
    ]
  }
];
