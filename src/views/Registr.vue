<template>
    <div class="header">
        <div class="container">
            <div class="header__row">
                <a href="/" class="header__btn btn-icon"
                    ><i class="large material-icons">arrow_back</i></a
                >
                <h1>Регистрация</h1>
            </div>
        </div>
    </div>
    <form class="modal" @submit.prevent="registrSubmit">
        <div class="modal__content">
            <div class="input-field">
                <label for="name" class="required">Имя</label>
                <input
                    type="text"
                    class="input"
                    id="name"
                    v-model.trim="name"
                    required
                />
                <small class="helper-text invalid"></small>
            </div>

            <div class="input-field">
                <label for="email" class="required">Email</label>
                <input
                    type="text"
                    class="input"
                    id="email"
                    v-model.trim="email"
                    required
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
                    required
                />
                <small
                    class="helper-text invalid"
                    v-if="this.password.length < 6"
                    >Длина пароля не менее 6 символов</small
                >
            </div>
            <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
        </div>

        <div class="modal__footer">
            <div class="container">
                <button class="btn-close modal__btn">Отмена</button>
                <button class="btn-submit modal__btn" type="submit">
                    Продолжить
                </button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'registr',
    data: () => ({
        name: '',
        email: '',
        password: '',
    }),
    methods: {
        async registrSubmit() {
            if (
                this.password.length >= 6 &&
                this.email.length >= 4 &&
                this.name
            ) {
                const formData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }

                try {
                    await this.$store.dispatch('registr', formData)
                    this.$router.push('/')
                } catch (e) {
                    console.log(e)
                }
            }
        },
    },
}
</script>
