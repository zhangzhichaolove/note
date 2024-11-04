<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  ElNotification,
  FormRules,
  FormInstance,
  DialogInstance,
} from "element-plus";
import { Plus, Close, Delete } from "@element-plus/icons-vue";

interface RuleForm {
  title: string;
  url: string;
  describe: string;
}

const isEdit = ref(false);
const addMarkVisible = ref(false);

const deleteMark = () => {
  if (isEdit.value) {
    ElNotification({
      title: "通知",
      message: "删除成功",
      type: "success",
    });
  }
  isEdit.value = !isEdit.value;
};

const markModel = reactive({
  title: "",
  url: "",
  describe: "",
});

const ruleFormRef = ref<FormInstance>();

const markRules = reactive<FormRules<RuleForm>>({
  title: [{ required: true, message: "请输入书签名称", trigger: "blur" }],
  url: [{ required: true, message: "请输入书签网址", trigger: "blur" }],
  describe: [{ required: false, message: "请输入书签描述", trigger: "blur" }],
});

const submitMark = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetMark = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (!markDialogRef) return;
  formEl.resetFields();
  addMarkVisible.value = false;
  setTimeout(() => {
    markDialogRef.value && markDialogRef.value.resetPosition();
  }, 200);
};

const markDialogRef = ref<DialogInstance>();

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
const change = (e: any, item: any) => {
  console.log(e, item);
};
</script>

<template>
  <el-row>
    <el-col :span="20">
      <div>
        <el-button
          type="primary"
          :icon="Plus"
          circle
          @click="addMarkVisible = true"
        />
        <el-button type="danger" :icon="Delete" circle @click="deleteMark" />
        <el-button
          type="success"
          :icon="Close"
          circle
          @click="isEdit = !isEdit"
          v-show="isEdit"
        />
      </div>
      <div v-for="mark in marks" :key="mark.id">
        <h2 :id="mark.class">{{ mark.class }}</h2>
        <div class="mark-list">
          <div v-for="item in mark.maeks" class="mark-item">
            <el-tooltip effect="dark" :content="item.describe" placement="top">
              <div class="mark-item-title">
                <a :href="item.url" target="_blank">{{ item.title }}</a>
                <el-checkbox
                  class="mark-item-checkbox"
                  label=""
                  :value="false"
                  v-if="isEdit"
                  @change="change($event, item)"
                /> 
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="anchor-container">
        <el-anchor direction="vertical" type="default" :offset="0">
          <el-anchor-link
            :href="`#${mark.class}`"
            :title="mark.class"
            v-for="mark in marks"
            :key="mark.id"
          />
        </el-anchor>
      </div>
    </el-col>
  </el-row>
  <el-dialog
    ref="markDialogRef"
    v-model="addMarkVisible"
    title="添加标签"
    width="500"
    @close="resetMark(ruleFormRef)"
    draggable
  >
    <el-form :model="markModel" :rules="markRules" ref="ruleFormRef">
      <el-form-item label="标签名称" prop="title">
        <el-input v-model="markModel.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="标签地址" prop="url">
        <el-input v-model="markModel.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="标签描述" prop="describe">
        <el-input v-model="markModel.describe" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetMark(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="submitMark(ruleFormRef)">
          添加
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-backtop :right="50" :bottom="50" />
</template>

<style scoped>
.mark-list {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
.mark-item {
  margin: 0 10px;
}
.mark-item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.mark-item-checkbox {
  margin-left: 5px;
}
.anchor-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.el-anchor {
  width: fit-content;
  background-color: transparent;
}
</style>
