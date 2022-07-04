<template>
  <el-row>
    <el-col :xs="12" :span="15" :lg="18">
      <el-input
        @keyup.enter="toggleTask"
        v-model="taskname"
        placeholder="Nom de votre tâche"
      ></el-input>
    </el-col>

    <el-col :xs="12" :span="9" :lg="6" class="actions">
      <strong>{{ currentDuration }}</strong>
      <el-button
        type="danger"
        v-if="!isTaskInProgress"
        @click="BeforeStartTask"
        size="large"
        :icon="VideoPlay"
        circle
      ></el-button>
      <el-button
        type="success"
        v-else
        @click="BeforeStopTask"
        size="large"
        :icon="CircleCheckFilled"
        circle
      ></el-button>
    </el-col>

  </el-row>
</template>
<script>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { CircleCheckFilled,VideoPlay,VideoPause,} from "@element-plus/icons-vue";
import { useTimestamps } from '../features/useTimestamps.js'
import   useIncrementalTimer  from '../features/useIncrementalTimer.js'

export default {
  setup(){
    const { durationBetweenTimestamps } = useTimestamps()
    const { nowTime, startTimer, stopTimer } = useIncrementalTimer()
    
    const store = useStore()
    let startTime =  store.state.TASKS_MODULE.currentStartTime
    let  isTaskInProgress = ref(store.state.TASKS_MODULE.isTaskInProgress)
    let errorMsg = ref(null)
    let taskname = ref('')

    // const taskname = computed({
    //     get () {
    //         return store.state.TASKS_MODULE.currentTaskname
    //     },
    //     set (value) {
    //         store.commit('TASKS_MODULE/SET_CURRENT_TASKNAME', value)
    //     }
    // })

     const currentDuration = computed(()=>{
        if (startTime && nowTime) {
            return durationBetweenTimestamps(startTime, nowTime);
        } else {
            return "00:00:00";
        }
        }
     )


    watch([errorMsg, isTaskInProgress], ([newValError,newVal],[oldVal, oldValError]) =>{
            if(newValError !== null){
                store.dispatch('NOTIFICATIONS_MODULE/sendWarning', {
                    title: 'Attention',
                    message: errorMsg.value,
                })
                errorMsg.value = null
            }
            if (newVal) {
                startTimer()
            } else {
                errorMsg.value = null;
                stopTimer()
            }     
        }
    )

    function BeforeStartTask(){
      // vérification
     console.log(taskname.value);
      if (taskname.value.length == 0) {
        errorMsg.value = "Le nom d'une tache ne pas être vide";
        return;
      } else if (isTaskInProgress.value) {
        errorMsg.value = "Une tache est déjà en cours";
        return;
      } else {
        errorMsg.value = null;
      }
      // Début de la tâche
     store.dispatch('TASKS_MODULE/startTask')
     startTimer()
    }

    function BeforeStopTask(){
      if (!isTaskInProgress.value) {
        errorMsg.value = "Aucune tache est déjà en cours";
        return;
      }
      store.dispatch('TASKS_MODULE/stopTask')
       stopTimer()
    }
    
    function toggleTask(){
      if (isTaskInProgress.value) {
        BeforeStopTask();
      } else {
        BeforeStartTask();
      }
    }

    return{
    CircleCheckFilled,VideoPlay,VideoPause,
    taskname,
    startTime,
    isTaskInProgress,
    currentDuration,
    BeforeStartTask,
    BeforeStopTask,
    toggleTask,
    durationBetweenTimestamps,
    nowTime, startTimer, stopTimer
    }
  }

}
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 10px;
}
.el-input .el-input--default {
  border: none !important;
}

strong {
  display: inline-block;
  margin-left: 10px;
}

.actions {
  text-align: right;
  padding-right: 20px;
  strong {
    padding-right: 20px;
  }
}
</style>
