<template>
    <section>
        <div>
            <span>EMAIL : </span>
            <input type="text" v-model="LOGIN_DATA.email" />
        </div>
        <div>
            <span>PASSWORD : </span>
            <input type="password" v-model="LOGIN_DATA.password" />
        </div>
        <div>
            <span>NICK : </span>
            <input type="text" v-model="LOGIN_DATA.nick" />
        </div>

        <button @click="joinClickEv">가입</button>
    </section>
</template>

<script>
    import authApi from '@/api/auth/auth-api.js';
    /**
     * Shows a progress in given Project.
     * By giving _spent_ and _remaining_ time (in hours) it computes the
     * progress and shows it in the UI.
     *
     * @component
     * @example
     * <ProgressBar :spent="100" :remaining="50"></ProgressBar>
     */
    export default {
        name: 'AuthJoinPage',

        data() {
            return {
                LOGIN_DATA: {
                    email: '',
                    nick: '',
                    password: '',
                    provider: 'local',
                },
            };
        },

        methods: {
            /**
             * @function
             * @param {number} a  ff
             * @param {number} b fdsa
             * @description <span style="color:red">test</span>
             * @param
             */
            joinClickEv() {
                authApi.postJoin(this.LOGIN_DATA).then(res => {
                    if (res.data.success) {
                        alert('회원가입성공');
                        this.$router.push('/auth/login');
                    }
                });
            },
        },
    };
</script>

<style></style>
