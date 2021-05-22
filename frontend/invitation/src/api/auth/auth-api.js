import request from '@/api/index.js';

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
};

export default authApi;
