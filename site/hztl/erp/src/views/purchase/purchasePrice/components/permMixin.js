export default {
  computed: {
    canCreate() {
      return this.hasCompletePerm("purchases.salePriceSettings.manage.create");
    },
    canUpdate() {
      return this.hasCompletePerm("purchases.salePriceSettings.manage.update");
    },
    canDelete() {
      return this.hasCompletePerm("purchases.salePriceSettings.manage.delete");
    },
    canUpdateStockPrices() {
      return this.hasCompletePerm(
        "purchases.salePriceSettings.manage.updateStockPrices"
      );
    },
    canSetPriority() {
      return this.hasCompletePerm(
        "purchases.salePriceSettings.manage.setPriority"
      );
    }
  }
};
