import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from './config.ts';

import IndexPage from '@/views/index.vue';
import IpPage from '@/views/ip.vue';
import IpDetail from '@/views/IpDetail.vue';

const router = createRouter({
    history: createWebHistory(),
    routes:  [
        {
            path:      '/',
            name:      ROUTES.INDEX,
            component: IndexPage,
            meta:      {
                layout: 'default',
            }
        },
        {
            path:      '/ip',
            name:      ROUTES.IP,
            component: IpPage,
            meta:      {
                layout: 'default',
            }
        },
        {
            path:      '/ip/:id',
            name:      ROUTES.IP_DETAIL,
            component: IpDetail,
            meta:      {
                layout: 'default',
            }
        }
    ],
});

export default router;
