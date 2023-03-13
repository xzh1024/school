<template>
	<div class="vip_grade">
		<!-- 会员等级 -->
		<div class="top_btn">
			<el-tooltip
				v-if="tableData.length >= 20"
				effect="dark"
				content="会员等级最多20个，不可再新增"
				placement="top-start"
			>
				<el-button size="small" type="primary">新增会员等级</el-button>
			</el-tooltip>
			<el-button v-else size="small" type="primary" @click="addVipGradeFn"
				>新增会员等级</el-button
			>
			<el-button size="small" type="primary" @click="setVipGradeUpgradeFn"
				>配置等级更新模式</el-button
			>
			<div class="tip_txt">
				*
				会员等级：根据客户的消费、互动等行为来划分客户的等级，不同等级的客户享受不同的权益，才能更好的运营客户
			</div>
		</div>
		<div class="search">
			<span>关键字：</span>
			<el-input
				style="width: 50%; margin-right: 10px"
				placeholder="等级名称"
				size="small"
				v-model="searchObj.keyword"
				clearable
			>
			</el-input>
			<el-button type="primary" size="small" @click="searchFn"
				>查询</el-button
			>
			<el-button size="small" @click="resetFn">重置</el-button>
		</div>

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
				prop="no"
				label="等级编号"
				sortable
				align="center"
				width="120"
			>
			</el-table-column>
			<el-table-column
				prop="name"
				label="等级名称"
				show-overflow-tooltip
				align="center"
				width="200"
			>
				<template slot-scope="scope">
					<span v-if="!scope.row.isEditing">{{
						scope.row.name
					}}</span>
					<el-input
						v-else
						size="small"
						v-model="scope.row.name"
						:maxlength="10"
						placeholder="等级名称"
					></el-input>
				</template>
			</el-table-column>
			<el-table-column
				prop="color"
				label="等级背景"
				align="center"
				width="120"
			>
				<template slot-scope="scope">
					<div
						v-if="!scope.row.isEditing"
						class="bg_div"
						:style="{ background: scope.row.color }"
					></div>
					<ColorList
						v-else
						:bgColor="scope.row.color"
						:colorList="colorList"
						@change="(color) => colorChange(color, scope.row)"
					/>
				</template>
			</el-table-column>
			<el-table-column
				prop="statusName"
				label="等级状态"
				align="center"
				width="120"
			>
			</el-table-column>
			<el-table-column
				prop="rules"
				label="等级规则"
				align="center"
				min-width="430"
			>
				<template slot-scope="scope">
					<GradeRules
						:dataObj="scope.row"
						:isNoway="isNoway"
						@change="(data) => rulesChange(data, scope.row)"
					/>
				</template>
			</el-table-column>
			<el-table-column
				prop="membersCount"
				label="会员数"
				align="center"
				sortable
				width="120"
			>
				<template slot-scope="scope">
					<el-button
						v-if="!scope.row.isEditing && scope.row.membersCount"
						@click="toCustomerQuery(scope.row)"
						type="text"
						size="small"
					>
						{{ scope.row.membersCount }}
					</el-button>
					<span v-else>{{ scope.row.membersCount }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="rights"
				label="等级权益"
				align="center"
				min-width="400"
			>
				<template slot-scope="scope">
					<GradeRights
						:dataObj="scope.row"
						@change="(data) => rulesChange(data, scope.row)"
					/>
				</template>
			</el-table-column>

			<el-table-column
				fixed="right"
				label="操作"
				align="center"
				width="180"
			>
				<template slot-scope="scope">
					<el-button
						v-if="scope.row.isEditing"
						@click="save(scope.row)"
						type="text"
						size="small"
						>保存</el-button
					>
					<el-button
						v-if="!scope.row.isEditing && scope.row.id > 0"
						@click="edit(scope.row)"
						type="text"
						size="small"
						>编辑</el-button
					>
					<el-button
						v-if="scope.row.isEditing"
						@click="cancal(scope.row, scope.$index)"
						type="text"
						size="small"
						>取消</el-button
					>

					<el-button
						v-if="scope.row.status == 1 && scope.row.id > 0"
						@click="stop(scope.row)"
						type="text"
						class="txt_danger"
						size="small"
						>停用</el-button
					>
					<el-button
						v-if="scope.row.status == 2 && scope.row.id > 0"
						@click="restart(scope.row)"
						type="text"
						size="small"
						>启用</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<GradeUpgradeDialog ref="gradeUpgrade" @onRefresh="refreshFn" />
	</div>
</template>

<script>
import ColorList from "./components/colorList.vue"
import GradeRules from "@/components/customer/gradeRules.vue"
import GradeRights from "./components/gradeRights.vue"
import GradeUpgradeDialog from "./components/gradeUpgradeDialog.vue"

import { MemberGradeApi } from './services'
const memberGradeApi = new MemberGradeApi();
const defaultRules = {
	"isEditing": true,
	"no": "1",                     //# 等级编号
	"id": 0,                     //# 会员卡主键ID，ID=0时为新增，ID>0时为修改
	"name": "",                  //# 名称
	"color": "",                 //# 卡背景颜色，空字符串表示没有设置
	"status": 1,                 //# 1:启用;2:停用
	"statusName": "启用",         //# 状态中文名称
	"rules": {                      //# 规则
		"condType": 3,                //# 条件类型，1:满足勾选的任一条件；2:满足勾选的全部条件 3:无门槛;
		"details": [                  //# 规则详情
			{
				"type": 1,                //# 升级规则参数,1:购买金额达;2:消费次数达;3:回款金额达;4:充值金额达;
				"checked": false,          //# true表示已勾选
				"period": 1,             // # 计算周期,1:历史累计;2:近1年;3:近3月;4:近1月;5:近7天;6:近1天;
				"value": ""              //# 数值
			},
			{
				"type": 2,                //# 升级规则参数,1:购买金额达;2:消费次数达;3:回款金额达;4:充值金额达;
				"checked": false,          //# true表示已勾选
				"period": 2,             // # 计算周期,1:历史累计;2:近1年;3:近3月;4:近1月;5:近7天;6:近1天;
				"value": ""              //# 数值
			},
			// {暂时屏蔽
			//   "type": 3,                //# 升级规则参数,1:购买金额达;2:消费次数达;3:回款金额达;4:充值金额达;
			//   "checked": false,          //# true表示已勾选
			//   "period": 3,             // # 计算周期,1:历史累计;2:近1年;3:近3月;4:近1月;5:近7天;6:近1天;
			//   "value": ""              //# 数值
			// },
			{
				"type": 4,                //# 升级规则参数,0:无门槛;1:购买金额达;2:消费次数达;3:回款金额达;4:充值金额达;
				"checked": false,          //# true表示已勾选
				"period": 4,             // # 计算周期,1:历史累计;2:近1年;3:近3月;4:近1月;5:近7天;6:近1天;
				"value": ""              //# 数值
			},
		],
	},
	"membersCount": 0,          //# 会员总数
	"rights": [                   //# 等级权益
		{
			"type": 1,                //# 权益类型,1:零配件权益;2:项目权益;3:套餐权益
			"checked": false,          //# true表示已勾选
			"value": "",           //# 折扣值
			"priceType": "retail"     //# 价格类型（零配件权益时才会返回该字段）
		},
		{
			"type": 2,                //# 权益类型,1:零配件权益;2:项目权益;3:套餐权益
			"checked": false,          //# true表示已勾选
			"value": "",           //# 折扣值
		},
		{
			"type": 3,                //# 权益类型,1:零配件权益;2:项目权益;3:套餐权益
			"checked": false,          //# true表示已勾选
			"value": "",           //# 折扣值
		},
	]
}
export default {
	name: "vipGrade",
	components: {
		ColorList,
		GradeRules,
		GradeRights,
		GradeUpgradeDialog
	},
	data() {
		return {
			searchObj: {},
			tableData: [],
			addObj: {},
			colorList: [],
			hasSelectColorList: [],
			isEditing: false,
			isNoway: false//列表中是否有无门槛：false(无)

		}
	},
	created() {
		this.getColorList();
	},
	mounted() {
		this.initData();
	},
	methods: {
		getColorList() {//获取会员等级背景颜色列表
			this.colorList = [];
			let params = {
				type: 1
			}
			memberGradeApi.getMemberColorList(params).then(res => {
				this.colorList = res;
			})
		},
		toCustomerQuery(row) {
			if (!row.membersCount) return;
			let obj = {
				path: '/customer/customerQuery',
				query: {
					memberGradeId: row.id
				}
			}
			this.$router.push(obj);
		},
		rulesChange(data, row) {
			row = data;
		},
		colorChange(color, row) {
			row.color = color;
		},
		initData() {
			this.tableData = [];
			let params = {
				...this.searchObj
			}
			this.isNoway = false;
			memberGradeApi.getMemberGradeList(params).then(res => {
				let tableData = res ? res : [];
				tableData.forEach(p => {
					if (p.rules.condType == 3) {
						this.isNoway = true;
						if (!p.rules.details) {
							p.rules.details = [
								{
									type: 1,
									checked: false,
									period: 1,
									value: ""
								},
								{
									type: 2,
									checked: false,
									period: 2,
									value: ""
								},
								// {
								//   type: 3,                
								//   checked: false,         
								//   period: 3,         
								//   value: ""     
								// },
								{
									type: 4,
									checked: false,
									period: 4,
									value: ""
								},
							]
						}
					}
					this.tableData.push({ ...p, isEditing: false })
				})
			})
		},
		isEditingFn() {//是否正在编辑table
			let flag = false;
			this.tableData.forEach(p => {
				if (p.isEditing) {
					flag = true;
				}
			})
			return flag;
		},
		toScrollTop() {//滚动到table 底部
			let table_body = document.querySelector('.el-table--scrollable-y .el-table__body-wrapper');
			if (!table_body) return;
			let c_H = table_body.clientHeight;
			let sc_H = table_body.scrollHeight;
			let s_t = (sc_H - c_H) + 300;
			table_body.scrollTop = s_t;
		},
		addVipGradeFn() {
			this.addObj = {};
			if (this.isEditingFn()) {
				this.$message.warning('当前正在添加或编辑会员等级，请先保存后再继续');
				return false;
			}
			let len = this.tableData.length;
			if (len < 20) {

				this.addObj = JSON.parse(JSON.stringify(defaultRules));
				this.addObj.no = "" + (len + 1);
				for (let k of this.colorList) {
					if (!k.used) {
						this.addObj.color = k.color;
						break;
					}
				}
				let obj = {
					...this.addObj
				}
				if (this.isNoway) {
					obj.rules.condType = 1;
				}
				this.tableData.push(obj);
				setTimeout(() => {
					this.toScrollTop();
				}, 200)

			} else {
				this.$message.warning('会员等级最多20个，不可再新增');
			}
		},
		setVipGradeUpgradeFn() {
			if (this.isEditingFn()) {
				this.$message.warning('当前正在添加或编辑会员等级，请先保存后再继续');
				return false;
			}
			this.$refs.gradeUpgrade.show();
		},
		searchFn() {
			this.initData();
		},
		resetFn() {
			this.searchObj = {};
			this.initData();
		},
		refreshFn() {
			this.initData();
		},
		edit(row) {//编辑
			let flag = false;
			this.tableData.forEach(p => {
				if (!p.id) {
					flag = true;
				}
			})
			if (flag) {
				this.$message.warning('当前正在添加会员等级，请先保存后再继续');
				return false;
			}
			this.tableData.forEach(p => {
				if (p.id && p.id == row.id) {
					p.isEditing = !p.isEditing;
				} else {
					p.isEditing = false;
				}
			})
			let nowayId = null;//无门槛所在行ID
			let nowayFlag = false;//判断是否存在无门槛
			this.tableData.forEach(p => {
				if (p.rules.condType == 3) {
					nowayId = p.id;
					nowayFlag = true;
				}
			})
			if (nowayFlag && row.id == nowayId) {
				this.isNoway = false;
			} else if (nowayFlag && row.id !== nowayId) {
				this.isNoway = true;
			} else {
				this.isNoway = false;
			}
		},
		stop(row) {//停用

			let text = "停用等级将对现有客户的会员等级造成影响，如需停用请提前告知客户，以免造成不必要冲突，请谨慎操作。";
			this.$confirm(text).then(_ => {
				let params = {
					id: row.id,
					obj: {
						status: 2
					}
				}
				memberGradeApi.updateMemberGradeStatus(params).then(res => {
					this.$message.success('停用成功');
					this.initData();
				})
			})
				.catch(() => { });
		},
		restart(row) {//启用
			let text = "启用当前等级将对现有客户的会员等级重新计算，可能会导致会员等级发生变动，变动将会在一段时间内完成。";
			this.$confirm(text).then(_ => {
				let params = {
					id: row.id,
					obj: {
						status: 1
					}
				}
				memberGradeApi.updateMemberGradeStatus(params).then(res => {
					this.$message.success('启用成功');
					this.initData();
				})
			})
				.catch(() => { });
		},
		cancal(row, index) {//取消
			if (row.id == 0) {
				this.tableData.splice(index, 1);
				this.addObj = {};
			} else {
				this.getColorList();
				this.initData();
				this.addObj = {};
				// row.isEditing = !row.isEditing;    
			}

		},
		save(row) {//保存
			let _this = this;
			if (!row.name) {
				_this.$message.warning("请输入等级名称");
				return false;
			}
			let condType = row.rules.condType;
			let rulesDetail = row.rules.details;
			if (condType != 3) {
				let condFlag = false;
				for (let k of rulesDetail) {
					if (k.checked) {
						condFlag = true;

					}
				}
				if (!condFlag) {
					_this.$message.warning("请填写或勾选等级规则指标！");
					return false;
				}
			}
			for (let k of rulesDetail) {
				if (k.checked && k.type && (!k.value || !Number(k.value))) {
					if (k.type == 1) {
						_this.$message.warning("等级规则，请输入购买金额");
						return false;
					}
					if (k.type == 2) {
						_this.$message.warning("等级规则，请输入消费次数");
						return false;
					}
					if (k.type == 3) {
						_this.$message.warning("等级规则，请输入回款金额");
						return false;
					}
					if (k.type == 4) {
						_this.$message.warning("等级规则，请输入充值金额");
						return false;
					}
				}
			}
			let rights = row.rights;
			for (let k of rights) {
				if (k.checked && k.type && (!k.value || !Number(k.value))) {
					if (k.type == 1) {
						_this.$message.warning("等级权益，请输入配件折扣");
						return false;
					}
					if (k.type == 2) {
						_this.$message.warning("等级权益，请输入项目折扣");
						return false;
					}
					if (k.type == 3) {
						_this.$message.warning("等级权益，请输入套餐折扣");
						return false;
					}
				}
			}

			let params = JSON.parse(JSON.stringify(row));
			delete params.isEditing;
			if (params.rules.condType == 3) {
				params.rules.details = [];
			}
			memberGradeApi.updateMemberGrade(params).then(res => {
				row.isEditing = false;
				this.$message.success('成功');
				this.getColorList();
				this.initData();
			}).catch(err => {
				this.$message.error(err.message);
			})
		},
	}
}
</script>

<style  lang="less" scoped>
.vip_grade {
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: @padding-size-secondary @padding-size-main;
	.top_btn {
		display: flex;
		align-items: center;
		.tip_txt {
			margin-left: @margin-size-main;
			color: @color-warning;
		}
	}
	.search {
		width: 652px;
		margin: @margin-size-secondary 0;
	}
	.xtable {
		flex: 1;
		.bg_div {
			width: 60px;
			height: 20px;
			border: none;
			margin: auto;
		}
	}
	.txt_danger {
		color: #f56c6c;
	}
}
</style>
