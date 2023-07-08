import UserList from "@/components/UserList.vue";
import {createRouter, createWebHistory} from "vue-router";
import Payments from "@/components/Payments.vue";
import Main from "@/components/Main.vue";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/users',
        component: UserList
    },
    {
        path: '/payments',
        component: Payments
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;