<template>
  <div class="nav-header">
    <div class="item">
      <div>
        <el-icon class="icon" @click="handleExpand"><Expand /></el-icon>
      </div>

      <div class="operate">
        <div class="full-screen" @click="onFull">
          <el-icon><FullScreen /></el-icon>
        </div>
        <div class="theme-toggler">
          <theme-toggler />
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span
              style="width: 24px; height: 24px"
              class="el-avatar el-avatar--circle"
              ><img
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                style="object-fit: cover; width: 24px; height: 24px"
            /></span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="LoginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Expand, ArrowDown, FullScreen } from '@element-plus/icons-vue'
import { loginStore } from '../../../store/index'
import { useRouter } from 'vue-router'
import themeToggler from '../../theme-toggler/components/index.vue'
import screenfull from 'screenfull'

const store = loginStore()
const router = useRouter()
const emit = defineEmits(['handleExpand'])
function handleExpand() {
  emit('handleExpand')
}
function LoginOut() {
  store.token = ''
  router.push({
    path: '/login'
  })
}
function onFull() {
  screenfull.toggle()
}
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      cursor: pointer;
    }
    .example-showcase .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;
    }
  }
  .operate {
    display: flex;
    align-items: center;
  }
  .theme-toggler {
    margin: 0 10px;
  }
  .full-screen {
    cursor: pointer;
    margin-right: 5px;
  }
}
</style>
