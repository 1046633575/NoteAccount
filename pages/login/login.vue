<template>
	<view class="container">
		<view class="login" v-if="canIUse">
			<view class='header'>
				<image src='../../static/logo.png'></image>
			</view>

			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像等)</text>
			</view>

			<button class='bottom' type='primary' open-type="getUserInfo" @getuserinfo="bindGetUserInfo" hover-class="none">授权登录</button>
		</view>

		<view v-else>请升级微信版本</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//判断小程序的API，回调，参数，组件等是否在当前版本可用。
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
			}
		},
		created() {
			this.wxLogin();
		},
		methods: {
			wxLogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						if (!res.code) {
							return;
						}
						this.$ajax('/wxLogin', {
							code: res.code
						}).then(data => {
							if(data.status) {
								uni.setStorage({
									key: 'token',
									data: data.token
								});
							}
						});
					},
				});
			},
			bindGetUserInfo() {
				uni.getUserInfo({
					provider: 'weixin',
					success: infoRes => {
						const token = uni.getStorageSync('token');
						this.$ajax('/wxUserInfo', {
							userInfo: infoRes,
							token: token
						}).then(data => {
							if (data.status) {
								this.cacheUserInfo(infoRes);
								//跳转到主页
								uni.switchTab({
									url: '/pages/main/main'
								});
							} else {
								uni.showToast({
									title: '登录失败',
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				});
			},
			cacheUserInfo(userInfo) {
				uni.setStorage({
					key: 'user_info',
					data: userInfo.rawData,
					success: function() {
						console.log('用户信息已缓存');
					}
				});
			}
		},
		onShow() {}
	}
</script>

<style scoped lang="scss">
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
