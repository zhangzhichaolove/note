<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Menu as IconMenu } from "@element-plus/icons-vue";

const isCollapse = ref(false);
const route = useRoute();
</script>

<template>
  <el-container class="app-container">
    <el-aside width="200px" class="fixed-aside">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :value="false">展开</el-radio-button>
        <el-radio-button :value="true">折叠</el-radio-button>
      </el-radio-group>
      <el-menu router :default-active="route.path" class="el-menu-vertical-left" :collapse="isCollapse" active-text-color="#f00"
        text-color="#ccc" background-color="#242424">
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
    <el-main class="main-content">
      <RouterView />
    </el-main>
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
}

.main-content {
  margin-left: 200px;
}

.el-menu-vertical-left:not(.el-menu--collapse) {
  border-right: 0;
}
</style>
