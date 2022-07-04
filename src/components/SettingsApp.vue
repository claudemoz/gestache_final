<template>
<!-- <SettingsAppComposition/> -->
    <h2>Application (Option API)</h2>
    <div class="container">
        <el-card class="box-card">
        <div  class="text item">
          <el-row>
            <el-col>
              <el-input v-model="user.id" placeholder="Votre identifiant JSONBIN" class="mb"/>
            </el-col>
            <el-col>
              <el-input v-model="user.key" placeholder="Votre API KEY" class="mb"/>
            </el-col>
            <el-col>
              <el-button type="primary" @click="authentifier" :loading="isLoading">CONNEXION</el-button>
            </el-col>
          </el-row>
        </div>
    </el-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { UpdateAxiosApi } from '../services/TaskService.js'
// import SettingsAppComposition from './SettingsAppComposition.vue';

    export default {
      components:{
        // SettingsAppComposition,
      },
        data(){
          return{
            isLoading: false,
            user:{
              id: '6236ac3e06182767437b4832',
              key: '$2b$10$VpPxsJp91FKaKsjTmvdn0../OPrMPXUA0NBn3F0JzdZk182uWj67O',
            },
          }
        },
        emits:['updateTasks'],
        methods: {
           ...mapActions({
            fetchAllTasks:'TASKS_MODULE/fetchAllTasks',
            sendError: 'NOTIFICATIONS_MODULE/sendError',
            sendSuccess: 'NOTIFICATIONS_MODULE/sendSuccess',
        }),
         async authentifier() {
            this.isLoading = true;

            if(this.user.id !== ''){
              localStorage.setItem('JsonBinID', this.user.id)
            }else{
              localStorage.removeItem('JsonBinID')
            }

            if (this.user.key !== '') {
              localStorage.setItem('JsonBinKey', this.user.key)
            }else{ 
              localStorage.removeItem('JsonBinKey')
            }
              console.log(localStorage.getItem('JsonBinID'));            
              console.log(localStorage.getItem('JsonBinKey'));            
              await UpdateAxiosApi();
            try {
             await this.fetchAllTasks()
              localStorage.setItem('jsonBinAccess', true);
              this.sendSuccess({
                title: "Success",
                message: " Authenfication reussie",
              })
              
                this.$router.push('/');
              
            } catch (e) {
                localStorage.removeItem('jsonBinAccess');
                this.sendError({
                  title: "Erreur",
                  message: "Cette combinaison ne fonctionne pas sur JSONBin.io",
                })
            }  
            this.isLoading = false;
          }
        },
        created() {
          // Mise en place des valeurs du localStorage sur l'instance
          const JsonBinID = localStorage.getItem('jsonBinID');
          const JsonBinKey = localStorage.getItem('jsonBinKey');
          if (JsonBinKey) {
            this.user.key = JsonBinKey
          }
          if (JsonBinID) {
            this.user.id = JsonBinID
          }
        },
    }
</script>

<style lang="scss" scoped>
.mb{
  margin-bottom: 15px;
}
.container{
    display: flex;
    justify-content: center;
}
.el-card__header{
    border-bottom: none !important;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>