<script lang="ts" setup>
import { computed } from 'vue';
import { ElLink } from 'element-plus';
import type { MenuItemType } from '@/types/Menu';

const menus = computed<MenuItemType[]>(() => [
    {
        id:    'documentation',
        title: 'Documentation',
        url:   '/documentation'
    },
    {
        id:    'contacts',
        title: 'Contacts',
        url:   '/contacts'
    },
    {
        id:    'log-in',
        title: 'Log in',
        url:   '/log-in'
    }
]);
</script>

<template>
    <ul class="menu-header-list">
        <li
            v-for="menu in menus"
            :key="menu.id"
            class="menu-header-list__item"
        >
            <ElLink :to="menu.url" :underline="false">
                {{ menu.title }}
            </ElLink>
        </li>
    </ul>
</template>

<style lang="scss">
.menu-header-list {
    @include list-reset();

    position: relative;
    display: flex;
    align-items: center;
    gap: 32px;

    .el-link {
        font-size: 16px;
        font-weight: var(--f-weight-medium);
        line-height: 24px;
        color: var(--gray);
        transition: color 0.3s ease;

        &:hover {
            color: var(--black-primary);
        }
    }
}
</style>
