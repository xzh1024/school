<template>
	<div class="goods_package">
		<!-- 项目套餐 -->
		<div class="parts_search">
			<Search
				@onSearchFn="searchFn"
				@onMoreSeacrh="moreSeacrhFn"
				@onResetFn="resetFn"
				:placeholder="placeholder"
			/>
			<!-- <DialogShelvesCom type='3'/> -->
		</div>
		<el-row class="more_search_box" v-if="moreSearch">
			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">项目套餐类型：</span>

					<el-select
						class="search_item_cont"
						v-model="searchObj.category"
						size="small"
						placeholder="请选择"
					>
						<el-option
							v-for="(item, index) in categoryList"
							:key="index"
							:label="item.name"
							:value="item.code"
						></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col class="search_item_4">
				<div class="search_item price">
					<span class="label" style="width: 70px">价格：</span>
					<el-input
						placeholder="金额"
						style="width: 220px"
						size="small"
						v-model="searchObj.priceValue"
						class="input-with-select"
					>
						<el-select
							v-model="searchObj.priceType"
							slot="prepend"
							placeholder="请选择"
						>
							<el-option label="全部" :value="0"></el-option>
							<el-option label="等于" :value="1"></el-option>
							<el-option label="大于" :value="2"></el-option>
							<el-option label="小于" :value="3"></el-option>
						</el-select>
					</el-input>
				</div>
			</el-col>
			<!-- <el-col :span="4">
        <div class="search_item">
          <span>图片：</span>
          <el-select v-model="searchObj.image" size="small" style="width:160px;" placeholder="请选择">
            <el-option :value="0" label="全部"></el-option>
            <el-option :value="1" label="已上传"></el-option>
            <el-option :value="2" label="未上传"></el-option>
          </el-select>
        </div>
      </el-col> -->
		</el-row>

		<el-table
			:data="tableData"
			border
			stripe
			class="xtable"
			@expand-change="onExpandChang"
			@selection-change="handleSelectionChange"
			tooltip-effect="dark"
			height="500px"
			size="small"
			ref="multipleTable"
			style="width: 100%"
		>
			<!-- <el-table-column
        fixed
        :selectable="selectAbleFn"
        align="center"
        type="selection"
        width="55">
      </el-table-column> -->
			<!-- <el-table-column type="expand">
        <template slot-scope="props">
          <TableExpand 
            :type="type"
            :id="props.id"
            :expandRowObj="expandRowObj"/>
        </template>
      </el-table-column> -->

			<el-table-column
				label="项目套餐编码"
				align="center"
				prop="code"
				min-width="300"
			>
			</el-table-column>
			<el-table-column
				label="项目套餐名称"
				show-overflow-tooltip
				prop="name"
				align="center"
				min-width="300"
			>
			</el-table-column>
			<el-table-column
				align="center"
				label="项目套餐分类"
				show-overflow-tooltip
				prop="category"
				min-width="300"
			>
			</el-table-column>
			<el-table-column
				align="center"
				label="价格"
				prop="showPrice"
				min-width="200"
			>
			</el-table-column>

			<!-- <el-table-column
        align="center"
        label="图片"
        prop="image">
        <template slot-scope="scope">
          <img :src="scope.row.image? scope.row.image :imgNoneUrl" style="width: 36px;height: 36px;">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="单位"
        show-overflow-tooltip
        prop="unit">
      </el-table-column>
      <el-table-column
        align="center"
        label="卖点"
        show-overflow-tooltip
        prop="description">
      </el-table-column> -->
			<el-table-column
				align="center"
				label="备注"
				show-overflow-tooltip
				prop="remarks"
				min-width="320"
			>
			</el-table-column>
			<!-- <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.id !=0" @click="editClick(scope.row)" class="text_btn">编辑</span>
          <span v-if="scope.row.id !=0" @click="shelvesFn(scope.row,scope.$index)" class="text_btn text_danger_btn">下架</span>
          <el-popover v-if="scope.row.id !=0"
            placement="bottom"
            width="50" @show="getShareFn(scope.row,scope.$index)"
            trigger="click">
            <div style="display: flex;flex-direction: column;width:100%;">
              <el-button type="text" size="small" 
                @click="copyUrl" 
                icon="el-icon-paperclip">复制链接</el-button>
              <div style="width:140px;font-family: PingFangSC-Regular;font-size: 14px;color: #666666;">
                <span>点击复制商品链接可发送给微信好友或朋友圈</span>
              </div>
            </div>
            <span slot="reference" class="text_btn" style="border-right:0;">分享</span>
          </el-popover>
        </template>
      </el-table-column> -->
		</el-table>
		<!-- <div class="page_footer">
      <div>
        <el-checkbox v-model="checkedAll" @change="selectAllFn">全选当前查询结果</el-checkbox> 
        <span style="padding:0px 10px;margin: 0 10px;border-left:1px solid #000;border-right:1px solid #000;">
          已选中 {{selectLen}} 条
        </span>
        <span>批量操作</span>
        <FooterBtnCom 
          :goodType='goodType'
          :selection='selection'
          :disabled="btnDisabled"
          @onShelves="onShelvesFn"
          @onUploadFile="onUploadFileFn"
        />
      </div> -->
		<el-pagination
			style="text-align: right"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pageInfo.page"
			:page-sizes="[10, 20, 50, 100, 200, 1000]"
			:page-size="pageInfo.pageSize"
			layout="total, prev, pager, next, jumper, sizes"
			:total="pageInfo.totalSize"
		>
		</el-pagination>
		<!-- </div> -->
	</div>
</template>

<script>
import Search from './searchCom'
import DialogShelvesCom from './DialogShelvesCom'
import FooterBtnCom from './footerBtnCom'
import TableExpand from './TableExpand'

import { GoodsManageApi } from '../services'
const goodsManageApi = new GoodsManageApi();

export default {
	name: 'goodsPackage',
	components: {
		Search,
		DialogShelvesCom,
		FooterBtnCom,
		TableExpand
	},
	data() {
		return {
			placeholder: "套餐编码/名称等关键字",
			moreSearch: false,
			searchObj: {
				keyword: '',
				// packageType:'',//套餐类型
				// priceValue:'',//价格
				// priceType:'0',//
				// image:'0',//图片
			},
			tableData: [
				// {
				//   id: '12987122',
				//   code:'123456789',//项目套餐编码
				//   name:'洗车',//项目套餐名称
				//   partType:'保养',//项目套餐分类
				//   showPrice:'120.00',//价格
				//   image:require('@/assets/logo.png'),//图片
				//   unit:'次',//单位
				//   description:"这里是卖点这里是卖点这里是卖点这里是卖点",//卖点：
				//   alink:'链接',//链接
				// },
			],
			imgNoneUrl: require('@/assets/img/inquiry/place_40_40.jpg'),
			maxHeight: '400',
			expandRowObj: {},//展开行数据
			multipleSelection: [],
			selection: [],//已选中
			checkedAll: false,
			searchAll: false,
			selectLen: 0,
			btnDisabled: true,

			pageInfo: {
				page: 1,
				totalSize: 10,
				pageSize: 20
			},
			goodType: '项目套餐',
			type: 2,
			categoryList: [
				'普通套餐', '定保套餐'
			],
			shareLink: '',//分享链接
		}
	},
	created() {
		this.getGoodsCategory();
	},
	mounted() {
		this.initData();
	},
	methods: {
		selectAbleFn(row, index) {
			if (row.id == 0) {
				return false;
			} else {
				return true;
			}
		},
		getGoodsCategory() {
			let obj = {
				type: this.type
			}
			goodsManageApi.getGoodsCategory(obj).then(res => {
				this.categoryList = res;
			}).catch(error => {
				console.log(error);
			});
		},
		initData() {//数据初始化
			let obj = {
				type: this.type,
				page: this.pageInfo.page,
				pageSize: this.pageInfo.pageSize,
				...this.searchObj
			};
			this.tableData = [];
			goodsManageApi.getGoodsTableList(obj).then(res => {
				this.checkedAll = false;
				this.searchAll = false;
				if (res) {
					this.tableData = res.rows || [];
					this.pageInfo.totalSize = res.totalSize;
				}
			}).catch(error => {
				console.log(error);
			});
		},
		searchFn(data) {
			this.searchObj.keyword = data;
			this.pageInfo.page = 1;
			this.initData();
		},
		moreSeacrhFn(data) {
			this.moreSearch = data;
			if (data) {
				this.maxHeight = '550';
			} else {
				this.maxHeight = '676';
			}
			let keyword = this.searchObj.keyword;
			this.searchObj = {
				keyword: keyword
			}
		},
		resetFn() {
			this.searchObj = {};
			this.initData();
		},
		editClick(row) {//编辑
			let url = `/goodsManage/goodsEdit?id=${row.id}&type=${this.type}`;
			sessionStorage.setItem('oldPath', url);
			let obj = {
				path: '/goodsManage/goodsEdit',
				query: {
					id: row.id,
					type: this.type
				}
			}
			this.$router.push(obj);
		},
		onExpandChang(row, expandedRows) {//列表展开时
			if (expandedRows.length) {
				let _this = this;
				_this.expandRowObj = {};
				let params = {
					id: row.id,
					type: _this.type
				}
				goodsManageApi.getGoodsDetail(params).then(res => {
					_this.expandRowObj = res;
				}).catch(error => {
					console.log(error);
				});
			}

		},
		getShareFn(row) {
			let _this = this;
			let params = {
				id: row.id,
				type: _this.type
			}
			_this.shareLink = '';
			goodsManageApi.getGoodsShare(params).then(res => {
				if (res) {
					let resArr = res.split('?');
					_this.shareLink = resArr[0] + '/skuDetail?' + resArr[1];
				}
			}).catch(error => {
				console.log(error);
			});
		},
		copyUrl() {//复制链接
			var _this = this;
			if (_this.shareLink) {
				_this.$copyText(_this.shareLink).then(function (e) {
					_this.$message({
						message: '已复制到剪贴板',
						type: 'success'
					});
				}, function (e) {
					_this.$message({
						message: '复制失败',
						type: 'error'
					});
				})
			} else {
				_this.$message({
					message: '链接不存在',
					type: 'error'
				});
			}
		},
		selectAllFn(foo) {
			if (foo) {
				this.selectLen = this.pageInfo.totalSize;
				this.btnDisabled = this.pageInfo.totalSize ? false : true;
			} else {
				this.selectLen = 0;
				this.$refs.multipleTable.clearSelection();//清空用户的选择
				this.btnDisabled = true;
			}
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


		shelvesFn(row, index) {//下架
			this.searchAll = false;
			this.$confirm('你确定要下架当前商品吗？下架后将无法在店铺中展示当前商品！')
				.then(_ => {
					//调用下架接口
					this.shelvesCom(row, 0);
				})
				.catch(_ => { });
		},
		onShelvesFn(data) {//批量操作下架
			this.shelvesCom(data, 1);
		},
		shelvesCom(selData, type) {
			let obj = {};
			if (!type) {
				obj = {
					searchAll: this.searchAll,
					cond: {
						...this.searchObj
					},
					ids: [selData.id]
				};
			} else {
				obj = {
					searchAll: this.searchAll,
					cond: {
						...this.searchObj
					},
					ids: []
				};
				selData.forEach(p => {
					obj.ids.push(p.id);
				})
			}
			return
			accounts_delete("/companies/labels", obj).then(res => {
				this.$message({
					message: '下架成功',
					type: 'success'
				});
				this.searchFn();
			}).catch(error => {
				this.$message.error(error ? error : '下架失败');
			});
		},
		onUploadFileFn(data) {//批量操作上传图片
			this.uploadFileCom(data, 1);
		},
		uploadFileCom(selData, type) {//上传图片
			let obj = {};
			let that = this;
			if (!type) {
				obj = {
					type: that.type,
					searchAll: that.searchAll,
					cond: {
						...that.searchObj
					},
					ids: [selData.id]
				};
			} else {
				obj = {
					type: that.type,
					searchAll: that.searchAll,
					cond: {
						...that.searchObj
					},
					ids: [],
					images: selData.images
				};
				selData.selectData.forEach(p => {
					obj.ids.push(p.id);
				})
			}

			goodsManageApi.uploadImages(obj).then(res => {
				that.$message.success('上传成功');
				that.initData();
			}).catch(error => {
				console.log(error);
			});
		},

		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.checkedAll = false;
			this.selection = val;
			this.selectLen = val.length;
			this.btnDisabled = val.length ? false : true;
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
.goods_package {
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	.parts_search {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.price {
		/deep/.el-input-group__prepend {
			width: 50px;
		}
	}
	.stock {
		/deep/.el-input-group__prepend {
			width: 150px;
			.stock_num {
				width: 116px;
			}
			.stock_status {
				position: absolute;
				width: 80px;
				top: 9px;
				right: 18px;
				border-left: 1px solid #dcdfe6;
			}
		}
	}
	.more_search_box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		/deep/.el-col {
			margin: 4px 0;
		}
		.search_item_4 {
			width: 300px;
		}
		.search_item {
			.label {
				width: 98px;
				margin-right: 4px;
				display: inline-block;
			}
			.search_item_cont {
				width: 197px;
			}
		}
	}
	.xtable {
		flex: 1;
		margin: 10px 0;
		.expand_item {
			display: flex;
			background: @bg-color-base;
			.img_item {
				padding: 12px 16px;
				img {
					width: 80px;
					height: 80px;
					padding: 8px;
					background: #ffffff;
					border: 1px solid #d9d9d9;
					border-radius: 2px;
				}
			}
			.order {
				/deep/.el-form-item__label {
					font-size: 12px;
				}
			}
			.el-form-item {
				margin-bottom: 0;
			}
			/deep/.el-form-item__label,
			/deep/.el-form-item__content {
				line-height: 22px;
			}
			/deep/.el-form-item__label {
				color: @text-color-secondary;
			}
			.el-col {
				margin: 4px 0;
			}
		}
		/deep/tr.el-table__row--striped td {
			background: @bg-color-table-striped;
		}
		.btn_border {
			margin: 0 5px;
			border-left: 1px solid #000;
			border-right: 1px solid #000;
		}
	}
}
</style>
