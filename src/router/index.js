import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Blogs from "../views/Blogs.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requireAuth: true
    },
    component: Login

  },
  {
    path: '/blogs',
    name: 'Blogs',
    meta: {
      requireAuth: true
    },
    component: Blogs
  }
]

const router = new VueRouter({
  routes
})

export default router
