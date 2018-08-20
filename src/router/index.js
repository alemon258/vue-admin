import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Admin from '@/page/admin'
import Vue1_1 from '../components/1-1'
import Vue1_2 from '../components/1-2'
import Vue1_3 from '../components/1-3'
import Vue1_4_1 from '../components/1-4-1'
import Vue2 from '../components/2'
import Vue3 from '../components/3'
import Vue4 from '../components/4'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,

    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [{
        path: 'vue1_1',
        name: '1-1',
        component: Vue1_1
      },
      {
        path: 'vue1_2',
        name: '1-2',
        component: Vue1_2
      },
      {
        path: 'vue1_3',
        name: '1-3',
        component: Vue1_3
      },
      {
        path: 'vue1_4_1',
        name: '1-4',
        component: Vue1_4_1
      },
      {
        path: 'vue2',
        name: '2',
        component: Vue2
      },
      {
        path: 'vue3',
        name: '3',
        component: Vue3
      },
      {
        path: 'vue4',
        name: '4',
        component: Vue4
      }

    ]
              
      
    }
  ]
})
