<template>
  <div>
    <quick-add-part />
    <quick-create-cooperator />
    <part-price />
    <bill-details />
  </div>
</template>

<script>
import QuickAddPart from "./addPart";
import QuickCreateCooperator from "./quickCreateCooperator";
import PartPrice from "./part-price";
import BillDetails from "./bill-details";

export default {
  name: "GlobalDialog",
  components: {
    QuickAddPart,
    QuickCreateCooperator,
    PartPrice,
    BillDetails
  }
};
</script>
