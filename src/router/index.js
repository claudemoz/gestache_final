import * as VueRouter from 'vue-router'
import HomePage from '../pages/Home.vue'

// import LoginPage from './pages/Login.vue'
// import NotFoundPage from './pages/NotFound.vue'
// import SettingsPage from './pages/Settings.vue'
// import SettingsApp from './components/SettingsApp.vue'
// import SettingsUser from './components/SettingsUser.vue'

const LoginPage = () =>import('../pages/Login.vue')
const NotFoundPage = () =>import('../pages/NotFound.vue')
const SettingsPage = () =>import('../pages/Settings.vue')
const RegisterPage = () =>import('../pages/Register.vue')
const SettingsApp = () =>import('../components/SettingsApp.vue')
const SettingsUser = () =>import('../components/SettingsUser.vue')

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path:'/',
            name:'Home',
            alias: '/home',
            component: HomePage,
            meta: { layout: true },
            beforeEnter: [checkLoggedIn, checkJsonBinAccess],
            children:[
                {
                    path: '/home/:taskID',
                    component: HomePage,
                },
            ]
        },
        
        // {
        //     path: '/home',
        //     redirect: {name: 'Home'}
        // },
        {
            path:'/settings',
            name:'Settings',
            component: SettingsPage,
            meta: { layout: true },
            beforeEnter: [checkLoggedIn],
            children:[
                {
                    path:'app',
                    component: SettingsApp,
                    // meta: { needJsonBin: false },
                },
                {
                    path:'user',
                    component: SettingsUser,
                    // meta: { needJsonBin: true },
                }
            ]
        },
        {
            path:'/register',
            name:'Register',
            meta: { layout: false },
            beforeEnter: [checkNotLoggedIn],
            component: RegisterPage,
        },
        {
            path: '/login',
            name: 'Login',
            meta: { layout: false },
            beforeEnter: [checkNotLoggedIn],
            component: LoginPage,
        },
        {
            path: '/notfound',
            name: 'NotFound',
            meta: { layout: false },
            component: NotFoundPage,
        },
        {
            path: '/:wrongPath(.*)',
            redirect: (to)=>{
                return {name: 'NotFound', params:{wrongPath: to.params.wrongPath}}
            },
        }
        
    ]
})

function checkLoggedIn(){
    if(!localStorage.getItem('currentUser')){
        return '/login'
    }
}
function checkNotLoggedIn(){
    if(localStorage.getItem('currentUser')){
        return '/'
    }
}
function checkJsonBinAccess(){
    if(!localStorage.getItem('jsonBinAccess')){
        return '/settings/app';
    }
}

// router.beforeEach((to, from)=>{
//     if(to.meta.needJsonBin && !localStorage.getItem('jsonBinAccess')){
//         return '/settings/app';
//     }
// })

export default router