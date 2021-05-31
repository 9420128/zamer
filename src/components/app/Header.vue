<template>
    <div class="header">
        <div class="container">
            <div class="col">
                <router-link to="/">Logo</router-link>
            </div>
            <div class="header__date">{{ date }}</div>
            <div class="col">
                <div class="menu">
                    <button
                        class="material-icons menu__btn"
                        @click="menuOpen = !menuOpen"
                    >
                        menu
                    </button>
                    <div class="menu__drop" :class="{ open: menuOpen }">
                        <router-link
                            :tag="div"
                            v-for="link in dropMenu"
                            :key="link.url"
                            active-class="active"
                            :to="link.url"
                            :exact="link.exact"
                        >
                            {{ link.title }}
                        </router-link>
                        <a href="" @click.prevent="logout">Выйти</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'z-header',
    components: {},
    props: {},
    data: () => ({
        menuOpen: false,
        dropMenu: [
            { title: 'Домой', url: '/', exact: true },
            { title: 'Регистрация', url: '/registr' },
            { title: 'Войти', url: '/login' },
        ],
        date: new Intl.DateTimeFormat('ru-RU').format(new Date()),
    }),
    computed: {},
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.push('/login?message=logout')
        },
    },
    watch: {},
    mounted() {},
    deforeDestroy() {},
}
</script>

<style lang="sass"></style>
