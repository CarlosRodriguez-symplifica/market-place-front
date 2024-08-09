import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Home from "@/views/Home";
import CreateProduct from "@/views/CreateProduct";

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
