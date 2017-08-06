import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/views/Login'], resolve)
const Home = resolve => require(['@/views/Home'], resolve)
const Oauth = resolve => require(['@/views/Oauth'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/dashboard',
      name: 'Home',
      component: Home,
      meta: { requireAuth: true }
    },
    {
      path: '/oauth',
      name: 'Oauth',
      component: Oauth
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
