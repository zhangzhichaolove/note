<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface NoteItem {
  id: number
  content: string
  createdAt: string
}

const notes = ref<NoteItem[]>([
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
  { id: 1, content: '这是第一条便签内容，可以很长很长...', createdAt: '2024-01-10' },
  { id: 2, content: '第二条便签，内容较短', createdAt: '2024-01-11' },
  { id: 3, content: '第三条便签内容，包含一些重要信息...', createdAt: '2024-01-12' },
])

const dialogVisible = ref(false)
const editDialogVisible = ref(false)
const addDialogVisible = ref(false)
const currentNote = ref<NoteItem | null>(null)
const editForm = reactive({
  content: ''
})
const addForm = reactive({
  content: ''
})

const handleAdd = () => {
  addDialogVisible.value = true
}

const handleAddSubmit = () => {
  if (!addForm.content.trim()) {
    ElMessage.warning('便签内容不能为空')
    return
  }

  const maxId = Math.max(...notes.value.map(note => note.id), 0)
  const newNote: NoteItem = {
    id: maxId + 1,
    content: addForm.content,
    createdAt: new Date().toISOString().split('T')[0]
  }

  notes.value.unshift(newNote)
  addForm.content = ''
  addDialogVisible.value = false
  ElMessage.success('添加成功')
}

const showNoteDetail = (note: NoteItem) => {
  currentNote.value = note
  dialogVisible.value = true
}

const handleEdit = (note: NoteItem) => {
  currentNote.value = note
  editForm.content = note.content
  editDialogVisible.value = true
}

const handleEditSubmit = () => {
  if (!editForm.content.trim()) {
    ElMessage.warning('便签内容不能为空')
    return
  }

  if (currentNote.value) {
    const index = notes.value.findIndex(n => n.id === currentNote.value?.id)
    if (index !== -1) {
      notes.value[index] = {
        ...notes.value[index],
        content: editForm.content,
      }
      ElMessage.success('编辑成功')
      editDialogVisible.value = false
    }
  }
}

const handleDelete = (note: NoteItem) => {
  ElMessageBox.confirm(
    '确定要删除这条便签吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    const index = notes.value.findIndex(n => n.id === note.id)
    if (index !== -1) {
      notes.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  }).catch(() => {
    // 取消删除
  })
}
</script>

<template>
  <div class="note-container">
    <div class="waterfall">
      <el-card v-for="note in notes" :key="note.id" class="note-card" shadow="hover" @click="showNoteDetail(note)">
        <div class="note-content">
          {{ note.content }}
        </div>
        <div class="note-footer">
          <span class="date">{{ note.createdAt }}</span>
          <div class="actions">
            <el-button type="primary" :icon="Edit" circle @click.stop="handleEdit(note)" />
            <el-button type="danger" :icon="Delete" circle @click.stop="handleDelete(note)" />
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog v-model="dialogVisible" :title="'便签详情'" width="50%">
      <p>{{ currentNote?.content }}</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="editDialogVisible" :title="'编辑便签'" width="50%">
      <el-form>
        <el-form-item label="内容">
          <el-input v-model="editForm.content" type="textarea" :rows="4" placeholder="请输入便签内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="addDialogVisible" :title="'新增便签'" width="50%">
      <el-form>
        <el-form-item label="内容">
          <el-input v-model="addForm.content" type="textarea" :rows="4" placeholder="请输入便签内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-button class="add-button" type="primary" :icon="Plus" circle @click="handleAdd" />
  </div>
</template>

<style scoped>
.note-container {
  padding: 20px;
}

.waterfall {
  column-count: 3;
  column-gap: 20px;
}

.note-card {
  break-inside: avoid;
  margin-bottom: 20px;
  cursor: pointer;
}

.note-content {
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
  min-height: 32px;
}

.actions {
  opacity: 0;
  gap: 8px;
  display: flex;
  transition: opacity 0.3s ease;
}

.note-card:hover .actions {
  opacity: 1;
}

.add-button {
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 50px;
  height: 50px;
  font-size: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
