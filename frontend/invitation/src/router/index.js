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
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
});

export default router;
