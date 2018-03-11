import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/auth/Auth'
// import Hello from '@/components/Hello'
import Lessons from '@/components/lessons/Lessons'
import Kinoteka from '@/components/kinoteka/Kinoteka'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/lessons',
      name: 'Lessons',
      component: Lessons
    },
    {
      path: '/kinoteka',
      name: 'Kinoteka',
      component: Kinoteka
    }
  ]
})
