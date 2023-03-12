<template>
	<div class="vip-card-manage" v-loading="loading">
		<SearchTemplate
			:formData="formData"
			labelWidth="100px"
			@handleQuery="handleQuery"
			@handleReset="handleReset"
		>
			<template slot="more">
				<el-form-item label="卡号">
					<el-input
						v-model.trim="formData.cardNo"
						clearable
						placeholder="会员卡号"
					></el-input>
				</el-form-item>
				<el-form-item label="卡种">
					<el-select
						v-model="formData.cardId"
						filterable
						multiple
						collapse-tags
						clearable
						placeholder=""
					>
						<el-option
							v-for="item in memberCardOptions"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="卡状态">
					<el-select
						v-model="formData.status"
						multiple
						collapse-tags
						clearable
						placeholder=""
					>
						<el-option
							v-for="item in statusOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车牌号">
					<el-input
						v-model.trim="formData.plateNumber"
						clearable
						placeholder="客户车牌号"
					></el-input>
				</el-form-item>
				<el-form-item label="操作人">
					<el-select
						v-model="formData.createdBy"
						multiple
						filterable
						remote
						collapse-tags
						clearable
						placeholder="请输入关键词"
						:remote-method="queryStaffs"
						:loading="selectLoading"
					>
						<el-option
							v-for="item in createdByOptions"
							:key="item.staffId"
							:label="item.staffName"
							:value="item.staffId"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="业务员" prop="businessManName">
					<el-input
						v-model.trim="formData.businessManName"
						maxlength="10"
						size="small"
					></el-input>
				</el-form-item>
				<el-form-item label="开卡日期">
					<el-date-picker
						v-model="formData.createdDate"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:picker-options="pickerOptions"
						value-format="yyyy-MM-dd"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="卡折扣失效日期">
					<el-date-picker
						v-model="formData.discountExpiredDate"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:picker-options="pickerOptions"
						value-format="yyyy-MM-dd"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="卡项目失效日期">
					<el-date-picker
						v-model="formData.packageExpiredDate"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:picker-options="pickerOptions"
						value-format="yyyy-MM-dd"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="最近消费日期">
					<el-date-picker
						v-model="formData.latelyUseDate"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:picker-options="pickerOptions"
						value-format="yyyy-MM-dd"
					>
					</el-date-picker>
				</el-form-item>
			</template>
		</SearchTemplate>
		<div class="action-bar">
			<div class="flex-1">
				<el-button
					size="small"
					type="primary"
					plain
					@click="showCardServiceAddDialog"
				>
					开卡
				</el-button>
				<el-button
					size="small"
					type="primary"
					plain
					@click="showCardServiceRechargeDialog()"
					:disabled="!tableData.length"
				>
					充值
				</el-button>
				<el-button
					size="small"
					type="primary"
					plain
					@click="showCardServiceUpdateDialog()"
					:disabled="!tableData.length"
				>
					修改
				</el-button>
				<!-- <el-button size="small" type="primary">导入</el-button> -->
				<el-button
					size="small"
					type="primary"
					:disabled="!tableData.length"
					@click="getDatas(true)"
				>
					导出
				</el-button>
			</div>
			<template>
				累计：
				<span>客户数 {{ board.openerCount }}</span>
				<el-divider
					direction="vertical"
					class="divider-base"
				></el-divider>
				<span>会员卡 {{ board.cardCount }}</span>
				<el-divider
					direction="vertical"
					class="divider-base"
				></el-divider>
				<span>累计充值金额 {{ board.rechargeTotalAmount }}</span>
				<el-divider
					direction="vertical"
					class="divider-base"
				></el-divider>
				<span>卡现金余额 {{ board.cashBalanceTotalAmount }}</span>
				<el-divider
					direction="vertical"
					class="divider-base"
				></el-divider>
				<span>开卡费 {{ board.openTotalAmount }}</span>
			</template>
		</div>
		<el-table
			class="table-base"
			size="small"
			:data="tableData"
			stripe
			border
			style="width: 100%"
			height="400px"
		>
			<el-table-column label="客户" width="150" show-overflow-tooltip>
				<template slot-scope="scope">
					{{
						scope.row.customerName
							? scope.row.customerName +
							  '-' +
							  scope.row.customerContacts +
							  '(' +
							  scope.row.customerPhone +
							  ')'
							: scope.row.customerContacts +
							  '(' +
							  scope.row.customerPhone +
							  ')'
					}}
					<div
						class="color-error"
						v-if="scope.row.customerStatus === 2"
					>
						客户已停用
					</div>
					<div
						class="color-error"
						v-if="scope.row.customerStatus === 3"
					>
						客户已删除
					</div>
				</template>
			</el-table-column>
			<el-table-column label="开卡人" width="150" show-overflow-tooltip>
				<template slot-scope="scope">
					{{ scope.row.openerName }}
					<template v-if="scope.row.openerPhone">
						{{ '(' + scope.row.openerPhone + ')' }}
					</template>
				</template>
			</el-table-column>
			<el-table-column
				label="卡号"
				prop="cardNo"
				width="190"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				label="卡种"
				prop="name"
				width="100"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				label="状态"
				width="70"
				prop="statusName"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column label="使用门槛" show-overflow-tooltip width="200">
				<template slot-scope="scope">
					<div v-if="scope.row.useLimit.branch.limit">
						<span class="color-secondary">指定门店：</span>
						{{
							scope.row.useLimit.branch.rows &&
							scope.row.useLimit.branch.rows
								.map((item) => item.name)
								.join('、')
						}}
					</div>
					<div
						class="color-hint"
						v-if="!scope.row.useLimit.branch.limit"
					>
						不限门店
					</div>
					<template v-if="isGarage">
						<div v-if="scope.row.useLimit.vehicle.limit">
							<span class="color-secondary">指定车辆：</span>
							{{
								scope.row.useLimit.vehicle.rows &&
								scope.row.useLimit.vehicle.rows
									.map((item) => item.name)
									.join('、')
							}}
						</div>
						<div
							class="color-hint"
							v-if="!scope.row.useLimit.vehicle.limit"
						>
							不限车辆
						</div>
					</template>
				</template>
			</el-table-column>
			<el-table-column label="卡折扣" show-overflow-tooltip width="158">
				<template slot-scope="scope" v-if="scope.row.status !== 3">
					<div v-if="isGarage && scope.row.discount.detail.project">
						<span class="color-secondary">项目折扣：</span>
						{{ scope.row.discount.detail.project }}
					</div>
					<div v-if="scope.row.discount.detail.part">
						<span class="color-secondary">配件折扣：</span>
						{{ scope.row.discount.detail.part }}
					</div>
					<div v-if="isGarage && scope.row.discount.detail.package">
						<span class="color-secondary">套餐折扣：</span>
						{{ scope.row.discount.detail.package }}
					</div>
					<div
						class="color-hint"
						v-if="!scope.row.discount.indate.limit"
					>
						永久有效
					</div>
					<template v-if="scope.row.discount.indate.limit">
						<div
							class="color-hint"
							v-if="scope.row.discount.indate.date"
						>
							有效期至{{ scope.row.discount.indate.date }}
						</div>
						<div
							class="color-error"
							v-if="scope.row.discount.indate.str"
						>
							{{ scope.row.discount.indate.str }}
						</div>
					</template>
				</template>
			</el-table-column>
			<el-table-column
				label="累计充值金额"
				prop="rechargeTotalAmount"
				show-overflow-tooltip
				width="140"
			>
				<template slot="header">
					累计充值金额
					<el-tooltip
						effect="dark"
						content="该会员卡历史累计充值的现金金额和项目计次金额之和"
						placement="bottom"
					>
						<i class="el-icon-question"></i>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column label="卡余额" width="300">
				<div
					slot-scope="scope"
					style="cursor: pointer"
					@click="showCardServiceInfoDialog(scope.row)"
				>
					<div v-if="scope.row.cardBalance.cash">
						<span class="color-secondary">现金余额：</span>
						{{ scope.row.cardBalance.cash }}
					</div>
					<template v-if="isGarage">
						<div class="panel" v-if="scope.row.projectsAndPackages">
							<div class="color-secondary">计次余额：</div>
							<div
								class="panel-content"
								:title="scope.row.projectsAndPackages"
							>
								{{ scope.row.projectsAndPackages }}
							</div>
						</div>
						<div
							class="color-error"
							v-if="
								scope.row.cardBalance.indate.limit &&
								scope.row.cardBalance.indate.str
							"
						>
							即将失效项目次数：{{
								scope.row.cardBalance.indate.str
							}}
						</div>
					</template>
					<el-button type="text" size="mini">查看详情</el-button>
				</div>
			</el-table-column>
			<el-table-column label="开卡价格" width="80" show-overflow-tooltip>
				<template slot-scope="scope">
					{{ scope.row.price ? scope.row.price : '-' }}
				</template>
			</el-table-column>
			<el-table-column
				label="开卡门店"
				prop="createdCompany"
				width="100"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				label="开卡日期"
				prop="createdAt"
				show-overflow-tooltip
				width="160"
			></el-table-column>
			<el-table-column label="业务员" show-overflow-tooltip width="80">
				<template slot-scope="scope">
					{{
						scope.row.businessManName
							? scope.row.businessManName
							: '-'
					}}
				</template>
			</el-table-column>
			<el-table-column
				label="操作人"
				prop="createdBy"
				width="80"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				label="备注"
				prop="remarks"
				show-overflow-tooltip
				width="150"
			></el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button
						v-if="scope.row.status === 3"
						type="text"
						size="mini"
						@click="handleLog(scope.row)"
					>
						日志
					</el-button>
					<template v-if="scope.row.status !== 3">
						<el-button
							type="text"
							size="mini"
							style="margin-right: 16px"
							@click="showCardServiceRechargeDialog(scope.row)"
						>
							充值
						</el-button>
						<el-popover
							placement="bottom"
							trigger="click"
							popper-class="popover-select"
						>
							<div
								class="popover-option"
								@click="showCardServiceUpdateDialog(scope.row)"
							>
								修改
							</div>
							<div
								class="popover-option"
								v-if="scope.row.status === 1"
								@click="updateStatus(scope.row, 2)"
							>
								冻结
							</div>
							<div
								class="popover-option"
								v-if="scope.row.status === 2"
								@click="updateStatus(scope.row, 1)"
							>
								解冻
							</div>
							<div
								class="popover-option"
								@click="returnCard(scope.row)"
							>
								退卡
							</div>
							<div
								class="popover-option"
								@click="handleLog(scope.row)"
							>
								日志
							</div>
							<el-button slot="reference" type="text" size="mini">
								更多
							</el-button>
						</el-popover>
					</template>
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
		<!-- 会员卡开卡弹框 -->
		<CardServiceAddDialog
			:isGarage="isGarage"
			@hide="hideCardServiceAddDialog"
			@update="getDatas"
			v-if="cardServiceAddVisible"
		></CardServiceAddDialog>
		<!-- 会员卡充值弹框 -->
		<CardServiceRechargeDialog
			:isGarage="isGarage"
			:now="rechargeNow"
			@hide="hideCardServiceRechargeDialog"
			@update="getDatas"
			v-if="cardServiceRechargeVisible"
		></CardServiceRechargeDialog>
		<!-- 会员卡修改弹框 -->
		<CardServiceUpdateDialog
			:isGarage="isGarage"
			:now="updateNow"
			@hide="hideCardServiceUpdateDialog"
			@update="getDatas"
			v-if="cardServiceUpdateVisible"
		></CardServiceUpdateDialog>
		<!-- 会员卡详情弹框 -->
		<CardServiceInfoDialog
			:isGarage="isGarage"
			:now="infoNow"
			@hide="hideCardServiceInfoDialog"
			v-if="cardServiceInfoVisible"
		></CardServiceInfoDialog>
		<!-- 退卡弹框 -->
		<ReturnCardDialog
			ref="returnCardDialog"
			:isGarage="isGarage"
			@update="handleQuery"
			@showInfo="showCardServiceInfoDialog"
		></ReturnCardDialog>
	</div>
</template>

<script>
import SearchTemplate from "@/components/search/SearchTemplate.vue";
import {
	getMemberCardServices,
	uptateMemberCardServiceStatus,
	getMemberCardOptions,
	getStaffs,
	exportMembersCardServices
} from "../services";
import CardServiceAddDialog from "./components/cardServiceAddDialog.vue";
import CardServiceRechargeDialog from "./components/cardServiceRechargeDialog.vue";
import CardServiceUpdateDialog from "./components/cardServiceUpdateDialog.vue";
import CardServiceInfoDialog from "./components/cardServiceInfoDialog.vue";
import ReturnCardDialog from "./components/returnCardDialog.vue";
import baseIndexJump from "@/utils/baseIndexJump";
import { downloadBlob } from "@/utils/tool";

const defaultFormData = {
	keyword: "",
	cardNo: "", // 卡号
	cardId: [], // 卡种
	status: [], // 卡状态 状态,1:生效中;2:冻结;3:已退卡
	plateNumber: "", // 车牌号
	createdDate: null, // 开卡日期
	// createdStart: "", // 开卡日期开始日期
	// createdEnd: "", // 开卡日期结束日期
	discountExpiredDate: null, // 折扣过期日期
	// discountExpiredStart: "", // 折扣过期日期开始日期
	// discountExpiredEnd: "", // 折扣过期日期结束日期
	packageExpiredDate: null, // 项目包过期日期
	// packageExpiredStart: "", // 项目包过期日期开始日期
	// packageExpiredEnd: "", // 项目包过期日期结束日期
	latelyUseDate: null, // 最近消费日期
	// latelyUseStart: "", // 最近消费日期开始日期
	// latelyUseEnd: "", // 最近消费日期结束日期
	createdBy: [], // 操作人
	businessManName: "" // 业务员
};

export default {
	name: "VipCardManage",
	components: {
		SearchTemplate,
		ReturnCardDialog,
		CardServiceAddDialog,
		CardServiceRechargeDialog,
		CardServiceUpdateDialog,
		CardServiceInfoDialog
	},
	computed: {
		isGarage() {
			return this.$store.state.base.companyType === "garage";
		}
	},
	watch: {
		$route: "routeChange"
	},
	data() {
		return {
			loading: false,
			selectLoading: false,
			cardServiceAddVisible: false,
			cardServiceRechargeVisible: false,
			cardServiceUpdateVisible: false,
			cardServiceInfoVisible: false,
			pageData: {
				page: 1,
				pageSizes: [10, 20, 50, 100],
				pageSize: 10,
				total: 0,
				pagerCount: 5
			},
			formData: JSON.parse(JSON.stringify(defaultFormData)),
			statusOptions: [
				{
					value: "1",
					label: "生效中"
				},
				{
					value: "2",
					label: "冻结"
				},
				{
					value: "3",
					label: "已退卡"
				}
			],
			createdByOptions: [],
			memberCardOptions: [],
			board: {
				openerCount: "", // 累计客户数
				cardCount: "", // 累计会员卡数
				rechargeTotalAmount: "", // 累计充值金额
				cashBalanceTotalAmount: "", // 累计卡现金余额
				openTotalAmount: "" // 累计开卡费用
			},
			tableData: [],
			pickerOptions: {
				shortcuts: [
					{
						text: "最近一周",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit("pick", [start, end]);
						}
					},
					{
						text: "最近一个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit("pick", [start, end]);
						}
					},
					{
						text: "最近三个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit("pick", [start, end]);
						}
					}
				]
			},
			rechargeNow: null,
			updateNow: null,
			infoNow: null
		};
	},
	methods: {
		routeChange(to) {
			if (to.path === "/vipCard" && to.query.tabName === "VipCardManage") {
				const { jumpId, jumpData } = baseIndexJump.getInfo();
				if (jumpId === "vipCardManage" && jumpData) {
					this.formData.cardId.push(Number(jumpData));
					baseIndexJump.clearInfo();
					this.getDatas();
				}
			}
		},
		handleQuery() {
			this.pageData.page = 1;
			this.getDatas();
		},
		handleReset() {
			this.formData = JSON.parse(JSON.stringify(defaultFormData));
		},
		handleSizeChange(val) {
			this.pageData.page = 1;
			this.pageData.pageSize = val;
			this.getDatas();
		},
		handleCurrentChange(val) {
			this.pageData.page = val;
			this.getDatas();
		},
		queryStaffs(query) {
			const params = {
				name: query,
				page: 1,
				pageSize: 50
			};
			getStaffs(params)
				.then(res => {
					this.createdByOptions = res.rows || [];
					this.selectLoading = false;
				})
				.catch(() => {
					this.createdByOptions = [];
					this.selectLoading = false;
				});
		},
		// 获取会员卡列表
		getDatas(isExport = false) {
			const formData = this.formData;
			const params = {
				...formData,
				cardId: formData.cardId.join(","),
				status: formData.status.join(","),
				createdBy: formData.createdBy.join(","),
				page: this.pageData.page,
				pageSize: this.pageData.pageSize
			};
			if (params.createdDate) {
				params.createdStart = params.createdDate[0];
				params.createdEnd = params.createdDate[1];
			}
			delete params.createdDate;
			if (params.discountExpiredDate) {
				params.discountExpiredStart = params.discountExpiredDate[0];
				params.discountExpiredEnd = params.discountExpiredDate[1];
			}
			delete params.discountExpiredDate;
			if (params.packageExpiredDate) {
				params.packageExpiredStart = params.packageExpiredDate[0];
				params.packageExpiredEnd = params.packageExpiredDate[1];
			}
			delete params.latelyUseDate;
			if (params.latelyUseDate) {
				params.latelyUseStart = params.latelyUseDate[0];
				params.latelyUseEnd = params.latelyUseDate[1];
			}
			delete params.latelyUseDate;
			if (isExport === true) {
				this.exportMembersCardServices(params);
			} else {
				this.getMemberCardServices(params);
			}
		},
		exportMembersCardServices(params) {
			this.loading = true;
			exportMembersCardServices(params)
				.then(res => {
					downloadBlob(res, "会员卡服务列表.xlsx");
					this.loading = false;
					this.$message.success("导出操作成功！");
				})
				.catch(() => (this.loading = false));
		},
		pickList(list) {
			this.tableData = list.map(item => {
				let arr = [];
				if (item.cardBalance.projects) {
					arr = [...item.cardBalance.projects];
				}
				if (item.cardBalance.packages) {
					arr = [...arr, ...item.cardBalance.packages];
				}
				return {
					...item,
					projectsAndPackages: arr
						.map(project => project.name + "*" + project.qty)
						.join("、")
				};
			});
		},
		getMemberCardServices(params) {
			this.loading = true;
			getMemberCardServices(params)
				.then(res => {
					this.pageData.total = res.totalSize || 0;
					this.pickList(res.rows || []);
					this.board = {
						openerCount: res.openerCount || "-",
						cardCount: res.cardCount || "-",
						rechargeTotalAmount: res.rechargeTotalAmount || "-",
						cashBalanceTotalAmount: res.cashBalanceTotalAmount || "-",
						openTotalAmount: res.openTotalAmount || "-"
					};
					this.loading = false;
				})
				.catch(() => {
					this.pageData.total = 0;
					this.tableData = [];
					this.board = {
						openerCount: "-",
						cardCount: "-",
						rechargeTotalAmount: "-",
						cashBalanceTotalAmount: "-",
						openTotalAmount: "-"
					};
					this.loading = false;
				});
		},
		// 查询会员卡种id和名称列表
		queryMemberCards() {
			getMemberCardOptions({
				all: true
			})
				.then(res => {
					this.memberCardOptions = res || [];
				})
				.catch(() => {
					this.memberCardOptions = [];
				});
		},
		// 卡冻结/解冻  status 1:解冻 2:冻结
		updateStatus(row, status) {
			let title = "冻结会员卡";
			let message = "你确定要冻结当前选中的会员卡吗？冻结后当前会员卡不可用";
			if (status === 1) {
				title = "解冻会员卡";
				message = "你确定要解冻当前选中的会员卡吗？解冻后当前会员卡可继续使用";
			}
			this.$confirm(message, title, {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
				showClose: false
			})
				.then(() => {
					this.loading = true;
					const params = { status };
					uptateMemberCardServiceStatus(params, row.id)
						.then(() => {
							this.$message.success(`${title}成功!`);
							this.handleQuery();
							this.loading = false;
						})
						.catch(() => {
							this.loading = false;
						});
				})
				.catch(() => { });
		},
		// 退卡
		returnCard(row) {
			if (row.customerStatus === 2) {
				this.$message.error(
					"该客户已停用，请在客户->客户查询->基础设置中启用客户后再操作！"
				);
			} else {
				this.$refs.returnCardDialog.show(row);
			}
		},
		// 开卡
		showCardServiceAddDialog() {
			this.cardServiceAddVisible = true;
		},
		hideCardServiceAddDialog() {
			this.cardServiceAddVisible = false;
		},
		// 充值
		showCardServiceRechargeDialog(row) {
			if (row && row.customerStatus === 2) {
				this.$message.error(
					"该客户已停用，请在客户->客户查询->基础设置中启用客户后再操作！"
				);
			} else {
				this.rechargeNow = row || null;
				this.cardServiceRechargeVisible = true;
			}
		},
		hideCardServiceRechargeDialog() {
			this.cardServiceRechargeVisible = false;
		},
		// 修改
		showCardServiceUpdateDialog(row) {
			if (row && row.customerStatus === 2) {
				this.$message.error(
					"该客户已停用，请在客户->客户查询->基础设置中启用客户后再操作！"
				);
			} else {
				this.updateNow = row || null;
				this.cardServiceUpdateVisible = true;
			}
		},
		hideCardServiceUpdateDialog() {
			this.cardServiceUpdateVisible = false;
		},
		// 详情
		showCardServiceInfoDialog(row) {
			this.infoNow = row || null;
			this.cardServiceInfoVisible = true;
		},
		hideCardServiceInfoDialog() {
			this.cardServiceInfoVisible = false;
		},
		// 日志
		handleLog(row) {
			baseIndexJump.setInfo("vipCardLog", row.cardNo);
			this.$emit("tabChange", "VipCardLog")
		}
	},
	created() {
		const { jumpId, jumpData } = baseIndexJump.getInfo();
		if (jumpId === "vipCardManage" && jumpData) {
			this.formData.cardId.push(Number(jumpData));
			baseIndexJump.clearInfo();
		}
		if (jumpId === "getCustomerId" && jumpData) {
			this.formData.customerId = Number(jumpData);
			baseIndexJump.clearInfo();
		}
		this.getDatas();
		this.queryMemberCards();
		this.queryStaffs("");
	}
};
</script>

<style lang="less" scoped>
.vip-card-manage {
	height: 100%;
	display: flex;
	flex-direction: column;
	.action-bar {
		display: flex;
		align-items: center;
		margin-top: @margin-size-main;
	}
	.table-base {
		flex: 1;
		margin-top: @margin-size-main;
		.panel {
			display: flex;
			.panel-label {
				color: #666666;
			}
			.panel-content {
				flex: 1;
				color: #333333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.pagination-base {
		text-align: right;
		padding-top: 12px;
	}
	/deep/ .el-icon-question {
		font-size: 16px;
		color: @color-warning;
		margin-left: @margin-size-secondary;
		cursor: pointer;
	}
}
</style>
