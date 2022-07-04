import { v4 as uuid } from '@lukeed/uuid';
export default {
    namespaced: true,
    state(){
        return{
            history: [],
            notifier: null
        }
    },
    mutations: {
        SET_NOTIFIER(state, value){
            state.notifier = value
        },
        ADD_NOTIFICATION(state, newNotifation){
            state.history.push(newNotifation)
        }
    },
    getters: {}, 
    actions: {
        saveNotification({ commit }, element){
            commit('ADD_NOTIFICATION', {
                id: uuid(),
                startTime: Date.now(),
                element
            })
        },
        
        /**
         *
         *
         * @param {*} { state, dispatch }
         * @param {*} { type, title, message }
         */
        sendCustom({ state, dispatch }, options){
            const element = state.notifier({
                offset: 50,
                duration: 3000,
                ...options
            })
            dispatch('saveNotification', element)
        },
        sendSuccess({ dispatch }, options){
            dispatch('sendCustom', {
                type: 'success',
                ...options
            })
        },
        sendWarning({ dispatch }, options){
            dispatch('sendCustom', {
                type: 'warning',
                ...options
            })
        },
        sendError({ dispatch }, options){
            dispatch('sendCustom', {
                type: 'error',
               ...options
            })
        }
    }
}