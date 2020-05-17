import Vue from 'vue'
import router from 'Plugins/router'
import App from './layout/Index.vue'

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')