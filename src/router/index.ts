import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from './config.ts';

import Index from '@/views/index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes:  [
        {
            path:      '/',
            name:      ROUTES.INDEX,
            component: Index,
        }
    ],
});

export default router;
