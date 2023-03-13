<template>
	<div class="vip-card-type" v-loading="loading">
		<SearchTemplate
			:formData="formData"
			:moreVisible="false"
			placeholderText="卡种名称"
			labelWidth="96px"
			@handleQuery="handleQuery"
			@handleReset="handleReset"
		>
			<el-button
				slot="right"
				size="small"
				type="primary"
				@click="addVipCard"
			>
				新建会员卡种
			</el-button>
		</SearchTemplate>
		<el-table
			class="table-base"
			size="small"
			:data="tableData"
			stripe
			border
			style="width: 100%"
			height="400px"
		>
			<el-table-column
				label="会员卡种"
				prop="name"
				width="100"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				label="开卡背景"
				prop="color"
				width="86"
				show-overflow-tooltip
			>
				<template slot-scope="scope">
					<div
						class="card-grade-bg"
						:style="{ background: scope.row.color }"
					></div>
				</template>
			</el-table-column>
			<el-table-column
				label="卡种说明"
				prop="descreption"
				width="150"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column label="使用门槛" prop="useLimit" width="200">
				<template slot-scope="scope">
					<div>
						<div v-if="scope.row.useLimit.branch.limit">
							<span>指定门店：</span>
							<span>
								{{
									scope.row.useLimit.branch.rows
										? scope.row.useLimit.branch.rows
												.map((item) => item.name)
												.join('、')
										: ''
								}}
							</span>
						</div>
						<template v-else>
							{{ '不限门店' }}
						</template>
					</div>
					<div v-if="$store.state.base.companyType === 'garage'">
						{{
							scope.row.useLimit.vehicle.limit
								? '指定车辆'
								: '不限车辆'
						}}
					</div>
				</template>
			</el-table-column>
			<el-table-column
				label="开卡价格"
				min-width="80"
				show-overflow-tooltip
			>
				<template slot-scope="scope">
					{{ scope.row.free ? '免费' : scope.row.price }}
				</template>
			</el-table-column>
			<el-table-column
				label="剩余库存"
				min-width="80"
				show-overflow-tooltip
			>
				<template slot-scope="scope">
					<div :class="{ 'color-error': Number(scope.row.qty) < 10 }">
						{{ scope.row.qty }}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="状态" width="80" show-overflow-tooltip>
				<div class="card-state" slot-scope="scope">
					<i
						class="state-dot"
						:class="[
							scope.row.status === 1
								? 'state-enable'
								: 'state-disable',
						]"
					></i>
					{{ scope.row.status === 1 ? '启用' : '停用' }}
				</div>
			</el-table-column>
			<el-table-column
				label="开卡数量"
				prop="openerQty"
				width="102"
				show-overflow-tooltip
				sortable
			>
				<template slot-scope="scope">
					<div
						v-if="Number(scope.row.openerQty)"
						@click="goCardManage(scope.row)"
						class="opener-qty"
					>
						{{ scope.row.openerQty }}
					</div>
					<div v-else>
						{{ scope.row.openerQty }}
					</div>
				</template>
			</el-table-column>
			<el-table-column
				label="创建日期"
				prop="createdAt"
				width="106"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				label="创建人"
				prop="createdBy"
				min-width="100"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button
						type="text"
						size="mini"
						@click="handleEdit(scope.row)"
						style="margin-right: 16px"
					>
						编辑
					</el-button>

					<el-popover
						placement="bottom"
						trigger="click"
						popper-class="popover-select"
					>
						<div
							class="popover-option"
							@click="updateMemberCardStatus(scope.row)"
						>
							{{ scope.row.status === 1 ? '停用' : '启用' }}
						</div>
						<div
							class="popover-option"
							@click="handleCopy(scope.row)"
						>
							复制
						</div>
						<el-button slot="reference" type="text" size="mini"
							>更多</el-button
						>
					</el-popover>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="pagination-base"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			background
			:current-page="pageData.page"
			:page-sizes="pageData.pageSizes"
			:page-size="pageData.pageSize"
			:pager-count="pageData.pagerCount"
			layout="total, sizes, prev, pager, next, jumper"
			:total="pageData.total"
		>
		</el-pagination>
	</div>
</template>

<script>
import SearchTemplate from "@/components/search/SearchTemplate.vue";
import { getMemberCards, updateMemberCardStatus } from "../services";
import baseIndexJump from "@/utils/baseIndexJump";

export default {
	name: "VipCardType",
	components: {
		SearchTemplate
	},
	data() {
		return {
			loading: false,
			pageData: {
				page: 1,
				pageSizes: [10, 20, 50, 100],
				pageSize: 10,
				total: 0,
				pagerCount: 5
			},
			formData: {
				keyword: ""
			},
			cardStatusOptions: [
				{
					value: "0",
					label: "全部"
				},
				{
					value: "1",
					label: "状态1"
				},
				{
					value: "2",
					label: "状态2"
				}
			],
			operatorOptions: [
				{
					value: "0",
					label: "全部"
				},
				{
					value: "1",
					label: "操作人1"
				},
				{
					value: "2",
					label: "操作人2"
				}
			],
			cardTypeOptions: [
				{
					value: "0",
					label: "全部"
				},
				{
					value: "1",
					label: "卡种1"
				},
				{
					value: "2",
					label: "卡种2"
				}
			],
			tableData: [
				// {
				//   id: 1,
				//   name: "会员卡种", // 卡种名称
				//   color: "卡背景", // 卡背景
				//   descreption: "卡种说明", // 卡种说明
				//   // 使用门槛
				//   useLimit: {
				//     // 门店限制
				//     branch: {
				//       limit: true, // 限制门店
				//       // 门店信息
				//       rows: [
				//         {
				//           id: 1, // 门店ID
				//           name: "门店1" // 门店名称
				//         },
				//         {
				//           id: 2,
				//           name: "门店2"
				//         },
				//         {
				//           id: 3,
				//           name: "门店3"
				//         },
				//         {
				//           id: 4,
				//           name: "门店4"
				//         },
				//         {
				//           id: 5,
				//           name: "门店5"
				//         },
				//         {
				//           id: 6,
				//           name: "门店6"
				//         },
				//         {
				//           id: 7,
				//           name: "门店7"
				//         }
				//       ]
				//     },
				//     // 车辆限制
				//     vehicle: {
				//       limit: true // true：限制车辆；false：不限制车辆
				//     }
				//   },
				//   free: true, // 开卡免费
				//   price: "", // 开卡价格，null表示没有设置
				//   qty: "10", // 库存数量
				//   status: 1, // 状态,1:启用;2:停用
				//   openerQty: "10", // 开卡人数量
				//   createdAt: "2020-12-30", // 创建日期
				//   createdBy: "张三" // 创建人
				// }
			]
		};
	},
	methods: {
		handleSizeChange(val) {
			this.pageData.page = 1;
			this.pageData.pageSize = val;
			this.getDatas();
		},
		handleCurrentChange(val) {
			this.pageData.page = val;
			this.getDatas();
		},
		handleQuery() {
			this.pageData.page = 1;
			this.getDatas();
		},
		handleReset() {
			this.formData.keyword = "";
		},
		// 新增
		addVipCard() {
			this.$router.push({ path: "/customer/vipCard/add" });
		},
		// 复制
		handleCopy(row) {
			this.$router.push({ path: "/customer/vipCard/add", query: { id: row.id } });
		},
		// 编辑
		handleEdit(row) {
			this.$router.push({ path: "/customer/vipCard/edit", query: { id: row.id } });
		},
		// 更新会员卡状态
		updateMemberCardStatus(row) {
			if (!row.id) return;
			const enable = row.status === 1 ? false : true;
			let title = "停用会员卡种";
			let message = "你确定要停用当前选中的会员卡种吗？";
			if (enable) {
				title = "启用会员卡种";
				message = "你确定要启用当前选中的会员卡种吗？";
			}
			this.$confirm(message, title, {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
				showClose: false
			})
				.then(() => {
					this.loading = true;
					const params = {
						enable
					};
					updateMemberCardStatus(params, row.id)
						.then(() => {
							this.loading = false;
							this.$message.success(enable ? "启用成功！" : "停用成功！");
							this.handleQuery();
						})
						.catch(() => {
							this.loading = false;
						});
				})
				.catch(() => { });
		},
		// 获取会员卡列表
		getDatas() {
			this.loading = true;
			const params = {
				...this.formData,
				page: this.pageData.page,
				pageSize: this.pageData.pageSize
			};
			getMemberCards(params)
				.then(res => {
					this.pageData.total = res.totalSize || 0;
					this.tableData = res.rows || [];
					this.loading = false;
				})
				.catch(() => {
					this.pageData.total = 0;
					this.tableData = [];
					this.loading = false;
				});
		},
		goCardManage(row) {
			baseIndexJump.setInfo("vipCardManage", row.id);
			this.$emit("tabChange", "VipCardManage");
		}
	},
	created() {
		this.getDatas();
	}
};
</script>
<style lang="less" scoped>
.vip-card-type {
	height: 100%;
	display: flex;
	flex-direction: column;
	.table-base {
		flex: 1;
		margin-top: @margin-size-main;
		.card-grade-bg {
			width: 64px;
			height: 24px;
		}
		.card-state {
			display: flex;
			align-items: center;
			.state-dot {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50% 50%;
				margin-right: @margin-size-secondary;
			}
			.state-enable {
				background-color: #389e0d;
			}
			.state-disable {
				background-color: #595959;
			}
		}
		.opener-qty {
			color: @color-link;
			cursor: pointer;
		}
	}
	.pagination-base {
		text-align: right;
		padding-top: 12px;
		// border-top: 1px solid @border-color-base;
	}
	/deep/ .el-icon-question {
		font-size: 16px;
		color: @color-warning;
		margin-left: @margin-size-secondary;
		cursor: pointer;
	}
}
</style>
