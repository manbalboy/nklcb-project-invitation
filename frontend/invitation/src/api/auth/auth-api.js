import request from '@/api/index.js';
import store from '@/store/index.js';

const apiURL = process.env.VUE_APP_API_URL;

const authApi = {
    async postLogin(data) {
        return await request.post(`${apiURL}/auth/login`, data).then(res => {
            if (!res.data.success) {
                alert(res.data.message);
            }
            return Promise.resolve(res);
        });
    },

    async postJoin(data) {
        return await request.post(`${apiURL}/auth/join`, data).then(res => {
            if (!res.data.success) {
                alert(res.data.message);
            }
            return Promise.resolve(res);
        });
    },

    async getToken() {
        return await request.get(`${apiURL}/auth/token`).then(async res => {
            let responseObject = res;
            if (!res.data.success) {
                if (res.data.code === 'T502') {
                    const { refreshToken } = localStorage;
                    await request
                        .get(`${apiURL}/auth/refreshToken`, {
                            headers: {
                                ['refresh-token']: refreshToken,
                            },
                        })
                        .then(res => {
                            if (res.data.success) {
                                sessionStorage.setItem('accessToken', res.data.accessToken);

                                store.commit('auth/SET_TOKEN', {
                                    accessToken: res.data.accessToken || '',
                                    refreshToken: res.data.refreshToken || '',
                                });
                            }
                            responseObject = res;
                        });
                }
            }

            return Promise.resolve(responseObject);
        });
    },
};

export default authApi;
