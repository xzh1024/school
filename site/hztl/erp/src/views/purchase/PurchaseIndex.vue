<template>
  <section>
    <el-row :gutter="20">
      <el-col :span="6">
        <Cards
          titles="采购订单"
          english-title="PURCHASE ORDER"
          icons="icon-img-purchase-home"
          page-path="/PurchaseList"
        />
      </el-col>
      <el-col :span="6">
        <Cards
          titles="采购到货"
          english-title="PURCHASE RECEIVE"
          icons="icon-img-purchase-receive"
          page-path="/PurchaseReceive"
        />
      </el-col>
      <el-col :span="6">
        <Cards
          titles="采购退货"
          english-title="PURCHASE RETURN"
          icons="icon-img-purchase-return"
          page-path="/PurchaseReturn"
        />
      </el-col>
      <el-col :span="6">
        <Cards
          titles="急件处理"
          english-title="PURCHASE DISPATCH"
          icons="icon-img-purchase-dispatch"
          page-path="/PurchaseDispatch"
        />
      </el-col>
      <el-col :span="6">
        <Cards
          titles="需求处理"
          english-title="PURCHASE DEMANDS"
          icons="icon-img-purchase-demands"
          page-path="/PurchaseDemands"
        />
      </el-col>
      <el-col :span="6">
        <Cards
          titles="订货参数"
          english-title="PURCHASE SETTINGS ORDER"
          icons="icon-img-purchase-s-order"
          page-path="/PurchaseSettingsOrder"
        />
      </el-col>
      <el-col :span="6">
        <Cards
          titles="售价设置"
          english-title="PURCHASE SETTINGS PRICE"
          icons="icon-img-purchase-s-goods"
          page-path="/PurchaseSettingsGoods"
        />
      </el-col>
    </el-row>
  </section>
</template>
<script>
import Cards from "@/components/cards/Cards";
// import { menuAside } from "@/menuConfig";
export default {
  name: "PurchaseIndex",
  components: {
    Cards
  }
};
</script>
