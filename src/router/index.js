import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/auth/Auth'
// import Hello from '@/components/Hello'
import Orders from '@/components/orders/Orders'
import Kinoteka from '@/components/blog/Blog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/blog',
      name: 'Kinoteka',
      component: Kinoteka
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    }
  ]
})
