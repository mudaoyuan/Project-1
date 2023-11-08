<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          :model="loginFrom"
          :rules="rules"
          class="login_form"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到后台管理</h2>
          <el-form-item prop="username">
            <el-input v-model="loginFrom.username" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFrom.password"
              show-password
              :prefix-icon="Lock"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              @click="submit"
              class="login_btn"
              type="primary"
            >
              {{ login_text }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
const useStore = useUserStore()
//获取el-from组件
let loginForms = ref()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const login_text = ref('登录')
const loginFrom = reactive({
  username: 'admin',
  password: 'atguigu123',
})
const submit = async () => {
  //保证全部表单项校验通过
  await loginForms.value.validate()
  loading.value = true
  login_text.value = '登录中....'
  try {
    let res = await useStore.userLogin(loginFrom)
    //判断登录的时候，路由路径当中是否有query参数。如果有跳到query，没有跳首页
    let redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${useStore.username}` + `${getTime()}好`,
    })
    console.log(res)
  } catch (error) {
    ElMessageBox.confirm(`${(error as Error).message}`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '退出',
      type: 'warning',
      draggable: true,
    })
  } finally {
    loading.value = false
    login_text.value = '登录'
  }
}

const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}
const rules = reactive({
  username: [
    {
      trigger: 'change',
      validator: validatorUserName,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
})
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  min-width: 689px;
  .login_form {
    display: block;
    position: relative;
    width: 70%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
@media (max-width: 760px) {
  .login_form {
    margin-left: 15%;
  }
}
</style>
