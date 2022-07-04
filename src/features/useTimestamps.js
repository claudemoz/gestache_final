import { reactive, toRefs } from "vue";

export const useTimestamps = () => {
    const state = reactive({
        tsFormatter: Intl.DateTimeFormat("fr", { hour: "2-digit", minute: "2-digit" }),
        fullDateFormatter: Intl.DateTimeFormat("fr", { dateStyle: "full" }),
    })
   
    const  formatTimestamp = (ts)=>{
        return state.tsFormatter.format(ts);
    }
  
    const durationBetweenTimestamps = (start, end)=>{
        let seconds = Math.floor(end / 1000 - start / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        seconds = seconds % 60;
        minutes = minutes % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart( 2, "0" )}:${String(seconds).padStart(2, "0")}`;
    }
   
    return{
        ...toRefs(state),
        formatTimestamp,
        durationBetweenTimestamps
    }
  }