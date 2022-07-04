import { v4 as uuid } from '@lukeed/uuid';
import * as TaskService from '../../services/TaskService.js'

export default {
    namespaced: true,
    state(){
        return{
            tasks: null,
            isLoading: null,
            currentTaskname: '',
            currentStartTime: null,
            isTaskInProgress: false
        }
    },
    mutations: {
        
        SET_TASKS(state, tasks){
            state.tasks = tasks
        },
        SET_TASKS_IS_LOADING(state, bool){
            state.isLoading = bool
        },
        ADD_TASK(state, newTask){
            state.tasks.unshift(newTask)
        },
        DELETE_TASK(state, taskID){
            state.tasks = state.tasks.filter((task) => task.id != taskID);
        },
        SET_CURRENT_TASKNAME(state, value){
            state.currentTaskname = value
        },
        SET_CURRENT_START_TIME(state, value){
            state.currentStartTime = value
        },
        SET_IS_TASK_IN_PROGRESS(state, bool){
            state.isTaskInProgress = bool
        }

    },
    actions:{

      async fetchAllTasks({ commit }){
            commit('SET_TASKS_IS_LOADING', true)
            try {
                const alltasks = await TaskService.getAll()
                commit('SET_TASKS', alltasks)
                commit('SET_TASKS_IS_LOADING', false)
            } catch (e) {
                commit('SET_TASKS_IS_LOADING', false)
                throw e   
            }
        },

        async updateAllTasks({ state }){
            await TaskService.updateAll(state.tasks)
        },

        deleteTask({commit}, taskID) {
            commit('DELETE_TASK', taskID)
        },
        startTask({commit}){
            commit('SET_IS_TASK_IN_PROGRESS', true)
            commit('SET_CURRENT_START_TIME', Date.now())
        },
        stopTask({state, commit}){
            //Enregistrement de la tâche
            const newTask = {
                id: uuid(),
                name: state.currentTaskname,
                startTime: state.currentStartTime,
                endTime: Date.now(),
              }
            commit('ADD_TASK', newTask)
            commit('SET_IS_TASK_IN_PROGRESS', false)
            commit('SET_CURRENT_TASKNAME', '')
        },
        restartTask({state, getters, commit, dispatch}, taskID){
            if (state.isTaskInProgress) {
                dispatch('stopTask');
              }
             
              // Attente la mise à jour du DOM puis execution de la nouvelle tache
              setTimeout(()=> {
                const newTaskname = getters.getTaskByID(taskID).name
                commit('SET_CURRENT_TASKNAME', newTaskname)
                dispatch('startTask');
              });
        }
    },

    getters: {
        taskByDay(state){
            if(state.tasks){
                const taskbyDay = {}
                state.tasks.forEach(task => {
                    const currentDayTS = (new Date(task.startTime)).setHours(0,0,0,0)
                    if(!taskbyDay[currentDayTS]){
                        taskbyDay[currentDayTS] = []
                    }
                    taskbyDay[currentDayTS].push(task)
                })
                return taskbyDay
            }else{
                return {}
            }
        },

        getTaskByID: (state)=>(id)=>{
            return state.tasks.find((task)=> task.id == id)
        }
    }
}