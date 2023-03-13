<template>
	<div class="label_manage">
		<div class="label_search">
			<el-input
				size="small"
				style="width: 300px"
				placeholder="标签名称"
				suffix-icon="el-icon-search"
				v-model="searchIpt"
			>
			</el-input>
			<el-button
				type="primary"
				size="small"
				style="margin-left: 10px"
				@click="searchFn"
				>查询</el-button
			>
			<el-button size="small" @click="resetFn">重置</el-button>
		</div>
		<div class="add_label">
			<el-button type="primary" size="small" @click="addLabelFn"
				>新建标签</el-button
			>
		</div>

		<el-table
			ref="multipleTable"
			class="xtable"
			size="small"
			@selection-change="handleSelectionChange"
			@sort-change="sortChange"
			:data="tableData"
			border
			stripe
			tooltip-effect="dark"
			height="450px"
			style="width: 100%"
		>
			<el-table-column fixed type="selection" align="center" width="55">
			</el-table-column>
			<el-table-column
				prop="name"
				label="标签名称"
				align="center"
				min-width="300"
			>
			</el-table-column>
			<el-table-column
				prop="customerCount"
				label="客户数"
				align="center"
				sortable="custom"
				min-width="300"
			>
				<template slot-scope="scope">
					<el-button
						v-if="scope.row.customerCount"
						@click="toReplaceClick(scope.row)"
						type="text"
						size="small"
					>
						{{ scope.row.customerCount }}
					</el-button>
					<span v-else>{{ scope.row.customerCount }}</span>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				align="center"
				width="160"
			>
				<template slot-scope="scope">
					<el-button
						@click="editClick(scope.row, scope.$index)"
						type="text"
						size="small"
						>编辑</el-button
					>
					<el-button
						@click="delClick(scope.row, scope.$index)"
						type="text"
						class="txt_danger"
						size="small"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<div class="page_footer">
			<div>
				<el-checkbox
					v-model="searchResult"
					@change="tableDataChange(tableData)"
					>全选当前查询结果</el-checkbox
				>
				<span
					style="
						margin: 0px 6px;
						padding: 0px 6px;
						border-left: 1px solid #000;
						border-right: 1px solid #000;
					"
					>已选中 {{ selection.length }} 条</span
				>
				<span>批量操作</span>
				<el-button
					plain
					size="small"
					type="danger"
					style="margin-left: 5px"
					@click="allDeleteFn"
					>删除</el-button
				>
			</div>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageInfo.page"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="pageInfo.pageSize"
				layout="total, prev, pager, next, jumper, sizes"
				:total="pageInfo.totalSize"
			>
			</el-pagination>
		</div>
		<el-dialog
			:title="labelTitle"
			:close-on-click-modal="false"
			:visible.sync="labelVisible"
			width="450px"
		>
			<el-form
				:model="labelForm"
				:rules="rules"
				ref="labelForm"
				label-width="100px"
				class="demo-ruleForm"
			>
				<el-form-item label="标签名称" prop="name">
					<el-input
						v-model="labelForm.name"
						size="small"
						placeholder="最多可输入10个字符"
					></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="cancelClick('labelForm')"
					>取消</el-button
				>
				<el-button
					size="small"
					type="primary"
					@click="saveClick('labelForm')"
					>保存</el-button
				>
				<el-button
					size="small"
					type="primary"
					v-if="labelTitle == '新建标签'"
					@click="submitClick('labelForm')"
					>保存并新建</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import { LabelManageApi } from './services'
const labelManageApi = new LabelManageApi();

export default {
	name: "label_manage_page",
	data() {
		return {
			tableData: [],
			multipleSelection: [],
			selection: [],//已选中
			searchIpt: '',
			order: '',//排序
			pageInfo: {
				page: 1,
				totalSize: 100,
				pageSize: 20
			},
			searchResult: false,
			labelVisible: false,
			labelTitle: "新建标签",
			labelForm: {
				name: '',
			},
			rules: {
				name: [
					{ required: true, message: '请输入标签名称', trigger: 'blur' },
					{ max: 10, message: '最多可输入10个字符', trigger: 'blur' }
				],
			},
			editIndex: -1,
			searchAll: false,//  delete查询结果所有,true:是;false:不是
		}
	},
	created() {
		sessionStorage.removeItem("customerQueryObj");
	},
	mounted() {
		this.initData();
	},
	methods: {
		initData() {//数据初始化
			let obj = {
				page: this.pageInfo.page,
				pageSize: this.pageInfo.pageSize,
				name: this.searchIpt,
			};
			if (this.order) {
				if (this.order == 'descending') {//客户数降序
					obj.order = 'customerCount-desc';
				} else if (this.order == 'ascending') {//客户数升序
					obj.order = 'customerCount-asc';
				}
			}
			labelManageApi.getLabelsInfo(obj).then(res => {

				this.tableData = res.rows || [];
				this.pageInfo.totalSize = res.totalSize;
			}).catch(error => {
				console.log(error);
			});
		},
		searchFn() {
			this.initData();
			this.$refs.multipleTable.clearSelection();
			this.searchResult = false;
		},
		sortChange({ order }) {
			this.order = order;
			this.initData();
		},
		resetFn() {
			this.searchIpt = '';
			this.searchFn();
		},
		toReplaceClick(row) {//跳转
			let obj = {
				path: '/customer/customerQuery/list',
				query: {
					labelId: row.id
				}
			}
			this.$router.push(obj);
			// window.location.replace('#/rplm_custom?labelId='+row.id);
		},
		editClick(row, index) {//编辑
			this.labelTitle = '编辑标签';
			this.editIndex = index;
			this.labelVisible = true;
			this.labelForm = Object.assign({}, row);

		},

		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.selection = val;
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
		delClick(row, index) {//删除
			this.searchAll = false;
			this.$confirm('删除后已标记的客户将自动失去该标签，你确定要删除当前标签吗？')
				.then(_ => {
					//调用删除接口

					this.deleteFn(row, 0);
				})
				.catch(_ => { });
		},
		deleteFn(delData, type) {
			let obj = {};
			if (!type) {
				obj = {
					searchAll: this.searchAll,
					cond: {
						name: this.searchIpt
					},
					ids: [delData.id]
				};
			} else {
				obj = {
					searchAll: this.searchAll,
					cond: {
						name: this.searchIpt
					},
					ids: []
				};
				delData.forEach(p => {
					obj.ids.push(p.id);
				})
			}
			labelManageApi.deleteLabels(obj).then(res => {
				this.$message({
					message: '删除成功',
					type: 'success'
				});
				this.searchFn();
			}).catch(error => {
				console.log(error ? error : '删除失败');
			});
		},
		allDeleteFn() {//批量删除
			if (!this.selection.length) {
				this.$message({
					message: '你还没有选择数据',
					type: 'warning'
				});
				return false;
			}
			this.$confirm('删除后已标记的客户将自动失去该标签，你确定要删除当前标签吗？')
				.then(_ => {
					//调用删除接口
					this.deleteFn(this.selection, 1);
				})
				.catch(error => {
					this.$message.error(error);
				});

		},
		tableDataChange(val) {
			this.toggleSelection(val);
		},
		toggleSelection(rows) {
			if (rows) {
				this.searchAll = true;
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.searchAll = false;
				this.$refs.multipleTable.clearSelection();
			}
		},
		addLabelFn() {//新建标签
			this.labelTitle = '新建标签';
			this.labelVisible = true;
			this.labelForm = {
				// name:'',
			}
		},
		cancelClick(formName) {//取消
			this.labelVisible = false;
			// this.$refs[formName].resetFields();
		},
		saveClick(formName) {//保存
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.labelTitle == '新建标签') {//新建
						labelManageApi.insertLabels(this.labelForm).then(res => {
							this.$message({
								message: '新建标签成功',
								type: 'success'
							});
							this.initData();
							this.labelVisible = false;
							this.$refs[formName].resetFields();
						}).catch(error => {
							console.log(error);
						});

					} else {//编辑
						//保存接口
						let params = {
							id: this.labelForm.id,
							name: this.labelForm.name
						}
						labelManageApi.updateLabels(this.labelForm).then(res => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.initData();
							this.labelVisible = false;
						}).catch(error => {
							console.log(error);
						});
					}

				} else {
					return false;
				}
			});
		},
		submitClick(formName) {//保存并新建
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//保存并新建接口
					labelManageApi.insertLabels(this.labelForm).then(res => {
						this.$message({
							message: '新建标签成功',
							type: 'success'
						});
						this.initData();
						// this.labelVisible = false;
						this.$refs[formName].resetFields();
					}).catch(error => {
						console.log(error);
					});
				} else {
					return false;
				}
			});
		}
	}
}
</script>
<style lang="less" scoped>
.label_manage {
	background: #ffffff;
	height: 100%;
	overflow: hidden;
	text-align: left;
	padding: @padding-size-main;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	.add_label {
		margin: @margin-size-main 0;
	}
	.txt_danger {
		color: #f56c6c;
	}
	.txt_danger:hover {
		color: #f78989;
	}
	.page_footer {
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}
}
</style>
