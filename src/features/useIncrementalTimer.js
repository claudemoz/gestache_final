import { ref } from "vue";

const useIncrementalTimer = ()=>{
    const nowTime = ref(null)
    const intervalEverySecond = ref(null)

    let startTimer = ()=>{
        nowTime.value = Date.now()
        intervalEverySecond.value = setInterval(() => {
        nowTime.value = Date.now();
          }, 1000);
    }

    let stopTimer = ()=>{
        nowTime.value= null;
        clearInterval(intervalEverySecond.value);
    }

    return {nowTime, startTimer, stopTimer}
}

export default useIncrementalTimer;