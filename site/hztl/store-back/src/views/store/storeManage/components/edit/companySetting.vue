<template>
	<div class="company-setting">
		*添加此组件后，你的店铺页面上将会展示商家的公司名称、服务电话、所在地区、详细地址、公司介绍相关信息，此信息来源于设置>公司资料，点击
		<span class="company-setting-button" @click="go">去设置 &gt;</span>
	</div>
</template>

<script>
export default {
	name: "CompanySetting",
	methods: {
		go() {
			this.$router.push("/setting/companyInfo");
		}
	}
};
</script>

<style lang="less" scoped>
.company-setting {
	font-size: 14px;
	line-height: 22px;
	color: @color-warning;
	.company-setting-button {
		color: @color-link;
		text-decoration: underline;
		cursor: pointer;
	}
}
</style>
