import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

//kakao 초기화
window.Kakao.init('3a40b943b41d3804cfa9e09a49b50ef2'); //발급받은 앱키
