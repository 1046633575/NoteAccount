<template>
	<view class="container">
		<view class="header">
			<img :src="userInfo.avatarUrl" alt="">
			<span>{{userInfo.nickName}}</span>
		</view>
		<MenuList :menuList="menuData"></MenuList>
	</view>
</template>

<script>
	import Menu_list from './components/Menu_list.vue'
	export default {
		data() {
			return {
				userInfo: {},
				menuData: [{
						icon: 'settings',
						name: '设置'
					},
					{
						icon: 'friend',
						name: '关于我们'
					}
				]
			}
		},
		onShareAppMessage(res) {
			return {
				title: '松鼠账单，记账从今天开始!',
				path: '/pages/main/main',
				imageUrl: 'https://www.bgwm.fun/static/upload_wechat_share.png'
			}
		},
		mounted() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				const userInfo = uni.getStorageSync('user_info');
				this.userInfo = JSON.parse(userInfo);
			}
		},
		components: {
			MenuList: Menu_list
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		background-color: #fff;

		.header {
			padding: 40rpx 30rpx;
			background-color: #f4f4f4;
			display: flex;
			align-items: center;

			img {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				border: 2px solid #fff;
				margin-right: 30rpx;
			}

			span {
				font-size: 40rpx;
				color: #333;
			}
		}
	}
</style>
