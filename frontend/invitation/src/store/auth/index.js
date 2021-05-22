import state from '@/store/auth/state.js';
import getters from '@/store/auth/getters.js';
import actions from '@/store/auth/actions.js';
import mutations from '@/store/auth/mutations.js';

const userStore = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

export default userStore;
