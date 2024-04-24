<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { defaultLayout } from '@/config.ts';

const route = useRoute();

const layout = computed(() => `${route.meta.layout || defaultLayout }-layout`);
</script>

<template>
    <component :is="layout">
        <router-view class="app__view"/>
    </component>
</template>
