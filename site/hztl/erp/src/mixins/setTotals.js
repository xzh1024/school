import { precisionsFixed } from "@/mixins";

export default {
  mixins: [precisionsFixed],
  methods: {
    setTotals(param) {
      const { columns, data } = param;
      const sums = [];
      const totalData = {
        qty: 0,
        stockinQty: 0,
        bookQty: 0,
        satisfyQty: 0,
        terminatedQty: 0,
        realQty: 0,
        onTransSaleQty: 0,
        unStockoutQty: 0,
        stockoutQty: 0,
        totalTransSaleQty: 0,

        taxedAmount: 0,
        untaxedAmount: 0,
        taxAmount: 0,
        freight: 0,
        billAmount: 0,
        preDiscountTaxedAmount: 0,
        preDiscountUntaxedAmount: 0,
        stockoutTaxedAmount: 0
      };
      data.forEach(item => {
        totalData.qty = totalData.qty + Number(item.qty);
        totalData.stockinQty += Number(item.stockinQty);
        totalData.bookQty += Number(item.bookQty);
        totalData.satisfyQty += Number(item.satisfyQty);
        totalData.terminatedQty += Number(item.terminatedQty);
        totalData.realQty += Number(item.realQty);
        totalData.onTransSaleQty += Number(item.onTransSaleQty);
        totalData.unStockoutQty += Number(item.unStockoutQty);
        totalData.stockoutQty += Number(item.stockoutQty);
        totalData.totalTransSaleQty += Number(item.totalTransSaleQty);

        totalData.taxedAmount += Number(item.taxedAmount);
        totalData.untaxedAmount += Number(item.untaxedAmount);
        totalData.taxAmount += Number(item.taxAmount);
        totalData.freight += Number(item.freight);
        totalData.billAmount += Number(item.billAmount);
        totalData.preDiscountTaxedAmount += Number(item.preDiscountTaxedAmount);
        totalData.preDiscountUntaxedAmount += Number(
          item.preDiscountUntaxedAmount
        );
        totalData.stockoutTaxedAmount += Number(item.stockoutTaxedAmount);
      });
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        switch (column.property) {
          case "qty":
            sums[index] = this.precisionFormat(totalData.qty, "qty");
            break;
          case "stockinQty":
            sums[index] = this.precisionFormat(totalData.stockinQty, "qty");
            break;
          case "bookQty":
            sums[index] = this.precisionFormat(totalData.bookQty, "qty");
            break;
          case "satisfyQty":
            sums[index] = this.precisionFormat(totalData.satisfyQty, "qty");
            break;
          case "terminatedQty":
            sums[index] = this.precisionFormat(totalData.terminatedQty, "qty");
            break;
          case "realQty":
            sums[index] = this.precisionFormat(totalData.realQty, "qty");
            break;
          case "onTransSaleQty":
            sums[index] = this.precisionFormat(totalData.onTransSaleQty, "qty");
            break;
          case "unStockoutQty":
            sums[index] = this.precisionFormat(totalData.unStockoutQty, "qty");
            break;
          case "stockoutQty":
            sums[index] = this.precisionFormat(totalData.stockoutQty, "qty");
            break;
          case "totalTransSaleQty":
            sums[index] = this.precisionFormat(
              totalData.totalTransSaleQty,
              "qty"
            );
            break;

          case "taxedAmount":
            sums[index] = this.precisionFormat(totalData.taxedAmount, "money");
            break;
          case "untaxedAmount":
            sums[index] = this.precisionFormat(
              totalData.untaxedAmount,
              "money"
            );
            break;
          case "taxAmount":
            sums[index] = this.precisionFormat(totalData.taxAmount, "money");
            break;
          case "freight":
            sums[index] = this.precisionFormat(totalData.freight, "money");
            break;
          case "billAmount":
            sums[index] = this.precisionFormat(totalData.billAmount, "money");
            break;
          case "preDiscountTaxedAmount":
            sums[index] = this.precisionFormat(
              totalData.preDiscountTaxedAmount,
              "money"
            );
            break;
          case "preDiscountUntaxedAmount":
            sums[index] = this.precisionFormat(
              totalData.preDiscountUntaxedAmount,
              "money"
            );
            break;
          case "stockoutTaxedAmount":
            sums[index] = this.precisionFormat(
              totalData.stockoutTaxedAmount,
              "money"
            );
            break;
          default:
            sums[index] = "";
            return;
        }
      });
      return sums;
    }
  }
};
