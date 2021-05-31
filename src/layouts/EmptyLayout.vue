<template>
    <div class="empty-layout">
        <router-view />
    </div>
</template>

<script>
import messadges from '../function/messadges'
export default {
    computed: {
        error() {
            return this.$store.getters.error
        },
    },
    watch: {
        error(fbError) {
            this.$store.dispatch(
                'notic',
                messadges[fbError.code] || 'Что то пошло не так'
            )
        },
    },
}
</script>
