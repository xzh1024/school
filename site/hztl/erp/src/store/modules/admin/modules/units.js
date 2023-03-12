export default {
  namespaced: true,
  state: {
    /**
     * 客户类型配置
     *  */
    tabs: [],
    type: "",
    defaultTabs: {
      customer: [
        { name: "基本信息", tabId: "BaseInformation" },
        { name: "联系方式", tabId: "ContactInformation" },
        { name: "分公司/业务员权限", tabId: "Permission" },
        { name: "客户设置", tabId: "AdvancedInfo" }
      ],
      supplier: [
        { name: "基本信息", tabId: "BaseInformation" },
        { name: "联系方式", tabId: "ContactInformation" },
        { name: "分公司/业务员权限", tabId: "Permission" },
        { name: "供应商设置", tabId: "SupplierTab" }
      ],
      storage: [
        { name: "基本信息", tabId: "BaseInformation" },
        { name: "联系方式", tabId: "ContactInformation" }
      ],
      logistics: [
        { name: "基本信息", tabId: "BaseInformation" },
        { name: "联系方式", tabId: "ContactInformation" },
        { name: "物流公司设置", tabId: "Logistics" }
      ],
      basic: [{ name: "基本信息", tabId: "BaseInformation" }],
      customerAndSupplier: [
        { name: "基本信息", tabId: "BaseInformation" },
        { name: "联系方式", tabId: "ContactInformation" },
        { name: "分公司/业务员权限", tabId: "Permission" },
        { name: "客户设置", tabId: "AdvancedInfo" },
        { name: "供应商设置", tabId: "SupplierTab" }
      ],
      customerAndLogistics: [
        { name: "基本信息", tabId: "BaseInformation" },
        { name: "联系方式", tabId: "ContactInformation" },
        { name: "分公司/业务员权限", tabId: "Permission" },
        { name: "客户设置", tabId: "AdvancedInfo" },
        { name: "物流公司设置", tabId: "Logistics" }
      ],
      all: [
        { name: "基本信息", tabId: "BaseInformation" },
        { name: "联系方式", tabId: "ContactInformation" },
        { name: "分公司/业务员权限", tabId: "Permission" },
        { name: "客户设置", tabId: "AdvancedInfo" },
        { name: "物流公司设置", tabId: "Logistics" },
        { name: "供应商设置", tabId: "SupplierTab" }
      ],
      supplierAndLogistics: [
        { name: "基本信息", tabId: "BaseInformation" },
        { name: "联系方式", tabId: "ContactInformation" },
        { name: "分公司/业务员权限", tabId: "Permission" },
        { name: "供应商设置", tabId: "SupplierTab" },
        { name: "物流公司设置", tabId: "Logistics" }
      ]
    },
    /**
     * 仓库设置
     * */

    storeTabs: [],
    defaultStoreTabs: {
      all: [
        { name: "基本信息", tabId: "StoreBaseInfo" },
        { name: "货区设置", tabId: "StoreAreaSettings" },
        { name: "货架设置", tabId: "StoreShelvesSettings" }
        // { name: "出入库流程设置", tabId: "StoreFlowSettings" }
      ],
      base: [{ name: "基本信息", tabId: "StoreBaseInfo" }]
    },
    /**
     * 配件资料
     * */

    partTabs: [],
    defaultPartTabs: {
      all: [
        { name: "配件信息", tabId: "PartsUpdate" },
        { name: "适用车型", tabId: "vehModel" }
      ],
      base: [{ name: "配件信息", tabId: "PartsUpdate" }]
    }
  },
  actions: {
    async resetCooperatorsTabs({ state }, val) {
      state.tabs = state.defaultTabs[val];
    },
    async resetPartTabs({ state }, val) {
      state.partTabs = state.defaultPartTabs[val];
    },
    async resetStoreTabs({ state }, val) {
      state.storeTabs = state.defaultStoreTabs[val];
    },
    async toCooperatorsType({ state }, row) {
      let type;
      if (
        row.flags.isCustomer &&
        !row.flags.isSupplier &&
        !row.flags.isLogistics
      ) {
        type = "customer";
      } else if (
        row.flags.isCustomer &&
        row.flags.isSupplier &&
        !row.flags.isLogistics
      ) {
        type = "customerAndSupplier";
      } else if (
        row.flags.isCustomer &&
        !row.flags.isSupplier &&
        row.flags.isLogistics
      ) {
        type = "customerAndLogistics";
      } else if (
        row.flags.isCustomer &&
        row.flags.isSupplier &&
        row.flags.isLogistics
      ) {
        type = "all";
      } else if (
        !row.flags.isCustomer &&
        row.flags.isSupplier &&
        !row.flags.isLogistics
      ) {
        type = "supplier";
      } else if (
        !row.flags.isCustomer &&
        !row.flags.isSupplier &&
        row.flags.isLogistics
      ) {
        type = "logistics";
      } else if (
        !row.flags.isCustomer &&
        row.flags.isSupplier &&
        row.flags.isLogistics
      ) {
        type = "supplierAndLogistics";
      } else {
        type = "basic";
      }
      state.type = type;
    }
  }
};
