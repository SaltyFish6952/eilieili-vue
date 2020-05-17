import Vue from 'vue'
import Router from 'vue-router'
import {getUser} from "@/utils/auth";

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/admin',
        component: () => import('../views/main/index')

    }, {
        path: '/admin/user',
        component: () => import('../views/user/index')
    },
    {
        path: '/admin/video',
        component: () => import('../views/video/index')
    },
    {
        path: '/admin/sector',
        component: () => import('../views/sector/index')
    },
    {
        path: '/admin/comment',
        component: () => import('../views/comment/index')
    },
    {
        path: '/admin/danmaku',
        component: () => import('../views/danmaku/index')
    }
]


const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    mode: 'history',
    routes: constantRoutes
})

const router = createRouter()

router.beforeEach((to, from, next) => {

    const user = JSON.parse(getUser())

    if (user !== null) {

        if (user.userId === "1") {
            next()
        } else {
            alert("非管理员用户无法进入后台！")
            window.location.href = "/"
        }
    } else {
        alert("非管理员用户无法进入后台！")
        window.location.href = "/"
    }

})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router