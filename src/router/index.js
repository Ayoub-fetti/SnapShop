// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../firebase/authService.js'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import Checkout from '../views/Checkout.vue'
import Product from "../views/Product.vue"

const routes = [
    { path: '/', component: Home },
    { path: '/admin/login', component: AdminLogin },
    { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true } },
    { path: '/checkout', component: Checkout },
    { path: '/product/:id', component: Product }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

let globalLoading = null

router.beforeEach((to, from, next) => {
    if (globalLoading) {
        globalLoading.startLoading()
    }

    if (to.meta.requiresAuth && !authService.getCurrentUser()) {
        next('/admin/login')
    } else {
        next()
    }
})

router.afterEach(() => {
    if (globalLoading) {
        globalLoading.stopLoading()
    }
})

export function setGlobalLoading(loading) {
    globalLoading = loading
}

export default router
