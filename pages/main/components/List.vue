<template>
	<view class="container">
		<view class="title">
			<view class="date"><text>{{date}}</text></view>
			<view class="flow">
				<text class="income">+ {{income | formatPrice}}</text>
				<text class="pay">- {{pay | formatPrice}}</text>
			</view>
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in dataList" :key="index" @click="modifyItem(item)">
				<img class="icon" :src="PATH_DOMAIN + item.img_src" alt="">
				<view class="msg">
					<view class="name">{{item.text}}</view>
					<view class="remarks">{{item.detail}}</view>
				</view>
				<view class="type" :class="item.type === 0 ? 'payNum' : 'incomNum'">
					{{item.type === 0 ? '- ' + item.price : '+ ' + item.price}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			date: {
				required: true
			},
			income: {
				type: Number,
				required: true
			},
			pay: {
				type: Number,
				required: true
			},
			dataList: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				PATH_DOMAIN: this.$SERVICE_DOMAIN
			}
		},
		methods: {
			//进入修改页面
			modifyItem(item) {
				uni.navigateTo({
					url: `./pages/add_account/add_account?data=${JSON.stringify(item)}`
				});
			}
		},
		filters: {
			formatPrice(val) {
				return val.toFixed(2);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		color: #333;
		padding: 20rpx 0 0 0;

		.title {
			height: 40rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.income {
				margin-right: 30rpx;
				color: red;
			}

			.pay {
				color: green;
			}
		}

		.content {
			padding: 0 20rpx;

			.item {
				height: 120rpx;
				padding: 0 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #ccc;

				.icon {
					width: 80rpx;
					height: 80rpx;
					margin-right: 30rpx;
					display: block;
				}

				.msg {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.name {
						font-size: 32rpx;
						font-weight: 600;
						margin-bottom: 10rpx;
					}

					.remarks {
						color: #666;
						font-size: 24rpx;
					}
				}

				.type {
					font-size: 36rpx;
					font-weight: bold;

					&.incomNum {
						color: red;
					}

					&.payNum {
						color: green;
					}
				}

			}
		}
	}
</style>
