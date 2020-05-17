import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.NODE_ENV === 'production' ? '/j-tabs/' : '/',
	routes,
})

export default router