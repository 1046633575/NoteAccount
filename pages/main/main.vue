<template>
	<view class="container">
		<movable-area class="move-box">
			<movable-view class="add-button" :style="{opacity: addBtnOpacity}" :animation="false" :x="buttonPosi.left" :y="buttonPosi.top"
			 direction="all" :inertia="true">
				<Add class="add" @click.native="addAccount()" />
			</movable-view>
		</movable-area>
		<view class="header">
			<view class="price">
				<view class="income">收入： <span>{{monthSum.increment_price || 0}}</span></view>
				<view class="pay">支出： <span>{{monthSum.pay_price || 0}}</span></view>
			</view>
			<view class="month shadow">
				<picker class="pickPer" mode="date" :value="date" fields="month" start="2020-01-01" @change="DateChange">
					<view class="picker" style="display: inline-block;">
						{{date}}
					</view>
					<text style="margin-left: 10rpx;" class="cuIcon-unfold"></text>
				</picker>
			</view>
		</view>
		<List :date="item.date" :income="item.income" :pay="item.pay" :dataList="item.list" v-for="(item,index) in list" :key="index"></List>
		<view class="no-msg" v-if="list.length == 0 && getDataFlag">本月没有数据哦...</view>
	</view>
</template>

<script>
	import List from './components/List.vue'
	import Add from '../../components/my-add/add.vue'
	export default {
		data() {
			return {
				monthSum: {},
				date: '',
				list: [],
				buttonPosi: {
					left: '',
					top: ''
				},
				addBtnOpacity: 0, //添加按钮设置 如果不设置用户将看到小球移动动画,
				getDataFlag: false,  //数据是否请求过了  未请求到时不显示“本月没有数据”
			}
		},
		created() {
			this.getNowTime();
			this.setButtonPosi(); //小程序movable-view bug, left、top可设置，right、bottom设置无效,所以使用js设置初始位置
		},
		onShow() { //页面显示重新取数据
			this.getMonthSum();
			this.getNoteData();
		},
		methods: {
			setButtonPosi() {  //设置添加按钮的初始位置
				const res = uni.getSystemInfoSync();
				const query = wx.createSelectorQuery();
				query.select('.add').boundingClientRect((rect) => {
					this.buttonPosi.top = res.windowHeight - rect.height - 40;
					this.buttonPosi.left = res.windowWidth - rect.width - 10;
					setTimeout(() => {
						this.addBtnOpacity = 10;
					},200);
				});
				query.selectViewport().scrollOffset();  //不知道为什么少了这两段代码就获取不到 上面元素的信息
				query.exec((res) => {});
			},
			getNowTime() {
				const date = new Date();
				const dateNow = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`: date.getMonth()+1}`;
				this.date = dateNow;
			},
			addAccount() {
				uni.navigateTo({
					url: './pages/add_account/add_account'
				});
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			getMonthSum() {  //获取月度数据
				this.$ajax('/bill/getMonthSum', {
					timeStart: this.date
				}).then(res => {
					if (res.status) {
						this.monthSum = res.data;
					}
				});
			},
			getNoteData() {
				this.$showLoading();
				const dt = {
					timeStart: this.date
				};
				this.$ajax('/bill/query', dt).then(res => {
					this.getDataFlag = true;
					if (res.status) {
						this.formatData(res.data);
					}
				});
			},
			formatData(data) { //按每日日期格式化数据   [{date: '2020-01-01', list: []},{...}]
				const arr = [];
				data.map(item => {
					let index = arr.findIndex(itm => {
						return itm.date == item.date;
					});
					if (index == -1) { //arr中不存在键，创建并添加
						const list = [];
						list.push(item);
						arr.push({
							date: item.date,
							pay: 0,
							income: 0,
							list
						});
					} else { //arr中存在键，添加进list
						arr[index].list.push(item);
					}
				});
				arr.map(item => {
					item.list.map(itm => {
						if (itm.type == 0) { //支出
							item.pay += itm.price;
						} else { //收入
							item.income += itm.price;
						}
					});
				});
				this.list = arr;
				this.$hideLoading();
			}
		},
		components: {
			List,
			Add
		},
		watch: {
			date(newVal) {
				this.getMonthSum();
				this.getNoteData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;

		.move-box {
			pointer-events: none; // 这里是重点，盒子可穿透操作
			width: 100vw;
			height: 100vh;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 100000;

			.add-button {
				pointer-events: auto;
				width: 120rpx;
				height: 120rpx;
				overflow: hidden;
				z-index: 9999;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.header {
			height: 180rpx;
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ddd;

			.price {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 16px;

				.income {
					& span {
						color: red;
					}
				}

				.pay {
					& span {
						color: green;
					}
				}
			}

			.month {
				border: 1px solid #ddd;
				padding: 10rpx 20rpx;
				border-radius: 14rpx;
				display: flex;
				align-items: center;

				.pickPer {
					display: flex;
					align-items: center;
				}
			}
		}

		.no-msg {
			font-size: 32rpx;
			color: #444;
			text-align: center;
			margin-top: 80rpx;
		}
	}
</style>
