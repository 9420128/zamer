<template>
    <Loader v-if="loading" />
    <h3 v-else-if="!zamers.length">Замеров пока нет</h3>
    <div class="home" v-else>
        <zamersHtml :zamers="zamers" />
    </div>
</template>

<script>
// @ is an alias to /src
import zamersHtml from '@/components/Home_Item.vue'

export default {
    name: 'Home',
    data: () => ({
        zamers: [],
        loading: true,
    }),
    components: {
        zamersHtml,
    },
    async mounted() {
        this.zamers = await this.$store.dispatch('fetchZamers')

        this.loading = false
    },
}
</script>
