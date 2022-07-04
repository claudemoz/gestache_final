<template>
  <el-container v-if="$route.meta.layout == true">
    <el-aside width="200px">
      <el-scrollbar>
        <The-menu />
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header height="60px">
        <!-- <TheTopTaskCompotion/> -->
        <TheTopTask/>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view ></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
  <div class="mainContainer" v-else-if="$route.meta.layout == false">
    <router-view ></router-view>
  </div>

  <div class="mainContainer" v-else v-loading="true"></div>
  
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'


import TheMenu from "./components/TheMenu.vue";
import TheTopTask from "./components/TheTopTask.vue";
// import TheTopTaskCompotion from "./components/TheTopTaskComposition.vue";

// import { ref } from 'vue'
// import { FolderOpened,Timer, Message, Menu as IconMenu, Setting } from '@element-plus/icons-vue'
export default {
  components: {
    TheMenu,
    TheTopTask,
    // TheTopTaskCompotion,
  },

  computed: {
   ...mapState({
     tasks: (state) => state.TASKS_MODULE.tasks
   })
  },
  watch: {
    tasks: {
      //Mise à jour de toutes les tâche en API dès que  tasks change
      deep: true,
      async handler (newVal, oldVal){
        if(newVal !== null && oldVal !== null){
          try {
            await this.updateAllTasks()
          } catch (e) {
            console.error(e)
            this.sendError({
              title: 'Mode hors ligne',
              message: 'Synchronisation des tâches impossible',
            })
          }
        }
      }
    }
  },
  methods: {
    ...mapActions({
      fetchAllTasks: 'TASKS_MODULE/fetchAllTasks',
      updateAllTasks: 'TASKS_MODULE/updateAllTasks',
      sendError: 'NOTIFICATIONS_MODULE/sendError',
      setWatcherCurrentUser: 'USERS_MODULE/setWatcherCurrentUser'
    }),
    ...mapMutations({
      SET_NOTIFIER: 'NOTIFICATIONS_MODULE/SET_NOTIFIER'
    })

  },
  async created(){
    // Mise en place de l'actualisation de l'utilisateur actuell
    this.setWatcherCurrentUser()
    
    // mise en place du système de notification
    this.SET_NOTIFIER(this.$notify)

    //Récupération de toutes les taches
    try {
          await this.fetchAllTasks();
    } catch (e) {
        console.error(e);
        this.sendError({
          title: 'Mode hors ligne',
          message: 'Récupération des tâches impossible',
        })
    }
  }
};

</script>

<style lang="scss">
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header {
  /* padding: 0px !important; */
  background-color: #5da0f1;
  border-bottom: solid 1px #e6e6e6;
  color: var(--el-text-color-primary);
  .el-input .el-input__inner {
    border: none !important;
    height: 40px !important;
  }
}
.el-aside {
  width: 240px;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e6e6e6;
  height: 100vh;
  box-sizing: border-box;
}

.el-main {
  padding: 0;
}
.toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.highlight-line{
  background-color: #b8d8f8 !important;
}


</style>
