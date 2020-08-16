<template>
	<view class="container">
		<view class="top">
			<view class="top-left">
				<span class="top-item" @click="sendKeyboardEvent('onNote')">点击输入备注</span>
				<span class="top-item" @click="sendKeyboardEvent('onDate')" v-if="modifyFlag">点击选择日期</span>
			</view>
			<view class="top-right">
				<text class="delete" style="color: #DD514C;" @click="sendKeyboardEvent('delete')" v-if="modifyFlag">删除</text>
				<text class="cuIcon-unfold" @click="sendKeyboardEvent('hide')" style="font-size: 48rpx; margin-left: 50rpx;"></text>
			</view>
		</view>
		<view class="keyboard">
			<view class="num">
				<view class="num-left">
					<view class="num-left-t">
						<view v-for="num in 9" :key="num" class="num-item flex-center" @click="sendKeyboardEvent(num+1)">{{num+1}}</view>
					</view>
					<view class="num-left-b">
						<view class="num-item-2 flex-center" @click="sendKeyboardEvent(0)">0</view>
						<view class="num-item flex-center" @click="sendKeyboardEvent('.')">.</view>
					</view>
				</view>
				<view class="num-right">
					<view class="num-item flex-center" @click="sendKeyboardEvent('backdelete')">
						<text class="cuIcon-backdelete" style="font-size: 48rpx;"></text>
					</view>
					<view class="num-item-3 flex-center" @click="sendKeyboardEvent('submit')">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['modifyFlag'],
		data() {
			return {

			}
		},
		methods: {
			sendKeyboardEvent(key) {  //向父组件传递指令
				this.$emit('listenKeyboardEvent', key);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		width: 100%;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		box-shadow: 0px 0px 5px rgba(0,0,0,.2);
		font-size: 36rpx;
		font-weight: 500;
		.top{
			height: 100rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			font-weight: 400;
			.top-left{
				height: 100%;
				display: flex;
				align-items: center;
				.top-item{
					font-size: 24rpx;
					padding: 10rpx 20rpx;
					border-radius: 24rpx;
					background-color: #eee;
					margin-left: 30rpx;
					&:first-child{
						margin-left: 0;
					}
				}
			}
			.top-right{
				flex: 1;
				height: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.delete{
					font-size: 24rpx;
					padding: 10rpx 20rpx;
					border-radius: 24rpx;
					background-color: #eee;
				}
			}
		}
		.keyboard {
			padding: 24rpx 16rpx;
			background-color: #eee;

			.num {
				display: flex;

				.num-item {
					width: 31%;
					height: 50px;
					background-color: #fff;
					margin-bottom: 16rpx;
					border-radius: 2px;
				}

				.num-left {
					width: 75%;

					.num-left-t {
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
					}

					.num-left-b {
						display: flex;
						justify-content: space-between;

						.num-item {
							margin-bottom: 0;
						}

						.num-item-2 {
							width: 66%;
							height: 100rpx;
							background-color: #fff;
							margin-bottom: 0;
							border-radius: 2px;
						}
					}
				}

				.num-right {
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					.num-item {
						width: 90%;
						height: 100rpx;
						margin-right: 0;
					}

					.num-item-3 {
						width: 90%;
						height: 336rpx;
						background-color: orange;
						margin-bottom: 0;
						border-radius: 2px;
					}
				}
			}
		}
	}
</style>
