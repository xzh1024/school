<template>
	<div class="login-page">
		<!-- <img src="../../static/img/bgt.jpg" alt=""> -->
		<el-card
			class="box-card"
			style="
				width: 600px;
				padding-top: 10px;
				background: linear-gradient(45deg, black, transparent);
			"
		>
			<header
				style="font-size: 22px; font-weight: 800; padding-bottom: 20px"
			>
				登 录
			</header>
			<el-form
				:model="loginObj"
				:rules="rules"
				ref="ruleForm"
				status-icon
				label-width="100px"
				class="demo-ruleForm"
			>
				<el-form-item label="账号：" prop="phone">
					<el-input
						v-model="loginObj.phone"
						placeholder="请输入用户名"
					></el-input>
				</el-form-item>
				<el-form-item
					label="密码："
					prop="password"
					style="margin: 20px 0"
				>
					<el-input
						v-model="loginObj.password"
						type="password"
						placeholder="请输入密码"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>登录</el-button
					>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import { login } from "@/api/login"

export default {
	name: '',
	data() {
		return {
			loginObj: {
				phone: '',
				password: '',
			},
			rules: {
				phone: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
			}
		};
	},
	mounted() {
		sessionStorage.removeItem('Token');
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// let {phone,password} = this.loginObj;
					let params = {
						phone: this.loginObj.phone,
						password: this.loginObj.password,
						// type:1,
					}
					login(params).then(res => {
						sessionStorage.setItem('userInfo', JSON.stringify(res));

						this.$message.success('登录成功!');
						this.$router.push('/workbench/initGuide');
					}).catch(err => {
						console.log(err)
					})

				} else {
					this.$message.error('请输入必填项!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	},
}

</script>
<style lang='less' scoped>
.login-page {
	height: 100vh;
	background-image: url('../../static/img/bgt.jpg');
	display: flex;
	justify-content: center;
	align-items: center;
	/deep/.box-card .el-card__body {
		color: #fff;
	}
	/deep/.el-form-item .el-form-item__label {
		color: #fff;
	}
}
</style>
