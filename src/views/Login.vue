<template>
    <div class="header">
        <div class="container">
            <div class="header__row">
                <a href="/" class="header__btn btn-icon"
                    ><i class="large material-icons">arrow_back</i></a
                >
                <h1>Войти</h1>
            </div>
        </div>
    </div>
    <form class="modal" @submit.prevent="loginSubmit">
        <div class="modal__content">
            <div class="input-field">
                <label for="email" class="required">Email</label>
                <input
                    type="text"
                    class="input"
                    id="email"
                    v-model.trim="email"
                />
                <small class="helper-text invalid"></small>
            </div>

            <div class="input-field">
                <label for="password" class="required">Пароль</label>
                <input
                    type="text"
                    class="input"
                    id="password"
                    v-model.trim="password"
                />
                <small
                    class="helper-text invalid"
                    v-if="this.password.length < 6"
                    >Длина пароля не менее 6 символов</small
                >
            </div>
            <p>
                Нет аккаунта?
                <router-link to="/registr">Зарегистрироваться</router-link>
            </p>
        </div>

        <div class="modal__footer">
            <div class="container">
                <button class="btn-close modal__btn">Отмена</button>
                <button class="btn-submit modal__btn" type="submit">
                    Войти
                </button>
            </div>
        </div>
    </form>
</template>

<script>
/* eslint-disable */
export default {
    name: 'login',
    data: () => ({
        email: '',
        password: '',
    }),
    mounted() {},
    methods: {
        async loginSubmit() {
            if (this.password.length >= 6 && this.email.length >= 4) {
                const formData = {
                    email: this.email,
                    password: this.password,
                }

                try {
                    await this.$store.dispatch('login', formData)

                    this.$router.push('/')
                } catch (e) {}
            }
        },
    },
}
</script>
