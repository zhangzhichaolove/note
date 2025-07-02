<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import axiosInstance from '@/request'

interface NoteItem {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

const notes = ref<NoteItem[]>([])

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

  axiosInstance.post('/api/addNote', { content: addForm.content }).then(() => {
    ElNotification({
      title: '通知',
      message: '添加成功',
      type: 'success',
    })
    getNoteList()
    addForm.content = ''
    addDialogVisible.value = false
  }).catch(() => {
    ElMessage.error('添加失败')
  })
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
    axiosInstance.put('/api/editNote', {
      id: currentNote.value.id,
      content: editForm.content
    }).then(() => {
      ElNotification({
        title: '通知',
        message: '修改成功',
        type: 'success',
      })
      getNoteList()
      editDialogVisible.value = false
    }).catch(() => {
      ElMessage.error('修改失败')
    })
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
    axiosInstance.delete('/api/deleteNote', {
      params: { id: note.id }
    }).then(() => {
      ElNotification({
        title: '通知',
        message: '删除成功',
        type: 'success',
      })
      getNoteList()
    }).catch(() => {
      ElMessage.error('删除失败')
    })
  }).catch(() => {
    // 取消删除
  })
}

const getNoteList = () => {
  axiosInstance.get('/api/noteList').then((data: any) => {
    notes.value = data.result
  }).catch(() => {
    ElMessage.error('获取便签列表失败')
  })
}

onMounted(getNoteList)
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
      <div class="note-detail-content">{{ currentNote?.content }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="editDialogVisible" :title="'编辑便签'" width="50%">
      <el-form>
        <el-form-item>
          <el-input v-model="editForm.content" type="textarea" :rows="20" placeholder="请输入便签内容" />
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
        <el-form-item>
          <el-input v-model="addForm.content" type="textarea" :rows="20" placeholder="请输入便签内容" />
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.note-card {
  break-inside: avoid;
  margin-bottom: 20px;
  margin-right: 20px;
  cursor: pointer;
  max-width: 400px;
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

.note-detail-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
  padding: 10px 0;
  text-align: left;
}
</style>
