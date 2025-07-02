<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { Menu as IconMenu } from "@element-plus/icons-vue";

const isCollapse = ref(false);
const route = useRoute();
const isMobile = ref(false);
const drawerVisible = ref(false);

// 检测是否为移动设备
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  if (isMobile.value) {
    isCollapse.value = true;
  }
};

// 计算侧边栏宽度
const asideWidth = computed(() => {
  if (isMobile.value) {
    return '0px';
  }
  return isCollapse.value ? '64px' : '200px';
});

// 计算主内容区域的左边距
const mainMarginLeft = computed(() => {
  if (isMobile.value) {
    return '0px';
  }
  return isCollapse.value ? '64px' : '200px';
});

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<template>
  <el-container class="app-container">
    <!-- 移动端顶部导航栏 -->
    <el-header v-if="isMobile" class="mobile-header">
      <el-button type="primary" :icon="IconMenu" @click="drawerVisible = true" />
      <span class="header-title">便签应用</span>
    </el-header>

    <!-- 桌面端侧边栏 -->
    <el-aside v-if="!isMobile" :width="asideWidth" class="fixed-aside">
      <el-radio-group v-if="false" v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :value="false">展开</el-radio-button>
        <el-radio-button :value="true">折叠</el-radio-button>
      </el-radio-group>
      <el-menu router :default-active="route.path" class="el-menu-vertical-left" :collapse="isCollapse"
        active-text-color="#f00" text-color="#ccc" background-color="#242424">
        <el-sub-menu index="/">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>功能</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/">书签</el-menu-item>
            <el-menu-item index="/note">便签</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 移动端抽屉菜单 -->
    <el-drawer v-model="drawerVisible" title="菜单" direction="ltr" size="250px">
      <el-menu router :default-active="route.path" class="el-menu-vertical-left" active-text-color="#409eff"
        text-color="#303133" background-color="#ffffff" @select="drawerVisible = false">
        <el-menu-item index="/">
          <el-icon><icon-menu /></el-icon>
          <span>书签</span>
        </el-menu-item>
        <el-menu-item index="/note">
          <el-icon><icon-menu /></el-icon>
          <span>便签</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>

    <el-main class="main-content" :style="{ marginLeft: mainMarginLeft, marginTop: isMobile ? '60px' : '0' }">
      <RouterView />
    </el-main>
    <el-backtop :right="30" :bottom="30" />
  </el-container>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.fixed-aside {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #242424;
  transition: width 0.3s ease;
}

.main-content {
  transition: margin-left 0.3s ease;
  padding: 20px;
}

.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background-color: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-title {
  margin-left: 16px;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.el-menu {
  border-right: 0px solid var(--el-menu-border-color);
}

.el-menu-vertical-left:not(.el-menu--collapse) {
  border-right: 0;
}

:deep(.el-popper.is-pure) {
  padding: 0 !important;
  border: none !important;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-content {
    padding: 10px;
  }
}
</style>
