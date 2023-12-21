<template lang="">
  <div
    class="flex items-center justify-center max-w-sm p-6 mx-auto space-x-4 bg-white shadow-md bg-gradient-to-r rounded-xl"
  >
    <!-- <div class="flex items-center max-w-sm p-6 mx-auto space-x-4 bg-white shadow-md rounded-xl">
      <div class="flex-shrink-0">
        <img class="w-12 h-12" src="@/assets/logo.svg" alt="ChitChat Logo" />
      </div>
      <div>
        <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-gray-500">You have a new message!</p>
      </div>
    </div> -->
    <div class="text-xl font-medium text-black">登录</div>
    <el-form ref="ruleFormRef" :model="dataForm" status-icon :rules="rules" label-width="auto">
      <el-form-item label="Username" prop="username">
        <el-input v-model="dataForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="dataForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <div class="flex items-center">
        <el-form-item label="Captcha" prop="captcha">
          <el-input v-model="dataForm.captcha" autocomplete="off" />
        </el-form-item>
        <div v-loading="loadingCode">
          <img :src="captchaImg" alt="" width="200" height="60" @click="getCaptcha" />
        </div>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const router = useRouter()

const { proxy } = getCurrentInstance()
const userStore = useUserStore()

const ruleFormRef = ref()

const dataForm = reactive({
  username: '',
  password: ''
  // captcha: ''
})

const rules = {
  username: [{ required: true, message: '填写用户名', trigger: 'blur' }],
  password: [{ required: true, message: '填写密码', trigger: 'blur' }]
  // captcha: [{ required: true, message: '填写验证码', trigger: 'blur' }]
}

const captchaImg = ref()
const loadingCode = ref(false)
const getCaptcha = async () => {
  dataForm.uuid = uuidv4()
  loadingCode.value = true
  console.log('%c [ loadingCode ] ', 'font-size:13px; background:pink; color:#bf2c9f;', loadingCode)
  try {
    captchaImg.value = (
      await proxy.$http.get(`captcha`, {
        params: { uuid: dataForm.uuid }
      })
    ).data
  } catch (error) {
    console.log('%c [ error ] ', 'font-size:13px; background:pink; color:#bf2c9f;', error)
    throw error
  } finally {
    loadingCode.value = false
  }
}
// onMounted(() => {
//   getCaptcha()
// })

const submitForm = async (formEl) => {
  if (!formEl) return
  try {
    await formEl.validate()
    await userStore.loginFun(dataForm)
    router.replace({ path: '/home' })
  } catch (error) {
    // getCaptcha()
    throw error
  }
}
</script>
