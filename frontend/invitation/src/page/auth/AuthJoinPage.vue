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
