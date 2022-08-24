<template>
  <div class="nav-header">
    <div class="item">
      <div>
        <el-icon class="icon" @click="handleExpand"><Expand /></el-icon>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            UserName
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
import { Expand, ArrowDown } from '@element-plus/icons-vue'
import { loginStore } from '../../../store/index'
import { useRouter } from 'vue-router'
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
}
</style>
