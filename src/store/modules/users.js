import * as FirebaseService from '../../services/FirebaseServices.js'
import {  onAuthStateChanged } from "firebase/auth";
const auth = FirebaseService.Auth;

let userInStorage
try {
    userInStorage = JSON.parse(localStorage.getItem('currentUser')) || null
} catch (error) {
    userInStorage = null
}
export default {
    namespaced: true,
    state(){
        return{
            currentUser: userInStorage,
        }
    },
    mutations: {
        SET_CURRENT_USER(state, user){
            state.currentUser = user
            if(user){
                localStorage.setItem('currentUser', JSON.stringify(user))
            }else{
                localStorage.removeItem('currentUser')
            }
        }
    },
    getters: {}, 
    actions: {
        async register({ commit }, {email, password}){
            const [res, errorCode] = await FirebaseService.register(email, password)
            if(!errorCode){
                commit('SET_CURRENT_USER', res.user)
                return true
            }else{
                return FirebaseService.translateErrorCode(errorCode)
            }
        },
        async login({ commit }, {email, password}){
            const [res, errorCode] = await FirebaseService.login(email, password)
            if(!errorCode){
                commit('SET_CURRENT_USER', res.user)
                return true
            }else{
                return FirebaseService.translateErrorCode(errorCode)
            }
        },
        async logout({ commit }){
            const [, errorCode] = await FirebaseService.logout()
            if(!errorCode){
                commit('SET_CURRENT_USER', null)
                return true
            }else{
                return FirebaseService.translateErrorCode(errorCode)
            }
        },

        setWatcherCurrentUser({ commit }){
            onAuthStateChanged(auth, (user) => {
                commit('SET_CURRENT_USER', user)
            })
        }
    
    }
}