import store from '@/store/index.js';

const requireAuth = (to, from, next) => {
    const loginPath = `/auth/login?rPath=${encodeURIComponent(to.path)}`;
    store.getters.isAuth ? next() : next(loginPath);
};

const homeRoutes = [
    {
        path: '/home/main',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/page/home/HomeMainPage.vue'),
        beforeEnter: requireAuth,
    },
];
export default homeRoutes;
