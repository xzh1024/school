<template>
	<div class="initGuide">
		<!-- 初始化指引--NEW -->
		<div class="container">
			<div class="row1_box">
				<div class="tip_box">
					<img
						src="@/assets/img/initGuide/指示人@2x.png"
						alt=""
						srcset=""
					/>
					<div class="tip_text_box">
						<div class="tip_text">
							<p>
								您可以按下方指引一步步完成系统初始化，完成初始化您的线上小店就开起来啦~
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="row2_box">
				<div class="step_item">
					<div class="item_content" @click="stepClick(1)">
						<div class="item_content_img">
							<img
								src="@/assets/img/initGuide/完善公司资料@2x.png"
								alt=""
								srcset=""
							/>
						</div>
						<p class="item_text">完善公司资料</p>
					</div>
					<!-- <div class="item_model" v-if="step!=1 && step<1"> -->
					<div class="item_model" v-if="!stepObj.finishedCompanyInfo">
						<div>
							<i class="el-icon-lock"></i>
						</div>
					</div>
				</div>
				<img
					src="@/assets/img/initGuide/箭头@2x.png"
					class="img_right"
					alt=""
					srcset=""
				/>
				<div class="step_item" @click="stepClick(2)">
					<div class="item_content">
						<div class="item_content_img">
							<img
								src="@/assets/img/initGuide/开通店铺@2x.png"
								alt=""
								srcset=""
							/>
						</div>
						<p class="item_text">开通店铺</p>
					</div>
					<!-- <div class="item_model" v-if="step<2"> -->
					<div class="item_model" v-if="!stepObj.openedStore">
						<div>
							<i class="el-icon-lock"></i>
						</div>
					</div>
				</div>
				<img
					src="@/assets/img/initGuide/箭头@2x.png"
					class="img_right"
					alt=""
					srcset=""
				/>
				<div class="step_item" @click="stepClick(3)">
					<div class="item_content">
						<div class="item_content_img">
							<img
								src="@/assets/img/initGuide/上架商品@2x.png"
								alt=""
								srcset=""
							/>
						</div>
						<p class="item_text">上架商品</p>
					</div>
					<!-- <div class="item_model"  v-if="step<3"> -->
					<div class="item_model" v-if="!stepObj.uploadedPart">
						<div>
							<i class="el-icon-lock"></i>
						</div>
					</div>
				</div>
				<img
					src="@/assets/img/initGuide/箭头@2x.png"
					class="img_right"
					alt=""
					srcset=""
				/>
				<div class="step_item" @click="stepClick(4)">
					<div class="item_content">
						<div class="item_content_img">
							<img
								src="@/assets/img/initGuide/分享店铺@2x.png"
								alt=""
								srcset=""
							/>
						</div>
						<p class="item_text">分享店铺</p>
					</div>
					<!-- <div class="item_model" v-if="step<4"> -->
					<div class="item_model" v-if="!stepObj.sharedStore">
						<div>
							<i class="el-icon-lock"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="row3_box">
				<i class="icon-Warning-Circle-Fill"></i>
				<div>
					<p>对以上步骤进行解锁，解锁条件：</p>
					<p>
						完善公司资料：点击进入卖家中心->设置->公司资料完成公司资料的填写并点击【保存】完成公司资料的维护
					</p>
					<p>
						开通店铺：解锁【完善公司资料】并进入卖家中心->店铺->店铺管理开通我的店铺
					</p>
					<p>
						上架商品：解锁【开通店铺】并进入卖家中心->商品，上架至少一个商品
					</p>
					<p>
						分享店铺：解锁【上架商品】并进入卖家中心->店铺->页面装修，点击【分享页面】按钮
					</p>
				</div>
			</div>

			<el-dialog
				title="提示"
				:visible.sync="dialogUpLoad"
				width="30%"
				@close="handleClose"
			>
				<span style="margin-top: 10px; display: inline-block">
					请在{{
						erpType == 2 ? '云配管家' : '思锐软件'
					}}中进行商品上架操作
				</span>
				<span slot="footer" class="dialog-footer">
					<el-button
						v-if="erpType == 2"
						type="primary"
						size="small"
						@click="goShelves"
						>去上架</el-button
					>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import { InitGuideApi } from './services'
const initGuideApi = new InitGuideApi();

export default {
	name: 'initGuide',
	data() {
		return {
			step: 2,
			stepObj: {
				finishedCompanyInfo: true,
				openedStore: false,
				uploadedPart: false,
				sharedStore: false
			},
			dialogUpLoad: false,
			// erpType:null
		}
	},
	computed: {
		erpType() {
			return this.$store.state.base.erpType;
		}
	},
	mounted() {
		this.getInitGuide();
	},
	methods: {
		goShelves() {
			if (window !== window.top) {
				window.top.postMessage({ type: "jump-parameters" }, "*")
			}
		},
		handleClose() {
			this.dialogUpLoad = false;
		},
		getInitGuide() {
			let _this = this;
			initGuideApi.getInitGuide().then(res => {
				_this.stepObj = res;
				// let flag = true;
				// for(let k in _this.stepObj){
				//   if(!_this.stepObj[k]){
				//     flag = false;
				//   }
				// }
				// if(flag){//全部解锁后
				//   this.$router.push('/goodsManage')
				// }
			})
		},
		stepClick(step) {
			if (step == 1) {

				this.$router.push('/setting/companyInfo');
			}
			if (step == 2) {
				if (!this.stepObj.finishedCompanyInfo) {
					this.$message.warning('请先解锁【完善公司资料】！');
					return;
				}
				this.$router.push('/store/storeManage');
			}
			if (step == 3) {
				if (!this.stepObj.openedStore) {
					this.$message.warning('请先解锁【开通店铺】！');
					return;
				} else {
					this.dialogUpLoad = true;
					// this.$router.push('/goodsManage');
				}
			}
			if (step == 4) {
				if (!this.stepObj.uploadedPart) {
					this.$message.warning('请先解锁【上架商品】！');
					return;
				}
				this.$router.push('/store/storeManage');
			}
		}
	}
}
</script>

<style lang="less" scoped>
.initGuide {
	width: 100%;
	min-height: 800px;
	display: flex;
	justify-content: center;
	align-items: center;
	.container {
		width: 1200px;
		height: 600px;
		.row1_box {
			width: 1200px;
			height: 164px;
			position: relative;
			.tip_box {
				img {
					height: 164px;
					width: 620px;
					position: absolute;
					top: 0px;
					left: 287px;
					z-index: 1;
				}
				.tip_text_box {
					position: absolute;
					top: 0;
					right: 294px;
					width: 544px;
					display: inline-block;
					padding: 8px;
					// background: #6589F84a;
					// border-radius: 8px;
					z-index: 100;
					.tip_text {
						background: #ffffff;
						border-radius: 8px;
						p {
							padding: 12px 0;
							font-size: 14px;
							color: #333333;
							line-height: 22px;
							font-weight: 400;
						}
					}
				}
			}
		}
		.row2_box {
			width: 1200px;
			height: 240px;
			margin: 40px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.step_item {
				width: 220px;
				height: 240px;
				background: #ffffff;
				box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.12);
				border-radius: 8px;
				position: relative;

				.item_content {
					width: 220px;
					height: 240px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					.item_content_img {
						width: 124px;
						height: 124px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.item_text {
						font-size: 16px;
						color: #333333;
						line-height: 24px;
						font-weight: 400;
						margin-top: 10px;
					}
				}
				.item_model {
					width: 220px;
					height: 240px;
					opacity: 1;
					background: rgba(89, 89, 89, 0.49);
					position: absolute;
					top: 0;
					left: 0;
					font-size: 56px;
					color: #ffffff;
					border-radius: 8px;
					box-sizing: border-box;
					cursor: pointer;
					// cursor: not-allowed;
					div {
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
			.img_right {
				width: 74px;
				height: 16px;
			}
		}
		.row3_box {
			width: 1200px;
			height: 130px;
			padding: 10px;
			background: #faeee1;
			border: 1px solid #fa8c16;
			border-radius: 2px;
			box-sizing: border-box;
			display: flex;
			i {
				line-height: 22px;
				color: #fa8c16;
				margin-right: 10px;
			}
			div p {
				font-size: 14px;
				color: #fa8c16;
				line-height: 22px;
				font-weight: 400;
			}
		}
	}
}
</style>
