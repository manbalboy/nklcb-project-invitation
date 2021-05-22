const authRoutes = [
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/page/auth/AuthLoginPage.vue'),
    },
    {
        path: '/auth/join',
        name: 'Join',
        component: () => import(/* webpackChunkName: "join" */ '@/page/auth/AuthJoinPage.vue'),
    },
];
export default authRoutes;
