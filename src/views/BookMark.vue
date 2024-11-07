<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  ElNotification,
  FormRules,
  FormInstance,
  DialogInstance,
} from "element-plus";
import { Close, Edit } from "@element-plus/icons-vue";
import axiosInstance from "@/request";

interface RuleForm {
  id?: number;
  title: string;
  url: string;
  describe: string;
  isEdit?: boolean;
  classId?: number;
  className?: string;
}

interface GroupRuleForm {
  id?: number;
  name: string;
  isEdit?: boolean;
}

type MarkType = {
  id: number;
  url: string;
  title: string;
  describe: string;
};

type MarkDataType = {
  id: number;
  name: string;
  marks: MarkType[];
};

const marks = ref<MarkDataType[]>([]);
const isEdit = ref(false);
const addMarkVisible = ref(false);
const addGroupVisible = ref(false);

const markModel = reactive<RuleForm>({
  title: "",
  url: "",
  describe: "",
  isEdit: false,
});

const groupModel = reactive<GroupRuleForm>({
  name: "",
  isEdit: false,
});

const markRules = reactive<FormRules<RuleForm>>({
  className: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
  title: [{ required: true, message: "请输入书签名称", trigger: "blur" }],
  url: [{ required: true, message: "请输入书签网址", trigger: "blur" }],
  describe: [{ required: false, message: "请输入书签描述", trigger: "blur" }],
});

const groupRules = reactive<FormRules<GroupRuleForm>>({
  name: [{ required: true, message: "请输入分组名称", trigger: "blur" }],
});

const ruleFormRef = ref<FormInstance>();
const grouopFormRef = ref<FormInstance>();

const markDialogRef = ref<DialogInstance>();
const grouopDialogRef = ref<DialogInstance>();
const addMark = (mark: any) => {
  markModel.classId = mark.id;
  markModel.className = mark.name;
  addMarkVisible.value = true;
};

const editMark = (item: RuleForm, mark: any) => {
  markModel.id = item.id;
  markModel.title = item.title;
  markModel.url = item.url;
  markModel.describe = item.describe;
  markModel.isEdit = true;
  markModel.classId = mark.id;
  markModel.className = mark.name;
  addMarkVisible.value = true;
};

const editGroup = (item: GroupRuleForm) => {
  groupModel.id = item.id;
  groupModel.name = item.name;
  groupModel.isEdit = true;
  addGroupVisible.value = true;
};

const submitMark = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (markModel.isEdit) {
        axiosInstance.put("/api/editMark", markModel).then(() => {
          ElNotification({
            title: "通知",
            message: "修改成功",
            type: "success",
          });
          getMarkList();
        });
      } else {
        axiosInstance.post("/api/addMark", markModel).then(() => {
          ElNotification({
            title: "通知",
            message: "添加成功",
            type: "success",
          });
          getMarkList();
        });
      }
      addMarkVisible.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetMark = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (!markDialogRef) return;
  formEl.resetFields();
  markModel.title = "";
  markModel.url = "";
  markModel.describe = "";
  markModel.isEdit = false;
  markModel.classId = undefined;
  markModel.className = undefined;
  addMarkVisible.value = false;
  setTimeout(() => {
    markDialogRef.value && markDialogRef.value.resetPosition();
  }, 200);
};

const submitGroup = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (groupModel.isEdit) {
        axiosInstance
          .put("/api/editGroup", { id: groupModel.id, name: groupModel.name })
          .then(() => {
            ElNotification({
              title: "通知",
              message: "修改成功",
              type: "success",
            });
            getMarkList();
          });
      } else {
        axiosInstance
          .post("/api/addGroup", { name: groupModel.name })
          .then(() => {
            ElNotification({
              title: "通知",
              message: "添加成功",
              type: "success",
            });
            getMarkList();
          });
      }
      addGroupVisible.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetGroup = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (!grouopDialogRef) return;
  formEl.resetFields();
  groupModel.name = "";
  groupModel.isEdit = false;
  addGroupVisible.value = false;
  setTimeout(() => {
    grouopDialogRef.value && grouopDialogRef.value.resetPosition();
  }, 200);
};

const deleteGroup = (item: any) => {
  axiosInstance
    .delete("/api/deleteGroup", { params: { id: item.id } })
    .then(() => {
      ElNotification({
        title: "通知",
        message: "删除成功",
        type: "success",
      });
      getMarkList();
    });
};
const deleteMark = (item: any) => {
  axiosInstance
    .delete("/api/deleteMark", { params: { id: item.id } })
    .then(() => {
      ElNotification({
        title: "通知",
        message: "删除成功",
        type: "success",
      });
      getMarkList();
    });
};
const change = (e: any, item: any) => {
  console.log(e, item);
};
const getMarkList = () => {
  axiosInstance.get("/api/markList").then((data: any) => {
    marks.value = data.result;
  });
};
onMounted(getMarkList);
</script>

<template>
  <el-row>
    <el-col :span="20">
      <div>
        <el-button
          type="success"
          :icon="Close"
          circle
          v-if="isEdit"
          @click="isEdit = !isEdit"
        />
        <el-button
          type="primary"
          :icon="Edit"
          circle
          v-else
          @click="isEdit = !isEdit"
        />
      </div>
      <div v-for="mark in marks" :key="mark.id">
        <div class="edit-container edit-title">
          <span class="mark-title" :id="mark.name">{{ mark.name }}</span>
          <div class="edit-btn-container">
            <el-button
              type="success"
              link
              @click="editGroup(mark)"
              v-show="isEdit"
              >修改</el-button
            >
            <el-button
              type="danger"
              link
              v-show="isEdit"
              @click="deleteGroup(mark)"
              >删除</el-button
            >
          </div>
        </div>
        <div class="mark-list">
          <div v-for="item in mark.marks" class="mark-item">
            <el-tooltip effect="dark" :content="item.describe" placement="top">
              <div class="mark-item-title">
                <div class="edit-container">
                  <a :href="item.url" target="_blank">{{ item.title }}</a>
                  <div class="edit-btn-container">
                    <el-button
                      type="success"
                      link
                      @click="editMark(item, mark)"
                      v-show="isEdit"
                      >修改</el-button
                    >
                    <el-button
                      type="danger"
                      link
                      v-show="isEdit"
                      @click="deleteMark(item)"
                      >删除</el-button
                    >
                  </div>
                </div>
                <el-checkbox
                  class="mark-item-checkbox"
                  label=""
                  :value="false"
                  v-if="false"
                  @change="change($event, item)"
                /> 
              </div>
            </el-tooltip>
          </div>
          <el-button type="warning" link @click="addMark(mark)" v-show="isEdit"
            >添加</el-button
          >
        </div>
      </div>
      <el-button
        class="add-group"
        type="success"
        v-show="isEdit"
        round
        @click="addGroupVisible = true"
        >添加分组</el-button
      >
    </el-col>
    <el-col :span="4">
      <div class="anchor-container">
        <el-anchor direction="vertical" type="default" :offset="0">
          <el-anchor-link
            :href="`#${mark.name}`"
            :title="mark.name"
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
    :title="markModel?.isEdit ? '修改标签' : '添加标签'"
    width="500"
    @close="resetMark(ruleFormRef)"
    draggable
  >
    <el-form :model="markModel" :rules="markRules" ref="ruleFormRef">
      <el-form-item label="分类名称" prop="className">
        <el-input v-model="markModel.className" autocomplete="off" disabled />
      </el-form-item>
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
        <el-button @click="addMarkVisible = false">取消</el-button>
        <el-button type="primary" @click="submitMark(ruleFormRef)">
          {{ markModel?.isEdit ? "修改" : "添加" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    ref="grouopDialogRef"
    v-model="addGroupVisible"
    :title="groupModel.isEdit ? '修改分组' : '添加分组'"
    width="500"
    @close="resetGroup(grouopFormRef)"
    draggable
  >
    <el-form :model="groupModel" :rules="groupRules" ref="grouopFormRef">
      <el-form-item label="分组名称" prop="name">
        <el-input v-model="groupModel.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addGroupVisible = false">取消</el-button>
        <el-button type="primary" @click="submitGroup(grouopFormRef)">
          {{ groupModel?.isEdit ? "修改" : "添加" }}
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
.mark-title {
  font-size: x-large;
  font-weight: bold;
}
.edit-title {
  margin: 15px 0;
}
.edit-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.edit-btn-container {
  display: flex;
  flex-direction: row;
}
.add-group {
  margin-top: 20px;
}
</style>
