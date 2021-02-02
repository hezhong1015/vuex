import Vue from 'vue'
import VueRouter from '../vue-router'
import Home from '../views/Home.vue'
import A from '../views/A.vue'
import B from '../views/B.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'a',
        name: 'a',
        component: A,
      },
      {
        path: 'b',
        name: 'b',
        component: B,
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})


router.beforeEach((to,from,next)=>{
  console.log(to,from)
  next()
})

export default router
