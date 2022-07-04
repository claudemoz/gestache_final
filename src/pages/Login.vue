<template>
<h1>Connexion</h1>
  <el-row>
    <el-col :span="10" :offset="6">
      <el-form label-position="top" label-width="100px" >
        <el-form-item label="Adresse email">
           <!-- <div>
             <input type="text" v-model="fieldValue"  >
             <input type="text" :value="fieldValue" @input="fieldValue = $event.target.value" >
             <BaseVmodel :modelValue="fieldValue"/>
             <BaseVmodel :modelValue="fieldValue" @update:modelValue="fielValue = $event"/>
           </div> -->
            <BaseInput
              label="Adresse email"
              v-model="email"
              placeholder="hello@vuetracker.fr"
              type="email"
              id="email"
              area-describeby="emailError"
              :area-invalid="v$.email.$invalid"
            >
            </BaseInput>
            <el-alert
              v-if="v$.email.$error"
              :title="v$.email.$errors[0].$message"
              type="error"
              :closable="false"
              id="emailError"
            />
        </el-form-item>
        <el-form-item label="Mot de passe">
          <BaseInput
          v-model="password"
            type="password"
            id="password"
            area-describeby="pwdError"
            :area-invalid="v$.password.$invalid"
          ></BaseInput>
          <el-alert
            v-if="v$.password.$error"
            :title="v$.password.$errors[0].$message"
            type="error"
            :closable="false"
            id="pwdError"
          ></el-alert>
        </el-form-item>
        
        <el-button type="primary" native-type="submit" :loading="loading" @click.prevent="sendForm">Connexion</el-button>
        <el-alert
            v-if="apiError"
            :title="apiError"
             type="error"
            :closable="false"
          ></el-alert>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, toRefs } from "vue";
import useVuelidate from '@vuelidate/core'
import { required, email, minLength} from '../utils/validators.js'
import BaseInput from "../components/BaseInput.vue";
import BaseCheckBox from "../components/BaseCheckBox.vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  components:{
    BaseInput,
    BaseCheckBox
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      email: "claude.test@gmail.com",
      password: "12345678",
      loading: false,
      apiError: null
    });

    const rules = {
      email:{
        required, 
        email
      },
      password:{
        required, 
        minLength: minLength(6)
      }
    }
    const v$ = useVuelidate(rules, state, {$autoDirty: true})

    const sendForm = async ()=>{
      v$.value.$touch()
      state.apiError = null
        if(!v$.value.$error){
          state.loading = true
          const res  = await store.dispatch('USERS_MODULE/login',{ email: state.email, password: state.password})
          if(res == true){
            // console.log(store.state.USERS_MODULE.currentUser);
            router.push('/')
          }else{
            state.apiError = res
          }
          state.loading = false
        }
    }

    return {
      ...toRefs(state),
      v$,
      sendForm
    };
  },
};
</script>

<style lang="scss" scoped>
form {
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  text-align: left;
}
fieldset {
  border: none;
  legend {
    display: none;
  }
}

.el-alert {
  display: block;
  max-width: 75%;
  margin: 10px 0;
}
.el-checkbox {
  margin: 20px 0 0;
}
.el-button {
  margin-top: 25px;
}
</style>
