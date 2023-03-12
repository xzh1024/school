<template>
	<div class="audited_customer">
		<!-- 待审核客户 -->
		<div class="search">
			<Search
				style="width: 652px"
				@onSearchFn="searchFn"
				@onResetFn="resetFn"
				@onMoreSeacrh="moreSeacrhFn"
				:placeholder="placeholder"
			/>
		</div>
		<el-row class="more_search_box" v-if="moreSearch">
			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">申请日期</span>
					<el-date-picker
						class="search_item_cont"
						v-model="applyTime"
						type="daterange"
						unlink-panels
						range-separator="至"
						size="small"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:default-time="['00:00:00']"
						@change="changeTime"
					>
					</el-date-picker>
				</div>
			</el-col>

			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">申请人类型</span>
					<el-select
						v-model="searchObj.customerType"
						size="small"
						placeholder="请选择类型"
						class="search_item_cont"
					>
						<el-option
							v-for="(item, index) in customerTypeList"
							:key="index"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</div>
			</el-col>

			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">所在地区</span>
					<SelectArea
						style="width: 204px"
						:areaData="searchObj.areaIds"
						@change="areaChange"
					/>
				</div>
			</el-col>
		</el-row>

		<el-table
			ref="multipleTable"
			class="xtable"
			size="small"
			:data="tableData"
			border
			stripe
			tooltip-effect="dark"
			height="450px"
			style="width: 100%; margin: 10px 0"
		>
			<el-table-column
				prop="applyer"
				label="申请人"
				align="center"
				width="500"
			>
				<template slot-scope="scope">
					<span>
						{{ renderAppyer(scope.row) }}
					</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="phone"
				label="申请人电话"
				align="center"
				min-width="240"
			>
				<template slot-scope="scope">
					{{
						scope.row.customerType == 0
							? scope.row.phone
							: scope.row.contactsPhone
					}}
				</template>
			</el-table-column>
			<el-table-column
				prop="areaName"
				label="所在地区"
				align="center"
				min-width="240"
			>
			</el-table-column>
			<el-table-column
				prop="typeName"
				label="申请人类型"
				align="center"
				min-width="240"
			>
			</el-table-column>
			<el-table-column
				align="center"
				label="申请时间"
				prop="createdAt"
				min-width="240"
			>
				<template slot-scope="scope">
					<span>{{
						scope.row.createdAt.split('.')[0].split('T').join(' ')
					}}</span>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				align="center"
				width="200"
			>
				<template slot-scope="scope">
					<el-button
						@click="checkFn(scope.row)"
						type="text"
						size="small"
						>审核</el-button
					>
					<el-button
						@click="lookDetail(scope.row)"
						type="text"
						class="txt_danger"
						size="small"
						>查看资料</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			style="text-align: right"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pageInfo.page"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="pageInfo.pageSize"
			layout="total, prev, pager, next, jumper, sizes"
			:total="pageInfo.totalSize"
		>
		</el-pagination>
		<CheckDialog ref="check" :checkData="checkRow" @onRefresh="refreshFn" />
	</div>
</template>

<script>
import Search from '@/components/search/SearchCom.vue'
import SelectArea from "@/components/selectArea/SelectArea.vue"
import CheckDialog from "./components/checkDialog.vue"
import { AuditedCustomerApi } from './services'
const auditedCustomerApi = new AuditedCustomerApi();

export default {
	name: "auditedCustomer",
	components: {
		Search,
		SelectArea,
		CheckDialog
	},
	data() {
		return {
			placeholder: "申请人单位名称/联系人/电话等",
			moreSearch: false,//更多筛选
			applyTime: [],//申请日期
			customerTypeList: [
				// {label:'全部',value:''},
				{ label: '个人', value: 0 },
				// {label:'公司',value:1},
				{ label: '公司-经销商', value: 2 },
				{ label: '公司-汽修厂', value: 3 },
				{ label: '公司-生产厂家', value: 4 },
			],
			searchObj: {
				keyword: '',
			},
			tableData: [],
			pageInfo: {
				page: 1,
				totalSize: 0,
				pageSize: 20
			},
			checkRow: {}
		}
	},
	mounted() {
		this.initData();
	},
	methods: {
		renderAppyer(row) {
			let customerType = row.customerType;
			let str = '';
			if (customerType == 0) {
				str += row.applyer;
			} else {
				str += row.CustomerName + '-' + row.contacts
			}
			return str;
		},
		refreshFn() {
			this.initData();
		},
		checkFn(row) {//审核
			this.checkRow = row;
			this.$refs.check.show();
		},
		lookDetail(row) {//查看资料
			let obj = {
				path: '/customer/customerQuery/customerInfo',
				query: {
					id: row.id,
					type: 0//待审核客户
				}
			}
			this.$router.push(obj);
		},
		initData() {
			this.tableData = [];
			let obj = { ...this.searchObj };
			let params = {
				...obj,
				...this.pageInfo,
				status: 0
			}
			auditedCustomerApi
				.getCustomersList(params)
				.then(res => {
					if (res) {
						this.tableData = res.rows;
						this.pageInfo.totalSize = res.totalSize;
					}

				})
				.catch(err => {
					console.log(err);
				});
		},
		searchFn(data) {
			this.searchObj.keyword = data;
			this.pageInfo.page = 1;

			this.initData();
		},
		resetFn() {//重置
			this.searchObj = {
				keyword: "",
				areaIds: []
			}
			this.applyTime = [];
			this.initData();
		},
		moreSeacrhFn(data) {
			this.moreSearch = data;
			let keyword = this.searchObj.keyword;
			this.searchObj = {
				keyword: keyword
			}
		},
		changeTime(time) {
			if (time) {
				this.searchObj.joinStartTime = this.$dayjs(time[0]).format('YYYY-MM-DD');
				this.searchObj.joinEndTime = this.$dayjs(time[1]).format('YYYY-MM-DD');
			} else {
				this.searchObj.joinStartTime = "";
				this.searchObj.joinEndTime = "";
			}

		},
		areaChange(dataObj) {
			this.searchObj.provinceId = dataObj.areaIds[0];
			this.searchObj.cityId = dataObj.areaIds[1];
			this.searchObj.countyId = dataObj.areaIds[2];
		},
		handleSizeChange(val) {
			this.pageInfo.pageSize = val;
			this.pageInfo.page = 1;
			this.initData();
		},
		handleCurrentChange(val) {
			this.pageInfo.page = val;
			this.initData();
		},
	}
}
</script>

<style lang="less" scoped>
.audited_customer {
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 0 @padding-size-main;
	.search {
		margin-top: @margin-size-secondary;
	}
	.search_item_4 {
		width: 300px;
	}
	.search_item {
		.label {
			width: 70px;
			margin-right: 4px;
			display: inline-block;
		}
		.search_item_cont {
			width: 204px;
		}
	}
	/deep/.el-date-editor .el-range-input {
		width: 50%;
	}
	.txt_danger {
		margin-left: 0;
	}
}
</style>
