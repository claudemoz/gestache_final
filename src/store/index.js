import {createStore, createLogger} from 'vuex'
import TASKS_MODULE from './modules/tasks.js'
import NOTIFICATIONS_MODULE from './modules/notifications.js'
import USERS_MODULE from './modules/users.js'

const store = createStore({
    modules:{
        TASKS_MODULE,
        NOTIFICATIONS_MODULE,
        USERS_MODULE
    },
    state(){
        return {}
    },
    mutations: {},
    actions: {},
    getters: {},
    plugins: [createLogger()]
})

export default store