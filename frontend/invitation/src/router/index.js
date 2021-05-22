import Vue from 'vue';
import VueRouter from 'vue-router';
import homeRouter from '@/router/home-router';
import authRouter from '@/router/auth-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/auth/login',
    },
    ...authRouter,
    ...homeRouter,
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
