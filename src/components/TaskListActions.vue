<template>
    <TaskListActionsButton type="default"  @click="copyToClipboard(taskname)" :icon="CopyDocument">
       <template #text >Copier</template>
    </TaskListActionsButton>
    <TaskListActionsButton type="primary"  @click="restartTask(taskID)" :icon="VideoPlay">
       <template #text >Relancer</template>
    </TaskListActionsButton>
    <TaskListActionsButton type="danger"  @click="deleteTask(taskID)" :icon="Delete" >
       <template #text >Supprimer</template>
    </TaskListActionsButton>
</template>

<script>
import {  mapActions, mapGetters } from 'vuex'
import { CopyDocument, Delete, VideoPlay} from "@element-plus/icons-vue";
import { shallowRef } from 'vue'
import  TaskListActionsButton from './TaskListActionsButton.vue'
export default {
    components:{
        TaskListActionsButton 
    },
    data() {0
        return {
            CopyDocument:shallowRef(CopyDocument),
            Delete:shallowRef(Delete),
            VideoPlay:shallowRef(VideoPlay)
        }
    },
    props: {
        taskID: {
            type: String,
            required: true 
        },
        taskname: {
            type: String,
            require: true
        }
    },
    computed:{
        ...mapGetters({
            getTaskByID:'TASKS_MODULE/getTaskByID'
        })
    },
    methods: {
        ...mapActions({
            deleteTask: 'TASKS_MODULE/deleteTask',
            restartTask: 'TASKS_MODULE/restartTask',
            sendSuccess: 'NOTIFICATIONS_MODULE/sendSuccess',
        }),

        copyToClipboard(text) {
            navigator.clipboard.writeText(text);
            this.sendSuccess({
                title: "Success",
                message: "Tâche copiée",
                })
            // this.$notify({
                
            //     type: "success",
            //     offset: 50,
            //     duration: 1500,
            // });
        },
    },
}
</script>

<style lang="scss" scoped>

</style>