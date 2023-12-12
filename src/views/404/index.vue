<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  img {
    width: 1600px;
    height: 600px;
    margin-left: 400px;
  }
  button {
    width: 100px;
    height: 50px;
    margin-left: 700px;
  }
}
</style>
