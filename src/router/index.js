import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/product/:id', component: Product},]
export  default  createRouter({
    history: createWebHistory(),
    routes
})