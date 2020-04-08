import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        component: () => import('../views/index/index')


    },
    {
        path: '/sector/:sectorId',
        component: () => import('../views/sector/index')

    },
    {
        path:'/ranking/:sectorId',
        component:()=>import('../views/ranking/index')
    },
    {
        path:'/ranking',
        component:()=>import('../views/ranking/index')
    }
]


const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    mode: 'history',
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router