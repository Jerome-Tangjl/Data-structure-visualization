import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		redirect: "/home",
	  },
	  {
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue')
	  },
	  {
		path: '/bitree',
		name: 'bitree',
		component: () => import('../views/Bitree.vue')
	  },
	{
		path: '/scn',
		name: 'Scn',
		component: () => import('../views/Scn.vue'),
		redirect: "/scn/InterpChart",
		children: [{
			path: '/scn/InterpChart',
			name: 'InterpChart',
			component: () => import( /* webpackChunkName: "InterpChart" */ '../views/InterpChart.vue')
		},{
			path: '/scn/MayKnow',
			name: 'MayKnow',
			component: () => import( /* webpackChunkName: "MayKnow" */ '../views/MayKnow.vue')
		},{
			path: '/scn/UserInfo',
			name: 'UserInfo',
			component: () => import( /* webpackChunkName: "UserInfo" */ '../views/UserInfo.vue')
		}]
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
