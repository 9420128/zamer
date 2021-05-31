/* eslint-disable */

import firebase from 'firebase/app'
export default {
    actions: {
        // получить все замеры
        async fetchZamers({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid')
                const zamers =
                    (
                        await firebase
                            .database()
                            .ref(`/users/${uid}/zamers`)
                            .once('value')
                    ).val() || {}

                return Object.keys(zamers).map((key) => ({
                    ...zamers[key],
                    id: key,
                }))
            } catch (e) {}
        },

        // отправить замер на сервер
        async createZamer(
            { commit, dispatch },
            { adres, phone, date, timeBefore, timeAfter, title, status, coords }
        ) {
            try {
                const uid = await dispatch('getUid')
                const zamer = await firebase
                    .database()
                    .ref(`/users/${uid}/zamers`)
                    .push({
                        adres,
                        phone,
                        date,
                        timeBefore,
                        timeAfter,
                        title,
                        status,
                        coords,
                    })

                return {
                    adres,
                    phone,
                    date,
                    timeBefore,
                    timeAfter,
                    title,
                    status,
                    coords,
                    id: zamer.key,
                }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // удалить замер из базы данных
        async removeZamer({ commit, dispatch }, id) {
            try {
                const uid = await dispatch('getUid')
                await firebase
                    .database()
                    .ref(`users/${uid}/zamers/${id}`)
                    .remove()
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // получить замер по Id
        async fetchZamerId({ commit, dispatch }, id) {
            try {
                const uid = await dispatch('getUid')
                const zamer =
                    (
                        await firebase
                            .database()
                            .ref(`/users/${uid}/zamers`)
                            .child(id)
                            .once('value')
                    ).val() || {}

                return { ...zamer, id }
            } catch (e) {}
        },
    },
}
