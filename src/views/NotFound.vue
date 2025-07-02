<template>
  <div class="not-found">
    <div class="error-code">404</div>
    <h1>页面未找到</h1>
    <p>抱歉，您访问的页面不存在</p>
    <router-link to="/" class="home-link">返回首页</router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 20px;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 20px;
  line-height: 1;
}

h1 {
  font-size: 32px;
  color: #303133;
  margin-bottom: 16px;
  font-weight: 500;
}

p {
  font-size: 16px;
  color: #606266;
  margin-bottom: 32px;
}

.home-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #409eff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #337ecc;
}
</style>