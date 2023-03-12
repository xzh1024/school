<template>
	<div class="goods_parts">
		<!-- 零配件 -->
		<div class="parts_search">
			<Search
				@onResetFn="resetFn"
				@onSearchFn="searchFn"
				@onMoreSeacrh="moreSeacrhFn"
				:placeholder="placeholder"
			/>
			<el-button size="small" type="primary" @click="goShelves"
				>去上下架配件</el-button
			>
			<!-- <DialogShelvesCom type='1'  /> -->
		</div>

		<el-row class="more_search_box" v-if="moreSearch">
			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">配件分类：</span>
					<el-input
						class="search_item_cont"
						placeholder="配件分类"
						size="small"
						v-model="searchObj.swCategory"
					>
					</el-input>
				</div>
			</el-col>
			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">配件类别：</span>
					<el-input
						class="search_item_cont"
						placeholder="配件类别"
						size="small"
						v-model="searchObj.partType"
					>
					</el-input>
				</div>
			</el-col>
			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">产地：</span>
					<el-input
						class="search_item_cont"
						placeholder="产地"
						size="small"
						v-model="searchObj.productionPlace"
					>
					</el-input>
				</div>
			</el-col>
			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">汽车品牌：</span>
					<el-input
						class="search_item_cont"
						placeholder="汽车品牌"
						size="small"
						v-model="searchObj.vehBrand"
					>
					</el-input>
				</div>
			</el-col>

			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">配件品牌：</span>
					<el-input
						class="search_item_cont"
						placeholder="配件品牌"
						size="small"
						v-model="searchObj.brand"
					>
					</el-input>
				</div>
			</el-col>
			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">配件属性：</span>
					<el-input
						class="search_item_cont"
						placeholder="配件属性"
						size="small"
						v-model="searchObj.partProperty"
					>
					</el-input>
				</div>
			</el-col>
			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">图片：</span>
					<el-select
						v-model="searchObj.image"
						size="small"
						class="search_item_cont"
						placeholder="请选择"
					>
						<el-option value="0" label="全部"></el-option>
						<el-option value="1" label="已上传"></el-option>
						<el-option value="2" label="未上传"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col class="search_item_4">
				<div class="search_item">
					<span class="label">标准化：</span>
					<el-select
						v-model="searchObj.cleaned"
						class="search_item_cont"
						size="small"
						placeholder="请选择"
					>
						<el-option value="0" label="全部"></el-option>
						<el-option value="1" label="已标准化"></el-option>
						<el-option value="2" label="未标准化"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col class="search_item_6">
				<div class="search_item stock">
					<span class="label">价格：</span>
					<el-input
						placeholder="金额"
						style="width: 320px"
						size="small"
						v-model="searchObj.priceValue"
						class="input-with-select"
					>
						<el-select
							v-model="searchObj.priceField"
							class="stock_num"
							slot="prepend"
							placeholder="请选择"
						>
							<el-option
								label="零售价"
								value="retail"
							></el-option>
							<el-option
								label="平台价"
								value="alliance"
							></el-option>
							<el-option label="批发价" value="p"></el-option>
							<el-option label="批价一" value="p1"></el-option>
							<el-option label="批价二" value="p2"></el-option>
							<el-option label="批价三" value="p3"></el-option>
							<el-option label="批价四" value="p4"></el-option>
						</el-select>
						<el-select
							v-model="searchObj.priceType"
							class="stock_status"
							slot="prepend"
							placeholder="请选择"
						>
							<el-option label="全部" value="0"></el-option>
							<el-option label="等于" value="1"></el-option>
							<el-option label="大于" value="2"></el-option>
							<el-option label="小于" value="3"></el-option>
							<el-option label="大于等于" value="4"></el-option>
							<el-option label="小于等于" value="5"></el-option>
						</el-select>
					</el-input>
				</div>
			</el-col>
			<el-col class="search_item_6">
				<div class="search_item stock">
					<span class="label">库存：</span>
					<el-input
						placeholder="数量"
						style="width: 320px"
						size="small"
						v-model="searchObj.qtyValue"
						class="input-with-select"
					>
						<el-select
							v-model="searchObj.qtyField"
							class="stock_num"
							slot="prepend"
							placeholder="请选择"
						>
							<el-option label="库存数量" value="qty"></el-option>
							<el-option
								label="锁定数量"
								value="lockedQty"
							></el-option>
							<el-option
								label="可订货数量"
								value="orderQty"
							></el-option>
						</el-select>
						<el-select
							v-model="searchObj.qtyType"
							class="stock_status"
							slot="prepend"
							placeholder="请选择"
						>
							<el-option label="全部" value="0"></el-option>
							<el-option label="等于" value="1"></el-option>
							<el-option label="大于" value="2"></el-option>
							<el-option label="小于" value="3"></el-option>
							<el-option label="大于等于" value="4"></el-option>
							<el-option label="小于等于" value="5"></el-option>
						</el-select>
					</el-input>
				</div>
			</el-col>
		</el-row>

		<el-table
			:data="tableData"
			border
			stripe
			class="xtable"
			:row-key="rowKey"
			:expand-row-keys="expendRowKeys"
			@expand-change="onExpandChang"
			@selection-change="handleSelectionChange"
			tooltip-effect="dark"
			height="500px"
			size="small"
			ref="multipleTable1"
			style="width: 100%"
		>
			<el-table-column
				fixed
				type="selection"
				align="center"
				:selectable="selectAbleFn"
				width="55"
			>
			</el-table-column>
			<el-table-column type="expand">
				<template slot-scope="props">
					<TableExpand
						v-if="props.row.id"
						:type="type"
						:id="props.row.id"
						:expandRowObj="expandRowObj"
					/>
				</template>
			</el-table-column>

			<el-table-column
				label="配件编码"
				align="center"
				prop="code"
				show-overflow-tooltip
				width="190"
			>
				<template slot-scope="scope">
					<div style="display: flex; align-items: center">
						<!-- <img :src="scope.row.isStandard? stdUrl : unStdUrl" style="width:14px;height:14px;" alt="标"> -->
						<span v-if="scope.row.cleaned" class="standard"
							>标</span
						>
						<span>{{ scope.row.code }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				label="配件名称"
				prop="name"
				align="center"
				show-overflow-tooltip
				width="150"
			>
			</el-table-column>
			<el-table-column align="center" label="性质" prop="property">
			</el-table-column>
			<el-table-column align="center" label="产地" prop="productionPlace">
			</el-table-column>
			<el-table-column
				align="center"
				label="配件品牌"
				show-overflow-tooltip
				prop="brand"
			>
			</el-table-column>
			<el-table-column
				align="center"
				label="配件分类"
				show-overflow-tooltip
				prop="swCategory"
			>
			</el-table-column>
			<el-table-column
				align="center"
				label="配件属性"
				prop="partProperty"
				show-overflow-tooltip
				width="200"
			>
			</el-table-column>
			<el-table-column align="center" label="可订货数量" prop="orderQty">
			</el-table-column>
			<el-table-column align="center" label="零售价" prop="priceRetail">
			</el-table-column>
			<el-table-column
				align="center"
				label="图片"
				prop="image"
				width="57"
			>
				<!-- <template slot-scope="scope">
          <el-image
            :z-index="3000"
            style="display: table-cell; width: 36px; height: 36px;"
            :src="scope.row.image"
            :preview-src-list="[scope.row.image]"
          >
            <img slot="error" class="not-available-img" :src="imgNoneUrl" />
          </el-image>
        </template> -->
				<template slot-scope="scope">
					<img
						:src="scope.row.image ? scope.row.image : imgNoneUrl"
						style="display: table-cell; width: 36px; height: 36px"
					/>
				</template>
			</el-table-column>
			<el-table-column align="center" label="单位" prop="unitName">
			</el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				align="center"
				width="160"
			>
				<template slot-scope="scope">
					<span
						v-if="scope.row.id != 0"
						@click="editClick(scope.row)"
						class="text_btn"
						>编辑</span
					>
					<el-popover
						placement="bottom"
						width="50"
						v-if="scope.row.id != 0"
						@show="getShareFn(scope.row, scope.$index)"
						trigger="click"
					>
						<div
							style="
								display: flex;
								flex-direction: column;
								width: 100%;
							"
						>
							<el-button
								type="text"
								size="small"
								@click="copyUrl"
								icon="el-icon-paperclip"
								>复制链接</el-button
							>
							<div
								style="
									width: 140px;
									font-family: PingFangSC-Regular;
									font-size: 14px;
									color: #666666;
								"
							>
								<span
									>点击复制商品链接可发送给微信好友或朋友圈</span
								>
							</div>
						</div>
						<span
							slot="reference"
							class="text_btn"
							style="border-right: 0"
							>分享</span
						>
					</el-popover>
					<!-- <span v-if="scope.row.id !=0" @click="standardFn(scope.row,scope.$index)" class="text_btn">标准化</span> -->

					<!-- <el-popover 
            placement="bottom-start"
            width="50"
            trigger="click">
            <div style="display: flex;flex-direction: column;width:100%;">
              <el-button type="primary" plain 
                style="width:100%;border-bottom:0;border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;"
                @click="standardFn(scope.row,scope.$index)">标准化</el-button>
              <el-button type="danger" plain 
                style="width:100%;margin-left:0;border-top-left-radius: 0;
                border-top-right-radius: 0;"
                @click="shelvesFn(scope.row,scope.$index)">下架</el-button>
            </div>
            <span slot="reference" class="text_btn" style="border-right:0;">更多</span>
          </el-popover> -->
				</template>
			</el-table-column>
		</el-table>
		<div class="page_footer">
			<div>
				<el-checkbox v-model="checkedAll" @change="selectAllFn"
					>全选当前查询结果</el-checkbox
				>
				<span
					style="
						padding: 0px 10px;
						margin: 0 10px;
						border-left: 1px solid #000;
						border-right: 1px solid #000;
					"
				>
					已选中 {{ selectLen }} 条
				</span>
				<span>批量操作</span>
				<FooterBtnCom
					:goodType="goodType"
					:selection="selection"
					:disabled="btnDisabled"
					@onShelves="onShelvesFn"
					@onStandard="onStandardFn"
					@onUploadFile="onUploadFileFn"
				/>
			</div>

			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageInfo.page"
				:page-sizes="[10, 20, 50, 100, 200, 1000]"
				:page-size="pageInfo.pageSize"
				layout="total, prev, pager, next, jumper, sizes"
				:total="pageInfo.totalSize"
			>
			</el-pagination>
		</div>

		<!-- 标准化弹框 -->
		<!-- <DialogStandard
      :isAll="searchAll"
      :isShow="dialogStandard1"
      :tableData="standardData"
      @onClose="closeDialogFn"
    /> -->
		<!-- 去上架商品弹框 -->
		<!-- <el-dialog
        title="提示"
        :visible.sync="dialogUpLoad"
        width="30%"
        @close="handleClose">
        <span style="margin-top:10px;display:inline-block;">
          请在{{erpType==2?'云配管家':'思锐软件'}}中进行商品上下架操作
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="erpType==2" type="primary" size="small" @click="goShelves">去操作</el-button>
        </span>
      </el-dialog> -->
	</div>
</template>

<script>
import Search from './searchCom'
// import DialogShelvesCom from './DialogShelvesCom'
import FooterBtnCom from './footerBtnCom'
// import DialogStandard from './DialogStandard'
import TableExpand from './TableExpand'
import { GoodsManageApi } from '../services'
const goodsManageApi = new GoodsManageApi();

export default {
	name: 'goodsParts',
	components: {
		Search,
		// DialogShelvesCom,//上架
		FooterBtnCom,
		// DialogStandard,//标准化弹框
		TableExpand
	},
	data() {
		return {
			placeholder: "配件名称/编码/规格/车型/生产码等关键字",
			moreSearch: false,
			searchObj: {
				keyword: '',//关键字
				// partType:'',//配件类别
				// productionPlace:'',//产地:国产
				// vehBrand:'',//汽车品牌

				// priceValue:'',//价格
				// priceType:'0',//价格  1,等于 2.大于 3.小于 4.大于等于 5.小于等于 0.查询全部
				// priceField:'',// 价格字段 零售价:retail;平台价:alliance;批发价:p;批发价一:p1;批发价二:p2;批发价三:p3;批发价四:p4;

				// partProperty:'',//配件属性 规格/车型
				// qtyValue:'',//库存数量
				// qtyField:'1',//库存字段 qty:实际库存;lockedQty:锁定库存;orderQty:可订货库存数量
				// qtyType:'1',//库存对比类型 1,等于 2.大于 3.小于 4.大于等于 5.小于等于 0.查询全部
				// image:'0',//图片
				// cleaned:'0',//标准化
			},
			tableData: [],
			imgNoneUrl: require('@/assets/img/inquiry/place_40_40.jpg'),
			maxHeight: '676',
			expandRowObj: {},//展开行数据
			stdUrl: require('@/assets/logo.png'),
			unStdUrl: require('@/assets/logo.png'),
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
			type: 0,
			goodType: '零配件',
			dialogStandard: false,//标准化弹框
			dialogStandard1: false,//标准化弹框
			standardData: [],//标准化数据
			shareLink: '',//分享链接
			dialogUpLoad: false, //去上架商品弹框
			erpType: null,
			expendRowKeys: []
		}
	},
	created() {
		this.erpType = this.$store.state.base.erpType;
	},
	mounted() {
		this.initData();
	},
	methods: {
		rowKey(row) {
			if (row.id) {
				return row.id;
			} else {
				let rowKey = row.code + row.swId;
				return rowKey;
			}
		},
		selectAbleFn(row, index) {
			if (row.id == 0) {
				return false;
			} else {
				return true;
			}
		},
		// 去上下架配件
		// openShelves(){
		//   this.dialogUpLoad = true;
		//   // const routeUrl = this.$router.resolve({
		//   //   path: "/partsManage"
		//   // });
		//   // window.open(routeUrl.href, '_blank');
		// },
		goShelves() {
			if (window !== window.top) {
				window.top.postMessage({ type: "jump-parameters" }, "*")
			}
		},
		handleClose() {
			this.dialogUpLoad = false;
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
			let _this = this;
			if (expandedRows.length) {
				if (row.id) {
					_this.expendRowKeys = [row.id];
				} else {
					_this.expandRowObj = {};
					_this.expendRowKeys = [];
					return false;
					// let rowKey = row.code+row.swId;
					// _this.expendRowKeys = [rowKey];
				}

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
				this.$refs.multipleTable1.clearSelection();//清空用户的选择
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
					this.$refs.multipleTable1.toggleRowSelection(row);
				});
			} else {
				this.searchAll = false;
				this.$refs.multipleTable1.clearSelection();
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
		onStandardFn(data) {//批量操作标准化
			this.standardCom(data, 1);
		},
		standardFn(row, index) {//标准化
			this.searchAll = false;
			this.$confirm('你确定要标准化当前商品吗？')
				.then(_ => {
					//调用标准化接口
					this.standardCom([row], 0);
				})
				.catch(_ => { });
		},
		standardCom(selData, type) {//标准化
			this.dialogStandard1 = true;
			this.standardData = selData;

		},
		closeDialogFn(val) {
			this.dialogStandard1 = val;
			this.checkedAll = false;
			this.searchAll = false;
			this.standardData = [];
			this.initData();
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
		//分页
		handleSizeChange(val) {
			this.pageInfo.pageSize = val;
			this.pageInfo.page = 1;
			this.initData();
		},
		handleCurrentChange(val) {
			this.pageInfo.page = val;
			this.initData();
		}

	}

}
</script>

<style lang="less" scoped>
.goods_parts {
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	.parts_search {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	// .more_search_box{
	//   /deep/.el-col{
	//     margin:8px 0;
	//   }
	// }
	// .search_item{
	//   .label{
	//     width:80px;
	//   }
	//   .search_item_cont{
	//     width:180px;
	//   }
	// }
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
		.search_item_6 {
			width: 422px;
		}
		.search_item {
			.label {
				width: 78px;
				margin-right: 4px;
				display: inline-block;
			}
			.search_item_cont {
				width: 180px;
			}
		}
	}
	.price {
		/deep/.el-input-group__prepend {
			width: 40px;
		}
	}
	.stock {
		/deep/.el-input-group__prepend {
			width: 170px;
			padding-right: 10px;
			.stock_num {
				width: 104px;
			}
			.stock_status {
				position: absolute;
				width: 100px;
				top: 9px;
				right: 18px;
				border-left: 1px solid #dcdfe6;
			}
		}
	}
	.xtable {
		margin-top: 10px;
		flex: 1;
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
		/deep/.el-table__fixed-body-wrapper {
			top: 40px !important;
		}
		.standard {
			// width: 28px;
			// height: 22px;
			display: inline-block;
			padding: 1px 7px;
			margin-right: 8px;
			background: #fff1f0;
			border: 1px solid #ff4d4f;
			border-radius: 2px;
			color: #ff4d4f;
			font-family: PingFangSC-Regular;
			font-size: 12px;
			line-height: 18px;
		}
		// .text_btn{
		//   color:#6589F8;
		//   cursor: pointer;
		//   padding: 0 6px;
		//   font-weight: 500;
		//   &:hover{
		//     color:#6589F8;
		//   }
		// }

		.btn_border {
			margin: 0 5px;
			border-left: 1px solid #000;
			border-right: 1px solid #000;
		}
	}
}
</style>
