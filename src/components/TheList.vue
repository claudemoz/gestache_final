<template>
  <el-select
    v-model="SortBy"
    class="m-2"
    placeholder="Select"
    size="small"
    style="float: right"
  >
    <el-option label="Plus récente d'abord" value="descending"></el-option>
    <el-option label="Plus ancienne d'abord" value="ascending"></el-option>
  </el-select>
    <!--  -->
    <div v-for="(daytask, date) in taskByDay" :key="date">
      <h3>{{ fullDateFormatter.format(date)}}</h3>
      <el-table
        :data="daytask"
        ref="table"
        v-loading="isLoading"
        row-key="id"
        empty-text="Aucune tâche"
        style="width: 100%"
        :row-class-name="checkHighLight"
        @row-click="setHighLight"
        >
      <el-table-column label="Tâche" prop="name" sort-by="startTime" />

      <el-table-column label="Début et Fin" prop="">
        <template #header></template>
        <template #default="scope">
          {{ formatTimestamp(scope.row.startTime) }} -
          {{ formatTimestamp(scope.row.endTime) }}
        </template>
      </el-table-column>

      <el-table-column label="Durée" prop="">
        <template #header></template>
        <template #default="scope">
          {{ durationBetweenTimestamps(scope.row.startTime, scope.row.endTime) }}
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template #default="scope">
          <TaskListActions
            :taskID="scope.row.id"
            :taskname="scope.row.name"
          />
        </template>
      </el-table-column>
  </el-table>
    </div>
    <!--  -->
  
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import TaskListActions from "./TaskListActions.vue";
// import TimeStampsMixin from '../mixins/timestamps.js';
import { useTimestamps } from '../features/useTimestamps.js'
export default {
  // mixins:[TimeStampsMixin],
  components: {
    TaskListActions,
  },
  setup(){
    const { formatTimestamp, fullDateFormatter, durationBetweenTimestamps } = useTimestamps()
    return{
      formatTimestamp,
      fullDateFormatter,
      durationBetweenTimestamps
    }
  },
  data() {
    return {
      SortBy:
        this.$route.query.sortBy === "ascending" ? "ascending" : "descending",
    };
  },
 computed: {
   ...mapState({
     isLoading: (state) => state.TASKS_MODULE.isLoading
   }),
   ...mapGetters({
      taskByDay: 'TASKS_MODULE/taskByDay'
   })
 },
  watch: {
    SortBy(newValue) {
      this.$router.push({ query: { sortBy: newValue } });
    },
  },

  methods: {
    
    setHighLight(row){
      this.$router.push({path: '/home/' + row.id})
    },
    checkHighLight({ row }){
      if(this.$route.params.taskID && row.id === this.$route.params.taskID){
        return 'highlight-line'
      }else{
        return '';
      }
    },
    // sortTable() {
    //   return { prop: "name", order: this.SortBy };
    // },
    sortBy() {
      return this.$route.query.sortBy === "ascending"
        ? "ascending"
        : "descending";
    },

    sendRestart(data) {
      this.$emit("restart", data);
    },
    DeleteTask(taskID) {
      this.deletetask(taskID);
    },
   
  },

  // mounted(){
  //  const sortBy = (this.$route.query.sortBy == 'ascending') ? 'ascending' : 'descending';
  //  this.$refs.table.sort({ prop: 'name', order: this.SortBy})
  //  console.log(sortBy);
  // }
};
</script>

<style scoped>
h3{
  float: left;
  text-transform: capitalize;
  font-weight: 900;
}
</style>
