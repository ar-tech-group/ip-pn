import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import router from './router';
import App from '@/App.vue';
import LayoutDefault from '@/layouts/default.vue';

import './styles/common.scss';

/**
 * Инициализация приложения
 */
(async function () {
    const app = createApp(App);
    const pinia = createPinia();

    app
        .component('default-layout', LayoutDefault)
        .use(pinia)
        .use(ElementPlus)
        .use(router);

    app.mount('#app');
}());
