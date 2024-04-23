import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './styles/common.scss';

/**
 * Инициализация приложения
 */
(async function () {
    const app = createApp(App);

    app
        .use(router);

    app.mount('#app');
}());
