import Vue from 'vue'
import App from './App'
import {ajax} from './api.js'

Vue.config.productionTip = false
Vue.prototype.$SERVICE_DOMAIN = 'https://www.bgwm.fun'  //正式环境
// Vue.prototype.$SERVICE_DOMAIN = 'http://localhost:3000'  //测试环境
Vue.prototype.$ajax = ajax

Vue.prototype.$showLoading = (title) => {
	uni.showLoading({
		title: title ? title : '加载中'
	});
};
Vue.prototype.$hideLoading = () => {
	uni.hideLoading();
};

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
