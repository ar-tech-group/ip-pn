<script lang="ts" setup>
import Header from '@/components/common/Header.vue';
import Menu from '@/components/menu/index';
</script>

<template>
    <div class="layout-default">
        <Header>
            <Menu.Header />
        </Header>

        <main class="content">
            <slot />
        </main>
    </div>
</template>

<style lang="scss">
.layout-default {
    position: relative;

    .content {
        padding-top: 180px;
    }
}
</style>
