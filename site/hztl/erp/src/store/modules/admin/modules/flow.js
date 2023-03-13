export default {
  namespaced: true,
  state: {
    /**
     * 是否跳过流程
     * */
    isFlag: true,
    /**
     * 采购开单流程
     * */
    purchaseIn: {
      flowTitle: "采购开单流程",
      flowGroup: [
        {
          id: 3,
          key: 3,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 4,
          key: 4,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 5,
          key: 5,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false,
              chiildItem: [
                {
                  name: "库房审核",
                  isClick: false,
                  Itemactive: false
                },
                {
                  name: "财务审核",
                  isClick: true,
                  Itemactive: true
                }
              ]
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    },
    /**
     * 采购退货流程
     * */
    purchaseOut: {
      flowTitle: "采购退货流程",
      flowGroup: [
        {
          id: 3,
          key: 3,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 4,
          key: 4,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 5,
          key: 5,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false,
              chiildItem: [
                {
                  name: "库房审核",
                  isClick: false,
                  Itemactive: false
                },
                {
                  name: "财务审核",
                  isClick: false,
                  Itemactive: false
                }
              ]
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    },
    /**
     * 销售开单流程
     * */
    marketIn: {
      flowTitle: "销售开单流程",
      flowGroup: [
        {
          id: 3,
          key: 3,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "急件确认",
              isClick: true,
              Itemactive: true
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 4,
          key: 4,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "急件确认",
              isClick: true,
              Itemactive: true
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 5,
          key: 5,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "急件确认",
              isClick: true,
              Itemactive: true
            },
            {
              name: "",
              chiildItem: [
                {
                  name: "库房审核",
                  isClick: false,
                  Itemactive: false
                },
                {
                  name: "财务审核",
                  isClick: false,
                  Itemactive: false
                }
              ]
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    },
    /**
     * 销售退货流程
     * */
    marketOut: {
      flowTitle: "销售退货流程",
      flowGroup: [
        {
          id: 3,
          key: 3,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 4,
          key: 4,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 5,
          key: 5,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false,
              chiildItem: [
                {
                  name: "库房审核",
                  isClick: false,
                  Itemactive: false
                },
                {
                  name: "财务审核",
                  isClick: false,
                  Itemactive: false
                }
              ]
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    },
    /**
     * 盘点
     * */
    checkStore: {
      flowTitle: "盘点",
      flowGroup: [
        {
          id: 4,
          key: 4,
          flowItem: [
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 3,
          key: 3,
          flowItem: [
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "库房审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 5,
          key: 5,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false,
              chiildItem: [
                {
                  name: "库房审核",
                  isClick: false,
                  Itemactive: false
                },
                {
                  name: "财务审核",
                  isClick: false,
                  Itemactive: false
                }
              ]
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 1,
          key: 1,
          flowItem: [
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    },
    /**
     * 预付款
     * */
    financeTo: {
      flowTitle: "预付款付款流程",
      flowGroup: [
        {
          id: 0,
          key: 0,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "申请",
              isClick: false,
              Itemactive: false
            },
            {
              name: "审核",
              isClick: false,
              Itemactive: true
            },
            {
              name: "付款",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 1,
          key: 1,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "申请",
              isClick: false,
              Itemactive: false
            },
            {
              name: "付款",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    },
    /**
     * 预收款
     * */
    financeIn: {
      flowTitle: "预收款收款流程",
      flowGroup: [
        {
          id: 0,
          key: 0,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "申请",
              isClick: false,
              Itemactive: false
            },
            {
              name: "审核",
              isClick: false,
              Itemactive: true
            },
            {
              name: "收款",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 1,
          key: 1,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "申请",
              isClick: false,
              Itemactive: false
            },
            {
              name: "收款",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    },
    /**
     * 紧急处理流程
     * */
    urgentFlow: {
      flowTitle: "急件处理流程",
      flowGroup: [
        {
          id: 0,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "卖急件",
              isClick: false,
              Itemactive: false
            },
            {
              name: "出库审核",
              isClick: false,
              Itemactive: true
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 1,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "卖急件",
              isClick: false,
              Itemactive: false
            },
            {
              name: "审核",
              isClick: false,
              Itemactive: true
            },
            {
              name: "出库审核",
              isClick: false,
              Itemactive: true
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 2,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "买急件",
              isClick: false,
              Itemactive: false
            },
            {
              name: "审核",
              isClick: false,
              Itemactive: true
            },
            {
              name: "出库审核",
              isClick: true,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 3,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "买急件",
              isClick: false,
              Itemactive: false
            },
            {
              name: "审核",
              isClick: true,
              Itemactive: false
            },
            {
              name: "出库审核",
              isClick: true,
              Itemactive: false
            },
            {
              name: "财务审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    },
    /**
     * 客户订单流程
     * */
    marketOrderow: {
      flowTitle: "客户订单流程",
      flowRadio: 0,
      parentId: "11",
      flowGroup: [
        {
          id: 0,
          key: 0,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "审核",
              isClick: false,
              Itemactive: false
            },
            {
              name: "转销售出库单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 1,
          key: 1,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "开单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "审核并自动转销售出库单",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    },
    /**
     *  */
    financeFlow: {
      flowTitle: "出纳管理流程",
      flowGroup: [
        {
          id: 0,
          key: 0,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "提交",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结算",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        },
        {
          id: 1,
          key: 1,
          flowItem: [
            {
              name: "开始",
              isClick: false,
              Itemactive: false
            },
            {
              name: "提交",
              isClick: false,
              Itemactive: false
            },
            {
              name: "确认",
              isClick: false,
              Itemactive: true
            },
            {
              name: "结算",
              isClick: false,
              Itemactive: false
            },
            {
              name: "结束",
              isClick: false,
              Itemactive: false
            }
          ]
        }
      ]
    }
  },
  actions: {
    handleToggle({ state }, val) {
      state.isFlag = val;
    }
  }
};
