import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Home from "@/views/Home";
import CreateProduct from "@/views/CreateProduct";
import ProductDetail from "@/views/ProductDetail";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/create-product',
        name: 'CreateProduct',
        component: CreateProduct
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
