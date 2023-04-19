<template lang="">
  <div
    class="flex items-center justify-center max-w-sm p-6 mx-auto space-x-4 bg-white shadow-md bg-gradient-to-r rounded-xl"
  >
    home
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
  password: '',
  captcha: ''
})

const rules = {
  username: [{ required: true, message: '填写用户名', trigger: 'blur' }],
  password: [{ required: true, message: '填写密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '填写验证码', trigger: 'blur' }]
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore
        .loginFun(dataForm)
        .then((res) => {
          router.replace({ path: '/home' })
        })
        .catch((err) => {
          getCaptcha()
        })
    } else {
      return false
    }
  })
}

const captchaImg = ref()
const getCaptcha = async () => {
  dataForm.uuid = uuidv4()
  try {
    captchaImg.value = (
      await proxy.$http.get(`captcha`, {
        params: { uuid: dataForm.uuid }
      })
    ).data
  } catch (error) {
    throw error
  }
}
getCaptcha()
</script>
