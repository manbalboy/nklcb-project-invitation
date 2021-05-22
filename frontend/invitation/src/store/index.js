import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authStore from '@/store/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth: authStore,
    },
    plugins: [createPersistedState()],
});

const { accessToken, refreshToken } = localStorage;
console.log(store);
store.commit('auth/SET_TOKEN', { accessToken, refreshToken });

export default store;
