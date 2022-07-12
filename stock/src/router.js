import { createRouter, createWebHashHistory } from 'vue-router'
import Search from './components/CoverPage.vue'
import Watchlist from './components/Watchlist.vue'
import Portfolio from './components/Portfolio.vue'
import Details from './components/Details.vue'

const routes = [
    { path: '/', component: Search },
    { path: '/watchlist', component: Watchlist },
    { path: '/portfolio', component: Portfolio},
    { path: '/details/:id', name:"details", component: Details}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

/*const router = createRouter({
    history: createWebHashHistory(),
    routers: [
        { path: '/search', component: Search },
        { path: '/watchlist', component: Watchlist },
        { path: '/portfolio', component: Portfolio}
    ],
})*/
