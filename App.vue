<script>
	export default {
		onLaunch: function() {
			const token = uni.getStorageSync('token');
			const userInfo = uni.getStorageSync('user_info');
			if(!token || !userInfo) {
				uni.navigateTo({
					url: './pages/login/login'
				});
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	page {
		height: 100%;
	}

	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
</style>
