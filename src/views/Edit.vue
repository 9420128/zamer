<template>
    <div class="header">
        <div class="container">
            <div class="header__row">
                <a href="/" class="header__btn btn-icon"
                    ><i class="large material-icons">arrow_back</i></a
                >
                <h1>Новый замер</h1>
            </div>
        </div>
    </div>
    <loader v-if="loading" />
    <form v-else class="modal" @submit.prevent="zamerSubmit">
        <div class="modal__content">
            <div class="input-field">
                <label for="adres" class="required">Адрес</label>

                <div class="inline">
                    <a class="input-icon" href="#map" @click="addAdresMap"
                        ><i class="material-icons large">location_on</i></a
                    >
                    <input
                        type="text"
                        class="input"
                        id="adres"
                        :value="zamer.adres"
                    />
                </div>
                <small class="helper-text invalid"></small>
            </div>

            <div class="input-field">
                <label for="phone" class="required">Телефон</label>
                <input
                    type="text"
                    class="input"
                    id="phone"
                    :value="zamer.phone"
                />
                <small class="helper-text invalid"></small>
            </div>

            <div class="input-field">
                <label for="date" class="required">Дата замера</label>
                <input
                    type="date"
                    class="input"
                    id="date"
                    :value="zamer.date"
                />
                <small class="helper-text invalid"></small>
            </div>

            <div class="col-2">
                <div class="input-field">
                    <label for="timeBefore">Время замера c</label>
                    <input
                        type="text"
                        class="input"
                        id="timeBefore"
                        :value="zamer.timeBefore"
                    />
                    <small class="helper-text invalid"></small>
                </div>

                <div class="input-field">
                    <label for="timeAfter">До</label>
                    <input
                        type="text"
                        class="input"
                        id="timeAfter"
                        :value="zamer.timeAfter"
                    />
                    <small class="helper-text invalid"></small>
                </div>
            </div>

            <div class="input-field">
                <label for="title">Комментарий</label>
                <textarea
                    class="textarea"
                    id="title"
                    :value="zamer.title"
                ></textarea>
                <small class="helper-text invalid"></small>
            </div>

            <div class="input-field">
                <label>Статус заказа</label>
                <select v-model="selected">
                    <option v-for="status in statuts" v-bind:key="status.title">
                        {{ status.title }}
                    </option>
                </select>
                <input type="hidden" id="coords" />
            </div>

            <div id="mapWrap">
                <!-- <div id="map"></div> -->
            </div>

            <p class="height-4">&nbsp;</p>
        </div>

        <div class="modal__footer">
            <div class="container">
                <button class="btn-close modal__btn">Отмена</button>
                <button class="btn-submit modal__btn" type="submit">
                    Сохранить
                </button>
            </div>
        </div>
    </form>
</template>

<script>
/* eslint-disable */
// import Map from '../components/Map'
export default {
    name: 'edit',
    data: () => ({
        zamer: null,
        loading: true,
        adres: '',
        phone: '',
        date: '',
        timeBefore: '',
        timeAfter: '',
        title: '',
        selected: 'Замер',
        statuts: [
            { title: 'Замер' },
            { title: 'Отложен' },
            { title: 'Завершен' },
            { title: 'Архив' },
        ],
    }),
    async mounted() {
        const id = this.$route.params.id
        const zamer = await this.$store.dispatch('fetchZamerId', id)

        let htmlSelect = this.statuts.filter((el) => el.title !== zamer.status)

        this.statuts = htmlSelect

        console.log(this.statuts)

        this.zamer = { ...zamer }

        this.loading = false
        console.log(zamer)
    },
    // components: { Map },
    methods: {
        async zamerSubmit() {
            const coordsValue = document.getElementById('coords').value
            if (adres && phone) {
                try {
                    const zamers = await this.$store.dispatch('createZamer', {
                        adres: this.adres,
                        phone: this.phone,
                        date: this.date,
                        timeBefore: this.timeBefore,
                        timeAfter: this.timeAfter,
                        title: this.title,
                        status: this.selected,
                        coords: coordsValue.split(','),
                    })
                    this.$router.push('/')
                } catch (e) {}
            }
            // if (this.password.length >= 6 && this.email.length >= 4) {
            //     const formData = {
            //         email: this.email,
            //         password: this.password,
            //     }
            //     try {
            //         await this.$store.dispatch('login', formData)
            //         this.$router.push('/')
            //     } catch (e) {}
            // }
        },
        addAdresMap() {
            const $map = document.getElementById('map')
            const $coords = document.getElementById('coords')
            if ($map) $map.remove()

            const mapHtml = document.createElement('div')
            mapHtml.id = 'map'
            mapHtml.style.width = '100%'
            mapHtml.style.height = '400px'

            document.getElementById('mapWrap').append(mapHtml)

            ymaps.ready(init(this.adres))

            function init(adres) {
                let myMap

                if (myMap) {
                    myMap.destroy()
                    myMap = null
                }

                myMap = new ymaps.Map('map', {
                    center: [59.938955, 30.315644],
                    zoom: 9,
                    controls: [],
                })

                // Добавим на карту ползунок масштаба и линейку.
                myMap.controls.add('zoomControl')

                ymaps
                    .geocode(adres, {
                        results: 1,
                    })
                    .then(function(res) {
                        // Выбираем первый результат геокодирования.
                        var firstGeoObject = res.geoObjects.get(0),
                            // Координаты геообъекта.
                            coords = firstGeoObject.geometry.getCoordinates(),
                            // Область видимости геообъекта.
                            bounds = firstGeoObject.properties.get('boundedBy')

                        firstGeoObject.options.set(
                            'preset',
                            'islands#darkBlueDotIconWithCaption'
                        )
                        // Получаем строку с адресом и выводим в иконке геообъекта.
                        firstGeoObject.properties.set(
                            'iconCaption',
                            firstGeoObject.properties.get('name')
                        )

                        // Добавляем первый найденный геообъект на карту.
                        myMap.geoObjects.add(firstGeoObject)
                        // Масштабируем карту на область видимости геообъекта.
                        myMap.setBounds(bounds, {
                            // Проверяем наличие тайлов на данном масштабе.
                            checkZoomRange: true,
                        })

                        /**
                         * Все данные в виде javascript-объекта.
                         */
                        console.log(
                            'Все данные геообъекта: ',
                            firstGeoObject.properties.getAll()
                        )

                        console.log(
                            'Номер здания: %s',
                            firstGeoObject.getPremiseNumber() || '-'
                        )

                        $coords.value = firstGeoObject.geometry.getCoordinates()

                        /**
                         * Если нужно добавить по найденным геокодером координатам метку со своими стилями и контентом балуна, создаем новую метку по координатам найденной и добавляем ее на карту вместо найденной.
                         */
                        /**
             var myPlacemark = new ymaps.Placemark(coords, {
             iconContent: 'моя метка',
             balloonContent: 'Содержимое балуна <strong>моей метки</strong>'
             }, {
             preset: 'islands#violetStretchyIcon'
             });

             myMap.geoObjects.add(myPlacemark);
             */
                    })
            }
        },
    },
}
</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
    margin: 0;
    padding: 0;
}
</style>
