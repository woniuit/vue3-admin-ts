<template>
    <div>我是登录页</div>
</template>
<script setup lang="ts">
import { login } from "../../api/login/index";
import { onMounted } from "vue";
import { loginStore } from "../../store/index";
import { storeToRefs } from "pinia";
const store = loginStore();
const { token } = storeToRefs(store);
console.log('token',token.value)
onMounted(() => {
    login({
        name: "coderwhy",
        password: "123456",
    }).then((res) => {
        console.log("res=>>", res);
    });
});
</script>

<style scoped lang="less"></style>
