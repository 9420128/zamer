import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import { notic } from './function/notic'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Vue.filter('date', dateFilter)
// createApp.use(notic)
const firebaseConfig = {
    apiKey: 'AIzaSyByRXVZ1NuBbfnYrFQmH_YiiWL3TlkOFRU',
    authDomain: 'zame-ru.firebaseapp.com',
    projectId: 'zame-ru',
    storageBucket: 'zame-ru.appspot.com',
    messagingSenderId: '247224836733',
    appId: '1:247224836733:web:97e315ed8c2302d3450714',
}

firebase.initializeApp(firebaseConfig)

let appStart

firebase.auth().onAuthStateChanged(() => {
    if (!appStart) {
        appStart = createApp(App)
            .use(store)
            .use(router)
            .mount('#app')
    }
})
