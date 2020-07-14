import Vue from 'vue'
import App from './App'
import {ajax} from './api.js'

Vue.config.productionTip = false
Vue.prototype.$SERVICE_DOMAIN = 'https://www.bgwm.fun'
Vue.prototype.$ajax = ajax

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
