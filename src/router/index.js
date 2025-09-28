import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../firebase/authService.js'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import Checkout from '../views/Checkout.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/admin/login', component: AdminLogin },
    {
        path: '/admin',
        component: AdminDashboard,
        meta: { requiresAuth: true }
    },
    { path: '/checkout', component: Checkout }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !authService.getCurrentUser()) {
        next('/admin/login')
    } else {
        next()
    }
})

export default router
