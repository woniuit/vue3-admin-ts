<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :isCollapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @handleExpand="handleExpand" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUpdate, ref } from 'vue'
import type { Ref } from 'vue'
import NavMenu from '../../components/menu/index'
import NavHeader from '../../components/header/index'
const isCollapse: Ref<boolean> = ref(false)
function handleExpand() {
    isCollapse.value=!isCollapse.value
}
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.main-content,
.page {
  height: 100vh;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    background-color: var(--el-bg-color);
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}
.page-header{
    border-bottom: 1px solid var(--el-border-color);
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  border-right: 1px solid var(--el-border-color);
  cursor: pointer;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: var(--el-text-color-primary);
  text-align: center;
}
</style>
