import { createMemoryHistory, createRouter } from 'vue-router'

import BookMark from '@/views/BookMark.vue'
import Note from '@/views/Note.vue'

const routes = [
    { path: '/', component: BookMark },
    { path: '/note', component: Note },
]

const router = createRouter({
    history: createMemoryHistory(),//createWebHistory
    routes,
})

export default router