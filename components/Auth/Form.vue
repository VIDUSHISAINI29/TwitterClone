<script setup>
import useAuth from '../../composables/useAuth.js';
import UIButton from "../UI/Button.vue"
const data = reactive({
    username: '',
    password: '',
    loading: false
})
const signupData = reactive({
    username: '',
    password: '',
    repeatPassword: '',
    name: '',
    email: '',
    profileImage: ''
})

async function handleLogin() {
    const {login} = useAuth()
    
    data.loading = true
    try {
        await login({
            username: data.username,
            password: data.password
        })
        console.log("login clicked ")
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
   

}
async function handleSignup() {
    const {register} = useAuth()
    
    data.loading = true
    try {
        await register({
            username: data.username,
            password: data.password
        })
        console.log("login clicked ")
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
   

}

const isButtonDisabled = computed(() => {
    return (!data.username || !data.password) || data.loading
})


</script>

<template>
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>

        <div class="pt-5 space-y-6">

         <UIInput v-model="data.username" label="Username" placeholder="@username" />

            <UIInput label="Password" placeholder="********" type="password" v-model="data.password" /> 

            <div class="flex gap-2">
                
            <UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">
                Login
            </UIButton> 
            <UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">
                Login
            </UIButton> 
            </div>

        </div>
    </div>
</template>
