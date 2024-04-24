<script lang="ts" setup>
import { computed } from 'vue';
import InlineSvg from 'vue-inline-svg';

const props = defineProps<{
    name: string;
}>();

const url = computed(() => new URL(`../../assets/icons/flags/${props.name}.svg`, import.meta.url));
</script>

<template>
    <InlineSvg
        :src="url.href"
        class="svg-icon"
    />
</template>
