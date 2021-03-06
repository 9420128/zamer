import firebase from 'firebase/app'
/* eslint-disable */
export default {
    actions: {
        async login({ dispatch, commit }, { email, password }) {
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async registr({ dispatch, commit }, { email, password, name }) {
            try {
                await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)

                const uid = await dispatch('getUid')
                await firebase
                    .database()
                    .ref(`/users/${uid}/`)
                    .set({
                        name,
                        email,
                        password,
                    })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout() {
            await firebase.auth().signOut()
        },
    },
}
