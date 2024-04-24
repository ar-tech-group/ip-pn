<script lang="ts" setup>
import { computed } from 'vue';
import { COLOR_MAP } from '@/config.ts';

const props = withDefaults(defineProps<{
    strokeWidth?: number;
    color: string;
    size?: number,
}>(), {
    strokeWidth: 2,
    size:        24,
});

/**
 * Коэффициент числа отрезков в зависимости от размеров.
 */
const DASH_RATIO = 2.5;

/**
 * Половина размера (центр).
 */
const halfSize = computed(() => props.size / 2);

/**
 * Радиус.
 */
const radius = computed(() => halfSize.value - props.strokeWidth);

/**
 * Стиль лоадера.
 */
const style = computed(() => {
    const dashNb = Math.round(DASH_RATIO * props.size);

    return {
        ...(COLOR_MAP.has(props.color) && { stroke: COLOR_MAP.get(props.color) }),
        '--dash': -dashNb,
    };
});
</script>

<template>
    <span class="ui-loader">
        <svg
            :width="size"
            :height="size"
            :style="style"
            class="ui-loader__loader"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                :cx="halfSize"
                :cy="halfSize"
                :r="radius"
                :stroke-width="strokeWidth"
            />
        </svg>
    </span>
</template>

<style lang="scss" scoped>
.ui-loader {
    display: inline-block;
    transform-origin: center;
    will-change: transform;

    &__loader {
        fill: transparent;
        stroke: rgba(28, 25, 24, 0.6);
        animation: dash 2s ease infinite, rotate 2s linear infinite;
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 96;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 86, 96;
        stroke-dashoffset: -20;
    }

    100% {
        stroke-dasharray: 86, 95;
        stroke-dashoffset: var(--dash, 90);
    }
}

@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
