<template>
	<div>
		<search-form ref="searchForm" @search="onSearch" />
		<van-divider style="margin: 0;" />
		<bill-list ref="billList" :searchData="searchData" />
	</div>
</template>

<script>
import Vue from "vue";
import { Divider } from "vant";
import SearchForm from "./SearchForm";
import BillList from "./BillList";

Vue.use(Divider);

export default {
	name: "Statement",
	components: {
		SearchForm,
		BillList
	},
	data() {
		return {
			searchData: null,
		}
	},
	methods: {
		onSearch(search) {
			this.searchData = { ...search };
		},
		resetHandle() {
			// 父组件调用
			this.searchData = null;
			this.$refs.searchForm && this.$refs.searchForm.resetHandle();
			this.$refs.billList && this.$refs.billList.resetHandle();
		}
	}
}
</script>
