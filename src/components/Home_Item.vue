<template>
    <div class="home__item" v-for="date of zamerDate" :key="date">
        <div class="zamer__date">{{ date }}</div>
        <div class="zamer" v-for="zamer in even(date)" :key="zamer.id">
            <div class="zamer__col-1">
                <div @click="toogleBlockVisible($event)">
                    <h2>
                        {{ zamer.adres }}
                    </h2>
                    <h3>{{ zamer.phone }}</h3>
                    <i>С {{ zamer.timeBefore }} до {{ zamer.timeAfter }}</i>
                </div>
                <div class="hidden">
                    <h3>Объявленная цена</h3>
                    <h3>Комментарий</h3>
                </div>
            </div>
            <div class="zamer__col-2">
                <a :href="'tel:+' + zamer.phone"
                    ><i class="material-icons">phone_forwarded</i></a
                >
                <a
                    :href="
                        'yandexnavi://build_route_on_map?lat_to=' +
                            zamer.coords[0] +
                            '&amp;lon_to=' +
                            zamer.coords[1]
                    "
                    ><i class="material-icons">navigation</i></a
                >
                <a href="" @click.prevent="toogleBlockVisible"
                    ><i class="material-icons relative">more_vert</i></a
                >
                <div class="zamer__drop menu__drop hidden">
                    <a
                        href="/"
                        @click.prevent="$router.push('/edit/' + zamer.id)"
                        >Редактировать</a
                    >
                    <a
                        :href="zamer.id"
                        class=""
                        @click.prevent="zamerDelete($event)"
                        >Удалить</a
                    >
                    <a href="#" @click.prevent="blockHidden($event)" class=""
                        >Отмена</a
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'zamersHtml',
    data: () => ({
        zamerDate: [],
        blockVisible: false,
    }),
    props: {
        zamers: {
            required: true,
            type: Array,
        },
    },
    async mounted() {
        console.log(this.zamers)
        this.zamerDate = this.zamers.reduce((result, item) => {
            return result.includes(item.date) ? result : [...result, item.date]
        }, [])
    },
    methods: {
        even: function(date) {
            return this.zamers.filter((zamer) => zamer.date === date)
        },
        toogleBlockVisible(e) {
            const block = e.target.parentElement.nextElementSibling

            block.classList.toggle('hidden')
        },
        blockHidden(e) {
            const block = e.target.parentElement

            block.classList.toggle('hidden')
        },
        async zamerDelete(e) {
            const id = e.target.getAttribute('href')

            if (id) {
                try {
                    await this.$store.dispatch('removeZamer', id)
                    window.location.reload()
                } catch (e) {
                    console.log(e)
                }
            }
        },
        zamerEdit(e) {
            console.log(e)
        },
    },
}
</script>
<style></style>
