import { createWebHistory, createRouter } from 'vue-router'

import BookMark from '@/views/BookMark.vue'
import Note from '@/views/Note.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    { path: '/', component: BookMark },
    { path: '/note', component: Note },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),//createMemoryHistory
    routes,
})

export default router