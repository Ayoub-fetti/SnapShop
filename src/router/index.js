import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Cart from "../views/Cart.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/product/:id', component: Product},
    {path: '/cart', component: Cart}
]
export  default  createRouter({
    history: createWebHistory(),
    routes
})