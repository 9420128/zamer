<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || 'empty') + '-layout'
        },
    },
    components: { EmptyLayout, MainLayout },
}
</script>

<style lang="scss">
@import 'assets/style/main';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
