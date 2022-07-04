<template>
    <h2>Utilisateur</h2>
    <div v-if="$store.state.USERS_MODULE.currentUser">
        <strong>Connecté</strong>: {{ $store.state.USERS_MODULE.currentUser.email }}
        <p>
            <el-button type="danger" @click="dialogVisible=true" round>Déconnexion</el-button>
        </p>
    </div>
    <el-dialog
    v-model="dialogVisible"
    title="Confirmation de déconnexion"
    width="30%"
    >
     <span>êtes-vous sûr de vouloir vous déconnecter ?</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirmlogout"
                :loading="loading"
                >Confirm</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script>
    export default{
        data(){
            return{
                dialogVisible: false,
                loading: false
            }
        },
        methods:{
           async confirmlogout(){
               this.loading = true
                const res = await this.$store.dispatch('USERS_MODULE/logout')
                if(res == true){
                    this.$router.push('/login')
                }else{
                    this.dialogVisible = false
                    this.$store.dispatch('NOTIFICATIONS_MODULE/sendError',{
                        title: 'Erreur de déconnexion',
                        message: res
                    })

                }
            }
        }
    }
    
</script>

<style lang="scss" scoped>

</style>