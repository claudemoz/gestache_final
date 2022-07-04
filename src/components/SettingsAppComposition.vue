<template>
    <h2>Application (Composition API)</h2>
    <div class="container">
        <el-card class="box-card">
        <div  class="text item">
          <el-row>
            <el-col>
              <el-input v-model="inputValueJsonBinID" placeholder="Votre identifiant JSONBIN" class="mb"/>
            </el-col>
            <el-col>
              <el-input v-model="inputValueJsonBinKey" placeholder="Votre API KEY" class="mb"/>
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
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { UpdateAxiosApi } from '../services/TaskService.js'

    export default {
        setup () {

            const store = useStore()
            const router = useRouter()

            let inputValueJsonBinID = ref('6236ac3e06182767437b4832')
            let inputValueJsonBinKey = ref('$2b$10$VpPxsJp91FKaKsjTmvdn0../OPrMPXUA0NBn3F0JzdZk182uWj67O')
            let isAPIConnected = ref(localStorage.getItem('jsonBinAccess') ||  false)
            let isLoading = ref(false)

            watch(isAPIConnected, (newValue) => {
                if(newValue){
                    localStorage.setItem('jsonBinAccess', true)
                }else{
                    localStorage.removeItem('jsonBinAccess')
                }
            })
            let authentifier = async function(){
                isLoading.value = true
                if(inputValueJsonBinID.value !== ''){
                    localStorage.setItem('JsonBinID', inputValueJsonBinID.value)
                }else{
                    localStorage.removeItem('JsonBinID')
                }

                if (inputValueJsonBinKey.value !== '') {
                    localStorage.setItem('JsonBinKey', inputValueJsonBinKey.value)
                }else{ 
                    localStorage.removeItem('JsonBinKey')
                }

                UpdateAxiosApi();

                try {
                    await store.dispatch('TASKS_MODULE/fetchAllTasks')
                    isAPIConnected.value = true
                    store.dispatch('NOTIFICATIONS_MODULE/sendSuccess',{
                        title: "Success",
                        message: " Authenfication reussie",
                    })
                    
                    router.push('/');                   
                } catch (e) {
                     isAPIConnected.value = false
                    store.dispatch('NOTIFICATIONS_MODULE/sendError',{
                    title: "Erreur",
                    message: "Cette combinaison ne fonctionne pas sur JSONBin.io",
                    })
                }  
                isLoading.value = false;
            }


            return {
                inputValueJsonBinID,
                inputValueJsonBinKey,
                isLoading,
                authentifier,
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