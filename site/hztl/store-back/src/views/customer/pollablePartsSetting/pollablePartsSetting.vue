<template>
  <div class="pollable_parts_setting" :class="$store.state.paddingLeft">
    <search-more
      :contacts="contacts"
      :customerType="customerType"
      :companyName="companyName"
      :contactsPhone="contactsPhone"
      @search="onSearch"
    />
    <tabel-list
      ref="tabelList"
      :searchData="searchData"
      :customerType="customerType"
      :customerId="customerId"
      style="margin-top: 20px;"
      @search-perm-set="showSearchPermSet"
      @price-type-set="showPriceTypeSet"
      @limit-info-set="showLimitInfoSet"
    />

    <search-perm-set-box
      :visible.sync="searchpermSetVisible"
      :selectedRows="selectedRows"
      :customerType="customerType"
      :customerId="customerId"
      :searchData="searchData"
      @price-type-set="showPriceTypeSet"
      @success="loadData"
    />
    <price-type-set-box
      :visible.sync="priceTypeSetVisible"
      :selectedRows="selectedRows"
      :customerSetId="customerSetId"
      :customerType="customerType"
      :customerId="customerId"
      :searchData="searchData"
      @success="loadData"
    />
    <limit-info-set-box
      :visible.sync="limitInfoSetVisible"
      :selectedRows="selectedRows"
      :customerType="customerType"
      :customerId="customerId"
      :searchData="searchData"
      @success="loadData"
    />
  </div>
</template>

<script>
import SearchMore from "./SearchMore";
import TabelList from "./TabelList";
import SearchPermSetBox from "./SearchPermSetBox";
import PriceTypeSetBox from "./PriceTypeSetBox";
import LimitInfoSetBox from "./LimitInfoSetBox";

export default {
  name: "pollable_parts_setting",
  components: {
    SearchMore,
    TabelList,
    SearchPermSetBox,
    PriceTypeSetBox,
    LimitInfoSetBox
  },
  data() {
    return {
      searchData: null,
      searchpermSetVisible: false,
      priceTypeSetVisible: false,
      limitInfoSetVisible: false,
      selectedRows: [],
      customerType: null,
      customerId: null,
      customerSetId: null,
      customerName: "",
      applyer: "",
      contacts: "",
      companyName: "",
      contactsPhone: ""
    };
  },
  created() {
    let getData = window.location.href.split("?")[1];
    if (getData) {
      this.contactsPhone = decodeURI(getData.split("-")[7]);
      this.companyName = decodeURI(getData.split("-")[6]);
      this.contacts = decodeURI(getData.split("-")[5]);
      this.applyer =  decodeURI(getData.split("-")[4]);
      this.customerName = decodeURI(getData.split("-")[3]);
      this.customerType = Number(getData.split("-")[2]);
      this.customerId =  Number(getData.split("-")[1]);
      this.customerSetId = Number(getData.split("-")[0]);
    }
  },
  methods: {
    onSearch(searchData) {
      this.searchData = searchData;
    },
    loadData() {
      this.$refs.tabelList && this.$refs.tabelList.loadData();
    },
    showSearchPermSet(rows) {
      if (rows) {
        this.selectedRows = rows;
      }
      this.searchpermSetVisible = true;
    },
    showPriceTypeSet(rows) {
      if (rows) {
        this.selectedRows = rows;
      }
      this.priceTypeSetVisible = true;
    },
    showLimitInfoSet(rows) {
      if (rows) {
        this.selectedRows = rows;
      }
      this.limitInfoSetVisible = true;
    }
  }
}
</script>

<style lang="less" scoped>
.pollable_parts_setting {
  box-sizing: border-box;
  height: 100%;
  padding:8px @padding-size-main;
  display: flex;
  flex-direction: column;
}
</style>