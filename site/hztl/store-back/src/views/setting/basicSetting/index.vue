<template>
	<div class="basic_setting">
		<!-- 库存设置 -->
		<div class="goods_div">
			<!-- <div class="goods_title">库存设置</div> -->
			<DetailTitle titleName="库存设置" />
			<div class="goods_info">
				<p class="autoConfirmDiv item_set">
					是否展示0库存配件
					<el-switch v-model="postData.allowZeroStock"></el-switch>
					<span
						v-if="postData.allowZeroStock"
						class="switch-yes"
						style="bottom: 0; left: 132px"
						>是</span
					>
					<span
						v-if="!postData.allowZeroStock"
						class="switch-no"
						style="bottom: 0; left: 147px"
						>否</span
					>
					<span class="greyColor tip_left"
						>* 若设置为“是”，则真实的可订货库存为0
						的配件客户可以查到，若设置为“否”则真实的可订货库存为0的配件客户将无法查询到</span
					>
				</p>
				<div class="set_margin_bottom">
					<span>库存展示设置</span>
					<span class="greyColor tip_left"
						>（在可订货数量的基础上设置展示给客户看的库存信息，未包含在库存区间内的将展示真实的库存）</span
					>
				</div>
				<div class="tip_ptn tip_stock" v-if="!isErpUser">
					<template v-if="stockShowModeVisible">
						<el-popover placement="top" width="600" trigger="click">
							<div>
								<p>
									举例：配件A性质完好，在仓库1有库存10个、仓库2有库存20个、仓库3有库存30个、仓库4有库存40个，此时库存分组1关联仓库1仓库2、库存分组2关联仓库3仓库4，100及以上库存状态“充足”、30及以下展示“紧张”；此时按下列三种不同的维度展示库存效果
								</p>
								<div class="mt-3">
									<div class="flex">
										<div class="tip_label">按配件：</div>
										<div class="tip_content greyColor">
											配件A 库存：充足
										</div>
									</div>
									<div class="flex">
										<div class="tip_label">
											按配件+库存分组：
										</div>
										<div class="tip_content greyColor">
											<p>配件A 库存分组1 库存：紧张</p>
											<p style="margin-left: 43px">
												库存分组2 库存：70个
											</p>
										</div>
									</div>
									<div class="flex">
										<div class="tip_label">
											按配件+仓库：
										</div>
										<div class="tip_content greyColor">
											<p>配件A 仓库1 库存：紧张</p>
											<p style="margin-left: 43px">
												仓库2 库存：紧张
											</p>
											<p style="margin-left: 43px">
												仓库3 库存：紧张
											</p>
											<p style="margin-left: 43px">
												仓库4 库存：40个
											</p>
										</div>
									</div>
								</div>
							</div>
							<i
								slot="reference"
								class="el-icon-question tips_logo"
							></i>
						</el-popover>
						<div style="margin-left: 10px">
							<span>库存展示维度</span>
						</div>
						<el-radio-group v-model="postData.stockShowMode">
							<el-radio :label="0" class="radio-margin"
								>按配件</el-radio
							>
							<el-radio :label="1" class="radio-margin"
								>按配件+库存分组</el-radio
							>
							<el-radio :label="2" class="radio-margin"
								>按配件+仓库</el-radio
							>
						</el-radio-group>
						<span class="tip_left">
							<span class="greyColor"
								>*
								若按配件+库存分组设置，需要先创建库存分组</span
							>
							<a @click="toStockGroup" class="primaryColor"
								>去设置 ></a
							>
						</span>
					</template>
				</div>
				<div class="stock-container">
					<div style="max-height: 200px; overflow: auto">
						<div
							v-for="(item, index) in postData.stockRangeRule"
							:key="index"
							style="
								display: flex;
								align-items: center;
								margin-bottom: 8px;
							"
						>
							<el-tooltip
								:enterable="false"
								effect="dark"
								content="删除"
								placement="top"
							>
								<i
									class="el-icon-delete del_logo"
									@click="clearStockItem(index)"
								></i>
							</el-tooltip>
							<div style="margin-right: 8px">库存区间</div>
							<el-input
								v-model="item.startQty"
								type="number"
								size="small"
								placeholder="-"
								style="flex: none; width: 90px"
								@change="onNumberInput('startQty', item)"
							/>
							<div style="margin: 0 8px">至</div>
							<el-input
								v-model="item.endQty"
								type="number"
								size="small"
								placeholder="-"
								style="flex: none; width: 90px"
								@change="onNumberInput('endQty', item)"
							/>
							<div style="margin: 0 8px">时库存展示为</div>
							<div
								style="
									display: flex;
									align-items: center;
									margin-left: 5px;
								"
							>
								<el-select
									v-model="item.type"
									size="small"
									style=""
								>
									<el-option
										v-for="(type, index) in STOCK_TYPES"
										:key="index"
										:disabled="
											!item.endQty && type.code == 5
										"
										:label="type.name"
										:value="type.code"
									/>
								</el-select>
								<el-input
									v-model="item.upperLimitQty"
									v-show="item.type === 5"
									type="number"
									size="small"
									style="flex: none; width: 80px"
									@change="
										onNumberInput('upperLimitQty', item)
									"
								/>
							</div>
						</div>
					</div>
					<el-button type="text" @click="addStockItem"
						>添加库存区间</el-button
					>
				</div>
			</div>
		</div>
		<!-- 价格设置 -->
		<div class="goods_div">
			<DetailTitle titleName="价格设置" />
			<div class="goods_info">
				<p class="autoConfirmDiv item_set">
					是否展示0价格商品
					<el-switch
						v-model="postData.allowZeroPrice"
						:class="postData.allowZeroPrice ? 'yes' : 'no'"
					></el-switch>
					<span class="greyColor tip_left"
						>*
						若设置为“是”，则客户享受的价格类型为0时客户也可以查询到该商品，但0价格的商品不允许提交订单；若设置为“否”
						，则客户享受的价格类型为0时客户将无法查询到该商品</span
					>
				</p>
			</div>
		</div>
		<!-- 商品设置 -->
		<div class="goods_div">
			<DetailTitle titleName="商品设置" />
			<div class="goods_info">
				<p class="autoConfirmDiv item_set">
					是否展示划线价
					<el-switch
						v-model="postData.showLinePrice"
						:class="postData.showLinePrice ? 'yes' : 'no'"
					></el-switch>
					<span class="greyColor tip_left">
						*若设置为“是”，则展示商品头上设置的划线价，默认划线价为商品的最高价；若设置为‘否’，则不展示商品头上设置的划线价
					</span>
				</p>
			</div>
		</div>
		<!-- 订单设置 -->
		<div class="goods_div">
			<DetailTitle titleName="订单设置" />
			<div class="goods_info">
				<p class="stockChechDiv item_set">
					下单时是否需要校验库存
					<el-switch v-model="postData.checkStock"></el-switch>
					<span
						v-if="postData.checkStock"
						class="switch-yes"
						style="bottom: 0; left: 165px"
						>是</span
					>
					<span
						v-if="!postData.checkStock"
						class="switch-no"
						style="bottom: 0; left: 180px"
						>否</span
					>
					<span class="greyColor tip_left"
						>*若设置为“是”，用户只能购买您有库存的商品；若设置为“否”，用户购买配件不受库存限制</span
					>
				</p>
				<p class="autoConfirmDiv item_set">
					是否自动确认订单
					<el-switch v-model="postData.autoConfirmOrder"></el-switch>
					<span
						v-if="postData.autoConfirmOrder"
						class="switch-yes"
						style="bottom: 0; left: 123px"
						>是</span
					>
					<span
						v-if="!postData.autoConfirmOrder"
						class="switch-no"
						style="bottom: 0; left: 138px"
						>否</span
					>
					<span class="greyColor tip_left"
						>*若设置为“是”，客户提交订单后，系统将自动确认订单，客户直接进入支付环节；若设置为“否”，客户提交订单后，需要您手动去确认接单后，客户才能进行付款</span
					>
				</p>
				<p class="item_set">
					订单完成发货
					<el-input-number
						style="width: 88px"
						controls-position="right"
						v-model="postData.autoReceiveOrder"
						:step="1"
						size="small"
						:min="0"
						@change="onNumberInput('autoReceiveOrder')"
					>
					</el-input-number>
					天后系统自动收货
					<span class="greyColor tip_left"
						>*订单中的商品全部完成发货后到达当前设置的天数后系统自动对该订单进行收货，并将此订单更新为“已完成”状态</span
					>
				</p>
				<div class="item_set">
					<span>订单线下支付财务审核方式</span>
					<el-radio-group v-model="postData.autoConfirmOfflinePay">
						<el-radio :label="false" class="radio-margin"
							>手动审核</el-radio
						>
						<el-radio :label="true" class="radio-margin"
							>自动审核</el-radio
						>
					</el-radio-group>
					<span class="greyColor tip_left"
						>*
						若手动审核则客户提交待财务审核的支付单后商家需要在交易->支付单中进行手动审核才能完成订单的支付环节，若设置为自动审核则客户提交待财务审核支付单后自动审核通过，请谨慎设置</span
					>
				</div>
			</div>
		</div>
		<!-- 客户设置 -->
		<div class="goods_div">
			<DetailTitle titleName="客户设置" />
			<div class="goods_info">
				<div class="item_set">
					<span>客户审核方式</span>
					<el-radio-group
						v-if="postData.customerSetting"
						v-model="postData.customerSetting.autoAudit"
						@change="refrensh"
					>
						<el-radio :label="false" class="radio-margin"
							>手动审核</el-radio
						>
						<el-radio :label="true" class="radio-margin"
							>自动审核</el-radio
						>
					</el-radio-group>
				</div>
				<div class="customer-container">
					<!-- 手动审核 -->
					<!-- <div class="" v-if="postData.customerSetting && !postData.customerSetting.autoAudit">
            
            <div>
              <div class="con-input">
                <span class="title expire">零售价：</span>
                <el-input
                    size="small"
                    @input="toFixdTwo(premiumRates,'retail')"
                    v-model="premiumRates.retail"
                    :min="0"
                ></el-input>
              </div>
              <div class="con-input">
                <span class="title expire">批发价：</span>
                <el-input
                    size="small"
                    @input="toFixdTwo(premiumRates,'priceP')"
                    v-model="premiumRates.priceP"
                    min="0"
                ></el-input>
              </div>
            </div>

            <div>
              <div class="con-input">
                  <span class="title expire">平台价：</span>
                  <el-input
                      size="small"
                      @input="toFixdTwo(premiumRates,'alliance')"
                      v-model="premiumRates.alliance"
                      min="0"
                  ></el-input>
              </div>
              <div class="con-input">
                  <span class="title expire">批发价一：</span>
                  <el-input
                      size="small"
                      @input="toFixdTwo(premiumRates,'priceP1')"
                      v-model="premiumRates.priceP1"
                      min="0"
                  ></el-input>
              </div>
            </div>

            <div>
              <div class="con-input">
                  <span class="title expire">批发价二：</span>
                  <el-input
                      @input="toFixdTwo(premiumRates,'priceP2')"
                      v-model="premiumRates.priceP2"
                      min="0"
                  ></el-input>
              </div>
              <div class="con-input">
                  <span class="title expire">批发价三：</span>
                  <el-input
                      @input="toFixdTwo(premiumRates,'priceP3')"
                      v-model="premiumRates.priceP3"
                      min="0"
                  ></el-input>
              </div>
              
            </div>
            <div>
              <div class="con-input">
                  <span class="title expire">批发价四：</span>
                  <el-input
                      @input="toFixdTwo(premiumRates,'priceP4')"
                      v-model="premiumRates.priceP4"
                      min="0"
                  ></el-input>
              </div>
            </div>
          </div> -->
					<!-- 自动审核 -->
					<div
						v-if="
							postData.customerSetting &&
							postData.customerSetting.autoAudit
						"
					>
						<div>
							<div class="con-input">
								<span class="title expire">结算方式</span>
								<el-select
									size="small"
									v-if="postData.customerSetting"
									v-model="
										postData.customerSetting.paymentType
									"
								>
									<el-option
										v-for="type in paymentTypeList"
										:key="type.Code"
										:label="type.name"
										:value="type.Code"
									></el-option>
								</el-select>
							</div>
							<div class="con-input">
								<span class="title expire">发票类型</span>
								<el-select
									size="small"
									v-if="postData.customerSetting"
									v-model="
										postData.customerSetting.invoiceType
									"
								>
									<el-option
										v-for="type in invoiceTypeList"
										:key="type.Code"
										:label="type.name"
										:value="type.Code"
									></el-option>
								</el-select>
							</div>
						</div>
						<div>
							<div class="con-input">
								<span class="title">价格类型</span>
								<el-select
									size="small"
									v-if="postData.customerSetting"
									v-model="postData.customerSetting.priceType"
								>
									<el-option
										v-for="type in priceTypeList"
										:key="type.Code"
										:label="type.name"
										:value="type.Code"
									></el-option>
								</el-select>
							</div>
							<div class="con-input">
								<span class="title">享受折扣率</span>
								<el-input
									size="small"
									v-if="postData.customerSetting"
									v-model="postData.customerSetting.discount"
								></el-input>
							</div>
						</div>
						<!-- <p class="tip_left greyColor">*以上设置将作为“自动审核”客户时的默认值</p> -->
					</div>
				</div>
			</div>
		</div>
		<div class="footer_btn">
			<div class="button-div">
				<el-button type="primary" size="small" @click="save"
					>保存</el-button
				>
			</div>
		</div>
	</div>
</template>

<script>
import DetailTitle from '@/components/manageCom/DetailTitle.vue'
import { SettingApi } from './services'
const settingApi = new SettingApi();

const STOCK_TYPES = [
	{ code: 0, name: "有货" },
	{ code: 1, name: "充足" },
	{ code: 2, name: "紧张" },
	{ code: 3, name: "缺货" },
	{ code: 4, name: "真实库存" },
	{ code: 5, name: "设置展示上限" }
]

export default {
	name: "basic_setting",
	components: {
		DetailTitle
	},
	data() {
		return {
			postData: {
				partNameRule: 0,
				stockRangeRule: [],
				allowZeroStock: true,
				checkStock: true, //检查库存
				autoConfirmOrder: false, //自动确认订单
				autoReceiveOrder: 15,
				stockShowMode: 0,//库存展示纬度
				allowZeroPrice: false, // 是否展示零价格配件，true: 展示;false: 不展示
				autoConfirmOfflinePay: false, // 订单线下支付财务审核方式，true: 自动;false: 手动
				showLinePrice: false // 是否展示划线价
			},
			premiumRates: {},//加价比例
			paymentTypeList: [],
			invoiceTypeList: [],
			priceTypeList: [],
			showFirstTab: false,
			tabs: [],
			active: 0,
			STOCK_TYPES,
			isErpUser: false//是否是erp用户
		};
	},
	watch: {
		"$store.state.base": {
			handler: function (newValue) {
				this.isErpUser = newValue.erpType === 2 ? true : false;
			},
			deep: true,
			immediate: true
		}
	},
	computed: {
		// 若当前用户是云配/修管家用户则库存信息-库存展示维度默认‘按配件’并隐藏库存维度展示
		stockShowModeVisible() {
			let visible = true;
			const { hasYP, hasYX } = this.$store.state.base.erp;
			if (hasYP || hasYX) {
				visible = false;
			}
			return visible;
		}
	},
	mounted() {
		this.initData();
	},
	methods: {
		toStockGroup() {
			this.$router.push('/goodsManage/stockGroup');
		},
		initData() {
			//请求接口获取当前公司数据
			settingApi.getSettingDetail().then(res => {
				this.postData = {
					...res,
					stockRangeRule: res.stockRangeRule && res.stockRangeRule.length
						? res.stockRangeRule.map(item => ({ ...item }))
						: [{
							startQty: "0",
							endQty: "",
							upperLimitQty: "",
							type: 0
						}],
					autoReceiveOrder: res.autoReceiveOrder || 15
				};
				this.premiumRates = res.premiumRates;
				for (var k in this.premiumRates) {
					this.toNumberFn(this.premiumRates, k);
				}
				this.getpaymentTypeList();
				this.getinvoiceTypeList();
				this.getpriceTypeList();
			});
		},
		toNumberFn(item, key) {
			var priceRate = Math.round(parseFloat(item[key] ? item[key] : 0) * 100);
			if (item[key].match(/\d+(\.\d{0,2})?/)) {
				item[key] = priceRate + "%";
			} else {
				item[key] = "0%";
			}
			this.$forceUpdate();
		},
		toFixdTwo(item, key) {
			if (item[key].indexOf("%") > -1) {
				item[key] = item[key].replace(/\%/, "");
				item[key] = parseFloat(item[key]);
			} else {
				item[key] = item[key].substr(0, item[key].length - 1);
			}
			if (/^\d{1,4}?/.test(item[key])) {
				item[key] = item[key] + "%";
			} else {
				item[key] = "0%";
			}
			this.$forceUpdate();
		},
		getpaymentTypeList() {
			let params = {
				type: 'paymentType'
			}
			settingApi.getDictsByType(params).then(res => {
				this.paymentTypeList = res;
				if (!this.postData.customerSetting.paymentType) {
					this.postData.customerSetting.paymentType = this.paymentTypeList[0].Code;
				}
			}).catch((err) => {
				this.$message.error(err);
			})
		},
		getinvoiceTypeList() {
			let params = {
				type: 'invoiceType'
			}
			settingApi.getDictsByType(params).then(res => {
				this.invoiceTypeList = res;
				if (!this.postData.customerSetting.invoiceType) {
					this.postData.customerSetting.invoiceType = this.invoiceTypeList[0].Code;
				}
			}).catch((err) => {
				this.$message.error(err);
			})
		},
		getpriceTypeList() {
			let params = {
				type: 'priceType'
			}
			settingApi.getDictsByType(params).then(res => {

				this.priceTypeList = res;
				if (!this.postData.customerSetting.priceType) {
					this.postData.customerSetting.priceType = this.priceTypeList[0].Code;
				}
			}).catch((err) => {
				this.$message.error(err);
			})
		},
		toggle(tab) {
			//切换
			if (this.active != tab) {
				this.active = tab;
				this.showFirstTab = !this.showFirstTab;
			}
		},
		refrensh() {
			this.$forceUpdate();
		},
		addSettingList() {
			if (this.postData.stockRangeRule.length >= 20) {
				this.$alert("最多只能添加20条", "提示", {
					confirmButtonText: "确定"
				});
			} else {
				//   先判断前面输入的数据是否有交叉，没有交叉再新增一条
				let isCross = this.checkIsCross();
				if (!isCross) {
					this.postData.stockRangeRule.push({
						stockRangeStart: "",
						stockRangeEnd: "",
						upperLimit: ""
					});
				}
			}
		},
		deleteThisItem(index) {
			this.postData.stockRangeRule.splice(index, 1);
		},

		checkIsCross() {
			if (
				this.postData.stockRangeRule &&
				this.postData.stockRangeRule.length > 0
			) {
				//循环判断是否有不符合规则的输入数据
				for (let item of this.postData.stockRangeRule) {
					if (!item.startQty && !item.endQty) {
						this.$alert("库存区间值不能全部为空", "提示", {
							confirmButtonText: "确定"
						});
						return true;
					} else if (
						item.startQty &&
						item.endQty &&
						Number(item.startQty) >= Number(item.endQty)
					) {
						this.$alert("库存区间开始值不能大于等于结束值", "提示", {
							confirmButtonText: "确定"
						});
						return true;
					} else if (item.type === 5) {
						if (!item.upperLimitQty) {
							this.$alert("库存显示上限不能为空", "提示", {
								confirmButtonText: "确定"
							});
							return true;
						}
					}
				}
				return false;
			} else {
				return false;
			}
		},
		toFloatNumberFn(numObj) {//百分比转为小数
			var priceObj = {};
			for (let k in numObj) {
				let item = numObj[k].substr(0, numObj[k].length - 1);
				if (item.length == 1) {
					item = parseFloat('0.0' + item) + "";
				} else if (item.length == 2) {
					item = '0.' + item;
				} else if (item.length > 2) {
					var intNum = item.substr(0, item.length - 2);//整数
					var floatNum = item.substr(item.length - 2);//小数
					item = intNum + "." + floatNum;
				}
				priceObj[k] = item;
			}
			return priceObj;
		},
		save() {
			let isCross = false;
			isCross = this.checkIsCross();
			if (!isCross) {
				//for循环把参数变成int类型
				if (
					this.postData.stockRangeRule &&
					this.postData.stockRangeRule.length > 0
				) {
					for (let item of this.postData.stockRangeRule) {
						item.startQty = item.startQty || null;
						item.endQty = item.endQty || null;
						item.upperLimitQty = item.upperLimitQty || null;
					}
				}
				if (
					this.postData.stockRangeRule &&
					(this.postData.stockRangeRule.length <= 0 ||
						this.postData.stockRangeRule.length > 50)
				) {
					this.$alert("库存区间设置条数需大于0小于等于50条", "提示", {
						confirmButtonText: "确定"
					});
				} else {
					var premiumRates = { ...this.premiumRates };
					var priceObj = this.toFloatNumberFn(premiumRates);
					this.postData.premiumRates = Object.assign({}, priceObj);

					if (this.postData.customerSetting.autoAudit) {
						this.postData.customerSetting.discount = this.postData.customerSetting.discount !== '' ? this.postData.customerSetting.discount : null;
					}
					let params = {
						...this.postData,
						autoReceiveOrder: Number(this.postData.autoReceiveOrder)
					}
					settingApi.saveSetting(params).then(() => {
						this.$message({
							message: "操作成功！",
							type: "success"
						});
						this.initData();
					})
						.catch(error => {
							this.$message.error(error);
						});
				}
			}
		},
		addStockItem() {
			if (this.postData.stockRangeRule.length >= 50) {
				this.$alert("最多只能添加50条", "提示", {
					confirmButtonText: "确定"
				});
			} else {
				//   先判断前面输入的数据是否有交叉，没有交叉再新增一条
				let isCross = this.checkIsCross();
				if (!isCross) {
					this.postData.stockRangeRule.push({
						startQty: "0",
						endQty: "",
						upperLimitQty: "",
						type: 0
					});
				}
			}
		},
		clearStockItem(itemIndex) {
			this.postData.stockRangeRule = this.postData.stockRangeRule.filter((item, index) =>
				itemIndex !== index
			);
		},
		onDecrease(step) {
			if (Number(this.postData.autoReceiveOrder || 0) > 1) {
				this.postData.autoReceiveOrder = Number(this.postData.autoReceiveOrder || 0) - step;
			}
		},
		onIncrease(step) {
			this.postData.autoReceiveOrder = Number(this.postData.autoReceiveOrder || 0) + step;
		},
		onNumberInput(type, item) {
			switch (type) {
				case "startQty":
					if (
						item.startQty &&
						Number(item.startQty || 0) < 0
					) {
						item.startQty = 0;
					}
					break;
				case "endQty":
					if (
						item.endQty &&
						Number(item.endQty || 0) < Number(item.startQty || 0)
					) {
						item.endQty = item.startQty ? Number(item.startQty) + 1 : 0;
					}
					break;
				case "upperLimitQty":
					if (
						item.upperLimitQty &&
						Number(item.upperLimitQty || 0) < Number(item.startQty || 0)
					) {
						item.upperLimitQty = item.startQty || 0;
					}
					if (
						item.upperLimitQty &&
						item.endQty &&
						Number(item.upperLimitQty || 0) > Number(item.endQty)
					) {
						item.upperLimitQty = Number(item.endQty) > 0 ? Number(item.endQty) - 1 : 0;
					}
					break;
				case "autoReceiveOrder":
					if (Number(this.postData.autoReceiveOrder || 0) < 1) {
						this.postData.autoReceiveOrder = 1;
					}
					if (Number(this.postData.autoReceiveOrder || 0) % 1 !== 0) {
						this.postData.autoReceiveOrder = Math.floor(Number(this.postData.autoReceiveOrder || 0))
					}
					break;
				default:
					break;
			}
		}
	},

};
</script>

 <style lang="less" scoped>
.basic_setting {
	padding: 0 @padding-size-main;
	margin-top: @padding-size-main;
	background: #ffffff;
	margin-bottom: 70px;
	.goods_div {
		// margin-bottom: @margin-size-main;
		.goods_title {
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #333333;
			line-height: 22px;
			font-weight: 500;
			margin: @margin-size-main 0;
		}
		.goods_info {
			margin: @padding-size-main 0;
			/deep/.el-input__suffix {
				line-height: 40px;
			}
			.set_margin_bottom {
				margin-bottom: @margin-size-main;
			}
			.tip_ptn {
				display: flex;
				font-size: 14px;
				line-height: 30px;
				margin: @margin-size-main 0;
				// & input[type=radio] {
				//   opacity: 1;
				// }
			}

			.tip_stock {
				display: flex;
				align-items: center;
				margin-top: @margin-size-main;
				// margin-bottom: .5rem;

				.mt-3 {
					margin-top: 1rem !important;
				}
			}
			.radio-margin {
				margin: 0 @margin-size-main;
			}
			.el-radio-group label {
				margin-bottom: 0;
			}
			.tips_logo {
				color: #fa8c16;
				cursor: pointer;
			}
			.del_logo {
				color: #fa8c16;
				cursor: pointer;
				font-size: 18px;
				margin-right: 10px;
			}
			.stock-container {
				// margin: 0 15px 15px 15px;
				padding: 16px;
				text-align: left;
				width: 55rem;
				background: #f5f5f5;
				border-radius: 2px;
				/deep/input::-webkit-outer-spin-button,
				/deep/input::-webkit-inner-spin-button {
					-webkit-appearance: none;
				}
			}
			.customer-container {
				padding: @padding-size-main 0;
				width: 55rem;
				background: #f5f5f5;
				border-radius: 2px;
				.con-input {
					display: inline-block;
					margin-bottom: @margin-size-secondary;
					.title {
						width: 100px;
						display: inline-block;
						text-align: right;
						padding-right: @padding-size-secondary;
						box-sizing: border-box;
						&.expire::before {
							content: '*';
							color: #e10000;
						}
					}
					/deep/.el-input,
					/deep/.el-select {
						width: 224px;
					}
					/deep/.el-input__inner,
					/deep/.el-select__inner {
						border: 1px solid #d7d6d6;
						border-radius: 2px;
					}
				}
			}
			/deep/.el-input-number .el-input__inner {
				padding-left: 10px;
				padding-right: 10px;
				text-align: left;
			}
			.item_set {
				text-align: left;
				position: relative;
				margin-bottom: @margin-size-main;
				.el-switch {
					&.yes {
						position: relative;
						&::before {
							content: '是';
							position: absolute;
							left: 6px;
							top: 50%;
							transform: translateY(-50%);
							z-index: 1;
							font-size: 12px;
							color: #ffffff;
						}
					}
					&.no {
						position: relative;
						&::after {
							content: '否';
							position: absolute;
							right: 6px;
							top: 50%;
							transform: translateY(-50%);
							z-index: 1;
							font-size: 12px;
							color: #ffffff;
						}
					}
				}
			}
			.switch-yes {
				color: #ffffff;
				font-size: 12px;
				line-height: 20px;
				position: absolute;
			}
			.switch-no {
				color: #ffffff;
				font-size: 12px;
				position: absolute;
				line-height: 20px;
			}
			.tip_left {
				margin-left: 32px;
			}
		}
	}
	.footer_btn {
		position: fixed;
		width: 90%;
		background: #ffffff;
		box-shadow: 0px -1px 0px 0px rgba(217, 217, 217, 0.3);
		bottom: 8px;
		z-index: 99;
		.button-div {
			display: flex;
			justify-content: center;
			padding: 12px 0;
			border-top: 1px solid @border-color-base;
		}
	}
}
</style>
 
