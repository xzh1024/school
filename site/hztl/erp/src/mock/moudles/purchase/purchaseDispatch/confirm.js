export default [
  {
    module: "erp",
    url: "/purchases/urgent/list/to-confirm/by-bill",
    method: "post",
    open: true,
    data: {
      code: "ok", // ok 表示成功，其他表示错误代码
      message: "success", // 与code对应的描述信息
      data: {
        rows: [
          {
            ids: [
              // 急件ID
              1,
              2
            ],
            sourceBillId: 0, // 来源单ID
            sourceType: "急件订单", // 来源类型
            qty: "5", // 急件需求总数
            remark: "",
            billNo: "22-DSADD-CD-20190509-0001", // 单号
            cooperatorId: 1, // 客户Id
            cooperatorName: "测试人员", // 客户名称
            billDate: "2018-06-29T12:30:00Z", // 单据日期
            businessManId: 1, // 业务员ID
            businessManName: "业务员B", // 业务员名称
            createdBy: 0, // 来源单据制单人ID
            createdByName: "制单人A", // 来源单据制单人
            createdAt: "0001-01-01T00:00:00Z" // 来源单据 制单时间
          },
          {
            ids: [
              // 急件ID
              1
            ],
            sourceBillId: 0, // 来源单ID
            sourceType: "一般订单", // 来源类型
            qty: "5", // 急件需求总数
            remark: "",
            billNo: "22-DSADD-CD-20190509-0003", // 单号
            cooperatorId: 1, // 客户Id
            cooperatorName: "测试人员2", // 客户名称
            billDate: "2018-06-29T12:30:00Z", // 单据日期
            businessManId: 1, // 业务员ID
            businessManName: "业务员A", // 业务员名称
            createdBy: 0, // 来源单据制单人ID
            createdByName: "制单人B", // 来源单据制单人
            createdAt: "0001-01-01T00:00:00Z" // 来源单据 制单时间
          }
        ],
        totalSize: 1,
        totalPage: 1
      }
    }
  },
  {
    module: "erp",
    url: "/purchases/urgent/list/to-confirm/by-bill/detail/\\d+",
    method: "get",
    open: true,
    data: {
      code: "ok", // ok 表示成功，其他表示错误代码
      message: "success", // 与code对应的描述信息
      data: {
        rows: [
          {
            id: 1,
            partId: 5001, // 配件ID
            code: "4F0805605C", // 配件编码（经销商自己的编码）
            name: "大灯支架（左）", // 配件名称（经销商自己的名称）
            productionPlace: "国产", // 产地
            brand: "博世", // 品牌名
            warehouseId: 1, // 仓库ID
            warehouseName: "东门仓库", // 仓库名
            qty: "3", // 数量
            taxedPrice: "268", // 实售价
            remark: "" // 销售出库单 明细备注
          }
        ]
      }
    }
  },
  {
    module: "erp",
    url: " /purchases/urgent/list/to-confirm/by-bill",
    method: "post",
    open: true,
    data: {
      code: "ok", // ok 表示成功，其他表示错误代码
      message: "success", // 与code对应的描述信息
      data: {
        rows: [
          {
            ids: [
              // 急件 id 列表
              2
            ],
            partId: 3001, // 配件ID
            brand: "尖峰", // 品牌名
            code: "06H121026CP", // 配件编码（经销商自己的编码）
            name: "水泵", // 配件名称（经销商自己的名称）
            productionPlace: "德国", // 产地
            warehouseId: 2, // 仓库ID
            warehouseName: "西门仓库", // 仓库名
            qty: "13", // 急件需求总数
            customersCount: 11, // 客户数
            billsCount: 2, // 单据数
            companyDynaQty: "3", // 本店实际可售库存数
            otherCompanyDynaQty: "323", // 它店实际可售库存
            billingQty: "6", // 订单开单数
            transitQty: "3", // 订单在途数
            monthlySaleQty: "2", // 月均销售数
            replacementQty: "1", // 互换库存数
            purchasedQty: "6" // 待采购才会有该字段
          }
        ],
        totalSize: 1,
        totalPage: 1
      }
    }
  },
  {
    module: "erp",
    url: "/purchases/urgent/list/to-confirm/by-bill/detail/\\d+/\\d+",
    method: "get",
    open: true,
    data: {
      code: "ok", // ok 表示成功，其他表示错误代码
      message: "success", // 与code对应的描述信息
      data: {
        rows: [
          {
            id: 1, // 单据ID
            billNo: "22-DSADD-CD-20190509-0001", // 单号
            cooperatorId: 1, // 供应商ID
            cooperatorName: "客户1", // 供应商名
            qty: "6", // 急件需求数
            taxedPrice: "268", // 实售价
            purchasedQty: "6", // 采购数量待采购才会有
            remark: ""
          }
        ]
      }
    }
  }
];
