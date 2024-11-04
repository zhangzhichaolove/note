<script setup lang="ts">
import { ref } from "vue";

const marks = ref([
  {
    id: 1,
    class: "代码仓库",
    maeks: [
      {
        id: 1,
        url: "https://github.com",
        title: "github",
        describe: "github代码仓库",
      },
      {
        id: 2,
        url: "https://gitee.com",
        title: "gitee",
        describe: "gitee代码仓库",
      },
    ],
  },
  {
    id: 2,
    class: "开发工具",
    maeks: [
      {
        id: 1,
        url: "https://zhile.io",
        title: "zhile",
        describe: "JetBrains破解大佬博客",
      },
      {
        id: 2,
        url: "https://3.jetbra.in/",
        title: "jetbra",
        describe: "jetbra在线激活码地址检测",
      },
    ],
  },
]);
</script>

<template>
  <div v-for="mark in marks" :key="mark.id">
    <h2>{{ mark.class }}</h2>
    <div class="mark-list">
      <div v-for="item in mark.maeks" class="mark-item">
        <el-tooltip effect="dark" :content="item.describe" placement="top">
          <a :href="item.url" target="_blank">{{ item.title }}</a>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mark-list {
  display: flex;
  flex-wrap: wrap;
}
.mark-item {
  margin: 0 10px;
}
</style>
