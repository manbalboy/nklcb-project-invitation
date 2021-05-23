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

const { refreshToken } = localStorage;
const { accessToken } = sessionStorage;
store.commit('auth/SET_TOKEN', { accessToken: accessToken || '', refreshToken: refreshToken || '' });

export default store;
