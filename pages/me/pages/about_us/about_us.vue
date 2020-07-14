<template>
	<view class="container">
		<view class="introduce">
			<img class="logo" src="@/static/logo.png" alt="">
			<text class="title">松鼠账单，记账从今天开始</text>
		</view>
		<view class="contact">开发者：不够完美</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		height: 100vh;
		background-color: #fff;
		.introduce {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 100rpx;
			.logo{
				display: block;
				width: 400rpx;
				height: 400rpx;
			}
			.title{
				font-size: 36rpx;
				color: #333;
			}
		}
		.contact {
			position: absolute;
			left: 50%;
			bottom: 10%;
			transform: translateX(-50%);
			font-size: 28rpx;
			color: #555;
		}
	}
</style>
