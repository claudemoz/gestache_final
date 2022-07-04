<template>
    <div>
        <h1>{{ title }}</h1>
        <h2 v-if="wrongPath">"{{ wrongPath }}"</h2>
        <el-button type="primary" @click="goToPreviousPage" round>Revenir en arrière</el-button>
    </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
    export default {
        setup(){
            const router = useRouter()
            const route = useRoute()
            const state = reactive({
                wrongPath: route.params.wrongPath,
                title:'Page introuvable'
            })
           const goToPreviousPage = ()=>{
               return router.back()
           }

            return {
               ...toRefs(state),
                goToPreviousPage
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>