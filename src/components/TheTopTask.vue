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
import { mapState, mapActions } from 'vuex'
import { CircleCheckFilled,Select,VideoPlay,VideoPause,} from "@element-plus/icons-vue";
import { shallowRef } from 'vue'
// import TimeStampsMixin from '../mixins/timestamps.js';
import { useTimestamps } from '../features/useTimestamps.js'
import   useIncrementalTimer  from '../features/useIncrementalTimer.js'

export default {
  // mixins:[TimeStampsMixin],
  data() {
    return {
      VideoPlay: shallowRef(VideoPlay),
      VideoPause: shallowRef(VideoPause) ,
      CircleCheckFilled: shallowRef(CircleCheckFilled),
      nowTime: null,
      intervalEvrySeconde: null,
      errorMsg: null,
    };
  },
  setup(){
    const { durationBetweenTimestamps } = useTimestamps()
    const { nowTime, startTimer, stopTimer } = useIncrementalTimer()
    return{
      durationBetweenTimestamps,
      nowTime, startTimer, stopTimer
    }
  },

  computed: {
    ...mapState({
        startTime: (state) => state.TASKS_MODULE.currentStartTime,
        isTaskInProgress: (state) => state.TASKS_MODULE.isTaskInProgress
    }),

    taskname: {
       get () {
      return this.$store.state.TASKS_MODULE.currentTaskname
    },
    set (value) {
      this.$store.commit('TASKS_MODULE/SET_CURRENT_TASKNAME', value)
    }
     },

    currentDuration() {
      if (this.startTime && this.nowTime) {
        return this.durationBetweenTimestamps(this.startTime, this.nowTime);
      } else {
        return "00:00:00";
      }
    },
  },

  watch: {
    isTaskInProgress(isInProgress) {
      if (isInProgress) {
        this.startTimer()
      } else {
        this.errorMsg = null;
        this.stopTimer()
      }
    },

    errorMsg(newVal){
      //Notification en cas d'erreur
      if(newVal !== null){
        this.sendWarning({
          title: 'Attention',
          message: this.errorMsg,
        })
        this.errorMsg = null
      }
    }
  },

  methods: {
    ...mapActions({
        startTask: 'TASKS_MODULE/startTask',
        stopTask: 'TASKS_MODULE/stopTask',
        sendWarning: 'NOTIFICATIONS_MODULE/sendWarning'
    }),

    BeforeStartTask() {
      // vérification
      if (this.taskname.length == 0) {
        this.errorMsg = "Le nom d'une tache ne pas être vide";
        return;
      } else if (this.isTaskInProgress) {
        this.errorMsg = "Une tache est déjà en cours";
        return;
      } else {
        this.errorMsg = null;
      }
      // Début de la tâche
      this.startTask()
    },
    BeforeStopTask() {
      if (!this.isTaskInProgress) {
        this.errorMsg = "Aucune tache est déjà en cours";
        return;
      }

      // Fin de la tache
      // clearInterval(this.intervalEvrySeconde)
      this.stopTask()
      

      // console.log(this.tasks);
    },
     
    toggleTask() {
      if (this.isTaskInProgress) {
        this.BeforeStopTask();
      } else {
        this.BeforeStartTask();
      }
    },
  },
};
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
