<template>
	<view class="container">
		<view class="item" @click.native="toPage(item)" v-for="(item,index) in menuList" :key="index">
			<view class="cont">
				<text class="icon" :class="'cuIcon-' + item.icon"></text>
				<span>{{item.name}}</span>
			</view>
			<text class="cuIcon-right"></text>
		</view>
		<button class="share-btn" open-type="share">
			<view class="cont">
				<text class="icon cuIcon-share"></text>
				<span>分享给朋友</span>
			</view>
			<text class="cuIcon-right"></text>
		</button>
	</view>
</template>

<script>
	export default {
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
		onShow: function() {
			console.log('oo')
		},
		onShareAppMessage(res) {
			console.log('ss')
			return {
				title: '松鼠账单，记账从今天开始!',
				path: '/pages/main/main',
				imageUrl: 'https://www.bgwm.fun/static/upload_wechat_share.jpg'
			}
		},
		methods: {
			toPage(item) {
				console.log(item)
				if (item.icon == 'friend') {
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
	.container {
		padding: 20rpx;
		background-color: #fff;

		.item,
		.share-btn {
			height: 100rpx;
			padding: 0 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ddd;

			.cont {
				display: flex;
				align-items: center;
			}

			.icon {
				font-size: 40rpx;
				margin-right: 20rpx;
			}
		}

		.share-btn {
			background-color: #fff;
			border: none !important;
			outline: none !important;
			font-size: 14px;
			color: #444;

			&::after {
				border: none;
			}
		}
	}
</style>
