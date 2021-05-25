import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import AuthLoginPage from '@/page/auth/AuthLoginPage.vue';

import store from '@/store/index.js';

import Vuex from 'vuex';
import VueRouter from 'vue-router';
import authApi from '@/api/auth/auth-api.js';
import router from '@/router/index.js';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('AuthLoginPage.vue test', () => {
    it('email 값이 변하면 Vue Data v-model 값도 변한다. ', () => {
        const email = 'manbalboy@hanmail.net';
        const wrapper = shallowMount(AuthLoginPage);

        const inputEmail = wrapper.find('.email');
        inputEmail.setValue(email);
        expect(wrapper.vm.LOGIN_DATA.email).toMatch(email);

        inputEmail.setValue('test');
        expect(wrapper.vm.LOGIN_DATA.email).not.toMatch(email);
    });

    it('pw 값이 변하면 Vue Data v-model 값도 변한다. ', () => {
        const password = 'password123';
        const wrapper = shallowMount(AuthLoginPage);

        const inputPassword = wrapper.find('.pw');
        inputPassword.setValue(password);
        expect(wrapper.vm.LOGIN_DATA.password).toMatch(password);

        inputPassword.setValue('test');
        expect(wrapper.vm.LOGIN_DATA.password).not.toMatch(password);
    });

    it('확인버튼을 누르면 LOGIN mutations가 호출된다.', async () => {
        // const $router = {
        //     push: jest.fn(),
        // };
        const wrapper = mount(AuthLoginPage, {
            store,
            localVue,
            router,
        });

        authApi.postLogin = jest
            .fn()
            .mockResolvedValue(Promise.resolve({ data: { success: true, accessToken: 'test' } }));

        const email = 'manbalboy@hanmail.net';
        const inputEmail = wrapper.find('.email');
        inputEmail.setValue(email);
        const password = 'password123';
        const inputPassword = wrapper.find('.pw');
        inputPassword.setValue(password);

        await wrapper.find('.btn').trigger('click');

        await wrapper.vm.$nextTick();
        console.log('redresdred', store.state.auth.accessToken);
        expect(store.state.auth.accessToken).toMatch('test');
    });
});
