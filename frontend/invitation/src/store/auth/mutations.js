const mutations = {
    SET_TOKEN(state, data) {
        state.accessToken = data.accessToken;
        state.refreshToken = data.refreshToken;
    },

    LOGIN(state, data) {
        console.log('login >>> ', data);
        if (!data) {
            return;
        }

        state.accessToken = data.accessToken;
        state.refreshToken = data.refreshToken;
        state.loginMemberInfo = { email: data.email, nick: data.nick };

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
    },
};

export default mutations;
