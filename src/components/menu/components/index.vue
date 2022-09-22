<template>
  <div class="menu">
    <div class="logo">
      <img src="../../../assets/vue.svg" alt="">
      <span v-if="!isCollapse">欢迎光临</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :unique-opened="true"
      class="el-menu-vertical-demo"
    >
      <template v-for="v in list" :key="v.url">
        <el-sub-menu v-if="v.children" :index="v.url">
          <template #title>
            <el-icon :class="[isCollapse ? 'icons' : '']"><Star /></el-icon>
            <span>{{ v.name }}</span>
          </template>
          <el-menu-item
            v-for="vitem in v.children"
            :key="vitem.url"
            :index="vitem.url"
            @click="handleLink(vitem)"
          >
            <template #title>
              <el-icon><Star /></el-icon>
              <span>{{ vitem.name }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="v.url">
          <template #title>
            <el-icon><Star /></el-icon>
            <span>{{ v.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { loginStore } from '../../../store/index'
import { useRouter, useRoute } from 'vue-router'
import { Star } from '@element-plus/icons-vue'
const props = defineProps<{
  isCollapse: boolean
}>()
const router = useRouter()
const route = useRoute()
const store = loginStore()
const list = computed(() => {
  return store.menulist
})

const activeMenu = computed(() => {
  const { path } = route
  return path
})
function handleLink(e: { url: string }) {
  router.push({
    path: e.url
  })
}
</script>

<style scoped lang="less">
.menu {
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
    }
  }
  ::v-deep(.el-menu) {
    border-right: none;
  }
  ::v-deep(.el-menu-vertical):not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
}
</style>
