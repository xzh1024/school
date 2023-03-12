export const INVOICE_TYPE_EMUN = {
    purchase: "采购",
    orderPlan: "订货计划单",
    orderArrival: "采购到货单",
    orderReturn: "采购退货单",
    // dispatchArrival: "急件到货单",
    sale: "销售",
    customerOrder: "客户订单",
    saleOut: "销售开单",
    saleReturn: "销售退货单",
    store: "仓储",
    storeTake: "盘点单",
    storeMove: "移仓单",
    finance: "出纳",
    stetementList: "应收应付对账单",
    collectionStetementList: "代收对账单"
};

export const PRINT_KEY_LIST = Object.keys(INVOICE_TYPE_EMUN).map(key => key);

export const INVOICE_TREE = [
    {
        key: "purchase",
        disabled: true,
        children: [
            {
                key: "orderPlan"
            },
            {
                key: "orderArrival"
            },
            {
                key: "orderReturn"
            }
            // {
            //     key: "dispatchArrival",
            // },
        ]
    },
    {
        key: "sale",
        disabled: true,
        children: [
            {
                key: "customerOrder"
            },
            {
                key: "saleOut"
            },
            {
                key: "saleReturn"
            }
        ]
    },
    {
        key: "store",
        disabled: true,
        children: [
            {
                key: "storeTake"
            },
            {
                key: "storeMove"
            }
        ]
    },
    {
        key: "finance",
        disabled: true,
        children: [
            {
                key: "stetementList"
            },
            {
                key: "collectionStetementList"
            }
        ]
    }
];
