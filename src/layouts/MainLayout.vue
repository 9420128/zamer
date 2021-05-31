<template>
    <div class="main-layout">
        <Header />

        <main>
            <router-view />
        </main>

        <div class="fixed-btn">
            <router-link class="fixed-btn__btn btn-icon" to="/zamer">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import Header from '@/components/app/Header.vue'

export default {
    name: 'main-layout',
    components: { Header },
}
</script>
