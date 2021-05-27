<template>
    <section>
        <h2>Login</h2>
        <div class="idForm">
            <input type="text" class="email" placeholder="EMAIL" v-model="LOGIN_DATA.email" />
        </div>
        <div class="passForm">
            <input type="password" class="pw" placeholder="PW" v-model="LOGIN_DATA.password" />
        </div>
        <button type="button" class="btn" @click="loginButtonClickEV"> LOG IN </button>
        <div class="bottomText">
            Don't you have ID?
            <a @click="signUpClickEV">sign up </a>
        </div>

        <!-- <button type="button" class="btn" @click="test"> test </button> -->
    </section>
</template>

<script>
    /**
     * write a component's description
     */
    import authApi from '@/api/auth/auth-api.js';
    import { mapMutations } from 'vuex';
    /**
     * @vue-prop {Number} initialCounter - Initial counter's value
     * @vue-prop {Number} [step=1] - Step
     * @vue-data {Number} counter - Current counter's value
     * @vue-computed {String} message
     * @vue-event {Number} increment - Emit counter's value after increment
     * @vue-event {Number} decrement - Emit counter's value after decrement
     */
    export default {
        name: 'AuthLoginPage',
        props: {
            /**
             * @description : fdsa
             */
            test: {
                type: String,
                default: '2',
            },
        },

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
            ...mapMutations('auth', ['LOGIN']),

            loginButtonClickEV() {
                authApi.postLogin(this.LOGIN_DATA).then(res => {
                    console.log(res);
                    if (res.data.success) {
                        console.log(res.data);
                        this.LOGIN(res.data);
                        this.$router.push('/home/main');
                    }
                });
            },

            signUpClickEV() {
                this.$router.push('/auth/join');
            },

            // test() {
            //     authApi.getToken().then(res => {
            //         console.log('fdsafdsaf', res);
            //     });
            // },
        },
    };
</script>

<style scoped>
    * {
        margin: 0px;
        padding: 0px;
        text-decoration: none;
        font-family: sans-serif;
    }

    body {
        background-image: #34495e;
    }

    .loginForm {
        position: absolute;
        width: 300px;
        height: 400px;
        padding: 30px, 20px;
        background-color: #ffffff;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 15px;
    }

    .loginForm h2 {
        text-align: center;
        margin: 30px;
    }

    .idForm {
        border-bottom: 2px solid #adadad;
        margin: 30px;
        padding: 10px 10px;
    }

    .passForm {
        border-bottom: 2px solid #adadad;
        margin: 30px;
        padding: 10px 10px;
    }

    .id {
        width: 100%;
        border: none;
        outline: none;
        color: #636e72;
        font-size: 16px;
        height: 25px;
        background: none;
    }

    .pw {
        width: 100%;
        border: none;
        outline: none;
        color: #636e72;
        font-size: 16px;
        height: 25px;
        background: none;
    }

    .btn {
        position: relative;
        left: 40%;
        transform: translateX(-50%);
        margin-bottom: 40px;
        width: 80%;
        height: 40px;
        background: linear-gradient(125deg, #81ecec, #6c5ce7, #81ecec);
        background-position: left;
        background-size: 200%;
        color: white;
        font-weight: bold;
        border: none;
        cursor: pointer;
        transition: 0.4s;
        display: inline;
    }

    .btn:hover {
        background-position: right;
    }

    .bottomText {
        text-align: center;
    }
</style>
