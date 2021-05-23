// import store from '@/store/index.js';
import authApi from '@/api/auth/auth-api.js';

const requireAuth = async (to, from, next) => {
    // const loginPath = `/auth/login?rPath=${encodeURIComponent(to.path)}`;
    await authApi.getToken().then(res => {
        if (res.data.success) {
            next();
        } else {
            next('/auth/login');
        }
    });
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
