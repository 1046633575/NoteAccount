<template>
	<view class="container">
		<view class="price" @click="keyboardFlag = true;" :class="{add : itemData.type == 1 || type == 1}">
			<!-- <input type="text" onkeyup="value = value.replace(/[^0-9]/g,'')" v-model="price"> -->
			<span v-if="keyboardFlag === false && !price" style="color: #ccc;">点击输入金额</span>
			<sapn v-else>{{price}}</sapn>
		</view>
		<view class="type">
			<view class="type-item" :class="checkIndex == index ? 'active' : ''" @click="checkItem(index)" v-for="(item,index) in typeList"
			 :key="index">
				<img :src="PATH_DOMAIN + item.img_src" alt="">
				<span>{{item.text}}</span>
			</view>
		</view>
		<view class="translate item">
			<text class="key">备注:</text>
			<input type="text" placeholder="请输入备注" v-model="detail">
		</view>
		<view class="datetime item" v-if="itemData.id">
			<text class="key">日期:</text>
			<view class="content">
				<picker mode="date" :value="date" style="margin-right: 10rpx;" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>
				<picker mode="time" :value="time" @change="bindTimeChange">
					<view class="uni-input">{{time}}</view>
				</picker>
			</view>
		</view>
		<!-- <view class="btns" :class="{modify : itemData.id}">
				<button class="btn cu-btn bg-green lg" :class="{modify : itemData.id}" @click="handlerSave()">保存</button>
				<button v-if="itemData.id" class="btn-del cu-btn bg-red lg" @click="confirmDel()">删除</button>
			</view> -->
		<Keyboard @listenKeyboardEvent="listenKeyboardEvent" v-if="keyboardFlag" :modifyFlag="itemData.hasOwnProperty('id')"></Keyboard>
	</view>
</template>

<script>
	import Keyboard from '../../../components/my-keyboard/keyboard.vue'
	export default {
		props: {
			type: {
				required: true
			},
			itemData: {
				type: Object
			}
		},
		data() {
			return {
				price: '',
				checkIndex: 0,
				detail: '',
				date: '',
				time: '18:00',
				typeList: [], //类型集合
				PATH_DOMAIN: this.$SERVICE_DOMAIN,
				keyboardFlag: true,
				detailState: false, //为true时备注框聚焦
			}
		},
		created() {
			this.queryTypeList();
		},
		components: {
			Keyboard
		},
		methods: {
			queryTypeList() { //获取相应分类
				this.$ajax('/billType/query').then(res => {
					if (res.status) {
						const typeList = [];
						res.data.forEach(item => {
							if (this.itemData.id) {
								if (item.type === this.itemData.type) {
									typeList.push(item);
								}
							} else {
								if (item.type === this.type) {
									typeList.push(item);
								}
							}
						});
						this.typeList = typeList;
						this.getCheckIndex();
					} else {
						console.log('分类获取失败');
					}
				});
			},
			checkItem(index) { //改变选中状态
				this.checkIndex = index;
			},
			//解析 itemData，赋值到页面
			getCheckIndex() {
				if (!this.itemData || !this.itemData.hasOwnProperty('id')) {
					return;
				}
				this.price = this.itemData.price;
				this.detail = this.itemData.detail;
				this.date = this.itemData.date;
				let index = this.typeList.findIndex(item => {
					return item.img_src === this.itemData.img_src;
				});
				if (index !== -1) {
					this.checkIndex = index;
				} else {
					console.log('传递参数有误，未找到该分类');
				}
			},
			handlerSave() {
				this.price = Number(this.price); //转换为数字类型
				if (this.price === 0) {
					uni.showToast({
						title: '请输入金额'
					});
					return;
				}
				const dt = {
					type: this.type,
					price: this.price,
					bill_type: this.typeList[this.checkIndex].id,
					detail: this.detail,
					time: this.date + ' ' + this.time + ':00'
				};
				if (this.itemData.id) {
					dt.id = this.itemData.id
				}
				this.$ajax(`${this.itemData.id ? '/bill/update' : '/bill/add'}`, dt).then(res => {
					if (res.status) {
						uni.showToast({
							icon: 'success',
							title: res.msg
						});
						this.price = 0.00;
						this.checkIndex = 0;
						this.detail = '';
						uni.navigateBack();
					}
				});
			},

			confirmDel() {
				uni.showModal({
					title: '提示',
					content: '您确定要删除吗?',
					success: (res) => {
						if (res.confirm) {
							this.handlerDel();
						}
					}
				});
			},
			handlerDel() {
				this.$ajax('/bill/delete', {
					id: this.itemData.id
				}).then(res => {
					if (res.status) {
						uni.showToast({
							icon: 'success',
							title: res.msg
						});
						uni.navigateBack();
					}
				});
			},
			bindDateChange(e) { //日期选择器
				this.date = e.target.value
			},
			bindTimeChange(e) { //时间选择器
				this.time = e.target.value
			},
			listenKeyboardEvent(key) { //接收子组件传递的关闭信息
				this.price = String(this.price);
				if (typeof key == 'number') {
					if (key == 0 && this.price == 0) { //第一位不能为 0
						return;
					} else if (this.price.indexOf('.') !== -1 && this.price.length - (this.price.indexOf('.') + 1) == 2) { //小数点后只能输两位
						return;
					}
					this.price += key;
					return;
				}
				switch (key) {
					case 'hide':
						this.keyboardFlag = false;
						break;
					case '.':
						if (this.price == '') {
							this.price = 0;
						}
						this.price += key;
						break;
					case 'backdelete':
						this.price = this.price.substring(0, this.price.length - 1);
						break;
					case 'delete':
						this.confirmDel();
						break;
					case 'submit':
						this.handlerSave();
						break;
					case 'onNote':
						console.log('输入备注');
						break;
					case 'onDate':
						console.log('选择日期');
						break;
					default:
						console.log('default');
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		padding: 30rpx;
		position: relative;

		.price {
			padding: 30rpx 10rpx;
			height: 100rpx;
			color: green;

			input {
				height: 100%;
				font-size: 40rpx;
			}

			&.add {
				color: red;
			}
		}

		.type {
			margin: 20rpx 0;
			padding: 10rpx 0 30rpx;
			display: flex;
			flex-wrap: wrap;
			border: 1rpx solid #eee;

			.type-item {
				width: 20%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				border-radius: 8rpx;
				margin-top: 20rpx;
				padding: 10rpx 0;

				img {
					width: 100rpx;
					height: 100rpx;
					display: block;
					margin-bottom: 10rpx;
				}

				span {
					font-size: 24rpx;
					color: #666;
				}

				&.active {
					background-color: #f1f1f1;
					box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
				}
			}
		}

		.translate {
			margin-top: 60rpx;

			input {
				width: 100%;
				border-bottom: 1px solid #ddd;
			}
		}

		.datetime {
			margin-top: 30rpx;

			.content {
				display: flex;
				align-items: center;
			}
		}

		.item {
			display: flex;
			align-items: center;

			.key {
				display: inline-block;
				padding-right: 20rpx;
				color: #333;
				white-space: nowrap;
			}
		}

		.btns {
			width: 100%;
			padding: 0 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 30rpx;

			&.modify {
				justify-content: space-between;
			}

			.btn {
				width: 90%;
				text-align: center;

				&.modify {
					width: 70%;
				}
			}

			.btn-del {
				width: 25%;
				text-align: center;
			}
		}
	}
</style>
