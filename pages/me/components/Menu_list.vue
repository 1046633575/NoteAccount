<template>
	<view class="container">
		<view class="item" @click.native="toPage(item)" v-for="(item,index) in menuList" :key="index">
			<view class="cont" >
				<text class="icon" :class="'cuIcon-' + item.icon"></text>
				<span>{{item.name}}</span>
			</view>
			<text class="cuIcon-right"></text>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			menuList: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			toPage(item) {
				console.log(item)
				if(item.icon == 'friend') {
					console.log('匹配')
					uni.navigateTo({
						url: '/pages/me/pages/about_us/about_us'
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding: 20rpx;
		background-color: #fff;
		.item{
			height: 100rpx;
			padding: 0 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ddd;
			.cont{
				display: flex;
				align-items: center;
			}
			.icon{
				font-size: 40rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>
