<template>
	<div class="customerInfo">
		<!-- 客户资料 -->
		<DetailTitle titleName="基础资料" />
		<div class="customer_info">
			<el-row :gutter="20" class="margin_5">
				<el-col :span="4">
					<div>
						<span class="customer_label">客户名称：</span>
						<span class="customer_content">{{
							dataObj.customerName
						}}</span>
					</div>
				</el-col>
				<el-col :span="4">
					<div>
						<span class="customer_label">联系人：</span>
						<span class="customer_content">{{
							dataObj.contacts
						}}</span>
					</div>
				</el-col>
				<el-col :span="4">
					<div>
						<span class="customer_label">联系电话：</span>
						<span class="customer_content">{{
							dataObj.contactsPhone
						}}</span>
					</div>
				</el-col>
				<el-col :span="4">
					<div>
						<span class="customer_label">客户类型：</span>
						<span class="customer_content">{{
							dataObj.customerType
						}}</span>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="margin_5">
				<el-col :span="4">
					<div>
						<span class="customer_label">客户状态：</span>
						<span class="customer_content">{{
							dataObj.customerStatus
						}}</span>
					</div>
				</el-col>

				<el-col :span="4">
					<div>
						<span class="customer_label">加入日期：</span>
						<span class="customer_content">{{
							dataObj.createdAt
						}}</span>
					</div>
				</el-col>
				<el-col :span="4">
					<div>
						<span class="customer_label">所在地区：</span>
						<span class="customer_content">{{
							dataObj.areaName
						}}</span>
					</div>
				</el-col>
				<el-col :span="4">
					<div>
						<span class="customer_label">归属员工：</span>
						<span class="customer_content">{{
							dataObj.businessMan
						}}</span>
					</div>
				</el-col>
			</el-row>
		</div>
		<DetailTitle titleName="收货地址" />
		<div class="customer_info">
			<el-table
				ref="goodsTable"
				class="xtable"
				size="small"
				:data="dataObj.addresses"
				border
				stripe
				tooltip-effect="dark"
				:max-height="maxHeight_g"
				style="width: 100%; margin: 10px 0"
			>
				<el-table-column
					prop="receiver"
					label="收货人"
					align="center"
					min-width="300"
				>
				</el-table-column>
				<el-table-column
					prop="phone"
					label="联系电话"
					align="center"
					min-width="300"
				>
				</el-table-column>
				<el-table-column
					prop="areaName"
					label="所在地区"
					align="center"
					min-width="300"
				>
				</el-table-column>
				<el-table-column
					prop="address"
					label="详细地址"
					align="center"
					min-width="300"
				>
				</el-table-column>
				<el-table-column
					prop="isDefault"
					label="是否默认"
					align="center"
					min-width="200"
				>
					<template slot-scope="scope">
						<span>{{ scope.row.isDefault ? '是' : '否' }}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<template v-if="$store.state.base.companyType === 'garage'">
			<DetailTitle titleName="车辆信息" />
			<div class="customer_info">
				<CarsTable :customerId="Number($route.query.id)" />
			</div>
		</template>

		<!-- <DetailTitle titleName="客户标签" /> -->
		<div class="title">
			<div>
				<span class="title_name">客户标签</span>
				<el-button
					type="text"
					v-if="$route.query.type == '1'"
					@click="addLabelFn"
					>加标签</el-button
				>
			</div>
			<div class="dashed"></div>
		</div>
		<div class="customer_info">
			<div class="has-choose">
				<template
					v-if="dataObj.labelNames && dataObj.labelNames.length"
				>
					<span
						v-for="(item, index) in dataObj.labelNames"
						:key="index"
						:class="['choose-key', 'border-key']"
					>
						{{ item }}
						<i
							v-if="$route.query.type == '1'"
							@click="delLabel(item, index)"
							class="el-icon-close key-del"
						></i>
					</span>
				</template>
				<span v-else style="line-height: 32px">暂无数据</span>
			</div>
		</div>

		<!-- <DetailTitle titleName="会员资料" /> -->
		<div class="title">
			<div>
				<span class="title_name">会员资料</span>
				<el-button
					type="text"
					v-if="$route.query.type == '1'"
					@click="VipGradeFn"
					>修改会员等级</el-button
				>
			</div>
			<div class="dashed"></div>
		</div>
		<div class="customer_info flex_r">
			<div style="width: 300px">
				<span class="customer_label">客户等级：</span>
				<span class="customer_content">{{
					dataObj.memberGrade ? dataObj.memberGrade.name : ''
				}}</span>
			</div>
			<div>
				<span class="customer_label">等级权益：</span>
				<span class="customer_content">{{ renderGradeRights() }}</span>
			</div>

			<!-- <div>
            <span class="customer_label">积分回馈倍率：</span>
            <span class="customer_content">{{dataObj.memberGrade?dataObj.memberGrade.rights:''}}</span> 
          </div> -->
		</div>

		<!-- <DetailTitle titleName="会员资产" />
    <div class="customer_info"></div> -->

		<!-- <DetailTitle titleName="会员卡" /> -->
		<div class="title">
			<div>
				<span class="title_name">优惠券</span>
				<el-button
					v-if="couponEnable"
					type="text"
					@click="showCouponGrantDialog"
				>
					发放优惠券
				</el-button>
			</div>
			<div class="dashed"></div>
		</div>
		<div class="customer_info">
			<CustomerCouponList ref="customerCouponList" :customerId="Number($route.query.id)"></CustomerCouponList>
		</div>

		<div class="title">
			<div>
				<span class="title_name">会员卡</span>
				<el-button
					type="text"
					v-if="$route.query.type == '1'"
					@click="toVipCardPage"
					>去管理会员卡</el-button
				>
			</div>
			<div class="dashed"></div>
		</div>
		<div class="customer_info">
			<MemberCardTable
				:tableData="
					dataObj.memberCardServices ? dataObj.memberCardServices : []
				"
			/>
		</div>
		<!-- 标签弹框 -->
		<AddLabelPop
			ref="addlabel"
			:dataObj="dataObj"
			:customerId="Number($route.query.id)"
			@onRefresh="refreshFn"
		/>

		<!-- 会员等级弹框 -->
		<SetVipGrade
			ref="VipGrade"
			:selectData="[dataObj]"
			:searchAll="false"
			@onRefresh="refreshFn"
		/>

		<!-- 发放优惠券弹框 -->
		<CouponGrantDialog
      v-if="couponGrantVisible"
      :customerIds="customerIds"
      @hide="hideCouponGrantDialog"
      @handleUpdate="updateCustomerCouponList"
    />
	</div>
</template>

<script>
import DetailTitle from '@/components/manageCom/DetailTitle.vue'
import CarsTable from './components/carsTable.vue'
import AddLabelPop from './components/addLabelPop.vue'
import SetVipGrade from "@/components/customer/setVipGrade.vue"
import MemberCardTable from './components/memberCardTable.vue'
import CustomerCouponList from './components/customerCouponList.vue'
import CouponGrantDialog from '@/views/marketing/coupon/grantDialog/index.vue';
import { getCouponSetting } from '@/views/marketing/coupon/services';
import { CustomerInfoApi } from './services';
const customerInfoApi = new CustomerInfoApi();
import baseIndexJump from "@/utils/baseIndexJump";
export default {
	name: "customerInfo",
	components: {
		DetailTitle,
		CarsTable,
		AddLabelPop,
		SetVipGrade,
		MemberCardTable,
		CustomerCouponList,
		CouponGrantDialog
	},
	data() {
		return {
			dataObj: {
				"id": 0,                                     //    # 记录ID,通过该ID同意或拒绝申请
				// "customerId": 11,                              //  # 客户ID
				// "customerName": "小明",                          // # 客户名称
				// "contacts": "小明",                               //# 主联系人
				// "contactsPhone": "18300001111",                  //# 联系电话
				// "customerType": 0,                               //# 客户类型,0:个人，1:公司
				// "createdAt": "2018-02-12",                       //# 申请时间
				// "customerStatus": 1,                             //# 客户状态,0:待审核 1:正常 2:停用
				// "areaName": "四川省/成都市/高新区",     //# 所在区域,新erp新曾字段返回
				// "businessMan": "张三（18380428001）",  //# 绑定员工信息
				// "labelNames": ["标签"],               //# 设置的标签信息
				// "labelIds": [7],                     //# 设置的标签Id数组
				// "memberGrade": {                     //# 设置的会员等级
				//   "id": 1,                           //# 会员等级ID
				//   "name": "会员等级名称",                        //# 会员等级名称
				//   "rights": "会员等级权益"                       //# 会员等级权益
				// },
				// "memberCardServices": [              //# 会员卡服务
				//   {
				//     "customerId": 1,      //# 客户ID
				//     "customerName": "x",   //# 客户名称
				//     "customerContacts": "x12", //# 客户联系人
				//     "customerPhone": "123231",  //# 客户联系电话
				//     "openerName": "js12",     //# 开卡人名称
				//     "openerPhone": "14321",    //# 开卡人电话
				//     "id": 1,              //# 会员卡服务主键ID
				//     "cardNo": "vip123423",         //# 会员卡号
				//     "cardId": 1,          //# 卡种ID
				//     "name": "vip1",           //# 卡种名称
				//     "color": "#f00",          //# 卡种颜色
				//     "descreption": "jidsnds",    //# 卡种说明
				//     "useLimit": {                //# 使用门槛

				//       "branch": {                //# 门店限制
				//         "limit": true,           //# 限制门店
				//         "rows": [                //# 门店信息
				//           {
				//             "id": 1,            //# 门店ID
				//             "name": "门店1"     ///# 门店名称
				//           },
				//           {
				//             "id": 2,            //# 门店ID
				//             "name": "门店2"     ///# 门店名称
				//           },
				//         ]
				//       },
				//       "vehicle": {             // # 可用车辆
				//         "limit": false,          // # 限制车辆
				//         "rows": [               // # 限制车辆详情
				//           {
				//             "id": 1,            //# 车辆ID
				//             "name": "车辆1"     //# 车辆名称
				//           },
				//         ]
				//       }
				//     },
				//     "discount": {                   //# 卡折扣
				//       indate: {                     //# 有效期
				//         "limit": true,             // # true：永久有效；
				//         "date": "2021-12-30",                // # 有效期日期
				//         "str": "还有30失效！"                   //# 有效期中文字符
				//       },
				//       "detail": {                  //# 折扣详情中文字符
				//         "project": "1.0",        //# 项目折扣（1.0表示10%）
				//         "projectChecked": true,  //# 项目折扣已勾选
				//         "part": "1.0",           //# 配件折扣（1.0表示10%）
				//         "partChecked": true,     //# 配件折扣已勾选
				//         "package": "1.0",        //# 套餐折扣（1.0表示10%）
				//         "packageChecked": true   //# 套餐折扣已勾选
				//       }
				//     },
				//     "cardBalance": {                //# 卡余额
				//       indate: {                     //# 有效期
				//         "limit": false,             // # true：永久有效；
				//         "str": "储值余额"                   //# 有效期中文字符
				//       },
				//       "cash": "101.00",                //# 现金余额
				//       "projects": [                 //# 服务项目
				//         {
				//           "name": "洗车q",                 //# 服务项目名称
				//           "qty": "1"                 // # 服务项目次数
				//         },
				//       ],
				//       "packages": [                 //# 套餐
				//         {
				//           "name": "套餐a",                 //# 套餐名称
				//           "qty": "1"                  //# 套餐次数
				//         },

				//       ]
				//     },
				//     "rechargeTotalAmount": "1000",  //# 充值总金额
				//     "createdCompany": "府城达到1",          // # 开卡门店
				//     "free": true,                //# 开卡免费
				//     "price": "122",                 //# 开卡价格，null表示没有设置
				//     "qty": "10",                // # 库存数量
				//     "status": 1,                // # 状态,1:生效中;2:冻结;3:已退卡
				//     "statusName": "生效中",          //  # 状态中文字符
				//     "cashValue": "100",              //# 现金价值
				//     "createdAt": "2020-12-30",   //# 创建日期
				//     "createdBy": "张三",          //# 创建人
				//     "remarks": "开卡备注"               // # 开卡备注
				//   },
				// ],
				// "addresses": [                      //# 收货地址
				//   {
				//     "receiver": "收货人",   //# 收货人
				//     "phone": "联系电话",      //# 联系电话
				//     "areaName": "所在地区",   //# 所在地区
				//     "address": "详细地址",    //# 详细地址
				//     "isDefault": true //# true:默认地址
				//   },
				// ]

			},
			maxHeight_g: "300",
			couponGrantVisible: false,
			couponEnable: false,
		}
	},
	computed: {
		isGarage() {
			return this.$store.state.base.companyType === "garage";
		},
		customerIds() {
			return [this.dataObj.id];
		}
	},
	created() {
		this.getCouponSetting();
	},
	mounted() {
		this.initData();
	},
	methods: {

		delLabel(item, index) {
			this.dataObj.labelIds.splice(index, 1);
			let params = {
				ids: [this.dataObj.id],
				searchAll: false,
				labelIds: this.dataObj.labelIds,
			}
			customerInfoApi.setsCustomers(params).then(() => {
				this.$message.success('标签更新成功');
				this.initData();
			})
		},
		addLabelFn() {//加标签
			this.$refs.addlabel.show();
		},
		renderGradeRights() {//等级权益
			if (this.dataObj.memberGrade && this.dataObj.memberGrade.rights) {
				let rights = this.dataObj.memberGrade.rights;
				let discount = rights.discount;
				let str = '消费折扣：';
				let projectStr = this.isGarage && discount.projectChecked ? `项目折扣【${discount.project}折】 ` : '';
				let partStr = discount.partChecked ? `配件折扣【${discount.part}折】 ` : '';
				let packageStr = this.isGarage && discount.packageChecked ? `套餐折扣【${discount.package}折】` : '';
				if (projectStr || partStr || packageStr) {
					str += projectStr + partStr + packageStr;
				} else {
					str = '';
				}

				return str;
			} else {
				return '';
			}

		},
		VipGradeFn() {//会员等级
			this.$refs.VipGrade.show();
		},
		refreshFn() {
			this.initData();
		},
		initData() {
			let params = {
				id: this.$route.query.id
			}
			this.dataObj = {};
			customerInfoApi
				.getCustomerInfo(params)
				.then(res => {
					this.dataObj = res;
				})
				.catch(err => {
					console.log(err);
				});
		},

		toVipCardPage() {
			let obj = {
				path: '/customer/vipCard',
				// query:{
				//   customerId:this.$route.query.id
				// }
			}
			baseIndexJump.setInfo("getCustomerId", this.$route.query.id);
			this.$router.push(obj);
		},
		showCouponGrantDialog() {
      this.couponGrantVisible = true;
    },
    hideCouponGrantDialog() {
      this.couponGrantVisible = false;
    },
		// 更新用户的会员卡列表
		updateCustomerCouponList() {
			this.$refs.customerCouponList.initData();
		},
		// 获取优惠券状态
    getCouponSetting() {
      getCouponSetting().then(res => {
        this.couponEnable = !!res;
      });
    },
	}
}
</script>

<style lang="less" scoped>
.customerInfo {
	padding: @padding-size-main;
	margin-bottom: 50px;
	.customer_info {
		padding: @padding-size-secondary;
		/deep/.el-input__suffix {
			line-height: 40px;
		}
		.margin_5 {
			margin: 5px 0;
		}
		.customer_label {
			color: @text-color-secondary;
		}
		.customer_content {
			color: @text-color-base;
		}
		.has-choose {
			text-align: left;
			// margin: 16px 0;
			max-height: 114px;
			width: 826px;
			padding: 15px;
			background: @bg-color-base;
			border-radius: 2px;
			overflow: auto;
			.choose-key {
				background: #ffffff;
				border-radius: 2px;
				display: inline-block;
				padding: 0 8px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #666666;
				line-height: 22px;
				font-weight: 400;
				margin: 4px 16px 4px 0;
				.key-del {
					color: #a4a4a4;
					cursor: pointer;
				}
				.key-del:hover {
					color: #498cf0;
				}
			}
			.border-key {
				border: 1px solid #d9d9d9;
			}
		}
	}
	.title {
		line-height: 22px;
		font-weight: 500;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title_name {
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: @text-color-base;
			margin-right: @margin-size-secondary;
		}
		.dashed {
			height: 1px;
			margin: 16px;
			flex: 1;
			border-bottom: 1px dashed @border-color-base;
		}
	}
	.flex_r {
		display: flex;
		align-items: center;
	}
}
</style>
