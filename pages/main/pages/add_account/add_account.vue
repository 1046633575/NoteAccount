<template>
	<view class="container">
		<scroll-view class="nav-area" scroll-x :scroll-left="navScrollLeft">
			<view class="scroller">
				<view class="scroller-wrapper">
					<view class="scroller-item" v-for="(item, index) in navList" :key="index" :style="{ width: navItemWidth + 'px' }"
					 :class="{ active: index === changeIndex }" @tap="tapNav(index)">{{ item }}</view>
				</view>
				<view class="scroller-bar">
					<view class="active-bar" :style="{ width: navItemWidth + 'px', left: activeBarLeft + 'px' }">
						<view></view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="swiper-area">
			<swiper :current="switchIndex" :duration="300" @transition="transition" @change="change" @animationfinish="animationfinish">
				<swiper-item v-for="(item, index) in navList" :key="index">
					<scroll-view scroll-y>
						<Note :type="index" :itemData="itemData"></Note>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import Note from '../../components/Note.vue'
	export default {
		components: {
			Note
		},
		data() {
			return {
				lists: [],
				switchIndex: 0, // 使 swiper 切换到的 index
				changeIndex: 0, // swiper change 时的 index
				finishedIndex: 0, // swiper 停止滑动后的 index
				screenWidth: uni.getSystemInfoSync().screenWidth, // 屏幕宽
				navScrollLeft: 0, // 导航滚动区的滚动距离
				activeBarLeft: 0, // 滑块距离左边距离
				navItemWidth: 100, // navitem 宽
				navList: ['支出', '收入'],
				itemData: {}, //页面传递的参数
			}
		},
		onLoad(option) {
			if(!option.data) {
				return;
			}
			const data = JSON.parse(option.data);
			this.itemData = data;
			if (data.type === 0) {
				this.navList = ['支出'];
			} else {
				this.navList = ['收入'];
			}
		},
		created() {

		},
		methods: {
			transition({
				detail: {
					dx
				}
			}) { // swiper 运动时触发
				this.activeBarLeft = this.navItemWidth * this.finishedIndex + this.navItemWidth * (dx / this.screenWidth)
				if (this.activeBarLeft > (this.screenWidth - this.navItemWidth) / 2) {
					this.navScrollLeft = this.activeBarLeft - (this.screenWidth - this.navItemWidth) / 2
				}
			},
			change({
				detail: {
					current
				}
			}) { // swiper index 变化时触发
				this.changeIndex = current
			},
			animationfinish({
				detail: {
					current
				}
			}) { // swiper 运动结束时触发
				this.switchIndex = this.finishedIndex = current
			},
			tapNav(index) { // 点击 bavbar 切换
				this.switchIndex = index
			},
		}
	}
</script>

<style lang="scss" scoped>
	@mixin flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.status_bar {
			width: 100%;
			background: #007AFF;
			height: var(--status-bar-height);
		}

		.pulldownrefresh {
			left: 50%;
			bottom: 0;
			z-index: 1;
			position: fixed;
			transform: translateX(-50%);
		}

		.nav-area {
			width: 100%;
			height: 100rpx;

			.scroller {
				height: 100%;

				.scroller-wrapper {
					height: 90rpx;

					.scroller-item {
						@include flex();
						float: left;
						height: 100%;

						&.active {
							color: #007AFF;
						}
					}
				}

				.scroller-bar {
					height: 10rpx;
					position: relative;

					.active-bar {
						@include flex();
						top: 0;
						left: 0;
						height: 100%;
						position: absolute;

						view {
							width: 30%;
							height: 100%;
							background: #007AFF;
						}
					}
				}
			}
		}

		.swiper-area {
			flex: 1;
			width: 100%;

			swiper {
				height: 100%;
				background: #F8F8F8;

				swiper-item {
					image {
						float: left;
						width: 47vw;
						height: 47vw;
						border-radius: 1vw;
						margin: 2vw 0 0 2vw;
					}
				}
			}
		}
	}
</style>
