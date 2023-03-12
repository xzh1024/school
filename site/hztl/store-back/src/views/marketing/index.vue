<template>
	<div class="marketing-container clearfix">
		<MenuCard
			name="优惠券"
			text="这里是一行描述"
			icon="ico-coupons"
			@click="$router.push('/marketing/coupon')"
		></MenuCard>
		<MenuCard
			name="积分"
			text="这里是一行描述"
			icon="ico-integral"
			@click="$router.push('/marketing/points')"
		></MenuCard>
		<MenuCard
			name="更多"
			text="敬请期待…"
			icon="ico-more"
			disabled
		></MenuCard>
	</div>
</template>

<script>
import MenuCard from './components/menuCard.vue';
export default {
	components: {
		MenuCard,
	},
};
</script>

<style lang="less" scoped>
.marketing-container {
	padding: 16px 0 16px 16px;
	.menu-card {
		float: left;
		width: 260px;
		height: 88px;
		margin-right: 16px;
		margin-bottom: 16px;
		border-radius: 4px;
	}
}
</style>
