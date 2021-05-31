import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/app'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'empty' },
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/registr',
        name: 'registr',
        meta: { layout: 'empty' },
        component: () => import('../views/Registr.vue'),
    },
    {
        path: '/zamer',
        name: 'zamer',
        meta: { layout: 'empty', auth: true },
        component: () => import('../views/Zamer.vue'),
    },
    {
        path: '/edit/:id',
        name: 'edit',
        meta: { layout: 'empty', auth: true },
        component: () => import('../views/Edit.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAutch = to.matched.some((record) => record.meta.auth)

    if (requireAutch && !currentUser) {
        next('/login?message=login')
    } else {
        next()
    }
})

export default router
