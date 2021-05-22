const homeRoutes = [
    {
        path: '/home/main',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/page/home/HomeMainPage.vue'),
    },
];
export default homeRoutes;
